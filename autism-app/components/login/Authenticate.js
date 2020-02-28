import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';

// import { GoogleSignin } from 'react-native-google-signin';
import { Button } from 'galio-framework';

// import MainAppNavigator from './navigation/MainAppNavigator'
// import Profile from './navigation/Profile';
import Login from './Login';
import SignUp from './SignUp';

export default class Authenticate extends Component {
    state = {
        signedUp: false,
        loggedIn: false,
        authType: '',
        name: '',
        user: null
    };

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ signedUp: params.signedUp, loggedIn: params.loggedIn });
        // this._initAsync();
    }

    componentDidUpdate() {
        const { navigate } = this.props.navigation;
        if (this.state.authType == 'Login') {
            let email = "";  // Get email here from Google OAuth Firebase authentication
            navigate('Main', { email: email, date: new Date() });
        }
        else if (this.state.authType == 'Sign Up') {
            let email = "";  // Get email here from Google OAuth Firebase authentication
            navigate('NameSetup', { email: email });
        }
    }

    // _initAsync = async () => {
    //     await GoogleSignIn.initAsync({
    //         clientId: '778168364367-0gpki6l1kr01ebgurh9ea8m4cdmuv78d.apps.googleusercontent.com'
    //     });
    //     this._syncUserWithStateAsync();
    // }

    // _syncUserWithStateAsync = async () => {
    //     const user = await GoogleSignIn.signInSilentlyAsync();
    //     if (this.state.signedUp) {
    //         this.setState({
    //             loggedIn: true,
    //             user: user,
    //             authType: 'Login'
    //         });
    //     }
    //     else {
    //         this.setState({
    //             signedUp: true,
    //             user: user,
    //             authType: 'Sign Up'
    //         });
    //     }
    // }

    _googleLogin = async () => {
        try {

            // await GoogleSignIn.askForPlayServicesAsync();
            // const { type, user } = await GoogleSignIn.signInAsync();
            // if (type === 'success') {
            //     this._syncUserWithStateAsync();
            // }
            // else {
            //     alert("Could not authenticate user through Google");
            // }

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
            // else {
            //     console.log("cancelled");
            // }
        }
        catch (message) {
            alert('login: Error:' + message);
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