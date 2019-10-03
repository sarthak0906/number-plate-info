import React from 'react';
import { Text, Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default class ImagePickerExample extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        Response: "HAHAHAHAHAHAHAHAHA",
        image: null,
        wb: false
    };

    render() {
        let { image } = this.state;

        return (
            <View>
                <Text>{this.state.Response}</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this. _pickImage}
                    />
                    <Button
                        title="Pick an image from Media Library"
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
            </View>
        );
    }

    createFormData = (photo) => {
        const data = new FormData();
      
        data.append("photo", {
          name: 'test',
          type: 'image/png',
          uri : photo
        });
      
        return data;
    };

    _pickImage = async () => {
        console.log('_pickImage start')
        let result = await ImagePicker.launchCameraAsync({
            base64: true,
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
            base64: true,   
            // allowsEditing: false,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result });
            // console.log(this.state.image.base64);
        }
        else {
            console.log('nada')
        }

        // this.photoUpload();
    };

    photoUpload = () => {
        const url = 'http://ec2-52-66-47-27.ap-south-1.compute.amazonaws.com:8002/fileUp';
        var r;
        // let img = this.createFormData(this.state.image);
        // console.log(img)
        fetch(url, {
            method: 'POST',
            headers:{  
                "Content-Type": "application/json",
                // "otherHeader": "foo",
            },
            body : JSON.stringify({
                "b64" : this.state.image.base64
            })
        })
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson.res);
            r = (myJson.res);
            r = r.substring(0, r.length - 2);
            console.log(r);
            r = r + "  Belongs to Mr. A P J Abdul Kalam";
            console.log(r);
            console.log(typeof r);
            console.log(JSON.stringify(myJson));
        })
        .then(() => {
            this.setState({Response: r});
        })
        .catch(error => {
            console.log("upload error", error);
            // alert("Upload failed!");
            // alert(url);
        });
    }
}