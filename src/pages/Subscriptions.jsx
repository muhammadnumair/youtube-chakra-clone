import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HorizontalVideoItem } from '../components';
import RelatedVideoSkeleton from '../components/RelatedVideoSkeleton';
import { getAccountSubscriptions } from '../redux/actions/youtube.actions';

const Subscriptions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountSubscriptions());
  }, [dispatch]);

  const { subscriptions } = useSelector(state => state.channel);

  return (
    <Flex
      px={20}
      py={10}
      justifyContent={`center`}
      width={`full`}
      alignItems={`center`}
      direction={`column`}
    >
      {subscriptions.length !== 0
        ? subscriptions?.map(subscription => (
            <HorizontalVideoItem
              video={subscription}
              key={subscription.id.videoId}
              subscriptionPageItem
            />
          ))
        : [...Array(8)].map(() => <RelatedVideoSkeleton />)}
    </Flex>
  );
};

export default Subscriptions;
