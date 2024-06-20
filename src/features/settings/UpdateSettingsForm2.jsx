import { useForm } from 'react-hook-form';
import { useSetting, useUpdateSetting } from '../../hooks/useSetting';
import { Form, FormRow, Input, Spinner } from '../../components';
import { useState } from 'react';

export default function UpdateSettingsForm() {
	const { settings = {}, isSettingLoading } = useSetting();
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
	const {
		register,
		formState: { errors },
		trigger,
	} = useForm();

	const { updateSettingMutate } = useUpdateSetting();
	const [isUpdating, setIsUpdating] = useState({
		minBookingLength: false,
		maxBookingLength: false,
		maxGuestsPerBooking: false,
		breakfastPrice: false,
	});

	const handleUpdate = async (e) => {
		const { value, name, defaultValue } = e.target;

		if (!value || !name || defaultValue === value) return;

		const isInputValid = await trigger(name);
		if (!isInputValid) return;

		setIsUpdating((prev) => ({ ...prev, [name]: true }));

		updateSettingMutate(
			{ [name]: value },
			{
				onSuccess: () => {
					setIsUpdating((prev) => ({ ...prev, [name]: false }));
					e.target.defaultValue = value;
				},
				onError: () => {
					setIsUpdating((prev) => ({ ...prev, [name]: false }));
				},
			}
		);
	};

	if (isSettingLoading || !settings) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking" error={errors?.minBookingLength?.message}>
				<Input
					type="number"
					id="min-nights"
					disabled={isUpdating.minBookingLength}
					defaultValue={minBookingLength}
					{...register('minBookingLength', {
						required: 'The minimun number of booking is required.',
						min: { value: 1, message: 'Must be greater than 1.' },
						onBlur: handleUpdate,
					})}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking" error={errors?.maxBookingLength?.message}>
				<Input
					type="number"
					id="max-nights"
					name="maxBookingLength"
					disabled={isUpdating.maxBookingLength}
					defaultValue={maxBookingLength}
					{...register('maxBookingLength', {
						required: 'The maximum number of booking is required.',
						max: {
							value: 90,
							message: 'The maximum booking duration should not exceed 90 nights.',
						},
						min: { value: 1, message: 'Must be greater than 1.' },
						onBlur: handleUpdate,
					})}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking" error={errors?.maxGuestsPerBooking?.message}>
				<Input
					type="number"
					id="max-guests"
					name="maxGuestsPerBooking"
					disabled={isUpdating.maxGuestsPerBooking}
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e)}
					{...register('maxGuestsPerBooking', {
						required: 'The maximum number of guests is required.',
						min: { value: 1, message: 'Must be greater than 1!' },
						onBlur: handleUpdate,
					})}
				/>
			</FormRow>
			<FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
				<Input
					type="number"
					id="breakfast-price"
					name="breakfastPrice"
					disabled={isUpdating.breakfastPrice}
					defaultValue={breakfastPrice}
					{...register('breakfastPrice', {
						required: 'Breakfast price is required!',
						min: { value: 1, message: 'The price must be greater than $1.' },
						onBlur: handleUpdate,
					})}
				/>
			</FormRow>
		</Form>
	);
}
