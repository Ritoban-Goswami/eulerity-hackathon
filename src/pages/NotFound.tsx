import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 500px;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: #3498db;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  color: #333;
  margin: 24px 0 16px 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Message>
          Oops! The page you're looking for doesn't exist.
          It might have been moved, deleted, or you entered the wrong URL.
        </Message>
        <HomeLink to="/">Go Back Home</HomeLink>
      </Content>
    </Container>
  );
};

export default NotFound;
