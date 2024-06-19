import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCabins, createUpdateCabin, deleteCabin } from '../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

export function useCabins() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// pagination
	const pageValue = searchParams.get('page');
	const page = !pageValue ? 1 : Number(pageValue);

	const {
		data: { data: cabins, count } = {},
		isPending: isCabinsLoading,
		isError: isCabinsError,
	} = useQuery({
		queryKey: ['cabins', page],
		queryFn: () => getCabins({ page }),
	});

	// function to prefetch pages
	const prefetchPage = (pageOffset) => {
		const targetPage = page + pageOffset;
		const totalPageNumber = Math.ceil(count / PAGE_SIZE);

		if (targetPage >= 1 && targetPage <= totalPageNumber) {
			queryClient.prefetchQuery({
				queryKey: ['cabins', targetPage],
				queryFn: () => getCabins({ page: targetPage }),
			});
		}
	};

	// pre-fetching for next and previous pages
	prefetchPage(1);
	prefetchPage(-1);

	return { cabins, isCabinsLoading, isCabinsError, count };
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
