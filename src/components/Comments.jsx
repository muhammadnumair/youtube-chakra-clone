import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsForVideo } from '../redux/actions/youtube.actions';
import Comment from './Comment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Comments = ({ videoId }) => {
  const [addCommentOnFocus, setAddCommentOnFocus] = useState(false);
  const addCommentHandler = () => {};
  const user = useSelector(state => state.auth.user);
  const { comments } = useSelector(state => state.videoComments);
  const dispatch = useDispatch();

  const fetchComments = () => {
    dispatch(getCommentsForVideo(videoId));
  };

  return (
    <Flex direction={`column`} py={4}>
      {comments && (
        <Text fontSize={18} fontWeight={500}>
          {comments?.length} Comments
        </Text>
      )}
      {user && (
        <Flex
          justifyContent={`space-between`}
          alignContent={`center`}
          width={`full`}
          py={4}
        >
          <Box
            width={`40px`}
            height={`40px`}
            rounded={`full`}
            overflow={`hidden`}
            objectFit={`cover`}
            mr={5}
          >
            <LazyLoadImage
              objectFit={`cover`}
              src={user.photoURL}
              referrerpolicy="no-referrer"
            />
          </Box>
          <Flex
            width={`full`}
            justifyContent={`center`}
            alignItems={`center`}
            direction={`column`}
          >
            <form onSubmit={addCommentHandler} style={{ width: '100%' }}>
              <Input
                variant="flushed"
                placeholder="Add a comment"
                onFocus={() => setAddCommentOnFocus(true)}
              />
            </form>
            {addCommentOnFocus && (
              <Flex
                justifyContent={`flex-end`}
                alignItems={`flex-end`}
                gap={5}
                mt={5}
                width={`full`}
              >
                <Button onClick={() => setAddCommentOnFocus(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Comment</Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      <Flex
        width={`full`}
        direction={`column`}
        justifyContent={`center`}
        alignItems={`center`}
      >
        <InfiniteScroll
          dataLength={comments.length} //This is important field to render the next data
          next={fetchComments}
          hasMore={true}
          loader={
            <Flex
              justifyContent={`center`}
              width={`full`}
              alignItems={`center`}
            >
              <Oval ariaLabel="loading-indicator" color="red" width={`40px`} />
            </Flex>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {comments.map(comment => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

export default Comments;
