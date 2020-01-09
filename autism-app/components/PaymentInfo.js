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

    _toProfileSetUp() {
        // Placeholder for now -- connect to database to store information here
        this.props.navigation.navigate('LoggerSelection');
        // const { params } = this.props.navigation.state;
        // alert("Information added so far: \nEmail: " + params.email + " \nPassword: " + params.password +
        //     "\nName: " + params.firstName + ' ' + params.lastName + '\nGender: ' + params.gender + '\nAge: ' +
        //     params.age + '\nPhone: ' + params.phone);

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
                    <Button shadowless round color="#ffffff" onPress={() => this._toProfileSetUp()} style={styles.skipButton}>
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