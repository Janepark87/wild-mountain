import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateUpdateCabin } from '../../hooks/useCabin';
import useInputValidation from '../../hooks/useInputValidation';
import { Form, FormRow, Input, Textarea, Button, FileInput } from '../../components';

export default function CreateCabinForm({ updateCabin = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = updateCabin;
	const updateMode = Boolean(updateId);
	const { careateUpdateCabinMutate, isCabinCreatingUpdating } = useCreateUpdateCabin(updateMode);
	const { disabled: btnDisable, setDisabled: setBtnDisable, handleInputValidation } = useInputValidation(updateCabin);

	const [previewCabinImage, setPreviewCabinImage] = useState(updateValues.image);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: updateMode ? updateCabin : {},
	});

	const inputValidation = () => handleInputValidation(getValues());
	const previewImage =
		!updateMode || updateValues.image !== getValues().image
			? previewCabinImage instanceof Blob
				? URL.createObjectURL(previewCabinImage)
				: null // Handle the case where previewCabinImage is not a Blob
			: updateValues.image;

	const onSubmit = (data) => {
		let image = typeof data.image === 'object' && data.image?.length > 0 ? data.image[0] : updateCabin.image;
		const cabinData = { ...data, image };
		const resetValues = {
			onSuccess: () => {
				setBtnDisable(true);
				updateMode ? reset(getValues()) : reset();
				onCloseModal?.();
			},
		};

		if (updateMode) careateUpdateCabinMutate({ cabinData, updateId }, resetValues);
		else careateUpdateCabinMutate({ cabinData }, resetValues);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input type="text" id="name" {...register('name', { onChange: inputValidation, required: 'Enter a name for your cabin.' })} disabled={isCabinCreatingUpdating} />
			</FormRow>
			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					defaultValue={1}
					disabled={isCabinCreatingUpdating}
					{...register('maxCapacity', {
						onChange: inputValidation,
						required: 'Specify the maximum capacity.',
						min: { value: 1, message: 'Capaciy should be at least 1' },
					})}
				/>
			</FormRow>
			<FormRow label="Regular Price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCabinCreatingUpdating}
					{...register('regularPrice', {
						onChange: inputValidation,
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
					disabled={isCabinCreatingUpdating}
					{...register('discount', {
						onChange: inputValidation,
						required: 'Enter the cabin discount, or set it to 0 for no discount.',
						validate: (value) => {
							if (Number(value) < 0) return 'Discount cannot be less than 0.';
							return Number(value) <= Number(getValues().regularPrice) || 'Discount should be less then regular price.';
						},
					})}
				/>
			</FormRow>
			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea type="text" id="description" disabled={isCabinCreatingUpdating} {...register('description', { onChange: inputValidation, required: 'A brief description is required.' })} />
			</FormRow>
			<FormRow label="Cabin photo" defaultValue={updateMode && updateValues.image} updateValues={{ image: previewImage, name: updateValues.name }} error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', {
						onChange: (e) => {
							setPreviewCabinImage(e.target.files[0]);
							inputValidation();
						},
						required: updateMode ? false : 'Upload an image for your cabin.',
					})}
					disabled={isCabinCreatingUpdating}
				/>
			</FormRow>

			<FormRow>
				<Button
					type="reset"
					variation="secondary"
					disabled={isCabinCreatingUpdating}
					onClick={() => {
						reset();
						!updateMode && setPreviewCabinImage(null);
					}}>
					Clear
				</Button>
				<Button disabled={btnDisable || isCabinCreatingUpdating}>{updateMode ? 'Edit cabin' : 'Create a new cabin'}</Button>
			</FormRow>
		</Form>
	);
}
