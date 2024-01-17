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

async function uploadAvatarToSupabase(user, avatar) {
	const avatarName = `avatar-${user.id}-${Math.floor(Date.now() + 1)}`;
	const avatarPath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarName}`;

	const { error: storageError } = await supabase.storage.from('avatars').upload(avatarName, avatar);

	if (storageError) {
		console.error(storageError);
		throw new Error('Avatar could not be uploaded, and the avatar was not created.');
	}

	return avatarPath;
}

async function createAvatarPath(user, avatar) {
	if (!avatar) return null;

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
		const { data: updateUser } = await supabase.auth.updateUser(updateData);

		if (!avatar) {
			return updateUser;
		} else {
			// upload/update the avatar
			const avatarPath = await createAvatarPath(updateUser.user, avatar);
			const { data: updateAvatar } = await supabase.auth.updateUser({
				data: { avatar: avatarPath },
			});
			return updateAvatar;
		}
	} catch (err) {
		console.log(err.message);
		throw Error(err.message);
	}
}
