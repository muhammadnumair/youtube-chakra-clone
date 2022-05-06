import { Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { request } from '../common/request';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VideoThumbnail from './VideoThumbnail';

const VideoItem = ({ video, channelScreenItem }) => {
  const {
    id,
    snippet: {
      publishedAt,
      channelId,
      title,
      thumbnails: {
        medium: { url },
      },
      channelTitle,
    },
  } = video;

  const [channel, setChannel] = useState(null);
  const [views, setViews] = useState(0);
  const [duration, setDuration] = useState(0);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');

  const videoId = video?.snippet?.resourceId?.videoId || id?.videoId || id;

  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await request.get('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });

      setChannel(items);
    };

    !channelScreenItem && getChannelDetails();
  }, [channelId, channelScreenItem]);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [videoId]);

  return (
    <Flex
      justifyContent={`center`}
      alignItems={`center`}
      direction={`column`}
      width={`full`}
      overflow={`hidden`}
    >
      <Link to={`/watch/${videoId}`}>
        <Flex
          justifyContent={`center`}
          alignItems={`center`}
          width={`full`}
          position={`relative`}
          overflow={`hidden`}
          objectFit={`contain`}
          minWidth={'300px'}
          minHeight={'170px'}
        >
          {/* <LazyLoadImage src={url} width={`full`} /> */}
          <VideoThumbnail
            videoImage={url}
            videoId={videoId}
            maxWidth={'300px'}
            maxHeight={'170px'}
          />
          <Box
            bg={`blackAlpha.600`}
            px={3}
            position={`absolute`}
            color={`white`}
            bottom={3}
            right={2}
            fontWeight={`500`}
            fontSize={14}
          >
            {_duration}
          </Box>
        </Flex>
      </Link>
      <Flex
        justifyContent={`space-between`}
        alignItems={`start`}
        gap={`3`}
        marginTop={`3`}
        width={`full`}
      >
        {!channelScreenItem && (
          <Link to={`/channel/${channelId}`}>
            <Box
              width={`35px`}
              height={`35px`}
              rounded={`full`}
              overflow={`hidden`}
              bg={`gray.400`}
            >
              <LazyLoadImage
                src={channel && channel[0]?.snippet?.thumbnails?.default?.url}
              />
            </Box>
          </Link>
        )}
        <Flex flex={`1`} direction={`column`} overflow={`hidden`}>
          <Link to={`/watch/${videoId}`}>
            <Text fontWeight={`500`} fontSize={`15`} isTruncated>
              {title}
            </Text>
          </Link>
          {!channelScreenItem && (
            <Link to={`/channel/${channelId}`}>
              <Text fontSize={`13`} fontWeight={`500`}>
                {channelTitle}
              </Text>
            </Link>
          )}
          <Flex
            justifyContent={`start`}
            alignItems={`center`}
            fontSize={`13`}
            fontWeight={`500`}
            gap={`3`}
          >
            <Text>{numeral(views).format('0,a')} views </Text>
            <Text>{moment(publishedAt).fromNow()}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoItem;
