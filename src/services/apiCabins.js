import supabase from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded.');
	}

	return data;
}

async function deleteImageFromSupabase(imagePath) {
	// Extract the image name from the path
	const imageName = imagePath.split('/').pop();

	const { error } = await supabase.storage.from('cabin-images').remove([imageName]);

	if (error) {
		console.error(error);
		throw new Error('Cabin image could not be deleted.');
	}
}

async function uploadImageToSupabase(image) {
	const imageName = `${Math.floor(Date.now() + 1)}-${(image?.name || '').replaceAll('/', '')}`;
	const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

	const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, image);

	if (storageError) {
		console.error(storageError);
		throw new Error('Cabin image could not be uploaded.');
	}

	return imagePath;
}

async function createImagePath(image, existingImagePath = null) {
	const hasCabinImage = Boolean(image);

	if (!hasCabinImage) return existingImagePath;

	if (existingImagePath) {
		await deleteImageFromSupabase(existingImagePath);
	}

	const hasImagePath = image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
	const imagePath = hasImagePath ? image : await uploadImageToSupabase(image);

	return imagePath;
}

export async function createUpdateCabin(cabin, updateId) {
	let query = supabase.from('cabins');
	let createdCabinId;

	try {
		if (!updateId) {
			// Create cabin first without image
			const { data, error } = await query
				.insert([{ ...cabin, image: null }])
				.select()
				.single();

			if (error) throw new Error('Cabin could not be created.');

			createdCabinId = data.id;
			updateId = createdCabinId;
		}

		// Fetch the existing cabin data to get the current image path
		const { data: existingCabin } = await query.select('image').eq('id', updateId).single();
		const existingImagePath = existingCabin?.image;

		// Upload new image and delete the old one if necessary
		const imagePath = await createImagePath(cabin.image, existingImagePath);

		// Update cabin with image path
		query = query.update({ ...cabin, image: imagePath }).eq('id', updateId);
		const { data } = await query.select().single();

		return data;
	} catch (error) {
		console.error(error);

		// Delete the created cabin if image upload fails
		if (createdCabinId) await supabase.from('cabins').delete().eq('id', createdCabinId);

		throw new Error(`Cabins could not be ${updateId ? 'updated' : 'created'}.`);
	}
}

export async function deleteCabin(id) {
	try {
		// Fetch the existing cabin data to get the current image path
		const { data: cabinData, error: fetchError } = await supabase.from('cabins').select('image').eq('id', id).single();

		if (fetchError) {
			console.error(fetchError);
			throw new Error('Could not fetch cabin data.');
		}

		// If the cabin has an associated image, delete the image
		if (cabinData?.image) await deleteImageFromSupabase(cabinData.image);

		// Delete the cabin record
		const { data, error } = await supabase.from('cabins').delete().eq('id', id);

		if (error) {
			console.error(error);
			throw new Error('Cabin could not be deleted.');
		}

		return data;
	} catch (error) {
		console.error(error);
		throw new Error('An error occurred while deleting the cabin.');
	}
}
