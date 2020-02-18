import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Button, Text } from 'galio-framework';

export default class Logs extends Component {

    _openCamera() {
        // Navigate to open Camera page for now
        this.props.navigation.navigate('Camera');
    }

    _showMedia() {
        if (this.props.navigation.state.params) {
            const { params } = this.props.navigation.state;
            return (
                <View>
                    <Image style={styles.image} source={{ uri: params.media }} />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onlyIcon
                    icon="camera"
                    iconFamily="antdesign"
                    iconSize={35}
                    color="#83A3FA"
                    iconColor="#fff"
                    style={{ width: 75, height: 75 }}
                    onPress={() => this._openCamera()}
                >
                </Button>
                <Text style={styles.text} p>Tap to add media</Text>
                {this._showMedia()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 300,
        backgroundColor: 'gray',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold',
        marginTop: 10
    }
});


// import React, { Component } from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// // import ImagePicker from 'react-native-image-picker';

// // import * as ImagePicker from 'expo-image-picker';
// // import * as Permissions from 'expo-permissions';
// // import Constants from 'expo-constants';

// import { Button } from 'galio-framework';


// export default class Logs extends Component {
//     state = {
//         // hasCameraPermission: null,
//         media: null
//     };

//     async componentDidMount() {
//         try {
//             const camera = await Permissions.askAsync(Permissions.CAMERA);
//             const gallery = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//             const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//             const hasCameraPermission = (camera.status === 'granted' && gallery.status === 'granted' && audio.status === 'granted');

//             this.setState({ hasCameraPermission });
//         }
//         catch (err) {
//             alert(err);
//         }
//     };

//     selectPicture = async () => {
//         try {
//             // await Permissions.askAsync(Permissions.CAMERA);
//             // await Permissions.askAsync(Permissions.CAMERA_ROLL);
//             const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.All,
//                 aspect: [4, 3],
//                 allowsEditing: true,
//                 quality: 1
//             });
//             if (!cancelled) this.setState({ media: uri });
//         } catch (error) {
//             alert(error);
//         }
//     };

//     selectVideo = async () => {
//         try {
//             // await Permissions.askAsync(Permissions.CAMERA);
//             // await Permissions.askAsync(Permissions.CAMERA_ROLL);
//             const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//                 aspect: [4, 3],
//                 allowsEditing: true,
//                 quality: 1
//             });
//             if (!cancelled) this.setState({ media: uri });
//         } catch (error) {
//             alert(error);
//         }
//     };

//     takePicture = async () => {
//         try {
//             // await Permissions.askAsync(Permissions.CAMERA);
//             const { cancelled, uri } = await ImagePicker.launchCameraAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 aspect: [4, 3],
//                 allowsEditing: false,
//                 quality: 1
//             });
//             this.setState({ media: uri });
//         } catch (error) {
//             alert(error);
//         }
//     };

//     takeVideo = async () => {
//         try {
//             // await Permissions.askAsync(Permissions.CAMERA);
//             const { cancelled, uri } = await ImagePicker.launchCameraAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//                 aspect: [4, 3],
//                 allowsEditing: false,
//                 quality: 1
//             });
//             this.setState({ media: uri });
//         } catch (error) {
//             alert(error);
//         }
//     };



//     render() {
//         if (this.state.hasCameraPermission === null) {
//             return <View />;
//         } else if (this.state.hasCameraPermission === false) {
//             return <Text>Access to camera has been denied.</Text>;
//         }
//         return (
//             <View style={styles.container}>
//                 <Image style={styles.image} source={{ uri: this.state.media }} />
//                 <View>
//                     <Button onPress={this.selectPicture}>Gallery</Button>
//                     <Button onPress={this.takePicture}>Take Picture</Button>
//                     <Button onPress={this.takeVideo}>Take Video</Button>
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     row: {
//         flexDirection: 'row'
//     },
//     image: {
//         width: 400,
//         height: 300,
//         backgroundColor: 'gray'
//     },
// });

    // selectPicture = async () => {
    //     ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.uri };

    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //             this.setState({
    //                 image: source,
    //             });
    //         }
    //     });
    // };

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             {
    //                 this.state.image && <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} />
    //             }
    //             <Button shadowless round color="#29d2e4" onPress={this.selectPicture}>Select Picture</Button>
    //         </View>

    //     );
    // }





