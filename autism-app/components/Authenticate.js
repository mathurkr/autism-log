import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';

import { Button } from 'galio-framework';

import MainAppNavigator from './navigation/MainAppNavigator'
// import Profile from './navigation/Profile';
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
            // Placeholder for now (with params possibly changing)
            navigate('Main', { name: this.state.name });
        }
        else if (this.state.authType == 'Sign Up') {
            // Placeholder for now (with params possibly changing); should navigate to another page to complete registration process
            navigate('Main', { name: this.state.name });
        }
    }

    _googleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "751957114156-lvkj70nh3oaihov2dl82nufuq0ra7a1m.apps.googleusercontent.com",
                iosClientId: "751957114156-gplohjh7bdca8l36rgtonsrchsr2sqrv.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                if (this.state.signedUp) {
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

    _validateEmail = email => {
        const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return expression.test(String(email).toLowerCase());
    }

    _validatePassword = password => {
        const expression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return expression.test(String(password));
    }

    render() {
        // const { params } = this.props.navigation.state;
        let destinationPage = (this.state.signedUp) ?
            <Login
                _googleLogin={this._googleLogin.bind(this)}
                _validateEmail={this._validateEmail.bind(this)}
            /> :
            <SignUp
                _googleLogin={this._googleLogin.bind(this)}
                _validateEmail={this._validateEmail.bind(this)}
                _validatePassword={this._validatePassword.bind(this)}
            />;

        return (
            <View style={styles.container}>
                {destinationPage}
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