import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, elevation, gradients, transitions, patterns } from '../theme';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.lg};
  background: ${colors.background};
  background-image: ${patterns.dotGrid};
  background-size: 20px 20px;
  text-align: center;
  
  @media (max-width: 479px) {
    padding: ${spacing.md};
  }
`;

const ErrorIcon = styled.div`
  color: ${colors.error};
  margin-bottom: ${spacing.sm};
  
  @media (max-width: 479px) {
    margin-bottom: ${spacing.xs};
    
    & span {
      font-size: 28px !important;
    }
  }
`;

const ErrorContent = styled.div`
  background: ${colors.surface}90;
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  max-width: 500px;
  width: 100%;
  box-shadow: ${elevation.level2};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  @media (max-width: 479px) {
    padding: ${spacing.md};
    max-width: 100%;
  }
`;

const ErrorTitle = styled.h1`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.sm} 0;
  line-height: ${typography.headline.large.lineHeight};
  
  @media (max-width: 479px) {
    font-size: 24px;
    margin-bottom: ${spacing.xs};
  }
`;

const ErrorMessage = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0 0 ${spacing.lg} 0;
  max-width: 500px;
  line-height: ${typography.body.medium.lineHeight};
  
  @media (max-width: 479px) {
    font-size: 14px;
    margin-bottom: ${spacing.md};
    max-width: 100%;
  }
`;

const ErrorDetails = styled.details`
  margin-top: ${spacing.md};
  text-align: left;
  max-width: 500px;
  width: 100%;
  
  @media (max-width: 479px) {
    margin-top: ${spacing.sm};
    max-width: 100%;
  }
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.surfaceContainerHigh};
  border-radius: ${borderRadius.md};
  color: ${colors.onSurface};
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  user-select: none;
  transition: ${transitions.default};

  @media (max-width: 479px) {
    padding: ${spacing.xs} ${spacing.sm};
    font-size: 13px;
  }

  &:hover {
    background: ${colors.surfaceContainerHover};
  }
`;

const ErrorStack = styled.pre`
  margin-top: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.surfaceContainerLow};
  border-radius: ${borderRadius.md};
  overflow-x: auto;
  font-family: monospace;
  font-size: ${typography.body.small.fontSize};
  color: ${colors.onSurface};
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.4;
  
  @media (max-width: 479px) {
    padding: ${spacing.sm};
    font-size: 11px;
    margin-top: ${spacing.sm};
  }
`;

const RetryButton = styled.button`
  padding: ${spacing.base} ${spacing.md};
  background: ${gradients.primary};
  color: ${colors.onPrimary};
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: ${transitions.default};

  @media (max-width: 479px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${elevation.level2};
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorIcon>
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>error</span>
            </ErrorIcon>
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorMessage>
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </ErrorMessage>
            <RetryButton onClick={this.handleRetry}>
              Refresh Page
            </RetryButton>
            {this.state.error && (
              <ErrorDetails>
                <ErrorSummary>Error Details</ErrorSummary>
                <ErrorStack>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </ErrorStack>
              </ErrorDetails>
            )}
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
