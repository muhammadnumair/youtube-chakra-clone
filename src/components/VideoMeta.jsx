import {
  Box,
  Button,
  Collapse,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import numeral from 'numeral';
import moment from 'moment';
import Comments from './Comments';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const VideoMeta = ({ video, channel, subscriptionStatus }) => {
  const [showMoreDesc, setShowMoreDesc] = React.useState(false);

  return (
    <Flex pr={10} py={3} direction={`column`} width={`100%`}>
      {video?.snippet?.title ? (
        <Text isTruncated fontWeight={`500`} fontSize={18}>
          {video?.snippet?.title}
        </Text>
      ) : (
        <SkeletonText my="4" noOfLines={2} spacing="4" />
      )}
      {video && (
        <Flex justifyContent={`space-between`} width={`full`} py={2}>
          <Flex
            justifyContent={`start`}
            alignItems={`center`}
            fontSize={`16`}
            fontWeight={`300`}
            gap={`3`}
          >
            <Text>
              {numeral(video?.statistics?.viewCount).format('0,a')} views
            </Text>
            <Text>{moment(video?.snippet?.publishedAt).fromNow()}</Text>
          </Flex>

          <Flex
            justifyContent={`end`}
            alignItems={`center`}
            gap={`3`}
            fontSize={`16`}
            fontWeight={`300`}
          >
            <Tooltip hasArrow label="I like this" bg="blackAlpha.800">
              <Flex gap={3} alignItems={`center`} justifyContent={`center`}>
                <MdThumbUp fontSize={`20`} cursor={`pointer`} />
                {numeral(video?.statistics?.likeCount).format('0,a')}
              </Flex>
            </Tooltip>
            <Tooltip hasArrow label="I dislike this" bg="blackAlpha.800">
              <Flex gap={3} alignItems={`center`} justifyContent={`center`}>
                <MdThumbDown fontSize={`20`} cursor={`pointer`} /> DISLIKE
              </Flex>
            </Tooltip>
          </Flex>
        </Flex>
      )}
      <hr />
      <Flex
        width={`full`}
        py={2}
        justifyContent={`center`}
        alignContent={`center`}
        direction={`column`}
      >
        <Flex
          justifyContent={`space-between`}
          alignContent={`center`}
          width={`full`}
          py={4}
        >
          <Flex alignItems={`center`} gap={4}>
            <Box
              width={`50px`}
              height={`50px`}
              rounded={`full`}
              overflow={`hidden`}
              objectFit={`cover`}
            >
              {channel ? (
                <LazyLoadImage
                  src={channel?.snippet?.thumbnails?.default.url}
                  referrerpolicy="no-referrer"
                />
              ) : (
                <SkeletonCircle size="10" />
              )}
            </Box>
            {channel && (
              <Flex
                direction={`column`}
                alignItems={`start`}
                justifyContent={`start`}
              >
                <Tooltip hasArrow label="Ducky Bhai" bg="blackAlpha.800">
                  <Text fontWeight={`bold`}>{channel?.snippet?.title}</Text>
                </Tooltip>
                <Text fontSize={`12px`}>
                  {numeral(channel?.statistics?.subscriberCount).format('0,a')}{' '}
                  subscribers
                </Text>
              </Flex>
            )}
          </Flex>
          {channel && (
            <Flex alignItems={`center`}>
              <Button
                colorScheme="red"
                variant="solid"
                isDisabled={subscriptionStatus}
              >
                {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
              </Button>
            </Flex>
          )}
        </Flex>
        {video && (
          <>
            <Collapse startingHeight={20} in={showMoreDesc}>
              {video?.snippet?.description}
            </Collapse>
            <Button
              size="sm"
              onClick={() => setShowMoreDesc(!showMoreDesc)}
              mt="1rem"
            >
              Show {showMoreDesc ? 'Less' : 'More'}
            </Button>
          </>
        )}
      </Flex>
      <hr />
      <Comments videoId={video?.id} />
    </Flex>
  );
};

export default VideoMeta;
