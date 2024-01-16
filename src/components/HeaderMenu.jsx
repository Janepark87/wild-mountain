import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineUser } from 'react-icons/hi2';
import { Media } from '../styles/Breakpoints';
import Button from './Button';
import Logout from '../features/Authentication/Logout';

const StyledHeaderMenu = styled.ul`
	display: flex;
	align-items: center;

	> li > button {
		padding: 1rem 1.25rem;
		line-height: 0;

		${Media.sm`
            > span{
                display: none;
            }
        `}
	}
`;

export default function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<Button size="lg" variation="ghost" onClick={() => navigate('/account')}>
					<HiOutlineUser />
				</Button>
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
}
