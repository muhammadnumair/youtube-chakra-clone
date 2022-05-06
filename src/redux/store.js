import { combineReducers, createStore, applyMiddleware } from 'redux';
import { authReducer } from './reducers/auth.reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  relatedVideosReducer,
  videoComments,
  youtubeReducer,
} from './reducers/youtube.reducer';
import { searchVideosReducer } from './reducers/youtube-reducers/searchVideos.reducer';
import { channelReducer } from './reducers/youtube-reducers/channel.reducer';

const storeReducer = combineReducers({
  auth: authReducer,
  youtube: youtubeReducer,
  videoComments: videoComments,
  relatedVideos: relatedVideosReducer,
  searchVideos: searchVideosReducer,
  channel: channelReducer,
});

const store = createStore(
  storeReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
