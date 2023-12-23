import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUpdateCabin } from '../../services/apiCabins';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';

export default function CreateCabinForm({ updateCabin = {} }) {
	const { id: updateId, ...updateValues } = updateCabin;
	const updateMode = Boolean(updateId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: updateMode ? updateCabin : {},
	});

	const { errors } = formState;

	const queryClient = useQueryClient();

	const createMutationConfig = {
		mutationFn: ({ cabinData, updateId }) => createUpdateCabin(cabinData, updateId),
		onSuccess: () => {
			const action = updateMode ? 'updated' : 'created';
			toast.success(`Cabin successfully ${action}`);
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			reset(getValues());
		},
		onError: (err) => toast.error(err.message),
	};

	const { mutate: cabinMutate, isPending: cabinLoading } = useMutation(createMutationConfig);

	const onSubmit = (data) => {
		let image = typeof data.image === 'object' && data.image?.length > 0 ? data.image[0] : updateCabin.image;
		const cabinData = { ...data, image };

		if (updateMode) cabinMutate({ cabinData, updateId });
		else cabinMutate({ cabinData, updateId: null });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input type="text" id="name" {...register('name', { required: 'Enter a name for your cabin.' })} disabled={cabinLoading} />
			</FormRow>
			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					defaultValue={1}
					disabled={cabinLoading}
					{...register('maxCapacity', {
						required: 'Specify the maximum capacity.',
						min: { value: 1, message: 'Capaciy should be at least 1' },
					})}
				/>
			</FormRow>
			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={cabinLoading}
					{...register('regularPrice', {
						required: 'Enter the price for your cabin.',
						min: { value: 1, message: 'Price should be at least 1.' },
					})}
				/>
			</FormRow>
			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={cabinLoading}
					{...register('discount', {
						required: 'Enter the cabin discount, or set it to 0 for no discount.',
						validate: (value) => {
							if (Number(value) < 0) return 'Discount cannot be less than 0.';
							return Number(value) <= Number(getValues().regularPrice) || 'Discount should be less then regular price.';
						},
					})}
				/>
			</FormRow>
			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea type="text" id="description" disabled={cabinLoading} {...register('description', { required: 'A brief description is required.' })} />
			</FormRow>
			<FormRow label="Cabin photo" updateMode={updateMode} updateValues={updateValues} error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', { required: updateMode ? false : 'Upload an image for your cabin.' })}
					disabled={cabinLoading}
				/>
			</FormRow>

			<FormRow>
				<Button type="reset" variation="secondary">
					Cancel
				</Button>
				<Button disabled={cabinLoading}>{updateMode ? 'Edit cabin' : 'Create a new cabin'}</Button>
			</FormRow>
		</Form>
	);
}
