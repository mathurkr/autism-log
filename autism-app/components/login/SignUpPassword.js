import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Text, Input, theme } from 'galio-framework';

import DB from '../config/DatabaseConfig';


export default class SignUpPassword extends Component {
    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ email: params.email });
    }


    // Store Email and Password into DB
    _storeEmailPassword() {
        const { params } = this.props.navigation.state;
        // Validate password
        if (this.state.password == '' || !(params.validatePassword(this.state.password))) {
            alert('Please enter a password containing at least 8 characters, with at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character');
        }
        else {
            // Authenticate user email and password with database
            DB.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('NameSetup', { email: this.state.email, password: this.state.password }))
                .catch(error => alert("Provided email is already associated with another user"));
        }
        // this.props.navigation.navigate('NameSetup',
        // {
        //     password: this.state.password,
        // });
        // console.log("Here2");
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image style={{ width: 50, height: 50, marginTop: 15, marginBottom: 24, alignItems: 'center' }} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />

                <Text h5 style={{ marginBottom: 10, paddingHorizontal: 39, textAlign: 'center', marginBottom: 28 }}>Welcome to Luminous! We're here to make your life simpler </Text>
                <Text style={{ marginBottom: 10, paddingHorizontal: 39, marginBottom: 28 }}>Set a password</Text>

                <Input placeholder="Enter Password" style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} />

                <Text style={{ marginBottom: 10, paddingHorizontal: 65, textAlign: 'center', marginBottom: 28 }}>Your password should be at least 8 characters </Text>

                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._storeEmailPassword()}>Continue</Button>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '37%',
    },
    input: {
        width: '89%',
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        height: 50
    },
});