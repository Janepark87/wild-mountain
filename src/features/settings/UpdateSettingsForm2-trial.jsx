import { useForm } from 'react-hook-form';
import { useSettingQuery, useUpdateSetting } from '../../hooks/useSetting';
import { Form, FormRow, Input, Spinner } from '../../components';

// FIXME: error handling using useForm without a submit button
export default function UpdateSettingsForm() {
	const { settings = {}, isSettingLoading } = useSettingQuery();
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { updateSettingMutate } = useUpdateSetting();

	const handleUpdate = (e) => {
		const { value, name, defaultValue } = e.target;

		if (!value || !name || defaultValue === value) return;

		e.target.disabled = true;

		updateSettingMutate(
			{ [name]: value },
			{
				onSuccess: () => {
					e.target.disabled = false;
					e.target.defaultValue = value;
				},
			}
		);
	};

	const onSubmit = (data) => console.log('sbumit', data);

	if (isSettingLoading || !settings) return <Spinner />;
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Minimum nights/booking" error={errors?.minBookingLength?.message}>
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					{...register('minBookingLength', {
						onBlur: (e) => handleUpdate(e),
						required: 'The minimun number of booking is required.',
						min: { value: 1, message: 'Must be greater than 1.' },
					})}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					name="maxBookingLength"
					defaultValue={maxBookingLength}
					{...register('maxBookingLength', {
						onBlur: (e) => handleUpdate(e),
						required: 'The maximum number of booking is required.',
						max: {
							value: 90,
							message: 'The maximum booking duration should not exceed 90 nights.',
						},
						min: { value: 1, message: 'Must be greater than 1.' },
					})}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					name="maxGuestsPerBooking"
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e)}
					{...register('maxGuestsPerBooking', {
						required: 'The maximum number of guests is required.',
						min: { value: 1, message: 'Must be greater than 1!' },
					})}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					name="breakfastPrice"
					defaultValue={breakfastPrice}
					{...register('breakfastPrice', {
						onBlur: (e) => handleUpdate(e),
						required: 'Breakfast price is required!',
						min: { value: 1, message: 'The price must be greater than $1.' },
					})}
				/>
			</FormRow>
		</Form>
	);
}
