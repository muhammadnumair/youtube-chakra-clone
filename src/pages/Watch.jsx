import { Flex, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RelatedVideos, WatchScreen } from '../components';
import {
  clearRelatedVideos,
  clearSelectedChannel,
  clearSelectedVideo,
  clearVideoComments,
  getCommentsForVideo,
  getRelatedVideos,
  getVideoById,
} from '../redux/actions/youtube.actions';

const Watch = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(getRelatedVideos(videoId));
    dispatch(getCommentsForVideo(videoId));

    return () => {
      dispatch(clearSelectedVideo());
      dispatch(clearRelatedVideos());
      dispatch(clearSelectedChannel());
      dispatch(clearVideoComments());
    };
  }, [dispatch, videoId]);

  return (
    <Flex
      justify={`center`}
      alignContent={`center`}
      width={`full`}
      py={{ base: 2, md: 10 }}
      px={{ base: 2, md: 20 }}
      height={`full`}
    >
      <Grid
        width={`100%`}
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        height={`full`}
      >
        <GridItem colSpan={{ base: 6, md: 4 }} height={`full`}>
          <WatchScreen videoId={videoId} />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 2 }} height={`full`}>
          <RelatedVideos videoId={videoId} />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Watch;
