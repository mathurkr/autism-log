import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'galio-framework';


export default class Welcome extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    // state = {
    //     signedUp: false,
    //     loggedIn: false
    //     // name: ''
    // };

    _toSignUpPage() {
        this.props.navigation.navigate('Authenticate', { signedUp: false, loggedIn: false })
    }

    _toLoginPage() {
        // Need a more formal way of checking if user has an account
        // this.setState({ signedUp: true });
        this.props.navigation.navigate('Authenticate', { signedUp: true, loggedIn: false })
    }

    render() {
        return (
            <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}> Welcome to Luminous </Text>
                <Text> Offering a better way to manage developmental disabilities and help children and adults with autism </Text>
                <Button shadowless round color="#29d2e4" onPress={() => this._toSignUpPage()} style={styles.signup}> SIGN UP</Button>
                <Button shadowless round color="#ffffff" onPress={() => this._toLoginPage()} style={styles.loginButton}>
                    <Text>LOG IN</Text>
                </Button>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40
    },
    header: {
        fontSize: 20,
        marginBottom: 27,
        fontWeight: 'bold',
        marginTop: 36,
        },
    
    subTitle: {
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: 20
    },

    signup: {
       marginBottom: 11, 
       marginTop: 103
    },

    loginButton: {
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff',
    },

});

