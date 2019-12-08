import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';


class SignUp extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    state = {
        email: '',
        // password: '',
        // loggedIn: false,
        // name: ''
    };

    _userSignUp() {
        if (this.state.email == '') {
            alert('Please Enter Email');
        }
        else {
            alert("Email: " + this.state.email);
        }
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text>Currently a blank Sign Up Page</Text>
            // </View>
            <KeyboardAvoidingView style={styles.signUp} behavior="padding">
                <Text h5>Welcome Back!</Text>
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
                <Input placeholder="Email Address" style={styles.input} onChangeText={(text) => this.setState({ email: text })} />
                <Button shadowless round color="#29d2e4" onPress={() => this._userSignUp()}>Get Started</Button>
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
        paddingLeft: 37,
        paddingRight: 37,
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
        marginBottom: 20
    }
});

export default withNavigation(SignUp);