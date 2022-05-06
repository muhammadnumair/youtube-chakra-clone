import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Logo from './Logo';
import { FaSearch, FaBars } from 'react-icons/fa';
import ColorModeSwitcher from './ColorModeSwitcher';
import SignWithGoogle from './SignWithGoogle';
import { useNavigate, useParams } from 'react-router-dom';

const Header = ({ onSetSmallSidebar }) => {
  const params = useParams();
  const urlPath = params[`*`]?.split('/');
  const [searchQuery, setSearchQuery] = useState(
    urlPath && urlPath[0] === 'search' ? urlPath[1] : ''
  );
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  console.log();
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'full'}
      px={'4'}
      py={'2'}
      shadow={'md'}
    >
      <Flex justifyContent={`space-between`} alignItems={`center`} gap={`3`}>
        <FaBars cursor={`pointer`} onClick={() => onSetSmallSidebar()} />
        <Box width={{ base: `70px`, md: `100px` }}>
          <Logo />
        </Box>
      </Flex>

      <Flex
        alignItems={`center`}
        justifyContent={`center`}
        display={{ md: 'flex', base: 'none' }}
      >
        <form onSubmit={handleSearch}>
          <InputGroup width={'60vw'} mx={'5'} variant={'filled'}>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search"
              variant={`filled`}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
              }}
            />
          </InputGroup>
        </form>
      </Flex>

      <Flex justifyContent={`space-evenly`} alignItems={`center`} gap={`3`}>
        <ColorModeSwitcher />
        <SignWithGoogle />
      </Flex>
    </Flex>
  );
};

export default Header;
