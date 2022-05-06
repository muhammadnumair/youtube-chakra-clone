import { ACTIONS } from '../action.types';

const initialState = {
  loading: false,
  user: sessionStorage.getItem('yt-user')
    ? JSON.parse(sessionStorage.getItem('yt-user'))
    : null,
  token: sessionStorage.getItem('yt-token') || null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.LOGIN_START:
      return { ...state, loading: true };
    case ACTIONS.LOGIN_FAILED:
      return { ...state, error: payload };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
      };
    case ACTIONS.LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return { ...state };
  }
};
