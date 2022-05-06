import React from 'react';
import LogoLight from '../assets/images/logo-light.png';
import LogoDark from '../assets/images/logo-dark.png';
import { useColorMode } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const Logo = props => {
  const { colorMode } = useColorMode();
  return (
    <Link to={`/`}>
      <LazyLoadImage
        src={colorMode === 'dark' ? LogoLight : LogoDark}
        {...props}
      />
    </Link>
  );
};

export default Logo;
