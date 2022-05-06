import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Feed, Layout } from '../components';
import Channel from './Channel';
import Search from './Search';
import Subscriptions from './Subscriptions';
import Watch from './Watch';

const Home = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Feed />} exact />
        <Route path="/watch/:videoId" element={<Watch />} exact />
        <Route path="/search/:query" element={<Search />} exact />
        <Route path="/subscriptions" element={<Subscriptions />} exact />
        <Route path="/channel/:channelId" element={<Channel />} exact />
      </Routes>
    </Layout>
  );
};

export default Home;
