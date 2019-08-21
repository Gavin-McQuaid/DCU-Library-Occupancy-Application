import React, {Component} from 'react';
import {View, Text, Alert, TextInput, StyleSheet, StatusBar, Image,ScrollView,KeyboardAvoidingView, TouchableOpacity,TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {hook} from 'cavy';
class SignUp extends Component{

	static navigationOptions = {
		title: "SignUp"
	}
	constructor(props){
		super(props)
		this.state = {
			NewUserEmail: '',
			NewUserPassword: '',
			NewUserPasswordConfirmation:'',
			EmailError: '',
			PasswordError: '',
			PasswordConfirmationError: ''
		
		}
	}
	// Validates email account entered to check it's a DCU email address
	ValidateEmail = () => {
		var emailregex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dcu)\.ie$/;
		if(!emailregex.test(String(this.state.NewUserEmail).toLowerCase())){
			this.setState({EmailError: "Valid DCU email required"})
			return false
		}
		else{
			this.setState({EmailError: ""})
			return true
		}
	}

	// Validates password entered to check it's at least eight characters
	ValidatePassword = () => {	
	    if(this.state.NewUserPassword.length < 8){
			this.setState({PasswordError: "Passwords must not be empty and at least 8 characters long"})
			return false
		}
		else{
			this.setState({PasswordError: ""})
			return true
		}
	}

	// Checks password entered matches confirmation field
	PasswordsMatch = () => {
		if(this.state.NewUserPassword !== this.state.NewUserPasswordConfirmation || this.state.NewUserPasswordConfirmation.length < 8){
			this.setState({PasswordConfirmationError: "Passwords don't match"})
			return false
		}
		else{
			this.setState({PasswordConfirmationError: ""})
			return true
		}
	}

	// One final validation check triggered when Create Account button is pressed
	FinalValidation = () => {
		emailOk = this.ValidateEmail();
		passwordOk = this.ValidatePassword();
		passwordsMatch = this.PasswordsMatch();
		if(emailOk  && passwordOk && passwordsMatch){
			this.CreateAccount();
		}
		else{
		Alert.alert("Your details didn't meet validation requirements")
		}
	}

	// Function that creates a new user account
	CreateAccount = () => {	
		const {NewUserEmail} = this.state;
		const {NewUserPassword} = this.state;
		const {NewUserPasswordConfirmation} = this.state;
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/CreateAccount.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				email: NewUserEmail,
				password: NewUserPassword,
				password_confirmation: NewUserPasswordConfirmation

			}) 
		}).then((response) => response.json())
      .then((responseJson) => {
 
 		
		if(responseJson == "User registered successfully"){
			this.GenerateCode(NewUserEmail)
			this.props.navigation.navigate("Login", {screen: "Login"})
		}
		else{
			Alert.alert("Email already in use! Please use another email account")
		}
      }).catch((error) => {
        console.error(error);
      })
      ;}

      GenerateCode = (email) => {
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/GenerateCode.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				email: email
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {

		if(responseJson == "Success"){
			Alert.alert("Account created successfully, check your email for authentication code");
		}
		else{
			Alert.alert("Something went wrong");
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
					ref = {this.props.generateTestHook('SignUp.EmailTextInput')}
					placeholder = "Email"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					KeyboardType = 'email-address'
					autoCorrect = {false}
					onChangeText ={NewUserEmail => this.setState({NewUserEmail},() => this.ValidateEmail())}
					style = {styles.input}
				/>
				<Text style = {styles.errorText} >{this.state.EmailError}
				</Text>
				<TextInput
					ref = {this.props.generateTestHook('SignUp.PasswordTextInput')}
					placeholder = "Password"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					secureTextEntry
					style = {styles.input}
					onChangeText ={NewUserPassword => this.setState({NewUserPassword}, () => this.ValidatePassword())}
				/>
				<Text style = {styles.errorText} >{this.state.PasswordError}
				</Text>
				<TextInput
					ref = {this.props.generateTestHook('SignUp.ConfirmPasswordTextInput')}
					placeholder = "Confirm Password"
					placeholderTextColor = 'white'
					returnKeyType = 'go'
					autoCapitalize = 'none'
					secureTextEntry
					style = {styles.input}
					onChangeText ={NewUserPasswordConfirmation => this.setState({NewUserPasswordConfirmation},() => this.PasswordsMatch() )}
				/>
				<Text style = {styles.errorText} >{this.state.PasswordConfirmationError}
				</Text>
				<TouchableOpacity 
					ref = {this.props.generateTestHook('SignUp.CreateAccountButton')}
					style = {styles.buttonContainer}
					onPress={() => this.FinalValidation()}>
					<Text style = {styles.buttontext}> Create Account 
					</Text>
				</TouchableOpacity>
				<View style = {styles.signUpTextCont}>
					<Text style = {styles.signUpText}> Already have an account? 
					</Text>
					<TouchableHighlight
						ref = {this.props.generateTestHook('SignUp.SignInButton')}
						onPress={() => this.props.navigation.navigate("Login", {screen: "Login"})}>
						<Text style = {styles.signUpButton}> Sign in 
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		</ScrollView>
		)
	}
}
export default hook(SignUp);
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

  title: {
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

  errorText:{
  	color: 'white'
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