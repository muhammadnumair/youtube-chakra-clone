import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import VideoThumbnail from './VideoThumbnail';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { request } from '../common/request';

const HorizontalVideoItem = ({
  video,
  searchPageItem,
  subscriptionPageItem,
}) => {
  const isVideo = video.id.kind === 'youtube#video';
  const [videoDetails, setVideoDetails] = useState(null);

  // useEffect(() => {
  //   const getVideoDetails = async () => {
  //     const {
  //       data: { items },
  //     } = await request('/videos', {
  //       params: {
  //         part: 'contentDetails,statistics,snippet',
  //         id: video.id.videoId,
  //       },
  //     });

  //     setVideoDetails(items[0]);
  //   };

  //   if (video?.id?.videoId) {
  //     getVideoDetails();
  //   }
  // });

  return (
    <Flex
      justifyContent={`center`}
      alignItems={`start`}
      gap={`4`}
      overflow={`hidden`}
      width={`full`}
      my={3}
    >
      <Flex
        position={`relative`}
        justifyContent={`center`}
        alignItems={`center`}
        minWidth={searchPageItem ? '300px' : '200px'}
        minHeight={searchPageItem ? '170px' : '100px'}
      >
        {isVideo ? (
          <>
            <VideoThumbnail
              videoImage={video?.snippet?.thumbnails?.medium?.url}
              videoId={video?.id?.videoId}
              maxWidth={searchPageItem ? '300px' : '200px'}
              maxHeight={searchPageItem ? '170px' : '100px'}
            />
            <Box
              bg={`blackAlpha.800`}
              px={2}
              position={`absolute`}
              color={`white`}
              bottom={3}
              right={1}
              fontWeight={`500`}
              fontSize={13}
              borderRadius={4}
            >
              1:38:24
            </Box>
          </>
        ) : (
          <Link
            to={`/channel/${
              video.id.channelId
                ? video.id.channelId
                : video.snippet.resourceId.channelId
            }`}
          >
            <Box
              width={`150px`}
              height={`150px`}
              bg={`gray`}
              rounded={`full`}
              objectFit={`cover`}
              overflow={`hidden`}
            >
              <LazyLoadImage
                src={video?.snippet?.thumbnails?.high?.url}
                width={`full`}
                height={`full`}
                referrerPolicy={`no-referrer`}
              />
            </Box>
          </Link>
        )}
      </Flex>
      <Flex
        direction={`column`}
        width={`50%`}
        justifyContent={`start`}
        alignItems={`start`}
      >
        <Link
          to={
            isVideo
              ? `/watch/${video.id.videoId}`
              : `/channel/${
                  video.id.channelId
                    ? video.id.channelId
                    : video.snippet.resourceId.channelId
                }`
          }
        >
          <Text
            noOfLines={`2`}
            fontSize={searchPageItem || subscriptionPageItem ? `18` : `14`}
            fontWeight={`500`}
            mb={2}
          >
            {video?.snippet?.title}
          </Text>
        </Link>
        {subscriptionPageItem && (
          <Text noOfLines={`2`} fontSize={`14`} fontWeight={`300`} mb={2}>
            {video?.snippet?.description}
          </Text>
        )}
        {isVideo && (
          <Box
            isTruncated
            fontSize={searchPageItem ? `14` : `12`}
            fontWeight={`500`}
          >
            {video?.snippet?.channelTitle}
          </Box>
        )}
        <Flex
          justifyContent={`start`}
          alignItems={`center`}
          fontSize={`13`}
          fontWeight={`500`}
          gap={`3`}
          mt={2}
        >
          {isVideo ? (
            <Text>
              {numeral(videoDetails?.statistics?.viewCount).format('0,a')} views{' '}
            </Text>
          ) : (
            <Text>
              {numeral(video?.contentDetails?.totalItemCount).format('0,a')}{' '}
              videos
            </Text>
          )}
          <Text>
            {video?.snippet?.publishedAt &&
              moment(video?.snippet?.publishedAt).fromNow()}
          </Text>
        </Flex>
        <Text isTruncated mt={4}>
          {isVideo && searchPageItem && video.snippet.description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HorizontalVideoItem;
