import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import ImagePicker from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Button } from 'galio-framework';


export default class QuickCamera extends Component {
    state = {
        hasCameraPermission: null,
        media: null
    };

    async componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('willFocus', async () => {
            // The screen is focused
            try {
                // Check permissions to access the device's camera, audio recording capability, and photos
                const camera = await Permissions.askAsync(Permissions.CAMERA);
                // const gallery = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
                const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

                if (hasCameraPermission === null) {
                    return <View />;
                } else if (hasCameraPermission === false) {
                    return <Text>Access to camera has been denied.</Text>;
                } else {
                    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        aspect: [4, 3],
                        allowsEditing: false,
                        quality: 1
                    });
                    // let resetHome = NavigationActions.reset({ index: 1, actions: [NavigationActions.init({ routeName: 'Home' })] });
                    // this.props.navigation.dispatch(resetHome);
                    this.props.navigation.navigate('Logs', { media: uri });

                    // this.setState({ media: uri });
                }
            }
            catch (err) {
                alert(err);
            }

        });
    };

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    // _takeMedia = async () => {
    //     try {
    //         const { cancelled, uri } = await ImagePicker.launchCameraAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.All,
    //             aspect: [4, 3],
    //             allowsEditing: false,
    //             quality: 1
    //         });
    //         this.setState({ media: uri });
    //     } catch (error) {
    //         alert(error);
    //     }
    // };

    // _finishMediaCapture = () => {
    //     if (this.state.media !== null) {
    //         this.props.navigation.navigate('Logs', { media: this.state.media });
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>

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
    }
});