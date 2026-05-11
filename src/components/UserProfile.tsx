import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, zIndex } from '../theme';

interface UserProfileProps {
  userName?: string;
  userAvatar?: string;
  onSignOut?: () => void;
}

const Container = styled.div`
  position: relative;
`;

const AvatarButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  overflow: hidden;
  border: 1px solid ${colors.outlineVariant};
  cursor: pointer;
  padding: 0;
  background: none;
  transition: ${transitions.default};
  
  &:hover {
    border-color: ${colors.outline};
  }
  
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${colors.surfaceContainerLowest};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level3};
  min-width: 200px;
  z-index: ${zIndex.modal};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: ${transitions.default};
  border: 1px solid ${colors.outlineVariant}20;
`;

const UserInfo = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.outlineVariant}20;
`;

const UserName = styled.span`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
`;

const UserEmail = styled.p`
  margin: 4px 0 0 0;
  font-size: ${typography.body.small.fontSize};
  font-family: ${typography.body.small.fontFamily};
  color: ${colors.onSurfaceVariant};
`;

const MenuItem = styled.button`
  width: 100%;
  padding: ${spacing.sm} ${spacing.lg};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: ${typography.body.medium.fontSize};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  transition: ${transitions.default};
  
  &:hover {
    background: ${colors.surfaceContainerHover};
  }
  
  &:focus-visible {
    outline: none;
    background: ${colors.surfaceContainerHover};
  }
  
  &:first-child {
    border-radius: ${borderRadius.lg} ${borderRadius.lg} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${borderRadius.lg} ${borderRadius.lg};
  }
`;

const MenuIcon = styled.span`
  color: ${colors.onSurfaceVariant};
  font-size: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${colors.outlineVariant}20;
  margin: 4px 0;
`;

export const UserProfile: React.FC<UserProfileProps> = ({
  userName = 'John Doe',
  userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSKVA8YpSyO0wUcJ-dixAVSpz1jTRLTSc_L4Hh0BiBuCQPzRingrByj_QVhGAVsaAUz4okpOMqkkfqn7My6NSD3qg2PqNhrDkFy6TyqPr_tPTOYPMZPPYDpZb-UJGJ-s68uaJ82bOXG0_c99e3QPpfNt7rkITVf3n_Ls-gCEETOnYAm7ueaOJ794Dg2szeZEuwhksGH6dz88DDjpd-R6yHqcezE24iC50wBWHIioCD0vHQ8GbyPuVMbIoBzE--TVa0DPSAa4L7cM',
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut?.();
  };

  return (
    <Container ref={containerRef}>
      <AvatarButton
        onClick={handleToggle}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src={userAvatar} alt={userName} />
      </AvatarButton>

      <Dropdown isOpen={isOpen}>
        <UserInfo>
          <UserName>{userName}</UserName>
          <UserEmail>user@example.com</UserEmail>
        </UserInfo>

        <MenuItem onClick={() => { setIsOpen(false); }}>
          <MenuIcon>
            <span className="material-symbols-outlined">person</span>
          </MenuIcon>
          Profile
        </MenuItem>

        <MenuItem onClick={() => { setIsOpen(false); }}>
          <MenuIcon>
            <span className="material-symbols-outlined">settings</span>
          </MenuIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={() => { setIsOpen(false); }}>
          <MenuIcon>
            <span className="material-symbols-outlined">help</span>
          </MenuIcon>
          Help & Support
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut}>
          <MenuIcon>
            <span className="material-symbols-outlined">logout</span>
          </MenuIcon>
          Sign Out
        </MenuItem>
      </Dropdown>
    </Container>
  );
};
