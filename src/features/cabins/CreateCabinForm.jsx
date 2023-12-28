import { useForm } from 'react-hook-form';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';
import { useCreateUpdateCabin } from '../../hooks/useCabin';
import useInputValidation from '../../hooks/useInputValidation';

export default function CreateCabinForm({ updateCabin = {} }) {
	const { id: updateId, ...updateValues } = updateCabin;
	const updateMode = Boolean(updateId);
	const { careateUpdateCabinMutate, isCabinCreatingUpdating } = useCreateUpdateCabin(updateMode);
	const { btnDisable, setBtnDisable, handleInputValidation } = useInputValidation(updateCabin);

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

	const onSubmit = (data) => {
		let image = typeof data.image === 'object' && data.image?.length > 0 ? data.image[0] : updateCabin.image;
		const cabinData = { ...data, image };
		const resetValues = {
			onSuccess: () => {
				setBtnDisable(true);
				updateMode ? reset(getValues()) : reset();
			},
		};

		if (updateMode) careateUpdateCabinMutate({ cabinData, updateId }, resetValues);
		else careateUpdateCabinMutate({ cabinData }, resetValues);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register('name', { onChange: inputValidation, required: 'Enter a name for your cabin.' })}
					disabled={isCabinCreatingUpdating}
				/>
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
				<Textarea
					type="text"
					id="description"
					disabled={isCabinCreatingUpdating}
					{...register('description', { onChange: inputValidation, required: 'A brief description is required.' })}
				/>
			</FormRow>
			<FormRow label="Cabin photo" updateMode={updateMode} updateValues={updateValues} error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', { onChange: inputValidation, required: updateMode ? false : 'Upload an image for your cabin.' })}
					disabled={isCabinCreatingUpdating}
				/>
			</FormRow>

			<FormRow>
				<Button type="reset" variation="secondary" disabled={updateMode ? !btnDisable : btnDisable}>
					Clear
				</Button>
				<Button disabled={btnDisable}>{updateMode ? 'Edit cabin' : 'Create a new cabin'}</Button>
			</FormRow>
		</Form>
	);
}
