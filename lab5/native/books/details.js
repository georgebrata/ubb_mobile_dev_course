import React, {Component} from 'react';
import {
    ListView,
    AsyncStorage,
    ScrollView,
    TextInput,
    TouchableHighlight,
		Picker,
		Item,
		DatePickerAndroid,
		Alert,
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ART
} from 'react-native';

class DetailScreen extends Component {
	constructor(props) {
			super(props);
			this.state = {};
			this.state.presetDate =  new Date(2020, 4, 5);
		 	this.state.allDate = new Date(2020, 4, 5);
		 	this.state.simpleText = 'pick a date';
			this.state.isbn = props.isbn;
			this.state.title = props.title;
			this.state.author = props.author;
			this.state.width = 200;
			this.state.height = 200;
			this.state.data = [];
			this.state.items = props.items;
	}

	_onPressButton() {
			this.props.editBook(this.state);
			this.props.navigator.push({index: 0});
	}

	_onPressButton1() {
			this.props.addBook(this.state);
			this.props.navigator.push({index: 0});
	}

	_onPressButton2() {
			this.props.deleteBook(this.state);
			this.props.navigator.push({index: 0});
	}

	async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

	onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

	render() {
		if ( this.props.add ) {
			return (
					<ScrollView style={styles.container}>
							<Text> ISBN: </Text>
							<TextInput
									keyboardType='numeric'
									defaultValue={this.props.isbn}
									onChange={(event) => this.setState({isbn: event.nativeEvent.text})}
									value={this.state.isbn}
							/>
							<Text>Title:</Text>
							<TextInput
									defaultValue={this.props.title}
									onChange={(event) => this.setState({title: event.nativeEvent.text})}
									value={this.state.title}
							/>
							<Text>Author:</Text>
							<TextInput
									defaultValue={this.state.author}
									onChange={(event) => this.setState({author: event.nativeEvent.text})}
									value={this.state.author}
							/>

							<TouchableHighlight style={styles.button} onPress={()=>this._onPressButton1(this)}>
									<Text>Add new</Text>
							</TouchableHighlight>


							<TouchableHighlight
							    onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
							    <Text style={styles.text}>{this.state.simpleText}</Text>
							</TouchableHighlight>



					</ScrollView>
			);
		}
		else {
			return (
					<ScrollView style={styles.container}>
							<Text> ISBN: </Text>
							<TextInput
									keyboardType='numeric'
									defaultValue={this.props.isbn}
									onChange={(event) => this.setState({isbn: event.nativeEvent.text})}
									value={this.state.isbn}
							/>
							<Text>Title:</Text>
							<TextInput
									defaultValue={this.props.title}
									onChange={(event) => this.setState({title: event.nativeEvent.text})}
									value={this.state.title}
							/>
							<Text>Author:</Text>
							<TextInput
									defaultValue={this.state.author}
									onChange={(event) => this.setState({author: event.nativeEvent.text})}
									value={this.state.author}
							/>
							<TouchableHighlight style={styles.button} onPress={()=>this._onPressButton(this)}>
									<Text>Save</Text>
							</TouchableHighlight>
							<TouchableHighlight style={styles.button} onPress={()=>
								Alert.alert(
            			'Warning',
            			'Are you sure you want to delete this book?',
            			[
              			{text: 'No', onPress: () => console.log("noooo") },
              			{text: 'Yes', onPress: () => this._onPressButton2(this) },
            			])
								}>
									<Text>Delete</Text>
							</TouchableHighlight>

					</ScrollView>
			);
		}
	}
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 70,
    },
		picker: {
    		width: 100,
  	},
		button: {
				padding: 10,
				marginLeft: 140,
				marginRight: 140,
				marginBottom: 2,
				marginTop: 2,
				backgroundColor: 'lightblue',
		}
});

export default DetailScreen;
