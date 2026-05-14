import React from 'react';
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
  padding: ${spacing.sm};
  
  @media (min-width: 480px) {
    padding: ${spacing.md};
  }
  
  @media (min-width: 768px) {
    padding: ${spacing.xl} ${spacing.gutter};
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.xl};
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${spacing.md};
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing.xl};
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.sm} 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: ${typography.display.fontSize};
    font-weight: ${typography.display.fontWeight};
    margin: 0 0 ${spacing.md} 0;
  }
`;

const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  max-width: 100%;
  margin: 0 auto;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
    max-width: 600px;
    line-height: 1.6;
  }
`;

const Section = styled.section`
  margin-bottom: ${spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background: ${colors.primary};
    border-radius: ${borderRadius.sm};
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
    margin: 0 0 ${spacing.lg} 0;
  
    &::before {
      height: 32px;
    }
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.5;
  margin: 0 0 ${spacing.sm} 0;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
    line-height: 1.7;
    margin: 0 0 ${spacing.md} 0;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.lg};
    margin-top: ${spacing.lg};
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const FeatureIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${colors.primaryContainer};
  border-radius: ${borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  .material-symbols-outlined {
    font-size: 18px;
    color: ${colors.onPrimaryContainer};
  }
  
  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    
    .material-symbols-outlined {
      font-size: 24px;
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.md};
    margin-top: ${spacing.lg};
  }
`;

const TechItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  background: ${colors.surfaceContainerLow};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.outlineVariant}20;
  
  @media (min-width: 768px) {
    padding: ${spacing.md};
  }
`;

const TechIcon = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const TechText = styled.span`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
`;

const About: React.FC = () => {
  return (
    <Navigation>
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
            It showcases a responsive pet image gallery with advanced features including real-time search,
            AI-powered color analysis, visual collections, sorting, bulk selection with persistent state,
            and download capabilities. The application demonstrates a sophisticated companion brand identity
            with a premium, minimalist aesthetic.
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
              <FeatureTitle>Inline Search</FeatureTitle>
              <Paragraph>
                Real-time search with debounced input, recent searches with localStorage persistence,
                and filtering by both title and description directly on the home page.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">palette</span>
              </FeatureIcon>
              <FeatureTitle>Visual Collections</FeatureTitle>
              <Paragraph>
                Discover pets grouped by color categories using AI-powered image analysis,
                with dedicated collection pages for each color tone.
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
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">share</span>
              </FeatureIcon>
              <FeatureTitle>Share Functionality</FeatureTitle>
              <Paragraph>
                Share search results with others using native Web Share API,
                making it easy to spread the joy of discovering new pets.
              </Paragraph>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <span className="material-symbols-outlined">auto_awesome</span>
              </FeatureIcon>
              <FeatureTitle>Infinite Scroll</FeatureTitle>
              <Paragraph>
                Load more pets automatically as you scroll with Intersection Observer,
                providing a seamless browsing experience without pagination.
              </Paragraph>
            </FeatureItem>
          </FeatureGrid>
        </Section>

        <Section>
          <SectionTitle>Technology Stack</SectionTitle>
          <TechGrid>
            <TechItem>
              <TechIcon className="material-symbols-outlined">code</TechIcon>
              <TechText>React 19 with TypeScript for type safety and better developer experience</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">palette</TechIcon>
              <TechText>Styled-components with a comprehensive design system for consistent styling</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">route</TechIcon>
              <TechText>React Router with dynamic routing and URL-based navigation</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">integration_instructions</TechIcon>
              <TechText>Custom hooks (usePetData, useSelection, useFavorites, useDownload) for data and state management</TechText>
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
              <TechIcon className="material-symbols-outlined">color_lens</TechIcon>
              <TechText>quantize-colors library for AI-powered image color analysis and palette extraction</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">folder_zip</TechIcon>
              <TechText>JSZip library for creating ZIP files when downloading multiple images</TechText>
            </TechItem>
            <TechItem>
              <TechIcon className="material-symbols-outlined">history</TechIcon>
              <TechText>LocalStorage for recent searches, favorites, and color signature caching</TechText>
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
