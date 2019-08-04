import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cam from './assets/components/Cam'
import Constants from 'expo-constants';

export default function App() {
  state = {
    Response: "Open up App.js to start working on your app!",
  };
  
  return (
    <View style={styles.container}>
      <Text>{this.state.Response}</Text>
      <Cam style={styles.cam} _setImage={this._pickImage} handDownResponse={this.handleResponse} />
    </View>
  );

  handleResponse = (p) => {
    this.setState({Response: p});
  }

  _pickImage = async ({uri }) => {
    alert('pickImage')
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      // alert(result.uri);
      this.setState({ image: result.uri });
    }
  };
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
