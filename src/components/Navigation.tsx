import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (min-width: 768px) {
    padding: 16px 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 16px 40px;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #3498db;
  text-decoration: none;
  
  &:hover {
    color: #2980b9;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavLink = styled(Link) <{ active?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#3498db' : '#666'};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3498db;
  }
`;

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <NavContent>
        <Logo to="/">PetGallery</Logo>
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/'}>
            Gallery
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about'}>
            About
          </NavLink>
        </NavLinks>
      </NavContent>
    </Container>
  );
};
