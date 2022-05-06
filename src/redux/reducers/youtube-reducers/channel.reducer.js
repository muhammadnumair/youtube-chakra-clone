import { ACTIONS } from '../../action.types';

const initialState = {
  subscriptions: [],
  videos: [],
  nextPageToken: null,
  loading: false,
  error: null,
};

export const channelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SUBSCRIPTIONS_CHANNEL_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.SUBSCRIPTIONS_CHANNEL_FAIL:
      return { ...state, loading: false, error: payload };
    case ACTIONS.SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: payload,
      };
    case ACTIONS.CHANNEL_VIDEOS_REQUEST:
      return { ...state, loading: true };
    case ACTIONS.CHANNEL_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    case ACTIONS.CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    default:
      return state;
  }
};
