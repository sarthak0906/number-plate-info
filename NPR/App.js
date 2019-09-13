import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Cam from './assets/components/Cam'
import Constants from 'expo-constants';

export default class App extends React.Component{
  constructor(props){
    super(props);
    
    this.handleResponse = this.handleResponse.bind(this);
  }
  
  state = {
    Response: "Open up App.js to start working on your app have fun!",
    MidLib: false,
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.Response}</Text>
        <Cam 
        style={styles.cam} 
        handDownResponse={this.handleResponse} />
      </View>
    );
  }

  handleResponse = (p) => {
    this.setState({Response: p});
    console.log('something intresting going on')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cam: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
