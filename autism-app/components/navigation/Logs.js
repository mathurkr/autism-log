import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from 'galio-framework';

export default class Logs extends Component {

    _openCamera() {
        // Navigate to open Camera page for now
        this.props.navigation.navigate('CameraLog');
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
                <Text style={{ fontWeight: 'bold' }} p>Tap to open the camera</Text>
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
});

