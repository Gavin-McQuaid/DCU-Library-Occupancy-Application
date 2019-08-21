import { AppRegistry } from 'react-native';
import App from './App';
import React, { Component } from 'react';
import { Tester, TestHookStore } from 'cavy';
import AppSpec from './specs/Appspec';

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore} waitTime={4000} >
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent('App', () => AppWrapper);
