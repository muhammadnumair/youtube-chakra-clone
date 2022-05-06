import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos } from '../redux/actions/youtube.actions';
import CategoryList from './CategoryList';
import VideoItem from './VideoItem';
import FeedVideoSkeleton from './FeedVideoSkeleton';

const Feed = () => {
  const disptach = useDispatch();

  const { videos, category, loading } = useSelector(state => state.youtube);

  useEffect(() => {
    disptach(getPopularVideos());
  }, [disptach]);

  const fetchVideos = () => {
    if (category === 'All') {
      disptach(getPopularVideos());
    } else {
      disptach(getPopularVideos(category));
    }
  };

  return (
    <Flex direction={`column`} width={`100%`}>
      <CategoryList overflow={`hidden`} width={`full`} />
      <Flex justifyContent={`center`} alignItems={`center`} width={`full`}>
        <SimpleGrid
          width={`full`}
          minChildWidth={`250px`}
          spacing={10}
          autoColumns={`max-content`}
          overflow={`hidden`}
          alignItems={`start`}
          px={{ base: 3, md: 8 }}
          py={{ base: 3, md: 6 }}
        >
          {!loading
            ? videos.map((video, index) => {
                return <VideoItem video={video} key={`${video.id}-${index}`} />;
              })
            : [...Array(8)].map(() => <FeedVideoSkeleton />)}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Feed;
