import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

export default class ProfileSetUp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is the Profile Set Up Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});