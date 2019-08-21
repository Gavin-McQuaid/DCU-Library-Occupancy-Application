import React from 'react';
import Menu from '../Menu';
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
describe('Menu Page', () =>{
	it( 'icon shows', () => {
		const instance0 = ReactTestRenderer.create(
		<Icon name = 'cog'></Icon>
		);
	});	
	it ('list shows',() => {
		const instance1 = ReactTestRenderer.create(
		<FlatList
		data={[{ key: 'Basement', image: 'basement.png'},
{ key: 'Ground Floor', image: 'ground.png'},
  { key: 'First Floor', image: 'first.png'},
  { key: 'Second Floor', image: 'second.png'}]}
  renderItem={({item}) => <ListItem title={item.key} />}
		/>
		);
	});
	it('Flatlist itemworks', () => {
		const wrapper = shallow(<Menu />);
		const Item1 = wrapper.find('FlatList');
		const store = mockStore({});
		const navigation = {navigate : jest.fn()};
		expect(renderer.create(<Menu store = {store} navigation = {navigation} />)).toMatchSnapshot();
	});
	const rendered = renderer.create(<Menu/>).toJSON();
		expect(rendered).toMatchSnapshot();
});


