import React, {Component} from 'react';
import {View,Text, Alert, TextInput, StyleSheet, Image,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
//Comment line above and uncomment line below if you want to run integration tests using Cavy and the iOS simulator
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {hook} from 'cavy';
import { NavigationActions } from 'react-navigation';
class AuthenticateAccount extends Component {
	static navigationOptions = {
		title : 'AuthenticateAccount'
	}
	constructor(props){
		super(props)
		this.state = {
			AuthenticationCode: ''
		}
	}

    // Function that authenticates a code with the database when the code is entered into the text field and submitted
	AuthenticateCode = () => {
		const {AuthenticationCode} = this.state;
		const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Menu', params: {email: this.props.navigation.state.params.email}})],
});
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/AuthenticateCode.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				code: AuthenticationCode,
				email: this.props.navigation.state.params.email
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {
		if(responseJson == "Success"){
			this.props.navigation.dispatch(resetAction);
		}
		else{
			Alert.alert("That code is incorrect or expired");
		}
      }).catch((error) => {
        console.error(error);
      });
	}

	// Function that triggers the generation of a new code for a given email address
	GenerateCode = () => {
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/GenerateCode.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				email: this.props.navigation.state.params.email
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {
		if(responseJson == "Success"){
			Alert.alert("Check your email");
		}
		else{
			Alert.alert("Something went wrong");
		}
      }).catch((error) => {
        console.error(error);
      });}

	render() {
		return (
		<KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
			<View style = {styles.container}>
				<View style = {styles.topBar}
					ref = {this.props.generateTestHook('AuthenticateAccount.topBar')}> 
					<Ionicons name="md-settings" 
						size={40} 
						color="#FFFFFF"
			    		onPress={() => this.props.navigation.navigate("Settings", 
			    			{screen: "Settings", email: this.props.navigation.state.params.email })}
			    	/>
				</View>
				<View style = {styles.logoContainer}>
					<Text style = {styles.title}> DCU Library App 
					</Text>
					<Image
						style = {styles.logo}
						source = {require('./images/logo.png')} 
					/>					
				</View>
				<TextInput
					ref = {this.props.generateTestHook('AuthenticateAccount.code')}
					placeholder = "Authentication code"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					autoCorrect = {false}
					onChangeText ={AuthenticationCode => this.setState({AuthenticationCode})}
					style = {styles.input}
				/>		
				<TouchableOpacity
					ref = {this.props.generateTestHook('AuthenticateAccount.codeButton')}
					style = {styles.buttonContainer}
					onPress={() => this.AuthenticateCode()}>
					<Text style = {styles.buttontext}> Confirm authentication code 
					</Text>
				</TouchableOpacity>
				<TouchableOpacity	
					style = {styles.buttonContainer}
					onPress={() => this.GenerateCode()}
					ref = {this.props.generateTestHook('AuthenticateAccount.newcodeButton')}>
					<Text style = {styles.buttontext}> Generate new code 
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>	
		);
	}
}

export default hook(AuthenticateAccount);
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'cornflowerblue',  
    flex: 1,
  },

  logoContainer: {
	alignItems: 'center',
	flexGrow: 1,
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
	},

  topBar: {
	backgroundColor : 'cornflowerblue',  
	height:50,
	alignSelf: 'flex-end',
	paddingRight: 3,
	}
});