import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { Button, Text, Input, theme } from 'galio-framework';

export default class ForgotPassword extends Component {
    state = {
        email: ''
    };

    _getVerificationCode() {
        if (this.state.email == '') {
            alert('Please Enter Email');
        }
        else {
            const { navigate } = this.props.navigation;
            this.props.navigation.navigate('VerifyCode', { email: this.state.email });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text h5>Please Enter Your Email</Text>
                <Input placeholder="Email Address" style={styles.input} onChangeText={(text) => this.setState({ email: text })} />
                <Button shadowless round color="#29d2e4" onPress={() => this._getVerificationCode()}>Send Verification Code</Button>
            </KeyboardAvoidingView>
        );
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '89%'
    }
});