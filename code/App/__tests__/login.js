import React from 'react';
import Login from '../Login';
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

describe('Login Page', () =>{
	it('touchable highlight shows', () =>{
		const instance = ReactTestRenderer.create(
			<TouchableHighlight style = {{}}>
			<Text> Reset </Text>
			</TouchableHighlight>
		);
	});
		it('touchable opacity 1 shows', () =>{
		const instance2 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Login </Text>
			</TouchableOpacity>
		);
	});
	it('touchable opacity 2 shows', () =>{
		const instance2 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Create Account </Text>
			</TouchableOpacity>
		);
	});
	it('textInput 1 shows', () =>{
		const instance3 = ReactTestRenderer.create(
			
			<TextInput placeholder = 'Password'> </TextInput>
			
		);
	});
	it('textInput 2 shows', () =>{
		const instance4 = ReactTestRenderer.create(
			<TextInput placeholder = 'Email'> </TextInput>
		);
	});
	it('text shows', () =>{

		const instance6 = ReactTestRenderer.create(
			<Text style = {{}}> DCU Library App </Text>	
		);
	});
	it('image shows', () =>{
		const instance7 = ReactTestRenderer.create(
			<Image style = {{}} source = {require('./Images/logo.png')}> </Image>	
		);
	});
	it('touchHighlight touch works', () => {
		const wrapper = shallow(<Login />);
		const touchHighlight = wrapper.find('TouchableHighlight');
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<Login store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	it('touchableOpacity 1 touch works', () => {
		const wrapper = shallow(<Login />);
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<Login store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	it('touchableOpacity 2 touch works', () => {
		const wrapper = shallow(<Login />);
		const touchOpacity2 = wrapper.find('TouchableOpacity').at(1);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<Login store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	it ('Text Inputs works', () => {
		const wrapper = shallow(<Login />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const credentials = {username : 'ed@dcu.ie' , password : 'hahaha'};
		TextInput1.value = credentials.username;
		expect(TextInput1.value).toBe('ed@dcu.ie');
		TextInput2.value = credentials.password;
		expect(TextInput2.value).toBe('hahaha')
	});
	it ('Check Login works', () => {
		const wrapper = shallow(<Login />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const credentials = {username : 'ed@dcu.ie' , password : 'hahaha'};
		TextInput1.value = credentials.username;
		expect(TextInput1.value).toBe('ed@dcu.ie');
		TextInput2.value = credentials.password;
		expect(TextInput2.value).toBe('hahaha')
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<Login store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
		const rendered = renderer.create(<Login/>).toJSON();
		expect(rendered).toMatchSnapshot();
	
});




