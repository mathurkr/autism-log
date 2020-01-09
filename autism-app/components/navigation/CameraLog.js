import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class CameraLog extends Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        try {
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

            this.setState({ hasCameraPermission });
        }
        catch (err) {
            alert(err);
        }
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View>
                <Camera
                    style={styles.container}
                    ref={camera => this.camera = camera}
                />
            </View>
        );
    }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }
});

