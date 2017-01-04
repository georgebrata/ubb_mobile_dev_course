/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, {Component} from 'react';
import {
	AsyncStorage,
	Navigator,
	StatusBar,
	TouchableHighlight,
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {getLogger} from './utils/util';
import ListScreen from './list.js';
import DetailScreen from './details.js';
//import Picker from 'react-picker';
//import PieChart from './PieChart';

var listRef;
var log = getLogger("Index");

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const routes = [
	{
		title: "Book App",
		index: 0,
	},
	{
		title: "Book Detail",
		index: 1,
	},
	{
		title: "Add Book",
		index: 2,
	}
];

var items;
class App extends Component {

	constructor(props) {
		super(props);
		this.addCallback = this.addCallback.bind(this);
		this.editCallback = this.editCallback.bind(this);
		this.deleteCallback = this.deleteCallback.bind(this);

		this.refs = [];
		this.state = {
			items: []
		};
	}

	render() {
		return (

			<View style={styles.container}>
				<StatusBar

						barStyle="light-content"
				/>

				<Navigator
					ref="nav"
					initialRoute={routes[0]}
					initialRouteStack={routes}
					renderScene={
						(route, navigator) => {
							switch (route.index) {
								case 0:
									return (<ListScreen navigator={navigator}
																			route={routes[route.index]}
																			{...route.passProps}
																			ref={(list)=> {
																					listRef = list;
																			}}
																			list={this.state.items}
									></ListScreen>);
									case 1:
										return (<DetailScreen navigator={navigator}
																					route={routes[route.index]}
																					{...route.passProps}
																					list={this.state.items}
																					editBook={this.editCallback}
																					addBook={this.addCallback}
																					deleteBook={this.deleteCallback}
										></DetailScreen>);
							}
						}
					}
					configureScene={
						(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft
					}
					navigationBar={
						<Navigator.NavigationBar
								routeMapper={{
										LeftButton: (route, navigator, index, navState) => {
												if (route.index == 0) {
														return null;
												}
												return (
														<TouchableHighlight onPress={()=>navigator.pop()}>
																<Text style={styles.navigationBarText}>Back</Text>
														</TouchableHighlight>
												)
										},
										RightButton: (route, navigator, index, navState) => {
												return null;
										},
										Title: (route, navigator, index, navState) => {
												return (<Text
														style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>);
										},
								}}
								style={styles.navigationBar}
						/>
					}
				/>

			</View>
		);
	}

	addCallback(book) {
		listRef.addBook(book);
	}
	editCallback(book) {
		listRef.editBook(book);
	}
	deleteCallback(book) {
		listRef.deleteBook(book);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigationBar: {
        backgroundColor: 'blue',
    },
    navigationBarText: {
        color: 'red',
        padding: 10,
        fontSize: 15
    },
    titleText: {
        fontSize: 20,
        paddingTop: 5
    }

});

AppRegistry.registerComponent('books', () => App);
