import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Splash extends Component{
	render() {
		return (
		<View style = {styles.container}>
			<Text>'Hello world'
			</Text>
		</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'powderblue',  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});