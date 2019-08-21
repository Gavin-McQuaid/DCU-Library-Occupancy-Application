import React, {Component} from 'react';
import {Text,View, TouchableHighlight, Alert,AppRegistry ,StyleSheet, Image,KeyboardAvoidingView,TouchableOpacity,FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
//Comment line above and uncomment line below if you want to run integration tests using Cavy and the iOS simulator
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {hook} from 'cavy';
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login', screen: 'Login' })],
});

class Settings extends Component{
	static navigationOptions = {
	title : 'Settings'
	}
	
	// Function that performs an action based on what list item in the options a user selects
	SelectOption = (Value) => {		
		if(Value == "Delete Account"){
			Alert.alert(
  'Deletion confirmation',
  'Are you sure you want to delete your account?',
  [
    {text: 'Yes', onPress: () => this.DeleteAccount()},
    {text: 'Cancel', onPress: () => console.log("Deletion cancelled")},
  ] 
)
		}
		// Logs a user out
		else if(Value == "Log out"){
			this.props.navigation.dispatch(resetAction);
		}
			}

	// Function that deletes a user's account
	DeleteAccount = () => {
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/DeleteAccount.php', {
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
      		Alert.alert("Your account has been successfully deleted.");
      		this.props.navigation.dispatch(resetAction);

      	}
      	else{
      		Alert.alert("Something went wrong.");
      	}
      }).catch((error) => {
        console.error(error);
      });

	}
	
	render() {
		return (
			<View style = {styles.container}>
				<View style = {styles.logoContainer}>
					<Text style = {styles.title}> DCU Library App 
					</Text>
					<Image
					style = {styles.logo}
					source = {require('./images/logo.png')} 
					/>			
			</View>
			<FlatList 
				style = {styles.Flat}
				scrollEnabled={false}
  				data={[{ key: 'Log out', value: 'Logout' },
  					   { key: 'Delete Account', value: 'DeleteAccount'}]}
  				renderItem={({item}) => 
  				<ListItem containerStyle= 
  						{{padding:0,margin:0, flex:1, backgroundColor : 'cornflowerblue', paddingTop: 15}}
  						title={item.key} 
  						titleStyle = {styles.titles}
  						rightIcon={<Ionicons 
  										name="ios-arrow-dropright" 
  										size={20} 
  										color="#FFFFFF"
								   />}
  						onPress={() => this.SelectOption(item.key)}
  				/>}
			/>	
		</View>		
		);
	}
}
export default Settings;
const styles = StyleSheet.create({
	container: {
		backgroundColor : 'cornflowerblue',  
		flex:1,
		justifyContent : 'center'
	},

	topBar: {
		backgroundColor : 'cornflowerblue',  
		height:50,
		alignSelf: 'flex-end',
		paddingRight: 3,
	},

	Flat: {
		paddingTop: 15,
		margin:0,
		flex: 1,
		backgroundColor : 'cornflowerblue'
	},

  	titles: {
  		color : 'white',
  		fontSize : 22,
  		justifyContent : 'center'
  	},
        
    logoContainer : {
		alignItems : 'center',
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
	}
  
});