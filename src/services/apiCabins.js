import supabase from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded.');
	}
	return data;
}

async function uploadImageToSupabase(image) {
	const imageName = `${Math.floor(Date.now() + 1)}-${(image?.name || '').replaceAll('/', '')}`;
	const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

	const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, image);

	if (storageError) {
		console.error(storageError);
		throw new Error('Cabin image could not be uploaded, and the cabin was not created.');
	}

	return imagePath;
}

async function createImagePath(image) {
	const hasCabinImage = Boolean(image);

	if (!hasCabinImage) return null;

	const hasImagePath = image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
	const imagePath = hasImagePath ? image : await uploadImageToSupabase(image);

	return imagePath;
}

export async function createUpdateCabin(cabin, updateId) {
	let query = supabase.from('cabins');

	try {
		const imagePathPromise = createImagePath(cabin.image);
		const imagePath = await imagePathPromise;

		if (!updateId) query = query.insert([{ ...cabin, image: imagePath }]); // create
		else query = query.update({ ...cabin, image: imagePath }).eq('id', updateId); // update

		const { data } = await query.select().single();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error(`Cabins could not be ${updateId ? 'updated' : 'created'}.`);
	}
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted.');
	}
	return data;
}
