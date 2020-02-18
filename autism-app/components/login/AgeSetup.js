import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Text, Input, theme } from 'galio-framework';


export default class AgeSetup extends Component {
    state = {
        age: ''
    };

    // Maybe put in a more seamless validation process here
    _validateAge() {
        const { params } = this.props.navigation.state;
        if (this.state.age == '') {
            alert('Please enter your age');
        }
        else {
            // alert('Name: ' + this.state.firstName + ' ' + this.state.lastName + ', Gender: ' + this.state.gender + ', Age: ' + this.state.age + ', Phone: ' + this.state.phone);
            this.props.navigation.navigate('LoggerSelection',
                {
                    email: params.email,
                    password: params.password,
                    name: params.name,
                    age: this.state.age,
                });
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text h5 style={{ paddingHorizontal: 39, textAlign: 'center', marginBottom: 28, marginTop: 91 }}> Hi {params.name}, how old are you? </Text>
                <Input placeholder="Enter Age" style={styles.input} keyboardType={'numeric'} onChangeText={(text) => this.setState({ age: text })} />
                <Text style={{ marginBottom: 10, paddingHorizontal: 65, textAlign: 'center', marginBottom: 20 }}> No one else will see this information </Text>
                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._validateAge()}> NEXT </Button>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },

    input: {
        width: '89%',
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        height: 50,
        marginBottom: 14
    },

    dropdownLabel: {
        width: 200,
        height: 44,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 10,
        borderRadius: 8,
        borderColor: '#898989',
        borderWidth: 1,
        marginTop: 8,
        marginRight: 8
    },
    dropdown: {
        width: 200,
        marginTop: -12,
        marginLeft: -16,
        borderRadius: 8,
        borderColor: '#898989',
        borderWidth: 1,
    }
});