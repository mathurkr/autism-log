import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';

import { Button } from 'galio-framework';

import Profile from './Profile';
import Login from './Login';

export default class Authenticate extends Component {
    state = {
        loggedIn: false,
        name: ''
    };

    _googleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "751957114156-lvkj70nh3oaihov2dl82nufuq0ra7a1m.apps.googleusercontent.com",
                iosClientId: "751957114156-gplohjh7bdca8l36rgtonsrchsr2sqrv.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                this.setState({
                    loggedIn: true,
                    name: result.user.name,
                    // photoUrl: result.user.photoUrl
                });
                // this.props.navigation.navigate('Profile', { name: this.state.name });
            }
            else {
                console.log("cancelled");
            }
        }
        catch (e) {
            console.log("error", e);
        }
    }

    componentDidUpdate() {
        const { navigate } = this.props.navigation;
        if (this.state.loggedIn) {
            navigate('Profile', { name: this.state.name })
        }
    }

    render() {
        return (
            <Login _googleLogin={this._googleLogin.bind(this)} />
            // navigate('Login', { onGoogleLogin: this._googleLogin.bind(this) })
            // <View style={styles.container}>
            //     {/* {this.state.loggedIn ? (
            //         // <Profile name={this.state.name} />
            //         this.props.navigation.navigate('Profile', { name: this.state.name })
            //     ) : (
            //             // <Login _googleLogin={this._googleLogin.bind(this)} />
            //             this.props.navigation.navigate('Login', { onGoogleLogin: this._googleLogin.bind(this) })
            //         )} */}
            // </View>
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