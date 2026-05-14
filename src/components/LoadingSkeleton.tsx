import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { colors, elevation, spacing, borderRadius, aspectRatios } from '../theme';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const shimmerMixin = css`
  background: linear-gradient(
    90deg,
    ${colors.surfaceContainer} 25%,
    ${colors.surfaceContainerHigh} 50%,
    ${colors.surfaceContainer} 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
`;

const SkeletonBase = styled.div<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  ${shimmerMixin}
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
  ${shimmerMixin}
`;

const ContentSkeleton = styled.div`
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  
  @media (max-width: 479px) {
    gap: 6px;
  }
`;

const CheckboxSkeleton = styled.div`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  width: 28px;
  height: 28px;
  border-radius: ${borderRadius.full};
  ${shimmerMixin}
  
  @media (max-width: 479px) {
    width: 24px;
    height: 24px;
  }
`;

const FavoriteSkeleton = styled.div`
  position: absolute;
  top: ${spacing.sm};
  left: ${spacing.sm};
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  ${shimmerMixin}
  
  @media (max-width: 479px) {
    width: 28px;
    height: 28px;
  }
`;

const PetDetailSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  padding-top: ${spacing.lg};
  
  @media (max-width: 479px) {
    gap: ${spacing.md};
    padding-top: ${spacing.md};
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 8fr 4fr;
  }
`;

const PetDetailImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  ${shimmerMixin}
  border-radius: ${borderRadius.lg};
  
  @media (max-width: 479px) {
    aspect-ratio: 16/9;
  }
`;

const PetDetailInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  
  @media (max-width: 479px) {
    gap: ${spacing.md};
  }
`;

const PetDetailTitleSkeleton = styled.div`
  height: 40px;
  ${shimmerMixin}
  border-radius: 4px;
  width: 70%;
  
  @media (max-width: 479px) {
    height: 32px;
    width: 85%;
  }
`;

const PetDetailTagSkeleton = styled.div`
  height: 28px;
  width: 80px;
  ${shimmerMixin}
  border-radius: ${borderRadius.full};
  
  @media (max-width: 479px) {
    height: 24px;
    width: 70px;
  }
`;

const PetDetailMetadataSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
  
  @media (max-width: 479px) {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
    padding: ${spacing.sm};
  }
`;

const PetDetailStorySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  
  @media (max-width: 479px) {
    gap: ${spacing.xs};
  }
`;

const PetDetailActionSkeleton = styled.div`
  height: 44px;
  ${shimmerMixin}
  border-radius: ${borderRadius.lg};
  width: 100%;
  
  @media (max-width: 479px) {
    height: 40px;
  }
`;

const MobileHide = styled.div`
  @media (max-width: 479px) {
    display: none;
  }
`;

const MobileCompact = styled.div`
  @media (max-width: 479px) {
    & > div:last-child {
      display: none;
    }
  }
`;

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'petDetail';
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
            <MobileHide>
              <div>
                <SkeletonBase width="60%" height="12px" />
                <div style={{ marginTop: '4px' }}>
                  <SkeletonBase width="80%" height="16px" />
                </div>
              </div>
            </MobileHide>
            <MobileHide>
              <div>
                <SkeletonBase width="60%" height="12px" />
                <div style={{ marginTop: '4px' }}>
                  <SkeletonBase width="80%" height="16px" />
                </div>
              </div>
            </MobileHide>
          </PetDetailMetadataSkeleton>
          <MobileCompact>
            <PetDetailStorySkeleton>
              <SkeletonBase width="40%" height="20px" />
              <SkeletonBase width="100%" height="14px" />
              <SkeletonBase width="100%" height="14px" />
              <SkeletonBase width="100%" height="14px" />
              <SkeletonBase width="80%" height="14px" />
            </PetDetailStorySkeleton>
          </MobileCompact>
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
