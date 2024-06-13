import { useSettingQuery, useUpdateSetting } from '../../hooks/useSetting';
import { Form, FormRow, Input, Spinner } from '../../components';

export default function UpdateSettingsForm() {
	const { settings = {}, isSettingLoading } = useSettingQuery();
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;

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

	if (isSettingLoading || !settings) return <Spinner />;
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input type="number" id="min-nights" defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e)} />
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input type="number" id="max-nights" name="maxBookingLength" defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e)} />
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input type="number" id="max-guests" name="maxGuestsPerBooking" defaultValue={maxGuestsPerBooking} onBlur={(e) => handleUpdate(e)} />
			</FormRow>
			<FormRow label="Breakfast price">
				<Input type="number" id="breakfast-price" name="breakfastPrice" defaultValue={breakfastPrice} onBlur={(e) => handleUpdate(e)} />
			</FormRow>
		</Form>
	);
}
