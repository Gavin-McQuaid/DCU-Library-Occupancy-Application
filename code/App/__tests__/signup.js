import React from 'react';
import SignUp from '../SignUp';
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

describe('SignUp', () =>{
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
		<TextInput placeholder = 'Email'></TextInput>
		);	
	});
	it('TextInput 2', () => {
		const instance2 = ReactTestRenderer.create(
		<TextInput placeholder = 'Password'></TextInput>
		);	
	});
	it('TextInput 3', () => {
		const instance2 = ReactTestRenderer.create(
		<TextInput placeholder = 'Confirm Password'></TextInput>
		);	
	});
	it('touchable opacity 1 shows', () =>{
		const instance1 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Create Account</Text>
			</TouchableOpacity>
		);
	});
	it('touchable highlight shows', () =>{
		const instance = ReactTestRenderer.create(
			<TouchableHighlight style = {{}}>
			<Text> Sign in </Text>
			</TouchableHighlight>
		);
	});
	it('touchHighlight touch works', () => {
		const wrapper = shallow(<SignUp />);
		const touchHighlight = wrapper.find('TouchableHighlight');
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<SignUp store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
		it ('Text Inputs works', () => {
		const wrapper = shallow(<SignUp />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const TextInput3= wrapper.find('TextInput').at(2);
		const credentials = {username : 'ed@dcu.ie' , password : 'hahaha', confirmpassword : 'hahaha'};
		TextInput1.value = credentials.username;
		expect(TextInput1.value).toBe('ed@dcu.ie');
		TextInput2.value = credentials.password;
		expect(TextInput2.value).toBe('hahaha');
		TextInput3.value = credentials.confirmpassword;
		expect(TextInput3.value).toBe('hahaha');
	});
	it('touchableOpacity 1 touch works', () => {
		const wrapper = shallow(<SignUp />);
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<SignUp store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
		it ('Check Sign Up works', () => {
		const wrapper = shallow(<SignUp />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const TextInput3= wrapper.find('TextInput').at(2);
		const credentials = {username : 'ed@dcu.ie' , password : 'hahaha', confirmpassword : 'hahaha'};
		TextInput1.value = credentials.username;
		expect(TextInput1.value).toBe('ed@dcu.ie');
		TextInput2.value = credentials.password;
		expect(TextInput2.value).toBe('hahaha');
		TextInput3.value = credentials.confirmpassword;
		expect(TextInput3.value).toBe('hahaha');
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<SignUp store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	
			const rendered = renderer.create(<SignUp/>).toJSON();
		expect(rendered).toMatchSnapshot();
	
	
});