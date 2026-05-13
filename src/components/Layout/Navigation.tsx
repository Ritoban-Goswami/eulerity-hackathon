import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  transitions,
  zIndex,
  breakpoints,
  glass,
  gradients,
  patterns,
  elevation
} from '../../theme';

interface NavigationProps {
  children: React.ReactNode;
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  searchValue?: string;
}

// Header Styles
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 256px;
  right: 0;
  z-index: ${zIndex.sticky};
  background: ${glass.panel};
  backdrop-filter: blur(${glass.blur});
  -webkit-backdrop-filter: blur(${glass.blur});
  border-bottom: 1px solid ${colors.surfaceContainerHigh};
  height: 64px;

  @media (max-width: ${breakpoints.tablet}) {
    left: 0;
    height: 60px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  height: 100%;
  gap: 8px;
  
  @media (min-width: ${breakpoints.mobile}) {
    padding: 0 ${spacing.gutter};
    max-width: ${spacing.containerMax};
    margin: 0 auto;
    gap: ${spacing.md};
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    justify-content: flex-end;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${gradients.primary};
  border-radius: ${borderRadius.md};
  box-shadow: ${elevation.level1};
  
  @media (min-width: ${breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    border-radius: ${borderRadius.lg};
  }
`;

const LogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  font-size: 16px;
  font-weight: 700;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
  line-height: 1;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
`;

const LogoSubtitle = styled.span`
  font-size: 10px;
  font-weight: 500;
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: 1;
  margin-top: 2px;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.label.small.fontSize};
    font-weight: ${typography.label.small.fontWeight};
  }
`;

const MobileNavLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  font-size: 11px;
  font-weight: 500;
  font-family: ${typography.label.small.fontFamily};
  color: ${props => props.active ? colors.onPrimaryContainer : colors.onSurfaceVariant};
  line-height: 1;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 256px;
  flex: 0 0 auto;
  
  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
    flex: 1;
    max-width: 150px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${transitions.default};
  font-size: 20px;
  
  &:hover {
    color: ${colors.primary};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    left: 10px;
    font-size: 18px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  background: ${colors.surfaceContainer};
  border: none;
  border-radius: ${borderRadius.full};
  font-size: ${typography.body.medium.fontSize};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  transition: ${transitions.default};
  
  &::placeholder {
    color: ${colors.onSurfaceVariant};
  }
  
  &:focus {
    outline: none;
    ring: 2px solid ${colors.primary};
  }
  
  &:hover {
    background: ${colors.surfaceContainerHigh};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 10px 6px 32px;
    font-size: 13px;
  }
`;




const NavigationContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${colors.surface};
`;

// Sidebar Styles
const Sidebar = styled.aside`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 256px;
  flex-direction: column;
  padding: ${spacing.md};
  gap: ${spacing.base};
  background: ${colors.surfaceContainerLow};
  z-index: ${zIndex.sticky};
  
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};
`;

const SidebarLabel = styled.span`
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.primary};
  padding: 0 ${spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SidebarLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  border-radius: ${borderRadius.lg};
  font-weight: ${props => props.active ? '700' : '600'};
  color: ${props => props.active ? colors.onPrimary : colors.onSurfaceVariant};
  background: ${props => props.active ? gradients.primary : 'none'};
  transition: ${transitions.default};
  text-decoration: none;

  &:hover {
    background: ${props => props.active ? gradients.primary : `${colors.surfaceVariant}50`};
    transform: translateX(4px);
  }
`;

const UploadButton = styled.button`
  background: ${gradients.secondary};
  color: ${colors.onSecondary};
  width: 100%;
  padding: 16px;
  border-radius: ${borderRadius.xl};
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  box-shadow: ${elevation.level1};
  border: none;
  cursor: pointer;
  transition: ${transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${elevation.level2};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: ${colors.outlineVariant}30;
  margin: ${spacing.md} 0;
`;

// Main Content
const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: ${spacing.marginMobile};
  padding-top: calc(60px + ${spacing.marginMobile});
  padding-bottom: ${spacing.xl};
  background: ${colors.surface};
  background-image: ${patterns.dotGrid};
  background-size: 24px 24px;
  margin-left: 0;

  @media (min-width: ${breakpoints.mobile}) {
    padding: 0 ${spacing.gutter};
    padding-top: calc(64px + ${spacing.gutter});
    padding-bottom: ${spacing.xl};
    max-width: ${spacing.containerMax};
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 ${spacing.xl};
    padding-top: calc(80px + ${spacing.xl});
    padding-bottom: ${spacing.xl};
    margin-left: 256px;
    max-width: none;
  }
`;

// Mobile Bottom Navigation
const MobileNav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.sticky};
  background: ${glass.panel};
  backdrop-filter: blur(${glass.blur});
  -webkit-backdrop-filter: blur(${glass.blur});
  border-top: 1px solid ${colors.outlineVariant}20;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  box-shadow: ${elevation.level1};

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavItem = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
}) <{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: ${borderRadius.lg};
  gap: 4px;
  width: 72px;
  background: ${props => props.active ? colors.primaryContainer : 'none'};
  color: ${props => props.active ? colors.onPrimaryContainer : colors.onSurfaceVariant};
  text-decoration: none;
  transition: ${transitions.default};

  &:active {
    transform: scale(0.95);
  }
`;

export const Navigation: React.FC<NavigationProps> = ({ children, showSearch = false, onSearchChange, onSearchSubmit, searchValue = '' }) => {
  const location = useLocation();

  const handleSearchChange = (query: string) => {
    onSearchChange?.(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.(searchValue);
  };

  return (
    <NavigationContainer>
      <Header>
        <HeaderContent>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <HeaderLogo>
              <LogoIcon>
                <span className="material-symbols-outlined" style={{ color: colors.onPrimaryContainer, fontSize: '18px' }}>
                  pets
                </span>
              </LogoIcon>
              <LogoTextContainer>
                <LogoText>PawShots</LogoText>
              </LogoTextContainer>
            </HeaderLogo>
          </Link>
          {showSearch && (
            <SearchContainer as="form" onSubmit={handleSearchSubmit}>
              <SearchIcon className="material-symbols-outlined">search</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </SearchContainer>
          )}
        </HeaderContent>
      </Header>

      <Sidebar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <LogoIcon>
              <span className="material-symbols-outlined" style={{ color: colors.onPrimaryContainer, fontSize: typography.headline.medium.fontSize }}>
                pets
              </span>
            </LogoIcon>
            <LogoTextContainer>
              <LogoText>PawShots</LogoText>
              <LogoSubtitle>Premium Collection</LogoSubtitle>
            </LogoTextContainer>
          </Logo>
        </Link>
        <SidebarSection style={{ marginTop: spacing.lg }}>
          <SidebarLabel>Library</SidebarLabel>
          <SidebarLink to="/" active={location.pathname === '/'}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/' ? "'FILL' 1" : 'FILL 0' }}>
              photo_library
            </span>
            All Photos
          </SidebarLink>
          <SidebarLink to="/favorites" active={location.pathname === '/favorites'}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/favorites' ? "'FILL' 1" : 'FILL 0' }}>
              favorite
            </span>
            Favorites
          </SidebarLink>
        </SidebarSection>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
          <SidebarLink to="/about" active={location.pathname === '/about'}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/about' ? "'FILL' 1" : 'FILL 0' }}>
              info
            </span>
            About
          </SidebarLink>
        </div>
      </Sidebar>

      <Main>
        {children}
      </Main>

      <MobileNav>
        <MobileNavItem to="/" active={location.pathname === '/'}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/' ? "'FILL' 1" : 'FILL 0', fontSize: '24px' }}>
            photo_library
          </span>
          <MobileNavLabel active={location.pathname === '/'}>Gallery</MobileNavLabel>
        </MobileNavItem>
        <MobileNavItem to="/favorites" active={location.pathname === '/favorites'}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/favorites' ? "'FILL' 1" : 'FILL 0', fontSize: '24px' }}>
            favorite
          </span>
          <MobileNavLabel active={location.pathname === '/favorites'}>Favorites</MobileNavLabel>
        </MobileNavItem>
        <MobileNavItem to="/about" active={location.pathname === '/about'}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/about' ? "'FILL' 1" : 'FILL 0', fontSize: '24px' }}>
            info
          </span>
          <MobileNavLabel active={location.pathname === '/about'}>About</MobileNavLabel>
        </MobileNavItem>
      </MobileNav>
    </NavigationContainer>
  );
};
