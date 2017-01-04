/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Linking
} from 'react-native';



class EditScene extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : props.name,
            id : props.id,
            index : props.index
        }
    }
    updateName= (text) => {
        this.setState({name : text})
    }
    updateId= (text) => {
        this.setState({id : text})
    }
    getData = (text) => {
        return[{name : this.state.name, id : this.state.id}];
    }
    render(){
        return (
            <View style={styles.listContainer}>
                <Text> Edit name : </Text>
                      <TextInput
                        onChangeText={(text) => {this.updateName(text);this.props.update(this.state.index, this.getData(text))}}
                        value={this.state.name}
                      />
                <Text> name : { this.state.name} </Text>
                <Text> Edit id : </Text>
                        <TextInput
                          onChangeText={(text) => {this.updateId(text); this.props.update(this.state.index, this.getData(text))}}
                          value={this.state.id}
                      />
                 <Text> id : { this.state.id} </Text>
            </View>
        );
    }
}

class CarList extends React.Component{
    constructor(props){
        super(props);
        this.data = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
        this.state= {
            dataSource: this.data.cloneWithRows(
                [{name : "!!!!!", id : "1", index : "0"},{name : "ASDSADAS", id : '2', index : "1"}, {name : "A", id : '3', index : "2"},{name : "B" , id : '4', index : "3"},
                {name : "C", id : '5', index : "4"},{name : "D" , id : '6', index : "5"},{name : "E", id : '6', index : "6"}]
            )
        };
    }
    updateDs = (index, newData) => {
        var newDs = this.state.dataSource._dataBlob.s1.slice();
        newDs[index] = newData[0];
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(newDs)
         })
   }
    render(){
        return(
            <ListView style={styles.listContainer}
                dataSource={this.state.dataSource}
                renderRow={(rowData)=>
                        <TouchableOpacity onPress = {
                           ()=> {this.props.navigator.push({ index : 1 , passProps : {
                                name : rowData.name,
                                id : rowData.id,
                                index : rowData.index,
                                update : this.updateDs
                           }});
                               Linking.openURL('mailto:boceadacian@gmail.com?subject=OriginalValues&body='+"name : "+rowData.name + " id : " + rowData.id)
                           }}
                        >
                            <View>
                                <Text> Car name : { rowData.name } Car id : { rowData.id } </Text>
                            </View>
                        </TouchableOpacity>
                }
                renderSeparator = {
                    (sectionID, rowID, adjacentRowHighlighted) => <View key={rowID} style = {{height:1, backgroundColor : 'lightgray'}} />
                }
            />
        );
    }
}

//AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);


const routes = [
    {
        title : "CarListScene",
        index : 0
    },
    {
        title : "CarScene",
        index : 1
    }
]

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0 : return (<CarList navigator={navigator} route={routes[route.index]} {...route.passProps}> </CarList>);
                case 1 : return (<EditScene navigator={navigator} route={routes[route.index]} {...route.passProps}> </EditScene>);
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottom
          }
          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => { return null; },
               Title: (route, navigator, index, navState) =>
                 { return (<Text> {routes[route.index].title} </Text>); },
             }}
             style={styles.navigationBar}
           />
        }
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 60
  },
  navigationBar:{
    backgroundColor: 'green',
  }
});

AppRegistry.registerComponent('AwesomeProject', () => App);