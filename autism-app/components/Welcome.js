import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'galio-framework';


export default class Welcome extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    state = {
        signedUp: false,
        loggedIn: false
        // name: ''
    };

    _toSignUpPage() {
        this.props.navigation.navigate('Authenticate', { signedUp: this.state.signedUp, loggedIn: this.state.loggedIn })
    }

    _toLoginPage() {
        // Need a more formal way of checking if user has an account
        this.setState({ signedUp: true });
        this.props.navigation.navigate('Authenticate', { signedUp: this.state.signedUp, loggedIn: this.state.loggedIn })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button shadowless round color="#29d2e4" onPress={() => this._toSignUpPage()}>Sign Up</Button>
                <Button shadowless round color="#ffffff" onPress={() => this._toLoginPage()} style={styles.loginButton}>
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