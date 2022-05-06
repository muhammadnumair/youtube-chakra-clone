import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FiPause, FiPlay, FiSkipForward, FiSkipBack } from 'react-icons/fi';
import { MdFullscreen, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import screenfull from 'screenfull';
import { format } from '../common/utils';
import Logo from './Logo';

const VideoPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');

  const playerContainer = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (volume <= 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }, [volume]);

  useEffect(() => {}, [played]);

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : '00:00';

  const totalVideoDuration = format(duration);

  const setCurrentVideoTime = () => {
    const currentDuration = playerRef.current
      ? playerRef.current.getCurrentTime()
      : '00:00';

    const currentVideoDuration = format(currentDuration);

    setCurrentTime(currentVideoDuration);
  };

  const fastForwardVideo = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const fastBackwardVideo = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleProgress = changeState => {
    if (!seeking) {
      setPlayed(parseFloat(changeState.played / 100) * 100);
    }

    setCurrentVideoTime();
  };

  const handleSeekChange = e => {
    setPlayed(parseFloat(e / 100));
  };

  const onSeekMouseDown = e => {
    setSeeking(true);
  };

  const onSeekMouseUp = e => {
    setSeeking(false);
    playerRef.current.seekTo(e / 100);
  };

  return (
    <>
      <Flex
        justifyContent={`center`}
        alignItems={`center`}
        position={`relative`}
        bg={`black`}
        ref={playerContainer}
        width={`full`}
        height={{ base: 200, md: 500 }}
      >
        <ReactPlayer
          url={url}
          width={`100%`}
          height={`100%`}
          playing={isPlaying}
          muted={muted}
          volume={volume}
          ref={playerRef}
          onProgress={handleProgress}
        />

        {/* Play Overlay */}
        <Flex
          justifyContent={`space-between`}
          alignItems={`center`}
          top={0}
          bottom={0}
          left={0}
          right={0}
          position={'absolute'}
          direction={'column'}
          cursor={`pointer`}
          zIndex={1}
          width={`full`}
          height={`full`}
        >
          <Flex
            justifyContent={`center`}
            alignItems={`center`}
            width={`full`}
            height={`full`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <Flex
                //   bg={"blackAlpha.600"}
                width={`full`}
                height={`full`}
                justifyContent={`center`}
                alignItems={`center`}
              >
                <FiPlay fontSize={60} color={`#fafafa`} />
              </Flex>
            )}
          </Flex>

          <Flex
            alignItems={`center`}
            width={`full`}
            direction={`column`}
            bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500, blackAlpha.50)"
            px="4"
          >
            <Slider
              aria-label="slider-ex-4"
              min={0}
              max={100}
              value={played * 100}
              onChange={handleSeekChange}
              onMouseDown={onSeekMouseDown}
              onChangeEnd={onSeekMouseUp}
            >
              <SliderTrack>
                <SliderFilledTrack bg={`red.500`} />
              </SliderTrack>
              <SliderThumb bg={`red.500`} />
            </Slider>

            {/* Controls */}
            <Flex
              width={'full'}
              alignItems="center"
              my={2}
              gap={10}
              justifyContent={`space-between`}
            >
              <Flex justifyContent={`start`} alignItems={`center`} gap={6}>
                <FiSkipBack
                  fontSize={25}
                  color={`#fafafa`}
                  onClick={fastBackwardVideo}
                />
                <Box>
                  {!isPlaying ? (
                    <FiPlay
                      fontSize={25}
                      color={`#fafafa`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    />
                  ) : (
                    <FiPause
                      fontSize={25}
                      color={`#fafafa`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    />
                  )}
                </Box>
                <FiSkipForward
                  fontSize={25}
                  color={`#fafafa`}
                  onClick={fastForwardVideo}
                />

                <Flex alignItems={'center'} gap={4} width={'24'}>
                  <Box>
                    {!muted ? (
                      <MdVolumeUp
                        fontSize={25}
                        color={`#fafafa`}
                        onClick={() => setMuted(!muted)}
                      />
                    ) : (
                      <MdVolumeOff
                        fontSize={25}
                        color={`#fafafa`}
                        onClick={() => setMuted(!muted)}
                      />
                    )}
                  </Box>
                  <Slider
                    aria-label="slider-ex-1"
                    min={0}
                    max={100}
                    defaultValue={50}
                    size="sm"
                    onChange={e => setVolume(e / 100)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack bg={`red.500`} />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Flex>
                <Flex alignItems={'center'} gap={2}>
                  <Text color={`#fafafa`}>{currentTime}</Text>
                  <Text color={`#fafafa`}>/</Text>
                  <Text color={`#fafafa`}>{totalVideoDuration}</Text>
                </Flex>
              </Flex>

              <Flex justifyContent={`center`} align={`center`} gap={6}>
                <Logo width={'90px'} ml="auto" />

                <MdFullscreen
                  fontSize={30}
                  color="#f1f1f1"
                  cursor={'pointer'}
                  onClick={() => {
                    screenfull.toggle(playerContainer.current);
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default VideoPlayer;
