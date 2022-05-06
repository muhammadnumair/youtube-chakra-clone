import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const FeedVideoSkeleton = ({ channelScreenItem }) => {
  return (
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <Skeleton height="150px" />
      <Flex
        width={`full`}
        justifyContent={`center`}
        alignItems={`center`}
        gap={`5`}
        mt={5}
      >
        {!channelScreenItem && <SkeletonCircle size="10" />}
        <SkeletonText mt="4" noOfLines={2} spacing="4" flex={`1`} />
      </Flex>
    </div>
  );
};

export default FeedVideoSkeleton;
