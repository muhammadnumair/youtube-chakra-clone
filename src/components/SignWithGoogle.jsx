import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firbaseApp } from '../common/firebase-app';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginStart, logout } from '../redux/actions/auth.actions';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SignWithGoogle = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl	');
  const auth = getAuth(firbaseApp);

  const user = useSelector(state => state.auth.user);

  const loginHandler = async () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // Login Start
        dispatch(loginStart());

        // Login Success
        dispatch(
          login({
            success: true,
            user: user,
            token: token,
          })
        );
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Login Failed
        dispatch(
          login({
            success: false,
            errorCode: errorCode,
            errorMessage: errorMessage,
          })
        );
      });
  };

  const logoutHandler = () => {
    auth.signOut();
    dispatch(logout());
  };

  return (
    <>
      {!user && (
        <Button
          leftIcon={<FaRegUserCircle />}
          colorScheme="blue"
          variant="outline"
          onClick={loginHandler}
        >
          SIGN IN
        </Button>
      )}

      {user && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton as={`button`}>
                <Box
                  width={`30px`}
                  height={`30px`}
                  rounded={`full`}
                  bg={`gray.700`}
                  overflow={`hidden`}
                >
                  <LazyLoadImage
                    src={user.photoURL}
                    alt={user.displayName}
                    referrerpolicy="no-referrer"
                  />
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </>
  );
};

export default SignWithGoogle;
