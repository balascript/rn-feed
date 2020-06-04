/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import { UnsplashFeed } from './UnsplashFeed';

const App = () => {
  return (
    <SafeAreaView>
      <UnsplashFeed />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
});

export default App;
