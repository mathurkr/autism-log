import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { Button } from 'galio-framework';


export default class MainCamera extends Component {
    state = {
        hasCameraPermission: null,
        media: null
    };

    async componentDidMount() {
        try {
            // Check permissions to access the device's camera, audio recording capability, and photos
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const gallery = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            const hasCameraPermission = (camera.status === 'granted' && gallery.status === 'granted' && audio.status === 'granted');

            this.setState({ hasCameraPermission });
        }
        catch (err) {
            alert(err);
        }
    };

    _selectMedia = async () => {
        try {
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                allowsEditing: true,
                quality: 1
            });
            if (!cancelled) this.setState({ media: uri });
        } catch (error) {
            alert(error);
        }
    };

    _takePicture = async () => {
        try {
            const { cancelled, uri } = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                allowsEditing: false,
                quality: 1
            });
            this.setState({ media: uri });
        } catch (error) {
            alert(error);
        }
    };

    _takeVideo = async () => {
        try {
            const { cancelled, uri } = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                aspect: [4, 3],
                allowsEditing: false,
                quality: 1
            });
            this.setState({ media: uri });
        } catch (error) {
            alert(error);
        }
    };

    _finishSelection = () => {
        if (this.state.media !== null) {
            return (
                <View>
                    <Button
                        shadowless
                        round
                        color="#83A3FA"
                        onPress={() => this.props.navigation.navigate('Logs', { media: this.state.media })}
                        style={styles.button}
                    >
                        Finish
                    </Button>
                </View>
            )
        }
    }


    render() {
        if (this.state.hasCameraPermission === null) {
            return <View />;
        } else if (this.state.hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.state.media }} />
                <View>
                    <Button shadowless round color="#29d2e4" onPress={this._selectMedia} style={styles.button}>Add from Gallery</Button>
                    <Button shadowless round color="#29d2e4" onPress={this._takePicture} style={styles.button}>Take Picture</Button>
                    <Button shadowless round color="#29d2e4" onPress={this._takeVideo} style={styles.button}>Take Video</Button>
                </View>
                {this._finishSelection()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 400,
        height: 300,
        backgroundColor: 'gray'
    },
    button: {
        marginTop: 10
    }
});