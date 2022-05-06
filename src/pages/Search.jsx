import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HorizontalVideoItem } from '../components';
import RelatedVideoSkeleton from '../components/RelatedVideoSkeleton';
import {
  clearSearchVideos,
  getSearchedVideos,
} from '../redux/actions/youtube.actions';

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedVideos(query));

    return () => {
      dispatch(clearSearchVideos());
    };
  }, [dispatch, query]);

  const { videos } = useSelector(state => state.searchVideos);

  return (
    <Flex
      px={20}
      py={10}
      justifyContent={`center`}
      width={`full`}
      alignItems={`center`}
      direction={`column`}
    >
      {videos.length !== 0
        ? videos?.map(video => (
            <HorizontalVideoItem
              video={video}
              key={video.id.videoId}
              searchPageItem
            />
          ))
        : [...Array(8)].map(() => <RelatedVideoSkeleton />)}
    </Flex>
  );
};

export default Search;
