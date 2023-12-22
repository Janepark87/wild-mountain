import supabase from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded.');
	}
	return data;
}

export async function createCabin(newCabin) {
	// create a new image path
	const randomInteger = Math.floor(Date.now() + 1);
	const imageName = `${randomInteger}-${newCabin.image.name}`.replaceAll('/', '');
	const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

	// create a new cabin
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be created.');
	}

	// upload image into supabase
	const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

	// delete the cabin If there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error('Cabin image could not be upload and the cabin was not created.');
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be deleted.');
	}

	return data;
}
