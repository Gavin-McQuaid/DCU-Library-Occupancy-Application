import React from 'react';
import Settings from '../Settings';
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
import { ListItem } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
const FlatList = require('FlatList');
var ReactTestUtils = require('react-dom/test-utils')
configure({ adapter: new Adapter() })

describe('Settings Page', () =>{
		it ('list shows',() => {
		const instance1 = ReactTestRenderer.create(
		<FlatList
		data={[{ key: 'Log out', },
  { key: 'Delete Account'}]}
  renderItem={({item}) => <ListItem title={item.key} />}
		/>
		);
	});
	it('Flatlist itemworks', () => {
		const wrapper = shallow(<Settings />);
		const Item1 = wrapper.find('FlatList');
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		Item1.simulate('click');
		expect(renderer.create(<Settings store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	const rendered = renderer.create(<Settings/>).toJSON();
		expect(rendered).toMatchSnapshot();
});