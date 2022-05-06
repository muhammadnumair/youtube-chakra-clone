import { Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [smallSidebar, setSmallSidebar] = useState(true);
  const bg = useColorModeValue('gray.100', 'gray.700');

  const smallSidebarToggleHandler = () => {
    setSmallSidebar(!smallSidebar);
  };

  return (
    <Flex
      alignItems={`center`}
      justifyContent={`center`}
      width={`100%`}
      height={`full`}
      direction={`column`}
      overflow={`hidden`}
    >
      <Header onSetSmallSidebar={smallSidebarToggleHandler} />
      <Flex width={`full`} overflowX={`hidden`}>
        <Flex>
          <Sidebar smallSidebar={smallSidebar} />
        </Flex>
        <Flex bg={bg} width={`full`} overflow={`hidden`} minHeight={`92vh`}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
