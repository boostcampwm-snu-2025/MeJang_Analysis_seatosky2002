import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Nav = styled.nav`
  background-color: #141b3a;
  padding: 1rem 2rem;
  border-bottom: 1px solid #1e2749;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const NavList = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: #8b92b0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
    background-color: #1e2749;
  }

  &.active {
    color: #ffffff;
    background-color: #1e2749;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Username = styled.span`
  color: #8b92b0;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <Nav>
      <NavContainer>
        <NavList>
          <StyledNavLink to="/">내 잔고</StyledNavLink>
          <StyledNavLink to="/nasdaq">NASDAQ TOP 100</StyledNavLink>
        </NavList>
        {isAuthenticated && (
          <UserSection>
            <Username>Welcome, {user?.username}!</Username>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </UserSection>
        )}
      </NavContainer>
    </Nav>
  );
}
