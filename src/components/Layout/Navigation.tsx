import React, { useState } from 'react';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  transitions,
  zIndex,
  breakpoints
} from '../../theme';
import { FilterModal, type FilterState } from '../FilterModal';
import { UserProfile } from '../UserProfile';

interface NavigationProps {
  children: React.ReactNode;
  onFilterChange?: (filters: FilterState) => void;
}

// Header Styles
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 256px;
  right: 0;
  z-index: ${zIndex.sticky};
  background: ${colors.surface}90;
  backdrop-filter: blur(12px);
  box-shadow: ${elevation.level1};
  height: 64px;
  
  @media (max-width: ${breakpoints.tablet}) {
    left: 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${spacing.marginMobile};
  height: 100%;
  
  @media (min-width: ${breakpoints.mobile}) {
    padding: 0 ${spacing.gutter};
    max-width: ${spacing.containerMax};
    margin: 0 auto;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${colors.primaryContainer};
  border-radius: ${borderRadius.md};
`;

const LogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
  line-height: 1;
`;

const LogoSubtitle = styled.span`
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: 1;
  margin-top: 2px;
`;

const NavItems = styled.nav`
  display: none;
  align-items: center;
  gap: ${spacing.md};
  
  @media (min-width: ${breakpoints.mobile}) {
    display: flex;
  }
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? colors.primary : colors.onSurfaceVariant};
  font-weight: ${props => props.active ? '700' : '400'};
  padding: 4px 0;
  border-bottom: 2px solid ${props => props.active ? colors.primary : 'transparent'};
  transition: ${transitions.default};
  
  &:hover {
    color: ${colors.primary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (min-width: ${breakpoints.mobile}) {
    width: 256px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.outline};
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  background: ${colors.surfaceContainer};
  border: none;
  border-radius: ${borderRadius.full};
  font-size: ${typography.body.medium.fontSize};
  font-family: ${typography.body.medium.fontFamily};
  transition: ${transitions.default};
  
  &:focus {
    outline: none;
    ring: 2px solid ${colors.primary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.full};
  background: none;
  border: none;
  color: ${colors.onSurfaceVariant};
  cursor: pointer;
  transition: ${transitions.default};
  
  &:hover {
    background: ${colors.surfaceContainerHigh};
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

const SidebarLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  border-radius: ${borderRadius.lg};
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? colors.onPrimaryContainer : colors.onSurfaceVariant};
  background: ${props => props.active ? colors.primaryContainer : 'none'};
  transition: ${transitions.default};
  
  &:hover {
    background: ${props => props.active ? colors.primaryContainer : `${colors.surfaceVariant}50`};
    transform: translateX(4px);
  }
`;

const UploadButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%);
  color: ${colors.onPrimary};
  width: 100%;
  padding: 12px;
  border-radius: ${borderRadius.lg};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  box-shadow: ${elevation.level1};
  border: none;
  cursor: pointer;
  transition: ${transitions.default};
  
  &:hover {
    transform: scale(0.95);
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
  padding-top: calc(64px + ${spacing.marginMobile});
  padding-bottom: ${spacing.xl};
  background: ${colors.surface};
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
    padding-top: calc(64px + ${spacing.xl});
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
  background: ${colors.surface};
  border-radius: ${borderRadius.lg} ${borderRadius.lg} 0 0;
  box-shadow: ${elevation.level2};
  border-top: 1px solid ${colors.outlineVariant}20;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavItem = styled.a<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: ${borderRadius.full};
  gap: 2px;
  min-width: 60px;
  background: ${props => props.active ? colors.secondaryContainer : 'none'};
  color: ${props => props.active ? colors.onSecondaryContainer : colors.onSurfaceVariant};
  text-decoration: none;
`;

const MobileNavLabel = styled.span`
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
`;

export const Navigation: React.FC<NavigationProps> = ({ children, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    petType: [],
    dateRange: 'all',
    hasSelection: false,
  });

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <NavigationContainer>
      <Header>
        <HeaderContent>
          <NavItems>
            <NavLink href="#" active>Gallery</NavLink>
            <NavLink href="#">Collections</NavLink>
            <NavLink href="#">Trending</NavLink>
          </NavItems>

          <SearchContainer>
            <SearchIcon>
              <span className="material-symbols-outlined">search</span>
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <HeaderActions>
            <IconButton
              aria-label="Filter"
              onClick={handleFilterClick}
              style={{
                background: filters.petType.length > 0 || filters.dateRange !== 'all' || filters.hasSelection
                  ? `${colors.primaryContainer}20`
                  : 'none'
              }}
            >
              <span className="material-symbols-outlined">filter_list</span>
            </IconButton>
            <IconButton aria-label="Sort">
              <span className="material-symbols-outlined">sort</span>
            </IconButton>
            <UserProfile
              userName="Pet Lover"
              onSignOut={() => console.log('Sign out clicked')}
            />
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Sidebar>
        <Logo>
          <LogoIcon>
            <span className="material-symbols-outlined" style={{ color: colors.onPrimaryContainer, fontSize: '24px' }}>
              pets
            </span>
          </LogoIcon>
          <LogoTextContainer>
            <LogoText>Pet Gallery</LogoText>
            <LogoSubtitle>Premium Collection</LogoSubtitle>
          </LogoTextContainer>
        </Logo>
        <SidebarSection style={{ marginTop: spacing.lg }}>
          <SidebarLabel>Library</SidebarLabel>
          <SidebarLink href="#" active>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              photo_library
            </span>
            All Photos
          </SidebarLink>
          <SidebarLink href="#">
            <span className="material-symbols-outlined">favorite</span>
            Favorites
          </SidebarLink>
          <SidebarLink href="#">
            <span className="material-symbols-outlined">group</span>
            Shared
          </SidebarLink>
          <SidebarLink href="#">
            <span className="material-symbols-outlined">delete</span>
            Trash
          </SidebarLink>
        </SidebarSection>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: spacing.xs, marginBottom: spacing.lg }}>
          <UploadButton>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_circle
            </span>
            Upload Pet
          </UploadButton>

          <SidebarDivider />

          <SidebarLink href="#">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </SidebarLink>
          <SidebarLink href="#">
            <span className="material-symbols-outlined">help</span>
            Help
          </SidebarLink>
        </div>
      </Sidebar>

      <Main>
        {children}
      </Main>

      <MobileNav>
        <MobileNavItem href="#" active>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            home
          </span>
          <MobileNavLabel>Home</MobileNavLabel>
        </MobileNavItem>
        <MobileNavItem href="#">
          <span className="material-symbols-outlined">search</span>
          <MobileNavLabel>Search</MobileNavLabel>
        </MobileNavItem>
        <MobileNavItem href="#">
          <span className="material-symbols-outlined">add_circle</span>
          <MobileNavLabel>Upload</MobileNavLabel>
        </MobileNavItem>
        <MobileNavItem href="#">
          <span className="material-symbols-outlined">person</span>
          <MobileNavLabel>Profile</MobileNavLabel>
        </MobileNavItem>
      </MobileNav>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </NavigationContainer>
  );
};
