import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';

import { Button } from 'galio-framework';

import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';

export default class Authenticate extends Component {
    state = {
        signedUp: false,
        loggedIn: false,
        authType: '',
        name: ''
    };

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ signedUp: params.signedUp, loggedIn: params.loggedIn });
    }

    componentDidUpdate() {
        const { navigate } = this.props.navigation;
        if (this.state.authType == 'Login') {
            navigate('Profile', { name: this.state.name });
        }
        else if (this.state.authType == 'Sign Up') {
            // Profile is a placeholder for now; should navigate to another page to complete registration process
            navigate('Profile', { name: this.state.name });
        }
    }

    _googleLogin = async signedUp => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "751957114156-lvkj70nh3oaihov2dl82nufuq0ra7a1m.apps.googleusercontent.com",
                iosClientId: "751957114156-gplohjh7bdca8l36rgtonsrchsr2sqrv.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                if (signedUp) {
                    this.setState({
                        loggedIn: true,
                        name: result.user.name,
                        authType: 'Login',
                        // photoUrl: result.user.photoUrl
                    });
                }
                else {
                    this.setState({
                        signedUp: true,
                        name: result.user.name,
                        authType: 'Sign Up',
                        // photoUrl: result.user.photoUrl
                    });
                }
            }
            else {
                console.log("cancelled");
            }
        }
        catch (e) {
            console.log("error", e);
        }
    }

    render() {
        // const { params } = this.props.navigation.state;
        let destinationPage = (this.state.signedUp) ? <Login _googleLogin={this._googleLogin.bind(this)} /> : <SignUp _googleLogin={this._googleLogin.bind(this)} />;

        return (
            <View style={styles.container}>
                {destinationPage}
            </View>
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
    // loginButton: {
    //     marginTop: 20,
    //     borderWidth: 1,
    //     borderColor: '#000000',
    //     color: '#ffffff'
    // }
});