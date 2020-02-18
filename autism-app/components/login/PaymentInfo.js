import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Picker } from 'react-native';

import { Button, Text } from 'galio-framework';

export default class PaymentInfo extends Component {
    state = {
        cardHolderName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
        displayForm: false
    }

    _toLoggerSelection() {
        // Payment information will be added later -- pass current params into LoggerSelection page
        const { params } = this.props.navigation.state;

        this.props.navigation.navigate('LoggerSelection',
            {
                email: params.email,
                password: params.password,
                firstName: params.firstName,
                lastName: params.lastName,
                phone: params.phone,
                age: params.age,
                gender: params.gender
            });

    }

    _displayPaymentForm() {
        this.setState({ displayForm: true })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            (this.state.displayForm)
                ?
                <View style={styles.container}>
                    <Text h3>Card Payment Form to be added here</Text>
                </View>
                :
                <View style={styles.container}>
                    <Button shadowless round color="#29d2e4" onPress={() => this._displayPaymentForm()}>Add Payment Information</Button>
                    <Button shadowless round color="#ffffff" onPress={() => this._toLoggerSelection()} style={styles.skipButton}>
                        <Text>Skip this step</Text>
                    </Button>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff'
    }
});