import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const RelatedVideoSkeleton = () => {
  return (
    <Flex
      justifyContent={`center`}
      alignItems={`center`}
      width={`full`}
      my={3}
      gap={4}
    >
      <Skeleton height="100px" flex={`1`} />
      <Box flex={`1`}>
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
        <Flex
          width={`full`}
          justifyContent={`center`}
          alignItems={`center`}
          gap={`5`}
          mt={5}
        >
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={1} spacing="4" flex={`1`} width={`30px`} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default RelatedVideoSkeleton;
