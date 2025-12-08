import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #0a0e27;
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <Navigation />
      <Outlet />
    </LayoutContainer>
  );
}
