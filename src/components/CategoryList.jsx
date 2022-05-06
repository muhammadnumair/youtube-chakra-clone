import { Flex } from '@chakra-ui/react';
import React from 'react';
import CategoryItem from './CategoryItem';

const keywords = [
  'All',
  'Sheikh',
  'Allama',
  'Comedy',
  'Songs',
  'Cars',
  'Music',
  'Ali Mirza',
  'Coke Studio',
  'Solidity',
  'Blockchain',
  'React JS',
  'Node JS',
  'Nest JS',
  'Youtube',
  'Hello World',
];

const CategoryList = () => {
  return (
    <Flex
      px={{ base: 3, md: 8 }}
      pt={{ base: 3, md: 6 }}
      width={`full`}
      overflow={`hidden`}
    >
      <Flex
        className="scrollbar-hidden"
        alignItems={`center`}
        overflowX={`scroll`}
        gap={3}
        width={`full`}
      >
        {keywords.map((keyword, index) => {
          return <CategoryItem keyword={keyword} key={index} />;
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryList;
