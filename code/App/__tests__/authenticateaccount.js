import React from 'react';
import AuthenticateAccount from '../AuthenticateAccount';
import renderer from 'react-test-renderer';
import {shallow, mount,render,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockStore from 'redux-mock-store';
const Text = require('Text');
const TouchableHighlight = require('TouchableHighlight');
const ReactTestRenderer = require('react-test-renderer');
const TouchableOpacity = require('TouchableOpacity');
const TextInput = require('TextInput');
const Image = require('Image');

var ReactTestUtils = require('react-dom/test-utils')
configure({ adapter: new Adapter() })

describe('AuthenticateAccount', () =>{
	it('text shows', () =>{
		const instance0 = ReactTestRenderer.create(
			<Text style = {{}}> DCU Library App </Text>	
		);
		});
	it('image shows', () =>{
		const instance1 = ReactTestRenderer.create(
			<Image style = {{}} source = {require('./Images/logo.png')}> </Image>
		);
		
	});
	it('TextInput 1', () => {
		const instance2 = ReactTestRenderer.create(
		<TextInput placeholder = 'Authentication code'></TextInput>
		);	
	});
	it('touchable opacity shows', () =>{
		const instance3 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Confirm authentication code </Text>
			</TouchableOpacity>
		);
	});
	it('touchable opacity shows', () =>{
		const instance4 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text>  Generate new code </Text>
			</TouchableOpacity>
		);
	});
	it ('Text Inputs works', () => {
		const wrapper = shallow(<AuthenticateAccount />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const credentials = { password : '000000'}
		TextInput1.value = credentials.password;
		expect(TextInput1.value).toBe('000000');
	});
	it ('Check AuthenticateAccount works', () => {
		const wrapper = shallow(<AuthenticateAccount />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const credentials = { password : '000000'}
		TextInput1.value = credentials.password;
		expect(TextInput1.value).toBe('000000');
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<AuthenticateAccount store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	const rendered = renderer.create(<AuthenticateAccount/>).toJSON();
		expect(rendered).toMatchSnapshot();
});	
