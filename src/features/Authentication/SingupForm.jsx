import { useForm } from 'react-hook-form';
import { Form, FormRow, Input, Button, ButtonGroup } from '../../components';
import { useSingup } from '../../hooks/useAuth';

export default function SingupForm() {
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;
	const { signupMutate, isSignupLoading } = useSingup();

	const onSubmit = ({ fullname, email, password }) => {
		signupMutate({ fullname, email, password }, { onSettled: () => reset() });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullname?.message}>
				<Input type="text" id="fullname" disabled={isSignupLoading} {...register('fullname', { required: 'This field is required' })} />
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isSignupLoading}
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Please provide a valid email address',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
				<Input
					type="password"
					id="password"
					disabled={isSignupLoading}
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 8,
							message: 'Password needs a minimum of 8 characters',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSignupLoading}
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (value) => value === getValues().password || 'Passwords need to match',
					})}
				/>
			</FormRow>

			<FormRow>
				<ButtonGroup>
					<Button variation="secondary" type="reset" disabled={isSignupLoading} onClick={reset}>
						Clear
					</Button>
					<Button disabled={isSignupLoading}>Create new user</Button>
				</ButtonGroup>
			</FormRow>
		</Form>
	);
}
