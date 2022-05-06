import { Flex } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const VideoThumbnail = ({
  videoImage,
  videoId,
  maxWidth = '300px',
  maxHeight = '170px',
}) => {
  const containerRef = useRef(null);
  const [play, setPlay] = useState(false);

  let timer = null;

  const handleMouseEnter = () => {
    timer = setTimeout(() => setPlay(true), 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setPlay(false);
  };

  return (
    <Link to={`/watch/${videoId}`}>
      <Flex
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        justifyContent={`center`}
        alignItems={`center`}
        maxWidth={`${maxWidth} !important`}
        maxHeight={`${maxHeight} !important`}
        bg={`blackAlpha.300`}
      >
        {play ? (
          <ReactPlayer
            width="100%"
            playing={play}
            pip
            controls="false"
            config={{ file: { forceHLS: true } }}
            url={`https://www.youtube.com/watch?v=${videoId}`}
            muted={true}
          />
        ) : (
          <LazyLoadImage
            src={videoImage}
            width={`full`}
            style={{
              // Make the image expand to cover the video's dimensions
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Flex>
    </Link>
  );
};

export default VideoThumbnail;
