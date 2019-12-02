import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SignUp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Currently a blank Sign Up Page</Text>
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