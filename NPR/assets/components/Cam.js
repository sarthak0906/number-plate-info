import React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class ImagePickerExample extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
            />
            {image &&
            <Image source={{ uri: image.uri }} style={{ width: 257, height: 257 }} />}
        </View>
        );
    }

    createFormData = (photo, body) => {
        const data = new FormData();
      
        data.append("photo", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
      
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
      
        return data;
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
        this.setState({ image: result });
        }

        // this.photoUpload();
    };

    photoUpload = () => {
        fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: createFormData(this.state.image)
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