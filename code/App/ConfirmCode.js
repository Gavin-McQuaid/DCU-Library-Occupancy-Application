import React, {Component} from 'react';
import {View,Text, Alert, TextInput, StyleSheet, Image,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {hook} from 'cavy';
class ConfirmCode extends Component {
	static navigationOptions = {
		title : 'ConfirmCode'
	}

	constructor(props){
		super(props)
		this.state = {
			ResetCode: ''
		}
	}
    
    // Function that confirms an inputted password reset code with the server.
	ConfirmCode = () => {
		const {ResetCode} = this.state;
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/ConfirmCode.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				code: ResetCode,
				email: this.props.navigation.state.params.email
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {

		if(responseJson == "Success"){
			this.props.navigation.navigate("ResetPassword", {screen: "ResetPassword", email: this.props.navigation.state.params.email});
		}
		else{
			Alert.alert("That code is incorrect or expired");
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
					ref = {this.props.generateTestHook('ConfirmCode.TextInput')}
					placeholder = "6 Digit Number"
					placeholderTextColor = 'white'
					returnKeyType = 'next'
					autoCapitalize = 'none'
					autoCorrect = {false}
					onChangeText ={ResetCode => this.setState({ResetCode})}
					style = {styles.input}
				/>		
				<TouchableOpacity
					ref = {this.props.generateTestHook('ConfirmCode.Button')}
					style = {styles.buttonContainer}
					onPress={() => this.ConfirmCode()}>
					<Text style = {styles.buttontext}> Confirm code 
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>	
		);
	}
}

export default hook(ConfirmCode);
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'cornflowerblue',  
    flex: 1,

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