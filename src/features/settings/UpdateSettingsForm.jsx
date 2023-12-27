import { useForm } from 'react-hook-form';
import { useSettingQuery, useUpdateSetting } from '../../hooks/useSetting';
import useInputValidation from '../../hooks/useInputValidation';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

export default function UpdateSettingsForm() {
	const { settings = {}, isSettingLoading } = useSettingQuery();
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
	const { updateSettingMutate, isSettingUpdating } = useUpdateSetting();
	const { btnDisable, setBtnDisable, handleInputValidation } = useInputValidation(settings);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm();

	const inputValidation = () => handleInputValidation(getValues());

	const resetForm = () => {
		reset({
			minBookingLength: settings.minBookingLength,
			maxBookingLength: settings.maxBookingLength,
			maxGuestsPerBooking: settings.maxGuestsPerBooking,
			breakfastPrice: settings.breakfastPrice,
		});

		handleInputValidation(getValues());
	};

	const onSubmit = (data) => {
		updateSettingMutate(data, {
			onSuccess: () => {
				reset(getValues());
				setBtnDisable(true);
			},
		});
	};

	if (isSettingLoading || !settings) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Minimum nights/booking" error={errors?.minBookingLength?.message}>
				<Input
					type="number"
					id="min-nights"
					disabled={isSettingUpdating}
					defaultValue={minBookingLength}
					{...register('minBookingLength', {
						onChange: inputValidation,
						required: 'The minimun number of booking is required.',
						min: { value: 1, message: 'Must be greater than 1.' },
					})}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking" error={errors?.maxBookingLength?.message}>
				<Input
					type="number"
					id="max-nights"
					disabled={isSettingUpdating}
					defaultValue={maxBookingLength}
					{...register('maxBookingLength', {
						onChange: inputValidation,
						required: 'The maximum number of booking is required.',
						max: {
							value: 90,
							message: 'The maximum booking duration should not exceed 90 nights.',
						},
						min: { value: 1, message: 'Must be greater than 1.' },
					})}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking" error={errors?.maxGuestsPerBooking?.message}>
				<Input
					type="number"
					id="max-guests"
					disabled={isSettingUpdating}
					defaultValue={maxGuestsPerBooking}
					{...register('maxGuestsPerBooking', {
						onChange: inputValidation,
						required: 'The maximum number of guests is required.',
						min: { value: 1, message: 'Must be greater than 1!' },
					})}
				/>
			</FormRow>
			<FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
				<Input
					type="number"
					id="breakfast-price"
					disabled={isSettingUpdating}
					defaultValue={breakfastPrice}
					{...register('breakfastPrice', {
						onChange: inputValidation,
						required: 'Breakfast price is required!',
						min: { value: 1, message: 'The price must be greater than $1.' },
					})}
				/>
			</FormRow>
			<FormRow>
				<Button type="reset" variation="secondary" disabled={btnDisable} onClick={resetForm}>
					Reset
				</Button>
				<Button disabled={btnDisable}>Save changes</Button>
			</FormRow>
		</Form>
	);
}
