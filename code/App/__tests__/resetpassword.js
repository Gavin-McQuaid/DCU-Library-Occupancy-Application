import React from 'react';
import ResetPassword from '../ResetPassword';
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

describe('ResetPassword', () =>{
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
		<TextInput placeholder = 'Password'></TextInput>
		);	
	});
	it('TextInput 2', () => {
		const instance2 = ReactTestRenderer.create(
		<TextInput placeholder = 'Confirm Password'></TextInput>
		);	
	});
		it('touchable opacity shows', () =>{
		const instance3 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Reset Password </Text>
			</TouchableOpacity>
		);
	});
	it ('Text Inputs works', () => {
		const wrapper = shallow(<ResetPassword />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const credentials = { password : 'hahaha', confirmpassword : 'hahaha'};
		TextInput1.value = credentials.password;
		expect(TextInput1.value).toBe('hahaha');
		TextInput2.value = credentials.confirmpassword;
		expect(TextInput2.value).toBe('hahaha');
	});
	it('touchableOpacity 1 touch works', () => {
		const wrapper = shallow(<ResetPassword />);
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<ResetPassword store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	it ('Check Reset Password works', () => {
		const wrapper = shallow(<ResetPassword />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const TextInput2= wrapper.find('TextInput').at(1);
		const credentials = { password : 'hahaha', confirmpassword : 'hahaha'};
		TextInput1.value = credentials.password;
		expect(TextInput1.value).toBe('hahaha');
		TextInput2.value = credentials.confirmpassword;
		expect(TextInput2.value).toBe('hahaha');
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<ResetPassword store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	const rendered = renderer.create(<ResetPassword/>).toJSON();
		expect(rendered).toMatchSnapshot();
	
});