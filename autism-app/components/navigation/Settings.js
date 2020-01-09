import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

export default class Settings extends Component {
    render() {
        // const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text>This is the Settings Screen</Text>
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