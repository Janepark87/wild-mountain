import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCabins, createUpdateCabin, deleteCabin } from '../services/apiCabins';

export function useCabinQuery() {
	const {
		data: cabins,
		isPending,
		isError: isCabinError,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { cabins, isPending, isCabinError };
}

export function useCreateUpdateCabin(updateMode) {
	const queryClient = useQueryClient();

	const createMutationConfig = {
		mutationFn: ({ cabinData, updateId }) => createUpdateCabin(cabinData, updateId),
		onSuccess: () => {
			const action = updateMode ? 'updated' : 'created';
			toast.success(`Cabin successfully ${action}`);
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	};

	const { mutate: careateUpdateCabinMutate, isPending: createUpdateLoading } = useMutation(createMutationConfig);

	return { careateUpdateCabinMutate, createUpdateLoading };
}

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { mutate: deleteCabinMutate, isPending: isDeleting } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin succesfully deleted');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { deleteCabinMutate, isDeleting };
}
