/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './components/App';
import { name as appName } from './app.json';
import { UnsplashFeed } from './components/UnsplashFeed';
import { ComplexUnsplashFeed } from './components/ComplexUnslpashFeed';

AppRegistry.registerComponent(appName, () => ComplexUnsplashFeed);
