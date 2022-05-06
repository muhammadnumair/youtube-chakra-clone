import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetails } from '../redux/actions/youtube.actions';
import VideoMeta from './VideoMeta';
import VideoPlayer from './VideoPlayer';

const WatchScreen = ({ videoId }) => {
  const video = useSelector(state => state.youtube.selectedVideo);
  const channel = useSelector(state => state.youtube.selectedChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    if (video?.snippet?.channelId) {
      dispatch(getChannelDetails(video?.snippet?.channelId));
    }
  }, [video?.snippet?.channelId, dispatch]);

  return (
    <div>
      <VideoPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
      <VideoMeta
        video={video}
        channel={channel}
        subscriptionStatus={
          channel && channel.subscriptionStatus
            ? channel.subscriptionStatus
            : false
        }
      />
    </div>
  );
};

export default WatchScreen;
