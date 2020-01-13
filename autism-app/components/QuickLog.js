import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'galio-framework';


export default class QuickLog extends Component {
    static navigationOptions = {
        title: 'Quick Log'
    };

    // state = {
    //     signedUp: false,
    //     loggedIn: false
    //     // name: ''
    // };

  
    render() {
        return (
            <View style={styles.container}>
                <Text>Location</Text>
                <Text>Date</Text>
                <Button shadowless round color="#ffffff" /* onPress={() => this._toLoginPage()} */ style={styles.submitButton}>
                    <Text>Submit</Text>
                </Button>
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
    submitButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff'
    }
});