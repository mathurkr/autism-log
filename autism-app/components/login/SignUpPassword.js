import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Text, Input, theme } from 'galio-framework';

import DB from '../config/DatabaseConfig';

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default class SignUpPassword extends Component {
    state = {
        //email: '',
        //password: '',
    };

    componentDidMount() {
        // const { params } = this.props.navigation.state;
        // this.setState({ email: params.email });
    }
 


    // Store Email and Password into DB
    _storeEmailPassword() {
        this.props.navigation.navigate('NameSetup',
        {
            password: this.state.password,
        });
        console.log("Here2")
        // const { params } = this.props.navigation.state;
        // if (this.state.password == '' || !(params.validatePassword(this.state.password))) {
        //     alert('Please enter a password containing at least 8 characters, with at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character');
        // }
        // else {
        //     // Authenticate user email and password with database
        //     DB.auth()
        //         .createUserWithEmailAndPassword(this.state.email, this.state.password)
        //         .then(() => this.props.navigation.navigate('SignUpForm', { email: this.state.email, password: this.state.password }))
        //         .catch(error => "There was an error authenticating the user with the database");
        // }
    }

    render() {
        return (
            <DismissKeyboard> 
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image style={{ width: 50, height: 50, marginTop: "8%", marginBottom: 24,  }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />

                <Text h5 style={{ marginBottom: 10, paddingHorizontal: '10%', textAlign: 'center', marginBottom: 15 }}>Welcome to Luminous! </Text>
                <Text h5 style={{ fontSize: 16, marginBottom: 30, paddingHorizontal: 50, textAlign: 'center', }}> Realtime, convenient recording &amp; mangement of autism </Text>
                <Text style={{  paddingHorizontal: 39, marginBottom: 10 }}>Set a password</Text>

                <Input placeholder="Enter Password" style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} />

                <Text style={{ marginBottom: 10, paddingHorizontal: 65, textAlign: 'center', marginBottom: 20 }}>Your password should be at least 8 characters </Text>

                <Button shadowless round color="#29d2e4" style={{ marginTop: 5 }} onPress={() => this._storeEmailPassword()}>Continue</Button>
            </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '33%',
    },
    input: {
        width: '89%',
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        height: 50
    },
});