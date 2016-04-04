/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import Main from './app/components/Main.js';

class githubNotetaker extends Component {
  debugger;
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Main,
          title: 'My Main View'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // requiered!
    backgroundColor: '#f3f3f3',
  }
});

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
