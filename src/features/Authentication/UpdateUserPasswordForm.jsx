import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../hooks/useAuth';
import { Form, FormRow, Input, Button } from '../../components';

export default function UpdateUserPasswordForm() {
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm();

	const { updateUserMutate, isUserUpdating } = useUpdateUser();

	const onSubmit = ({ password }) => {
		updateUserMutate({ password }, { onSuccess: reset() });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="New password (min 8 chars)" error={errors?.password?.message}>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={isUserUpdating}
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 8,
							message: 'Password needs a minimum of 8 characters',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					autoComplete="new-password"
					id="passwordConfirm"
					disabled={isUserUpdating}
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (value) => getValues().password === value || 'Passwords need to match',
					})}
				/>
			</FormRow>
			<FormRow>
				<Button onClick={reset} type="reset" variation="secondary">
					Clear
				</Button>
				<Button disabled={isUserUpdating}>Update password</Button>
			</FormRow>
		</Form>
	);
}
