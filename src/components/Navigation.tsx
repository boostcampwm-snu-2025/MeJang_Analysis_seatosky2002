import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #141b3a;
  padding: 1rem 2rem;
  border-bottom: 1px solid #1e2749;
`;

const NavList = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
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

export default function Navigation() {
  return (
    <Nav>
      <NavList>
        <StyledNavLink to="/">내 잔고</StyledNavLink>
        <StyledNavLink to="/nasdaq">NASDAQ TOP 100</StyledNavLink>
      </NavList>
    </Nav>
  );
}
