import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
// import * as Google from 'expo-google-app-auth';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { materialTheme, products, Images } from '../constants/';

import { withNavigation } from 'react-navigation';

import DB from './config/DatabaseConfig';


class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    };

    state = {
        email: '',
        password: '',
        // loggedIn: false,
        // name: ''
    };

    // constructor(props) {
    //     super(props);
    // }

    _userLogin() {
        if (this.state.email == '' || !(this.props._validateEmail(this.state.email))) {
            alert('Please Enter a valid email address');
        }
        else if (this.state.password == '') {
            alert('Please Enter Password');
        }
        else {
            // alert("Email: " + this.state.email + ", Password: " + this.state.password);

            // Sign in user to database (if they exist) with provided email and password (use sample user name for now)
            DB.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Main', { name: "Test" }))
                .catch(error => "User does not exist");
        }
    }

    _forgotPassword() {
        //const { navigate } = this.props.navigation;
        this.props.navigation.navigate('ForgotPassword');
        // alert("Forgot Password Clicked");
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Text h5>Welcome Back!</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="facebook-square" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Login with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.google} onPress={() => this.props._googleLogin()}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="google" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Login with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 5, marginBottom: 20 }}>OR LOGIN WITH EMAIL</Text>
                <Input placeholder="Email Address" style={styles.input} keyboardType={'email-address'} onChangeText={(text) => this.setState({ email: text })} />
                <Input placeholder="Password" value={this.state.password} style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} />
                <Text color="#0275d8" p style={styles.forgotPwd} onPress={() => this._forgotPassword()}>Forgot Password?</Text>
                <Button shadowless round color="#29d2e4" onPress={() => this._userLogin()}>Login</Button>
            </KeyboardAvoidingView>
        );
    }

};


const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    facebook: {
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: "#3b5998",
        borderRadius: 15,
    },
    google: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 48,
        backgroundColor: "#bf4334",
        borderRadius: 15,
    },
    iconText: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 3
    },
    input: {
        width: '89%'
    },
    forgotPwd: {
        fontSize: 12,
        textAlign: 'left',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginBottom: 20
    }
});

export default withNavigation(Login);

