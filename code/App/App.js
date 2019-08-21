import React, { Component } from 'react';
import { StyleSheet, Text, View ,AppRegistry} from 'react-native';
import Login from './Login';
import {StackNavigator} from 'react-navigation';
import SignUp from './SignUp';
import Menu from './Menu';
import ResetPasswordRequest from './ResetPasswordRequest';
import ConfirmCode from './ConfirmCode';
import ResetPassword from './ResetPassword';
import Floor from './Floor';
import AuthenticateAccount from './AuthenticateAccount';
import Settings from './Settings';

const App = StackNavigator({
    Login : {screen : Login},
	Menu: { screen: Menu},
    ConfirmCode: {screen: ConfirmCode},
	Floor : {screen : Floor},
	SignUp : {screen : SignUp},
	ResetPasswordRequest : {screen : ResetPasswordRequest},
	ResetPassword : {screen : ResetPassword},
	Settings: { screen: Settings},
    AuthenticateAccount: { screen: AuthenticateAccount}
})

export default App;








