import { request } from '../../common/request';
import { ACTIONS } from '../action.types';

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIONS.YOUTUBE_FEED_START,
    });
    const { data } = await request.get(`/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'PK',
        maxResults: 20,
        pageToken: getState().youtube.nextPageToken,
      },
    });

    const videos = data.items;
    console.log({ videos, nextPageToken: data.nextPageToken });
    dispatch({
      type: ACTIONS.YOUTUBE_FEED_SUCCESS,
      payload: { videos, nextPageToken: data.nextPageToken },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ACTIONS.YOUTUBE_FEED_FAILED,
      payload: error.message,
    });
  }
};

export const getVideosByCategory = keyword => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIONS.YOUTUBE_FEED_START,
      payload: {
        category: keyword,
      },
    });

    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().youtube.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });

    console.log(data);

    dispatch({
      type: ACTIONS.YOUTUBE_FEED_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ACTIONS.YOUTUBE_FEED_FAILED,
      payload: error.message,
    });
  }
};

export const getVideoById = videoId => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.SELECTED_VIDEO_START,
      });

      const {
        data: { items },
      } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics,snippet',
          id: videoId,
        },
      });

      dispatch({
        type: ACTIONS.SELECTED_VIDEO_SUCCESS,
        payload: items[0],
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.SELECTED_VIDEO_FAILED,
        payload: error.message,
      });
    }
  };
};

export const getChannelDetails = channelId => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTIONS.SELECTED_CHANNEL_START,
      });

      const {
        data: { items },
      } = await request.get('/channels', {
        params: {
          part: 'snippet, statistics',
          id: channelId,
        },
      });

      let subscriptionStatus = false;

      try {
        if (getState().auth && getState().auth.token) {
          const { data } = await request.get('/subscriptions', {
            params: {
              part: 'snippet',
              forChannelId: channelId,
              mine: true,
            },
            headers: {
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          if (data) {
            subscriptionStatus = data.items.length !== 0;
          }
        }
      } catch (error) {
        console.log(error);
      }

      dispatch({
        type: ACTIONS.SELECTED_CHANNEL_SUCCESS,
        payload: { ...items[0], subscriptionStatus },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.SELECTED_CHANNEL_FAILED,
        payload: error,
      });
    }
  };
};

export const getCommentsForVideo = videoId => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTIONS.VIDEO_COMMENTS_START,
      });
      const { data } = await request.get('/commentThreads', {
        params: {
          part: 'id,snippet,replies',
          videoId: videoId,
          maxResults: 5,
          pageToken: getState().videoComments.nextPageToken,
        },
      });

      dispatch({
        type: ACTIONS.VIDEO_COMMENTS_SUCCESS,
        payload: {
          comments: data.items,
          nextPageToken: data.nextPageToken,
          clearPrevious: getState().youtube?.selectedVideo?.id !== videoId,
        },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.VIDEO_COMMENTS_FAILED,
        payload: error,
      });
    }
  };
};

export const getRelatedVideos = videoId => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTIONS.RELATED_VIDEOS_START,
      });

      const { data } = await request('/search', {
        params: {
          part: 'snippet',
          relatedToVideoId: videoId,
          maxResults: 15,
          type: 'video',
          pageToken: getState().youtube.nextPageToken,
        },
      });

      const clearPrevious = getState().youtube?.selectedVideo?.id !== videoId;

      dispatch({
        type: ACTIONS.RELATED_VIDEOS_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          clearPrevious: clearPrevious,
        },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.RELATED_VIDEOS_FAILED,
        payload: error,
      });
    }
  };
};

export const clearRelatedVideos = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.RELATED_VIDEOS_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearFeedVideos = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.YOUTUBE_FEED_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearVideoComments = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.VIDEO_COMMENTS_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearSelectedVideo = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.SELECTED_VIDEO_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearSelectedChannel = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.SELECTED_CHANNEL_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSearchedVideos = query => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIONS.SEARCH_VIDEOS_START,
    });

    const { data } = await request('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: query,
        type: 'video,channel',
      },
    });

    dispatch({
      type: ACTIONS.SEARCH_VIDEOS_SUCCESS,
      payload: { videos: data.items, nextPageToken: data.nextPageToken },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ACTIONS.SEARCH_VIDEOS_FAILED,
      payload: error.message,
    });
  }
};

export const clearSearchVideos = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.SEARCH_VIDEOS_CLEAR,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAccountSubscriptions = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTIONS.SUBSCRIPTIONS_CHANNEL_REQUEST,
      });
      const { data } = await request('/subscriptions', {
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 15,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      dispatch({
        type: ACTIONS.SUBSCRIPTIONS_CHANNEL_SUCCESS,
        payload: data.items,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: ACTIONS.SUBSCRIPTIONS_CHANNEL_FAIL,
        payload: error.response.data,
      });
    }
  };
};

export const getVideosByChannel = id => async dispatch => {
  try {
    dispatch({
      type: ACTIONS.CHANNEL_VIDEOS_REQUEST,
    });
    const {
      data: { items },
    } = await request('/channels', {
      params: {
        part: 'contentDetails',
        id: id,
      },
    });
    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
    const { data } = await request('/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: ACTIONS.CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: ACTIONS.CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};
