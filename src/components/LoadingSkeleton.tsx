import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, elevation, spacing, borderRadius, aspectRatios } from '../theme';

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
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${props => props.height === '100%' ? borderRadius.lg : '4px'};
`;

const CardSkeleton = styled.div`
  background: ${colors.surfaceContainerLowest};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${elevation.level1};
  border: 1px solid ${colors.outlineVariant};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageSkeleton = styled.div`
  aspect-ratio: ${aspectRatios.petCard};
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
`;

const ContentSkeleton = styled.div`
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CheckboxSkeleton = styled.div`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  width: 28px;
  height: 28px;
  border-radius: ${borderRadius.full};
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
`;

const FavoriteSkeleton = styled.div`
  position: absolute;
  top: ${spacing.sm};
  left: ${spacing.sm};
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
`;

const ListSkeleton = styled.div`
  display: flex;
  background: ${colors.surfaceContainerLowest};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${elevation.level1};
  border: 1px solid ${colors.outlineVariant};
`;

const ListImageSkeleton = styled.div`
  width: 200px;
  aspect-ratio: 4/3;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  
  @media (max-width: 768px) {
    width: 120px;
  }
`;

const ListContentSkeleton = styled.div`
  flex: 1;
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  gap: 8px;
  
  @media (max-width: 768px) {
    min-height: 120px;
  }
`;

const ListHeaderSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PetDetailSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  padding-top: ${spacing.lg};
  
  @media (min-width: 768px) {
    grid-template-columns: 8fr 4fr;
  }
`;

const PetDetailImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${borderRadius.lg};
`;

const PetDetailInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

const PetDetailTitleSkeleton = styled.div`
  height: 40px;
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 4px;
  width: 70%;
`;

const PetDetailTagSkeleton = styled.div`
  height: 28px;
  width: 80px;
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${borderRadius.full};
`;

const PetDetailMetadataSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
`;

const PetDetailStorySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const PetDetailActionSkeleton = styled.div`
  height: 44px;
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${borderRadius.lg};
  width: 100%;
`;

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'list' | 'petDetail';
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
            <ImageSkeleton>
              <FavoriteSkeleton />
              <CheckboxSkeleton />
            </ImageSkeleton>
            <ContentSkeleton>
              <SkeletonBase width="80%" height="24px" />
              <SkeletonBase width="100%" height="14px" />
              <SkeletonBase width="100%" height="14px" />
              <div style={{ display: 'flex', gap: spacing.xs, marginTop: 'auto' }}>
                <SkeletonBase width="80px" height="12px" />
                <SkeletonBase width="60px" height="12px" />
              </div>
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
              <SkeletonBase width="100%" height="14px" />
              <SkeletonBase width="100%" height="14px" />
              <div style={{ display: 'flex', gap: spacing.md, marginTop: 'auto' }}>
                <SkeletonBase width="80px" height="12px" />
                <SkeletonBase width="80px" height="12px" />
                <SkeletonBase width="60px" height="12px" />
              </div>
            </ListContentSkeleton>
          </ListSkeleton>
        ))}
      </>
    );
  }

  if (variant === 'petDetail') {
    return (
      <PetDetailSkeleton>
        <PetDetailImageSkeleton />
        <PetDetailInfoSkeleton>
          <PetDetailTitleSkeleton />
          <div style={{ display: 'flex', gap: spacing.sm }}>
            <PetDetailTagSkeleton />
            <PetDetailTagSkeleton />
          </div>
          <PetDetailMetadataSkeleton>
            <div>
              <SkeletonBase width="60%" height="12px" />
              <div style={{ marginTop: '4px' }}>
                <SkeletonBase width="80%" height="16px" />
              </div>
            </div>
            <div>
              <SkeletonBase width="60%" height="12px" />
              <div style={{ marginTop: '4px' }}>
                <SkeletonBase width="80%" height="16px" />
              </div>
            </div>
            <div>
              <SkeletonBase width="60%" height="12px" />
              <div style={{ marginTop: '4px' }}>
                <SkeletonBase width="80%" height="16px" />
              </div>
            </div>
            <div>
              <SkeletonBase width="60%" height="12px" />
              <div style={{ marginTop: '4px' }}>
                <SkeletonBase width="80%" height="16px" />
              </div>
            </div>
          </PetDetailMetadataSkeleton>
          <PetDetailStorySkeleton>
            <SkeletonBase width="40%" height="20px" />
            <SkeletonBase width="100%" height="14px" />
            <SkeletonBase width="100%" height="14px" />
            <SkeletonBase width="100%" height="14px" />
            <SkeletonBase width="80%" height="14px" />
          </PetDetailStorySkeleton>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            <PetDetailActionSkeleton />
            <div style={{ display: 'flex', gap: spacing.sm }}>
              <PetDetailActionSkeleton />
              <PetDetailActionSkeleton />
            </div>
          </div>
        </PetDetailInfoSkeleton>
      </PetDetailSkeleton>
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
