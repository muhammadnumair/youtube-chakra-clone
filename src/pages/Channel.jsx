import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FeedVideoSkeleton, VideoItem } from '../components';
import {
  getChannelDetails,
  getVideosByChannel,
} from '../redux/actions/youtube.actions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import numeral from 'numeral';

const Channel = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector(state => state.channel);
  const channel = useSelector(state => state.youtube.selectedChannel);

  return (
    <Flex direction={`column`} width={`100%`}>
      <Flex
        justify={`center`}
        position={`relative`}
        height={`150`}
        bg={`blue.800`}
        width={`full`}
      >
        <Flex
          position={`absolute`}
          justifyContent={`space-between`}
          alignItems={`center`}
          width={`full`}
          px={20}
          bottom={-3}
        >
          <Flex gap={4} justifyContent={`center`} alignItems={`center`}>
            <Box
              width={`80px`}
              height={`80px`}
              rounded={`full`}
              overflow={`hidden`}
              objectFit={`cover`}
            >
              <LazyLoadImage
                src={channel?.snippet?.thumbnails?.default?.url}
                referrerpolicy="no-referrer"
              />
            </Box>
            <Flex direction={`column`}>
              <Text fontWeight={`bold`} fontSize={18}>
                {channel?.snippet.title}
              </Text>
              <Text fontWeight={`500`} fontSize={14}>
                {numeral(channel?.statistics?.subscriberCount).format('0,a')}{' '}
                subscribers
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems={`center`}>
            <Button
              colorScheme="red"
              variant="solid"
              isDisabled={channel?.subscriptionStatus}
            >
              {channel?.subscriptionStatus ? 'Subscribed' : 'Subscribe'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
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
                return (
                  <VideoItem
                    video={video}
                    key={`${video.id}-${index}`}
                    channelScreenItem
                  />
                );
              })
            : [...Array(8)].map(() => <FeedVideoSkeleton channelScreenItem />)}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Channel;
