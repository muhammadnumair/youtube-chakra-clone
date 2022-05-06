import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import ShowMoreText from 'react-show-more-text';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Comment = ({ comment }) => {
  const profilePic =
    comment.snippet.topLevelComment.snippet.authorProfileImageUrl;

  return (
    <Flex
      width={`full`}
      justifyContent={`start`}
      alignItems={`center`}
      gap={4}
      mt={10}
    >
      <Box
        width={`40px`}
        height={`40px`}
        rounded={`full`}
        overflow={`hidden`}
        objectFit={`cover`}
      >
        <LazyLoadImage
          objectFit={`cover`}
          src={profilePic && profilePic.split('=')[0]}
          referrerpolicy="no-referrer"
        />
      </Box>

      <Flex direction={`column`}>
        <Flex gap={2}>
          <Tooltip hasArrow label="Ducky Bhai" bg="blackAlpha.800">
            <Text fontWeight={`500`} fontSize={`14px`}>
              {comment.snippet.topLevelComment.snippet.authorDisplayName}
            </Text>
          </Tooltip>
          <Text fontWeight={`normal`} fontSize={`12px`}>
            {moment(
              comment?.snippet?.topLevelComment?.snippet?.publishedAt
            ).fromNow()}
          </Text>
        </Flex>
        <Text fontSize={`14px`}>
          <ShowMoreText
            /* Default options */
            lines={3}
            more="Show more"
            less="Show less"
            expanded={false}
            width={280}
            truncatedEndingComponent={'... '}
          >
            {ReactHtmlParser(
              comment.snippet.topLevelComment.snippet.textOriginal
            )}
          </ShowMoreText>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
