import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalVideoItem from './HorizontalVideoItem';
import RelatedVideoSkeleton from './RelatedVideoSkeleton';

const RelatedVideos = ({ videoId }) => {
  const { videos } = useSelector(state => state.relatedVideos);

  console.log('22322222', videos.length);
  return (
    <div>
      {videos.length !== 0
        ? videos.map(video => {
            return (
              Object.keys(video).length !== 0 &&
              video?.snippet?.thumbnails?.medium?.url && (
                <HorizontalVideoItem video={video} key={video.id.videoId} />
              )
            );
          })
        : [...Array(8)].map(() => <RelatedVideoSkeleton />)}
    </div>
  );
};

export default RelatedVideos;
