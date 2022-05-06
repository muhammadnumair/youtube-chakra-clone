import { ACTIONS } from '../../action.types';

const initialState = {
  videos: [],
  nextPageToken: null,
  loading: false,
  error: null,
};

export const searchVideosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SEARCH_VIDEOS_CLEAR:
      return { ...initialState };
    case ACTIONS.SEARCH_VIDEOS_START:
      return { ...state, loading: true };
    case ACTIONS.SEARCH_VIDEOS_FAILED:
      return { ...state, loading: false, error: payload };
    case ACTIONS.SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: state.videos
          ? [...state.videos, ...payload.videos]
          : payload.videos,
        nextPageToken: payload.nextPageToken,
      };
    default:
      return state;
  }
};
