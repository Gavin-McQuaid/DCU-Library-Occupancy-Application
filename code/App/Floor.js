import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert,Image, ScrollView,RefreshControl} from 'react-native';
import {hook} from 'cavy';
class Floor extends Component {
	static navigationOptions = {
		title : 'Floor'
	}

	constructor(props){
		super(props)
		this.state = {
		  imageUri: 'http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/heatmaps/'+ this.props.navigation.state.params.image + "?" + new Date(),
		  textualDescription: '',
		  refreshing: false
		}
	}

	//Function that fetches the textual descriptions from the database
	fetchData(){
		fetch('http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/TextualDescription.php', {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'applcation/json'
			},
			body: JSON.stringify({
				floor: this.props.navigation.state.params.floor
			}) 
		}).then((response) => response.json())
      .then((responseJson) => {
		if(responseJson != "Failure"){
			 this.setState({textualDescription: responseJson});
		}
		else{
			Alert.alert("Something went wrong");
		}

      }).catch((error) => {
        console.error(error);
      });
	}

	// Function called when user pulls down on page to refresh image and textual description
	_onRefresh() {
	this.setState({ imageUri:"http://ec2-34-244-240-250.eu-west-1.compute.amazonaws.com/heatmaps/"+ this.props.navigation.state.params.image + "?" + new Date() });
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
    };
    
    // Function called when Floor component has mounted
 	componentWillMount(){
 		this.fetchData();
 	}

	render() {
		return (
		<ScrollView style = {styles.container}
			refreshControl={
          		<RefreshControl
            		refreshing={this.state.refreshing}
            		onRefresh={this._onRefresh.bind(this)}
          		/>}>		
			<View style = {styles.floorContainer}>
				<Text style = {styles.title}>
					{this.props.navigation.state.params.floor} 
				</Text>
				<Image
					style = {styles.floor}
					cache= 'reload'		
					source = {{uri: this.state.imageUri}}
				/>
				<Image
					style = {styles.scale}		
					source = {require('./images/scale.png')}
				/>                                                        
			</View> 			
			<Text style = {styles.description}>
				{this.state.textualDescription}
			</Text>			
		</ScrollView>	
		);
	}
}

export default hook(Floor);
const styles = StyleSheet.create({
  container: {
	backgroundColor : 'cornflowerblue',  
    flex: 1,
  },
    
  floorContainer: {
	alignItems : 'center',
	flexGrow : 1,
	justifyContent : 'center'
  },
  
  floor: {
	width : 400,
	height : 200,
	marginBottom: 15
  },

  scale:{
  	width:256,
  	height: 30
  },

  title: {
	color : 'white',
	marginBottom : 10,
	fontSize : 30,
	opacity : 0.9,
	justifyContent: 'center'
	
  },

  description: {
	color : 'white',
	fontSize : 16,
	padding : 15,
	justifyContent : 'center'
	}
});	