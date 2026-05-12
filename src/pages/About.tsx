import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  breakpoints
} from '../theme';
import { Navigation } from '../components/Layout/Navigation';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.md};
  
  @media (min-width: ${breakpoints.mobile}) {
    padding: ${spacing.xl} ${spacing.gutter};
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.xl};
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h1`
  font-size: ${typography.display.fontSize};
  font-weight: ${typography.display.fontWeight};
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.md} 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: ${spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 32px;
    background: ${colors.primary};
    border-radius: ${borderRadius.sm};
  }
`;

const Paragraph = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.7;
  margin: 0 0 ${spacing.md} 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-top: ${spacing.lg};
  
  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${colors.primaryContainer};
  border-radius: ${borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  .material-symbols-outlined {
    font-size: 24px;
    color: ${colors.onPrimaryContainer};
  }
`;

const FeatureTitle = styled.h3`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
  
  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TechItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${colors.surfaceContainerLow};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.outlineVariant}20;
`;

const TechIcon = styled.span`
  color: ${colors.primary};
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const TechText = styled.span`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.5;
`;

const About: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Navigation searchValue={searchQuery} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit}>
      <AboutContainer>
        <HeroSection>
          <Title>About PawShots</Title>
          <Subtitle>
            A modern web application showcasing a premium image gallery experience with advanced search, selection, and download capabilities.
          </Subtitle>
        </HeroSection>

        <Section>
          <SectionTitle>The Project</SectionTitle>
          <Paragraph>
            PawShots is a modern web application built as a take-home challenge for Eulerity.
            It showcases a responsive image gallery with advanced features including a dedicated search page,
            sorting, bulk selection with persistent state, and download capabilities. The application demonstrates a sophisticated
            companion brand identity with a premium, minimalist aesthetic.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <FeatureGrid>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">grid_view</span>
              </FeatureIcon>
              <FeatureTitle>Responsive Design</FeatureTitle>
              <Paragraph>
                Adaptive grid layout that adjusts from 1 to 4 columns based on screen size,
                ensuring optimal viewing experience across all devices.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">search</span>
              </FeatureIcon>
              <FeatureTitle>Dedicated Search Page</FeatureTitle>
              <Paragraph>
                Separate search page with URL-based navigation, recent searches with localStorage persistence,
                and filtering by both title and description.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">select_all</span>
              </FeatureIcon>
              <FeatureTitle>Bulk Selection</FeatureTitle>
              <Paragraph>
                Select multiple pets with persistent state across navigation using Context API,
                supporting select all, clear selection, and bulk operations.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">download</span>
              </FeatureIcon>
              <FeatureTitle>Download Manager</FeatureTitle>
              <Paragraph>
                Download individual images directly or selected batches as a single ZIP file,
                with automatic file naming and progress tracking.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">favorite</span>
              </FeatureIcon>
              <FeatureTitle>Favorites System</FeatureTitle>
              <Paragraph>
                Mark pets as favorites with persistent storage, accessible via dedicated favorites page
                with Context API state management.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">sort</span>
              </FeatureIcon>
              <FeatureTitle>Advanced Sorting</FeatureTitle>
              <Paragraph>
                Sort pets by name (A-Z, Z-A) or date (newest, oldest) with instant visual feedback
                and custom dropdown component.
              </Paragraph>
            </FeatureItem>
          </FeatureGrid>
        </Section>

        <Section>
          <SectionTitle>Technology Stack</SectionTitle>
          <TechGrid>
            <TechItem>
              <TechIcon className="material-symbols-outlined">code</TechIcon>
              <TechText>React 18 with TypeScript for type safety and better developer experience</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">palette</TechIcon>
              <TechText>Styled-components with a comprehensive design system for consistent styling</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">route</TechIcon>
              <TechText>React Router with dynamic routing, URL-based search, and dedicated search page</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">integration_instructions</TechIcon>
              <TechText>Custom hooks (usePetData, useSelection, useFavorites) for data and state management</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">storage</TechIcon>
              <TechText>Context API for global state management (SelectionContext, FavoritesContext)</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">bolt</TechIcon>
              <TechText>Vite for lightning-fast development and optimized builds</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">folder_zip</TechIcon>
              <TechText>JSZip library for creating ZIP files when downloading multiple images</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">history</TechIcon>
              <TechText>LocalStorage for recent searches and selection persistence across sessions</TechText>
            </TechItem>
          </TechGrid>
        </Section>

        <Section>
          <SectionTitle>Design Philosophy</SectionTitle>
          <Paragraph>
            This project embraces a sophisticated companion brand identity with clean lines,
            minimal aesthetic, and premium feel. Every interaction is carefully crafted to
            provide a delightful user experience, from smooth transitions to thoughtful
            micro-interactions. The design prioritizes accessibility, performance, and
            visual hierarchy while maintaining a professional, gallery-like atmosphere.
          </Paragraph>
          <Paragraph>
            The color palette and typography choices reflect a modern, trustworthy brand
            that appeals to discerning pet owners who value quality and attention to detail.
            The interface balances functionality with elegance, ensuring that powerful features
            remain accessible without overwhelming the user. The application demonstrates
            component reusability with shared components like SearchResults, GalleryGrid, and SelectionControls.
          </Paragraph>
        </Section>
      </AboutContainer>
    </Navigation>
  );
};

export default About;
