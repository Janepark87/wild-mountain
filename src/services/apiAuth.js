import supabase from './supabase';

export async function signup({ fullname, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullname,
				avatar: '',
			},
		},
	});

	if (error) throw new Error(error.message);
	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);
	return data?.user;
}

async function deleteAvatarFromSupabase(avatarPath) {
	const avatarName = avatarPath.split('/').pop();

	const { error } = await supabase.storage.from('avatars').remove([avatarName]);

	if (error) {
		console.error(error);
		throw new Error('Avatar could not be deleted.');
	}
}

async function uploadAvatarToSupabase(user, avatar) {
	const avatarName = `avatar-${user.id}-${Math.floor(Date.now() + 1)}-${(avatar?.name || '').replaceAll('/', '')}`;
	const avatarPath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarName}`;

	const { error: storageError } = await supabase.storage.from('avatars').upload(avatarName, avatar);

	if (storageError) {
		console.error(storageError);
		throw new Error('Avatar could not be uploaded, and the avatar was not created.');
	}

	return avatarPath;
}

async function createAvatarPath(user, avatar, existingAvatarPath = null) {
	if (!avatar) return null;

	if (existingAvatarPath) {
		await deleteAvatarFromSupabase(existingAvatarPath);
	}

	const hasAvatarPath = avatar?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);
	const avatarPath = hasAvatarPath ? avatar : await uploadAvatarToSupabase(user, avatar);
	return avatarPath;
}

export async function updateCurrentUser({ fullname, avatar, password }) {
	// set updateData based on provided value - fullname OR password
	let updateData = {};
	if (fullname) updateData = { data: { fullname } };
	if (password) updateData = { password };

	try {
		const { data: currentUser } = await supabase.auth.getUser();
		const { data: updatedUser } = await supabase.auth.updateUser(updateData);

		if (!avatar) return updatedUser;

		// Fetch existing avatar path from user_metadata
		const existingAvatarPath = currentUser.user.user_metadata?.avatar;

		// Upload new avatar and delete the old one if necessary
		const avatarPath = await createAvatarPath(updatedUser.user, avatar, existingAvatarPath);
		const { data: updatedAvatar } = await supabase.auth.updateUser({
			data: { avatar: avatarPath },
		});

		return updatedAvatar;
	} catch (err) {
		console.log(err.message);
		throw Error(err.message);
	}
}
