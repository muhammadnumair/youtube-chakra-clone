import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const SidebarMenuItem = ({ icon, title, active, smallSidebar }) => {
  const activeBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      justifyContent={{
        base: `center`,
        md: `center`,
        lg: !smallSidebar ? `start` : 'center',
      }}
      width={`full`}
      alignItems={`center`}
      gap={{ base: 2, md: 2, lg: !smallSidebar ? 6 : 2 }}
      pl={{ base: 4, md: 4, lg: !smallSidebar ? 8 : 4 }}
      pr={{ base: 4, md: 4, lg: !smallSidebar ? 16 : 4 }}
      py={{ base: 4, md: 4, lg: !smallSidebar ? 2 : 4 }}
      bg={active ? activeBg : ''}
      cursor={`pointer`}
      direction={{
        base: 'column',
        md: 'column',
        lg: !smallSidebar ? 'row' : 'column',
      }}
    >
      {icon}
      <Text
        fontWeight={active ? `500` : 'normal'}
        fontSize={{ base: 12, md: 12, lg: !smallSidebar ? 16 : 12 }}
      >
        {title}
      </Text>
    </Flex>
  );
};

export default SidebarMenuItem;
