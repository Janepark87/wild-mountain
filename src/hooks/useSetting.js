import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSetting, updateSetting } from '../services/apiSetting';

export function useSettingQuery() {
	const {
		data: settings,
		isPending: isSettingLoading,
		isError: isSettingsError,
	} = useQuery({
		queryKey: ['settings'],
		queryFn: getSetting,
	});

	return { settings, isSettingLoading, isSettingsError };
}

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSettingMutate, isPending: isSettingUpdating } = useMutation({
		mutationFn: updateSetting,
		onSuccess: () => {
			toast.success('Setting successfully udpated.');
			queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateSettingMutate, isSettingUpdating };
}
