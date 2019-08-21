import React, {Component} from 'react';
import {Text,View, TouchableHighlight, Alert,AppRegistry ,StyleSheet, Image,KeyboardAvoidingView,TouchableOpacity,FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
//Comment line above and uncomment line below if you want to run integration tests using Cavy and the iOS simulator
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { hook} from 'cavy';
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login', screen: 'Login' })],
});

class Menu extends Component{
	static navigationOptions = {
	title : 'Menu'
	}
	
	render() {
		return (
		<View style = {styles.container}>
			<View style = {styles.topBar}
			 	ref = {this.props.generateTestHook('Menu.topBar')}> 
				<Ionicons 
					name="md-settings" 
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
			<FlatList 
				style = {styles.Flat}
				scrollEnabled={false}
  				data={[{ key: 'Basement', image: 'basement.png'},
  					   { key: 'Ground Floor', image: 'ground.png'},
  					   { key: 'First Floor', image: 'first.png'},
   					   { key: 'Second Floor', image: 'second.png'}]}
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
  					onPress={() => this.props.navigation.navigate("Floor", {screen: "Floor", image: item.image, 
  					email: this.props.navigation.state.params.email, 
  					floor: item.key  })}
  				/>}
			/>	
		</View>		
		);
	}
}
export default hook(Menu);
const styles = StyleSheet.create({
	container: {
		backgroundColor : 'cornflowerblue',  
		flex:1,
		justifyContent : 'center'
	},

	topBar: {
		backgroundColor: 'cornflowerblue',  
		height: 50,
		alignSelf: 'flex-end',
		paddingRight: 3,
	},
	
	Flat: {
		paddingTop: 10,
		margin:0,
		flex: 1,
		backgroundColor : 'cornflowerblue',	
    },

  	titles: {
  		color: 'white',
  		fontSize: 22,
  		justifyContent: 'center'
  	},

    logoContainer: {
		alignItems : 'center',
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
	}
  
});