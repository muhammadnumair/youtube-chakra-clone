import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import {
  MdExplore,
  MdSlowMotionVideo,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdThumbUp,
} from 'react-icons/md';
import SidebarMenuItem from './SidebarMenuItem';

const smallSidebar = ({ smallSidebar }) => {
  return (
    <Flex
      justifyContent={`start`}
      alignItems={`center`}
      direction={`column`}
      width={`full`}
      display={{ base: !smallSidebar ? 'none' : 'block', md: 'block' }}
      transition={`transform`}
      transitionDuration={`0.2s`}
      transitionTimingFunction={`ease-in`}
      transform={`translateX(0)`}
    >
      <SidebarMenuItem
        icon={<FaHome fontSize={`22px`} />}
        title={`Home`}
        active
        smallSidebar={smallSidebar}
      />
      <SidebarMenuItem
        icon={<MdExplore fontSize={`22px`} />}
        title={`Explore`}
        smallSidebar={smallSidebar}
      />
      <SidebarMenuItem
        icon={<MdSlowMotionVideo fontSize={`22px`} />}
        title={`Shorts`}
        smallSidebar={smallSidebar}
      />
      {!smallSidebar && (
        <SidebarMenuItem
          icon={<MdSubscriptions fontSize={`22px`} />}
          title={`Subscriptions`}
          smallSidebar={smallSidebar}
        />
      )}

      {!smallSidebar && (
        <Box my={5}>
          <hr />
        </Box>
      )}

      <SidebarMenuItem
        icon={<MdVideoLibrary fontSize={`22px`} />}
        title={`Library`}
        smallSidebar={smallSidebar}
      />
      <SidebarMenuItem
        icon={<MdHistory fontSize={`22px`} />}
        title={`History`}
        smallSidebar={smallSidebar}
      />
      {!smallSidebar && (
        <SidebarMenuItem
          icon={<MdThumbUp fontSize={`22px`} />}
          title={`Liked Videos`}
          smallSidebar={smallSidebar}
        />
      )}
    </Flex>
  );
};

export default smallSidebar;
