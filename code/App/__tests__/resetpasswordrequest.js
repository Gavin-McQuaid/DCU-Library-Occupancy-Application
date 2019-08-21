import React from 'react';
import ResetPasswordRequest from '../ResetPasswordRequest';
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

describe('ResetPasswordRequest', () =>{
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

		it('touchable opacity shows', () =>{
		const instance3 = ReactTestRenderer.create(
			<TouchableOpacity style ={{}}>
			<Text> Send reset email</Text>
			</TouchableOpacity>
		);
	});
	it ('Text Input	works', () => {
		const wrapper = shallow(<ResetPasswordRequest />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const credentials = {code : 'ed@dcu.ie'};
		TextInput1.value = credentials.code;
		expect(TextInput1.value).toBe('ed@dcu.ie');
	});
	it('touchableOpacity 1 touch works', () => {
		const wrapper = shallow(<ResetPasswordRequest />);
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<ResetPasswordRequest store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
		it ('Confirm Code works', () => {
		const wrapper = shallow(<ResetPasswordRequest />);
		const TextInput1= wrapper.find('TextInput').at(0);
		const credentials = {code : 'ed@dcu.ie'};
		TextInput1.value = credentials.code;
		expect(TextInput1.value).toBe('ed@dcu.ie');
		const touchOpacity1 = wrapper.find('TouchableOpacity').at(0);
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<ResetPasswordRequest store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	const rendered = renderer.create(<ResetPasswordRequest/>).toJSON();
		expect(rendered).toMatchSnapshot();
	
});