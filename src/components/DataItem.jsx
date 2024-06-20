import styled from 'styled-components';

const StyledDataItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
`;

const Label = styled.span`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 500;

	& svg {
		width: 2.25rem;
		height: 2.25rem;
		color: var(--color-brand-600);
	}
`;

const Text = styled.p`
	text-align: right;
`;

export default function DataItem({ icon, label, children }) {
	return (
		<StyledDataItem>
			<Label>
				{icon}
				<span>{label}</span>
			</Label>
			<Text>{children}</Text>
		</StyledDataItem>
	);
}
