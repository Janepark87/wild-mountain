import styled from 'styled-components';

const StyledDashboardContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardContent() {
	return <StyledDashboardContent>Content</StyledDashboardContent>;
}