import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCabins, createUpdateCabin, deleteCabin } from '../services/apiCabins';

export function useCabinQuery() {
	const {
		data: cabins,
		isPending: isCabinsLoading,
		isError: isCabinsError,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { cabins, isCabinsLoading, isCabinsError };
}

export function useCreateUpdateCabin(updateMode) {
	const queryClient = useQueryClient();

	const createMutationConfig = {
		mutationFn: ({ cabinData, updateId = null }) => createUpdateCabin(cabinData, updateId),
		onSuccess: () => {
			const action = updateMode ? 'updated' : 'created';
			toast.success(`Cabin successfully ${action}`);
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	};

	const { mutate: careateUpdateCabinMutate, isPending: isCabinCreatingUpdating } = useMutation(createMutationConfig);

	return { careateUpdateCabinMutate, isCabinCreatingUpdating };
}

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { mutate: deleteCabinMutate, isPending: isCabinDeleting } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin succesfully deleted');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteCabinMutate, isCabinDeleting };
}
