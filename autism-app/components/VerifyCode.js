import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { Button, Text, Input, theme } from 'galio-framework';

export default class ForgotPassword extends Component {
    state = {
        code: ''
    };

    _enterCode() {
        if (this.state.code == '') {
            alert('Please Enter Code');
        }
        alert('Verification Code: ' + this.state.code)
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text h5>Verification Code was sent to </Text>
                <Text style={{ fontWeight: 'bold' }} h5>{params.email}</Text>
                <Input placeholder="Code" style={styles.input} onChangeText={(text) => this.setState({ code: text })} />
                <Button shadowless round color="#29d2e4" onPress={() => this._enterCode()}>Verify</Button>
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

