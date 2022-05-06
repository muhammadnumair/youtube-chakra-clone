import { ACTIONS } from '../action.types';

export const loginStart = () => dispatch => {
  dispatch({
    type: ACTIONS.LOGIN_START,
  });
};

export const login = payload => dispatch => {
  if (payload.success) {
    const { user, token } = payload;
    sessionStorage.setItem('yt-user', JSON.stringify(user));
    sessionStorage.setItem('yt-token', token);

    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: {
        user: user,
        token: token,
      },
    });
  } else {
    dispatch({
      type: ACTIONS.LOGIN_FAILED,
      payload: {
        errorCode: payload.errorCode,
        errorMessage: payload.errorMessage,
      },
    });
  }
};

export const logout = () => async dispatch => {
  sessionStorage.removeItem('yt-user');
  sessionStorage.removeItem('yt-token');

  dispatch({
    type: ACTIONS.LOGOUT,
  });
};
