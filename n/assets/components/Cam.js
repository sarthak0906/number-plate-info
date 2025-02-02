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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            title="Pick an image from camera roll"
            onPress={this. _pickImage}
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
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
        this.setState({ image: result });
        }

        // this.photoUpload();
    };

    photoUpload = () => {
        console.log(this.state.image)
        // fetch("http://ec2-13-235-48-5.ap-south-1.compute.amazonaws.com:8000/predict", {
        //     method: "POST",
        //     body: this.createFormData(this.state.image)
        // })
        fetch('http://www.ec2-13-235-48-5.ap-south-1.compute.amazonaws.com:8000/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");

            this.props.handDownResponse(response);
        })
        .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
        });
    }
}