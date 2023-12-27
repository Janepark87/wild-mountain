import { useState } from 'react';

export default function useInputValidation(initialValues) {
	const [btnDisable, setBtnDisable] = useState(true);

	const handleInputValidation = (values) => {
		// if there is at least one field change, then return true
		const isAnyFieldDiff = Object.entries(values).some(([field, value]) => {
			const currentValue = initialValues[field];
			return currentValue !== Number(value) && currentValue !== value;
		});

		setBtnDisable(!isAnyFieldDiff);
	};

	return { btnDisable, setBtnDisable, handleInputValidation };
}
