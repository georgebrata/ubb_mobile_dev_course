import React from 'react';
import {
    AsyncStorage,
    View,
    ListView,
    StyleSheet,
		ScrollView,
    Navigator,
    TouchableOpacity,
		TouchableHighlight,
    Text
} from 'react-native';

import * as Progress from 'react-native-progress';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Communications from 'react-native-communications';

var DomParser = require('xmldom').DOMParser;
var first = true;

const MOCKED_BOOKS = [
	{
		isbn: "1234134123",
		title: "A book",
		author: "An author",
	},
	{
		isbn: "123987534",
		title: "Another Book",
		author: "Another author",
	}
];

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 90,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#1A1A1A',
    },
    progress: {
        marginTop: 280,
				marginLeft: 80,
    },
		name: {
				fontSize: 15,
				padding: 15,
				color: '#000004',
		},
		button: {

			padding: 15,
			margin: 10,
			backgroundColor: 'lightblue',
			width: 85,
			alignSelf: 'flex-end',
		}
});

class ListScreen extends React.Component {
	constructor(props) {
			super(props);

			const ds = new ListView.DataSource({
					rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.state = {
					dataSource: ds.cloneWithRows(['row 1', 'row 2']),
					loaded: false,
			};
	}

	componentWillMount() {
			this.loadBooks();
	}

	loadBooks() {
			// if ( first ) {
			// 	var items = MOCKED_BOOKS;
			// 	AsyncStorage.setItem("bookList", JSON.stringify(items), ()=> {
			// 	});
			// }
			try {
					AsyncStorage.getItem("bookList", (error, obj)=> {
							//console.log(obj);
							if (obj) {
									this.setState({
											dataSource: this.state.dataSource.cloneWithRows(JSON.parse(obj)),
											loaded: true
									});
							}
					});
			}
			catch (error) {
					console.log('Error AsyncStorage');
			}
	}

	addBook(book) {
			AsyncStorage.getItem("bookList", (error, obj)=> {
					if (obj) {
							var items = JSON.parse(obj);

							items.push(book);
							AsyncStorage.setItem("bookList", JSON.stringify(items), ()=> {
									//console.log('new announcement', announcement);
							});
							this.setState({
									dataSource: this.state.dataSource.cloneWithRows(items),
									loaded: true
							});
					}
			});
	}

	deleteBook(book) {
			AsyncStorage.getItem("bookList", (error, obj)=> {
					if (obj) {
							var items = JSON.parse(obj);
							for (var i = 0; i < items.length; i++)
									if (items[i].isbn == book.isbn) {
											items.splice(i,1);
											break;
									}
							AsyncStorage.setItem("bookList", JSON.stringify(items), ()=> {
							});

							this.setState({
									dataSource: this.state.dataSource.cloneWithRows(items),
									loaded: true
							});
					}
			});
	}

	editBook(book) {
			AsyncStorage.getItem("bookList", (error, obj)=> {
					if (obj) {
							var items = JSON.parse(obj);
							for (var i = 0; i < items.length; i++)
									if (items[i].isbn == book.isbn) {
											items[i] = book;
									}
							AsyncStorage.setItem("bookList", JSON.stringify(items), ()=> {
							});
							this.setState({
									dataSource: this.state.dataSource.cloneWithRows(items),
									loaded: true
							});
					}
			});
	}

	render() {
			if (!this.state.loaded) {
					return (<View style={styles.progress}>
									<Text>Please wait ... </Text>
									<Progress.Bar progress={0.3} width={200} indeterminate={true}/>
							</View>
					);
			}
			AsyncStorage.getItem("bookList", (error, obj)=> {
					//console.log(obj);
					if (obj) {
							this.setState({
									dataSource: this.state.dataSource.cloneWithRows(JSON.parse(obj)),
									loaded: true
							});
					}
			});
			return (
				<ScrollView>
					<ListView style={styles.container}
										enableEmptySections={true}
										dataSource={this.state.dataSource}
										renderRow={(data) =>
												<TouchableOpacity onPress={()=> this.props.navigator.push({
														index: 1,
														passProps: {
																isbn: data.isbn,
																title: data.title,
																author: data.author,
														},
														dataSource : this.state.dataSource
												})}>
														<View>
																<Text style={styles.name}>{data.title}</Text>
														</View>
												</TouchableOpacity>
										}
										renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
												<View key={rowID} style={{height: 1, backgroundColor: 'lightgray'}}/>
										}
					/>

					<TouchableHighlight style={styles.button} onPress={()=>this.props.navigator.push({
							index: 1,
							passProps: {
									add: 1,
							},
							dataSource : this.state.dataSource
					})}>
							<Text>Add new</Text>
					</TouchableHighlight>
				</ScrollView>
			);
	}

}

export default ListScreen;
