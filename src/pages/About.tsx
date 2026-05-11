import React from 'react';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  breakpoints
} from '../theme';
import { Navigation } from '../components/Layout/Navigation';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.xl};
  
  @media (min-width: ${breakpoints.mobile}) {
    padding: ${spacing.xl} ${spacing.gutter};
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.xl};
  }
`;

const ContentCard = styled.div`
  background: ${colors.surfaceContainerLowest};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level1};
`;

const Title = styled.h1`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.lg} 0;
`;

const Section = styled.section`
  margin-bottom: ${spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.h2`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.md} 0;
`;

const Paragraph = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.6;
  margin: 0 0 ${spacing.md} 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TechList = styled.ul`
  margin: ${spacing.md} 0 0 0;
  padding-left: ${spacing.xl};
`;

const TechItem = styled.li`
  margin-bottom: ${spacing.sm};
  color: ${colors.onSurface};
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  
  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.outlineVariant}20;
`;

const FeatureTitle = styled.h3`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const About: React.FC = () => {
  return (
    <Navigation>
      <AboutContainer>
        <ContentCard>
          <Title>About Pet Gallery</Title>

          <Section>
            <Subtitle>The Project</Subtitle>
            <Paragraph>
              Pet Gallery is a modern web application built as a take-home challenge for Eulerity.
              It showcases a responsive image gallery with advanced features including search,
              sorting, selection, and download capabilities. The application demonstrates a sophisticated
              companion brand identity with a premium, minimalist aesthetic.
            </Paragraph>
          </Section>

          <Section>
            <Subtitle>Key Features</Subtitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureTitle>
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>
                    grid_view
                  </span>
                  Responsive Design
                </FeatureTitle>
                <Paragraph>
                  Adaptive grid layout that adjusts from 1 to 4 columns based on screen size,
                  ensuring optimal viewing experience across all devices.
                </Paragraph>
              </FeatureCard>
              <FeatureCard>
                <FeatureTitle>
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>
                    search
                  </span>
                  Smart Search
                </FeatureTitle>
                <Paragraph>
                  Real-time search filtering with instant results as you type,
                  supporting both title and description searches.
                </Paragraph>
              </FeatureCard>
              <FeatureCard>
                <FeatureTitle>
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>
                    select_all
                  </span>
                  Bulk Selection
                </FeatureTitle>
                <Paragraph>
                  Select multiple pets with persistent state across navigation,
                  supporting bulk operations like download and delete.
                </Paragraph>
              </FeatureCard>
              <FeatureCard>
                <FeatureTitle>
                  <span className="material-symbols-outlined" style={{ color: colors.primary }}>
                    download
                  </span>
                  Download Manager
                </FeatureTitle>
                <Paragraph>
                  Download individual images or selected batches with automatic
                  file naming and progress tracking.
                </Paragraph>
              </FeatureCard>
            </FeatureGrid>
          </Section>

          <Section>
            <Subtitle>Technology Stack</Subtitle>
            <Paragraph>
              Built with cutting-edge technologies to ensure performance and maintainability:
            </Paragraph>
            <TechList>
              <TechItem>React 18 with TypeScript for type safety and better developer experience</TechItem>
              <TechItem>Styled-components with a comprehensive design system for consistent styling</TechItem>
              <TechItem>React Router for client-side routing with dynamic pet detail pages</TechItem>
              <TechItem>Custom hooks for data management and state logic separation</TechItem>
              <TechItem>Context API for global state management across the application</TechItem>
              <TechItem>Vite for lightning-fast development and optimized builds</TechItem>
              <TechItem>Material Design Icons for a modern, accessible icon system</TechItem>
            </TechList>
          </Section>

          <Section>
            <Subtitle>Design Philosophy</Subtitle>
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
              remain accessible without overwhelming the user.
            </Paragraph>
          </Section>
        </ContentCard>
      </AboutContainer>
    </Navigation>
  );
};

export default About;
