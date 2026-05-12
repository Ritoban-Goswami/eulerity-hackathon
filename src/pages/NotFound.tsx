import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  transitions
} from '../theme';
import { Navigation } from '../components/Layout/Navigation';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
  text-align: center;
`;

const ContentCard = styled.div`
  background: ${colors.surfaceContainerLowest};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level1};
  max-width: 500px;
  width: 100%;
`;

const ErrorCode = styled.h1`
  font-size: ${typography.display.fontSize};
  font-weight: ${typography.display.fontWeight};
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
  }
`;

const Title = styled.h2`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: ${spacing.lg} 0 ${spacing.md} 0;
  
  @media (max-width: 768px) {
    font-size: ${typography.headline.medium.fontSize};
  }
`;

const Message = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0 0 ${spacing.xl} 0;
  line-height: 1.5;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.xl};
  background: ${colors.primary};
  color: ${colors.onPrimary};
  text-decoration: none;
  border-radius: ${borderRadius.lg};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  transition: ${transitions.default};
  
  &:hover {
    background: ${colors.primary}90;
    transform: translateY(-2px);
    box-shadow: ${elevation.level2};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const IconContainer = styled.div`
  margin-bottom: ${spacing.lg};
`;

const NotFound: React.FC = () => {
  return (
    <Navigation>
      <NotFoundContainer>
        <ContentCard>
          <IconContainer>
            <span className="material-symbols-outlined" style={{
              fontSize: typography.display.fontSize,
              color: colors.primary,
              opacity: 0.3
            }}>
              pets
            </span>
          </IconContainer>
          <ErrorCode>404</ErrorCode>
          <Title>Page Not Found</Title>
          <Message>
            Oops! The page you're looking for doesn't exist.
            It might have been moved, deleted, or you entered the wrong URL.
          </Message>
          <HomeButton to="/">
            <span className="material-symbols-outlined">home</span>
            Go Back Home
          </HomeButton>
        </ContentCard>
      </NotFoundContainer>
    </Navigation>
  );
};

export default NotFound;
