import React, {Component} from 'react';
import { Image, KeyboardAvoidingView, View, TextInput, Alert,StyleSheet, TouchableOpacity, Text, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import {hook} from 'cavy';

class ResetPassword extends Component{
	static navigationOptions = {
		title : 'ResetPassword'
	}

	constructor(props){
		super(props)
		this.state = {
			NewPassword: '',
			NewPasswordConfirm: '',
			PasswordError: '',
			PasswordConfirmationError: ''		
		}
	}

	// Function that checks entered password is at least eight characters long
	ValidatePassword = () => {	
	    if(this.state.NewPassword.length < 8){
			this.setState({PasswordError: "Passwords must not be empty and at least 8 characters long"})
			return false
		}
		else{
			this.setState({PasswordError: ""})
			return true
		}
	}

	// Function that checks entered password matches password confirmation field
	PasswordsMatch = () => {
		if(this.state.NewPassword !== this.state.NewPasswordConfirm || this.state.NewPasswordConfirm.length < 8){
			this.setState({PasswordConfirmationError: "Passwords don't match"})
			return false
		}
		else{
			this.setState({PasswordConfirmationError: ""})
			return true
		}
	}
	
   // Carries out one final validation check before password can be reset
   FinalValidation = () => {
		passwordOk = this.ValidatePassword();
		passwordsMatch = this.PasswordsMatch();
		if(passwordOk){
			this.ResetPassword();}
		}


	// Function that resets a user's password to the new password they've entered and confirmed
	ResetPassword = () => {
		const {NewPassword} = this.state;
		const {NewPasswordConfirm} = this.state;
		const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login'})],
});
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/ResetPassword.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				password: NewPassword,
				password_confirmation: NewPasswordConfirm,
				email: this.props.navigation.state.params.email
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {

		if(responseJson == "Success"){
			Alert.alert("Password reset successfully");
			this.props.navigation.dispatch(resetAction);
		}
      }).catch((error) => {
        console.error(error);
      });
       }

	render() {
		return (
		<KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
			<View style = {styles.container}>
				<StatusBar
					barStyle = 'light-content'
				/>	
				<View style = {styles.logoContainer}>
					<Text style = {styles.title}> DCU Library App 
					</Text>
					<Image
						style = {styles.logo}
						source = {require('./images/logo.png')} 
					/>
				</View>
				<TextInput
					ref = {this.props.generateTestHook('ResetPassword.PasswordTextInput')}
					placeholder = "Password"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					secureTextEntry
					style = {styles.input}
					onChangeText ={NewPassword => this.setState({NewPassword},() => this.ValidatePassword())}
				/>
				<Text style = {styles.errorText} >{this.state.PasswordError}
				</Text>
				<TextInput
					ref = {this.props.generateTestHook('ResetPassword.ConfirmPasswordTextInput')}
					placeholder = "Confirm password"
					placeholderTextColor = 'white'
					returnKeyType = 'go'
					autoCapitalize = 'none'
					secureTextEntry
					style = {styles.input}
					onChangeText ={NewPasswordConfirm=> this.setState({NewPasswordConfirm}, () => this.PasswordsMatch())}
				/>
				<Text style = {styles.errorText} >{this.state.PasswordConfirmationError}
				</Text>
				<TouchableOpacity
					ref = {this.props.generateTestHook('ResetPassword.ResetButton')}
					style = {styles.buttonContainer}
					onPress={() => this.FinalValidation()}>
					<Text style = {styles.buttontext}> Reset Password
					</Text>
				</TouchableOpacity>		
			</View>
		</KeyboardAvoidingView>	
		)
	}
}
export default hook(ResetPassword);
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'cornflowerblue',  
    flex: 1,

  },

  logoContainer : {
	alignItems : 'center',
	flexGrow : 1,
	justifyContent : 'center'
  
  },

  logo: {
	width : 200,
	height : 150
  },
  title: {
	color : 'white',
	marginBottom : 10,
	fontSize : 30,
	opacity : 0.9,
	justifyContent: 'center'
	
  },

  errorText:{
  	color: 'white'
  },

  input: { 
	height: 40,
	backgroundColor : 'rgba(255,255,255,0.2)',
	marginBottom : 15,
	color : 'white',
	paddingHorizontal : 10,
	borderRadius : 25
	},

  buttonContainer : {
	backgroundColor :'steelblue',
	paddingVertical : 15,
	marginBottom : 15,
	borderRadius : 25
	},

  buttontext : {
	color : 'white',
	textAlign : 'center',
	fontWeight : '400'
	}

});	