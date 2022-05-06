import { ACTIONS } from '../action.types';

const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  error: null,
  category: 'All',
  selectedVideo: null,
  selectedChannel: null,
};

const initialCommentsState = {
  comments: [],
  nextPageToken: null,
  loading: false,
  error: null,
};

const initialRelatedVideosState = {
  videos: [],
  nextPageToken: null,
  loading: false,
  error: null,
};

export const videoComments = (state = initialCommentsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.VIDEO_COMMENTS_CLEAR:
      return { ...initialCommentsState };
    case ACTIONS.VIDEO_COMMENTS_START:
      return { ...state, loading: true };
    case ACTIONS.VIDEO_COMMENTS_FAILED:
      return { ...state, loading: false, error: payload };
    case ACTIONS.VIDEO_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments:
          state.comments && !payload.clearPrevious
            ? [...state.comments, ...payload.comments]
            : payload.comments,
        nextPageToken: payload.nextPageToken,
      };
    default:
      return state;
  }
};

export const relatedVideosReducer = (
  state = initialRelatedVideosState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.RELATED_VIDEOS_START:
      return { ...state, loading: true };
    case ACTIONS.RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos:
          state.videos && !payload.clearPrevious
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
      };
    case ACTIONS.RELATED_VIDEOS_FAILED:
      return { ...state, error: payload, loading: false };
    case ACTIONS.RELATED_VIDEOS_CLEAR:
      return { ...initialRelatedVideosState };
    default:
      return state;
  }
};

export const youtubeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.YOUTUBE_FEED_CLEAR:
      return { ...initialState };
    case ACTIONS.YOUTUBE_FEED_FAILED:
      return { ...state, error: payload };
    case ACTIONS.YOUTUBE_FEED_START:
      return {
        ...state,
        loading: true,
        category: payload?.category ? payload.category : 'All',
      };
    case ACTIONS.YOUTUBE_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        videos:
          state.category === 'All'
            ? [...payload.videos, ...state.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        category: payload.category ? payload.category : 'All',
      };
    case ACTIONS.SELECTED_VIDEO_CLEAR:
      return { ...state, selectedVideo: null };
    case ACTIONS.SELECTED_VIDEO_FAILED:
      return { ...state, loading: false, error: payload };
    case ACTIONS.SELECTED_VIDEO_START:
      return { ...state, loading: true };
    case ACTIONS.SELECTED_VIDEO_SUCCESS:
      return { ...state, loading: false, selectedVideo: payload };
    case ACTIONS.SELECTED_CHANNEL_CLEAR:
      return { ...state, selectedChannel: null };
    case ACTIONS.SELECTED_CHANNEL_FAILED:
      return { ...state, loading: false, error: payload };
    case ACTIONS.SELECTED_CHANNEL_START:
      return { ...state, loading: true };
    case ACTIONS.SELECTED_CHANNEL_SUCCESS:
      return { ...state, loading: false, selectedChannel: payload };
    default:
      return state;
  }
};
