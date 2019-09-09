import React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class ImagePickerExample extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Button
                title="Pick an image from camera roll"
                onPress={this. _pickImage}
            />
            <Button
                title="Pick an image from Midea Library"
                onPress={this. _pickLibImg}
            />
            {image &&
                <View> 
                    <Image source={{ uri: image.uri }} style={{ width: 257, height: 257 }} />
                    <Button
                        title="Enter"
                        onPress={this.photoUpload}
                    />
                </View>
            }
        </View>
        );
    }

    createFormData = (photo) => {
        const data = new FormData();
      
        data.append("photo", {
          name: photo.fileName,
          type: 'image/jpeg',
          uri : photo.uri
        });
      
        return data;
    };

    _pickImage = async () => {
        console.log('_pickImage start')
        let result = await ImagePicker.launchCameraAsync({
            // allowsEditing: false,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result });
            console.log(this.state.image);
        }
        else {
            console.log('nada')
        }

        // this.photoUpload();
    };
    
    _pickLibImg = async () => {
        console.log('_pickImage start')
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: false,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result });
            console.log(this.state.image);
        }
        else {
            console.log('nada')
        }

        // this.photoUpload();
    };

    photoUpload = () => {
        const url = 'http://ec2-13-235-48-5.ap-south-1.compute.amazonaws.com:8000/';
        console.log(this.state.image)
        fetch(url + 'predict', {
            method: "POST",
            body: this.createFormData(this.state.image)
        })
        // fetch('https://ipl-auctions.herokuapp.com/send', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // })
        // .then(response => response.json())
        .then(response => {
            console.log("upload succes", response.result);
            alert("Upload success!");

            this.props.handDownResponse(response.result);
        })
        .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
            alert(url);
        });
    }
}