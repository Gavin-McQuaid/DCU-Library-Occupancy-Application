import React from 'react';
import Floor from '../Floor';
import renderer from 'react-test-renderer';
import {shallow, mount,render,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
const Text = require('Text');
const TouchableHighlight = require('TouchableHighlight');
const ReactTestRenderer = require('react-test-renderer');
const TouchableOpacity = require('TouchableOpacity');
const TextInput = require('TextInput');
const Image = require('Image');

describe('Floor', () =>{
	it('text shows', () =>{
		const instance0 = ReactTestRenderer.create(
			<Text style = {{}}> Floor 1 </Text>	
		);
		});
	it('image shows', () =>{
		const instance1 = ReactTestRenderer.create(
			<Image style = {{}} source = {require('./Images/sample.png')}> </Image>
		);
		
	});
	
});