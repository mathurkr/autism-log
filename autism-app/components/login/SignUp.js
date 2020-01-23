import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';

import DB from '../config/DatabaseConfig';


class SignUp extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    state = {
        email: '',
        password: '',
        // loggedIn: false,
        // name: ''
    };

    constructor() {
        super();
        this.ref = DB.firestore().collection('users');
    }

    _userSignUp() {
        if (this.state.email == '' || !(this.props._validateEmail(this.state.email))) {
            alert('Please enter a valid email address');
        }
        else if (this.state.password == '' || !(this.props._validatePassword(this.state.password))) {
            alert('Please enter a password containing at least 8 characters, with at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character');
        }
        else {
            // For testing purposes right now, add the email and password to cloud firestore on Firebase -- this step will be done at the very end in the final app
            // this.ref.add({
            //     email: this.state.email,
            //     password: this.state.password
            // }).catch((error) => {
            //     alert('There was an error adding the user to the DB');
            // });

            // Authenticate user email and password with database
            DB.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('SignUpForm', { email: this.state.email, password: this.state.password }))
                .catch(error => "There was an error authenticating the user with the database");

            // this.props.navigation.navigate('SignUpForm', { email: this.state.email, password: this.state.password });
        }
    }

    _showTermsOfService() {
        this.props.navigation.navigate('TermsOfService');
    }

    _showPrivatePolicy() {
        this.props.navigation.navigate('PrivatePolicy');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.signUp} behavior="padding">
                <Text h5>Welcome!</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="facebook-square" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Continue with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.google} onPress={() => this.props._googleLogin()}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="google" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Continue with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 5, marginBottom: 20 }}>OR SIGN UP WITH EMAIL</Text>
                <Input placeholder="New Email Address" style={styles.input} keyboardType={'email-address'} onChangeText={(text) => this.setState({ email: text })} />
                <Input placeholder="New Password" value={this.state.password} style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} />
                <Button shadowless round color="#29d2e4" style={{ marginTop: 20 }} onPress={() => this._userSignUp()}>Get Started</Button>
                <Text style={{ fontSize: 13, marginTop: 20 }}>By signing up, you agree to Chronaly's</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showTermsOfService()}>Terms of Service</Text>
                    <Text style={{ fontSize: 13 }}> and </Text>
                    <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showPrivatePolicy()}>Private Policy</Text>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    signUp: {
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
        paddingLeft: 24,
        paddingRight: 46,
        backgroundColor: "#bf4334",
        borderRadius: 15,
    },
    iconText: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 3
    },
    input: {
        width: '89%',
    },
    termsPolicyText: {
        fontSize: 14
    }
});

export default withNavigation(SignUp);