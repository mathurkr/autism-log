import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'galio-framework';


export default class Welcome extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    // state = {
    //     loggedIn: false,
    //     signedUp: false,
    //     name: ''
    // };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Button shadowless round color="#29d2e4" onPress={() => navigate('SignUp')}>Sign Up</Button>
                <Button shadowless round color="#ffffff" onPress={() => navigate('Authenticate')} style={styles.loginButton}>
                    <Text>Login</Text>
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
    loginButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff'
    }
});