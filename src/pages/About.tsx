import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 24px;
  
  @media (min-width: 768px) {
    padding: 60px 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 80px 40px;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0 0 24px 0;
  font-size: 36px;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  color: #3498db;
`;

const Paragraph = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TechList = styled.ul`
  margin: 16px 0 0 0;
  padding-left: 24px;
`;

const TechItem = styled.li`
  margin-bottom: 8px;
  color: #666;
`;

const About: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>About PetGallery</Title>

        <Section>
          <Subtitle>The Project</Subtitle>
          <Paragraph>
            PetGallery is a modern web application built as a take-home challenge for Eulerity.
            It showcases a responsive image gallery with advanced features including search,
            sorting, selection, and download capabilities.
          </Paragraph>
        </Section>

        <Section>
          <Subtitle>Features</Subtitle>
          <Paragraph>
            This application demonstrates proficiency in modern web development through:
          </Paragraph>
          <TechList>
            <TechItem>Responsive grid layout (1/2/4 columns based on screen size)</TechItem>
            <TechItem>Real-time search filtering by title and description</TechItem>
            <TechItem>Multiple sorting options (name and date)</TechItem>
            <TechItem>Bulk selection with persistent state across navigation</TechItem>
            <TechItem>Download functionality for selected images</TechItem>
            <TechItem>Pagination for efficient data handling</TechItem>
            <TechItem>Dynamic routing for individual pet details</TechItem>
          </TechList>
        </Section>

        <Section>
          <Subtitle>Technology Stack</Subtitle>
          <Paragraph>
            Built with cutting-edge technologies to ensure performance and maintainability:
          </Paragraph>
          <TechList>
            <TechItem>React 18 with TypeScript for type safety</TechItem>
            <TechItem>Styled-components for CSS-in-JS styling</TechItem>
            <TechItem>React Router for client-side routing</TechItem>
            <TechItem>Custom hooks for data management</TechItem>
            <TechItem>Context API for global state management</TechItem>
            <TechItem>Vite for fast development and building</TechItem>
          </TechList>
        </Section>

        <Section>
          <Subtitle>Developer</Subtitle>
          <Paragraph>
            This project was developed to demonstrate skills in building modern,
            user-friendly web applications with attention to detail in both design
            and functionality. Every feature is implemented with best practices in mind,
            from accessibility to performance optimization.
          </Paragraph>
        </Section>
      </Content>
    </Container>
  );
};

export default About;
