import React, {Component} from 'react';
import {View,Text, TextInput, StyleSheet, Alert,Image,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {hook} from 'cavy';
class ResetPasswordRequest extends Component {
	static navigationOptions = {
		title : 'ResetPasswordRequest'
	}
	constructor(props){
		super(props)
		this.state = {
			UserEmail: ''	
		}
	}
    // Function that requests a password reset code for a given email account
	ResetPasswordRequest = () => {
		const {UserEmail} = this.state;
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/ResetPasswordRequest.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				email: UserEmail,
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {

		if(responseJson == "Success"){
			Alert.alert("A reset email has been sent to "+this.state.UserEmail);
			this.props.navigation.navigate("ConfirmCode", {screen: "ConfirmCode", email: this.state.UserEmail});
		}
		else{
			Alert.alert("That email doesn't match an account");
		}
      }).catch((error) => {
        console.error(error);
      });

	}

	render() {
		return (
		<KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
			<View style = {styles.container}>
				<View style = {styles.logoContainer}>
					<Text style = {styles.title}> DCU Library App 
					</Text>
					<Image
						style = {styles.logo}
						source = {require('./images/logo.png')} 
					/>	
				</View>
				<TextInput
					ref = {this.props.generateTestHook('ResetPasswordRequest.EmailTextInput')}
					placeholder = "Email"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					KeyboardType = 'email-address'
					autoCorrect = {false}
					onChangeText ={UserEmail => this.setState({UserEmail})}
					style = {styles.input}
				/>
				<TouchableOpacity
					ref = {this.props.generateTestHook('ResetPasswordRequest.ResetButton')}
					style = {styles.buttonContainer}
					onPress={() => this.ResetPasswordRequest()}>
					<Text style = {styles.buttontext}> Send reset email 
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>	
		);
	}
}
export default hook(ResetPasswordRequest);

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

  input: { 
	height: 40,
	backgroundColor : 'rgba(255,255,255,0.2)',
	marginBottom : 15,
	color : 'white',
	paddingHorizontal : 10,
	borderRadius : 25
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
	}
});