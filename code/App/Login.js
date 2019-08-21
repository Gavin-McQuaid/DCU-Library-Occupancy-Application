import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, Alert, Image,ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import SignUp from './SignUp';
import Menu from './Menu';
import ResetPasswordRequest from './ResetPasswordRequest';
import ConfirmCode from './ConfirmCode';
import ResetPassword from './ResetPassword';
import Floor from './Floor';
import {StackNavigator} from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import {hook} from 'cavy';
class Login extends Component{
	static navigationOptions = {
		title : 'Login'
	}
	constructor(props){
		super(props)
		this.state = {
			UserEmail: '',
			UserPassword: ''
		}
	}

    // Function that handles login attempts by users
	Login = () => {
		const {navigate} = this.props.navigation;
		const {UserEmail} = this.state;
		const {UserPassword} = this.state;
		// Resets stack navigator when login is successful
		const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Menu', params: {email: UserEmail}})],
});
	// Resets stack navigator when login is successful but account needs authentication
	const resetActionAuthenticate = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'AuthenticateAccount', params: {email: UserEmail}})],
});
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/Login.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				email: UserEmail,
				password: UserPassword
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson == "Success"){
  		this.props.navigation.dispatch(resetAction);
        }
        else if(responseJson == "Account needs authentication") {
        	this.props.navigation.dispatch(resetActionAuthenticate);
        }
        else{
        	Alert.alert("Incorrect email and password combination");  	
        }
      }).catch((error) => {
        console.error(error);
      });

	}

	render() {	
		return (
		<ScrollView behavior = 'padding' style = {styles.container}>
			<View style = {styles.logoContainer}>
				<Text style = {styles.title}> DCU Library App 
				</Text>
				<Image
					style = {styles.logo}
					source = {require('./images/logo.png')} 
				/>		
			</View>
			<View style = {styles.formContainer}>
				<StatusBar
					barStyle = 'light-content'
				/>	
				<TextInput
				ref = {this.props.generateTestHook('Login.EmailTextInput')}
					placeholder = "Email"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					autoCorrect = {false}
					onChangeText ={UserEmail => this.setState({UserEmail})}
					style = {styles.input}
				/>
				<TextInput
					ref = {this.props.generateTestHook('Login.PasswordTextInput')}
					placeholder = "Password"
					placeholderTextColor = 'white'
					returnKeyType = 'go'
					autoCapitalize = 'none'
					secureTextEntry
					style = {styles.input}
					onChangeText ={UserPassword => this.setState({UserPassword})}
				/>
				<TouchableOpacity
					ref = {this.props.generateTestHook('Login.LoginButton')}
					style = {styles.buttonContainer}
					onPress={() => this.Login()}>
					<Text style = {styles.buttontext}> Login 
					</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					ref = {this.props.generateTestHook('Login.CreateAccountButton')}
					style = {styles.buttonContainer}
					onPress={() => this.props.navigation.navigate("SignUp", {screen: "SignUp"})}>
					<Text style = {styles.buttontext}> Create Account 
					</Text>
				</TouchableOpacity>
				<View style = {styles.signUpTextCont}>
					<Text style = {styles.signUpText}> Forgotten Your Password ? 
					</Text>
					<TouchableHighlight
						ref = {this.props.generateTestHook('Login.ResetPasswordButton')}
						onPress={() => this.props.navigation.navigate("ResetPasswordRequest", {screen: "ResetPasswordRequest"})}>
						<Text style = {styles.signUpButton}> Reset 
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		</ScrollView>
		)
	}
}
export default hook(Login);
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'cornflowerblue',  
    flex: 1,
	padding : 20
  },

  logoContainer: {
	alignItems : 'center',
	flexGrow : 1,
	justifyContent : 'center'
  },

  logo: {
	width : 200,
	height : 150
  },

  title : {
	color : 'white',
	marginBottom : 10,
	fontSize : 30,
	opacity : 0.9,
	justifyContent: 'center'
	
  },

  signUpTextCont: {
	flexGrow : 1,
	alignItems : 'flex-end',
	justifyContent : 'center',
	paddingVertical : 16,
	flexDirection : 'row'
  },

  signUpText: {
	color : 'rgba(255,255,255,.5)',
	fontSize : 16  
  },

  signUpButton: {
	color : 'white',
	fontWeight : '500',
	fontSize : 16  
  },

  buttonContainer: {
	backgroundColor :'steelblue',
	paddingVertical : 15,
	marginBottom : 15,
	borderRadius : 25
	},

  buttontext: {
	color : 'white',
	textAlign : 'center',
	fontWeight : '400'
	},

  input: { 
	height: 40,
	backgroundColor : 'rgba(255,255,255,0.2)',
	marginBottom : 15,
	color : 'white',
	paddingHorizontal : 10,
	borderRadius : 25
  }
});