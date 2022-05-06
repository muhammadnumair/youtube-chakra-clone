import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPopularVideos,
  getVideosByCategory,
} from '../redux/actions/youtube.actions';

const CategoryItem = ({ keyword }) => {
  const selectedCategory = useSelector(state => state.youtube.category);

  const isActive = keyword === selectedCategory;

  const bg = useColorModeValue(
    `${isActive ? 'black' : 'gray.200'}`,
    `${isActive ? 'white' : 'gray.800'}`
  );
  const textColor = useColorModeValue(
    `${isActive ? 'white' : 'black'}`,
    `${isActive ? 'black' : 'white'}`
  );

  const dispatch = useDispatch();

  const handleCategory = () => {
    if (keyword === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(keyword));
    }
  };

  return (
    <Box
      bg={bg}
      color={textColor}
      px={6}
      py={0.5}
      borderRadius={`3xl`}
      border={`1px solid`}
      fontWeight={400}
      cursor={'pointer'}
      borderColor={useColorModeValue(`gray.400`, `blackAlpha.400`)}
      minWidth={`fit-content`}
      onClick={handleCategory}
    >
      {keyword}
    </Box>
  );
};

export default CategoryItem;
