import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

export default class Profile extends Component {
    render() {
        // const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text>This is the Profile Screen</Text>
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