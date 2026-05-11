import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${props => props.height === '100%' ? '8px' : '4px'};
`;

const CardSkeleton = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageSkeleton = styled(SkeletonBase)`
  height: 200px;
  border-radius: 0;
`;

const ContentSkeleton = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListSkeleton = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ListImageSkeleton = styled(SkeletonBase)`
  width: 200px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 0;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ListContentSkeleton = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  gap: 12px;
  
  @media (max-width: 768px) {
    min-height: 120px;
  }
`;

const ListHeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'list';
  width?: string;
  height?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <CardSkeleton key={index}>
            <ImageSkeleton />
            <ContentSkeleton>
              <SkeletonBase width="80%" height="20px" />
              <SkeletonBase width="100%" height="16px" />
              <SkeletonBase width="100%" height="16px" />
              <SkeletonBase width="40%" height="14px" />
            </ContentSkeleton>
          </CardSkeleton>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <ListSkeleton key={index}>
            <ListImageSkeleton />
            <ListContentSkeleton>
              <ListHeaderSkeleton>
                <SkeletonBase width="60%" height="20px" />
                <SkeletonBase width="24px" height="24px" />
              </ListHeaderSkeleton>
              <SkeletonBase width="100%" height="16px" />
              <SkeletonBase width="100%" height="16px" />
              <div style={{ display: 'flex', gap: '20px', marginTop: 'auto' }}>
                <SkeletonBase width="80px" height="14px" />
                <SkeletonBase width="80px" height="14px" />
                <SkeletonBase width="60px" height="14px" />
              </div>
            </ListContentSkeleton>
          </ListSkeleton>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBase key={index} width={width} height={height} />
      ))}
    </>
  );
};
