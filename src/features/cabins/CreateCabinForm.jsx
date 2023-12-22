import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';

export default function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();
	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const onSubmit = (data) => {
		mutate({ ...data, image: data.image[0] });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input type="text" id="name" {...register('name', { required: 'Enter a name for your cabin.' })} />
			</FormRow>
			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					defaultValue={1}
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
				<Textarea type="text" id="description" disabled={isCreating} {...register('description', { required: 'A brief description is required.' })} />
			</FormRow>
			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput id="image" accept="image/*" {...register('image', { required: 'Upload an image for your cabin.' })} />
			</FormRow>

			<FormRow>
				<Button type="reset" variation="secondary">
					Cancel
				</Button>
				<Button disabled={isCreating}>Create new cabin</Button>
			</FormRow>
		</Form>
	);
}
