import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Text, Input, theme} from 'galio-framework';


export default class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        age: '',
        gender: '',
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ email: params.email, password: params.password });
    }

    _setGender = (index, value) => {
        this.setState({ gender: value });
        alert(this.state.gender);
    }

    _formatPhoneNum = text => {
        let formatted = ('' + text).replace(/\D/g, '');
        let match = formatted.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            let intlCode = match[1] ? '+1 ' : '';
            let number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            this.setState({ phone: number });
        }
        else {
            this.setState({ phone: text });
        }
    }

    // Maybe put in a more seamless validation process here
    _validateForm() {
        if (this.state.firstName == '') {
            alert('Please enter your first name');
        }
        else if (this.state.lastName == '') {
            alert('Please enter your last name');
        }
        else if (this.state.gender == '') {
            alert('Please select your gender');
        }
        else if (this.state.age == '') {
            alert('Please enter your age');
        }
        else if (this.state.phone == '') {
            alert('Please enter your phone number');
        }
        else {
            // alert('Name: ' + this.state.firstName + ' ' + this.state.lastName + ', Gender: ' + this.state.gender + ', Age: ' + this.state.age + ', Phone: ' + this.state.phone);
            this.props.navigation.navigate('PaymentInfo',
                {
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phone: this.state.phone,
                    age: this.state.age,
                    gender: this.state.gender
                });

        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image style={{width: 50, height: 50, marginTop: 15, marginBottom: 24,  alignItems:'center' }} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}/>
                
                <Text h5 style={{ marginBottom: 10, paddingHorizontal: 39, textAlign:'center', marginBottom: 28}}>Welcome to Luminous! We're here to make your life simpler </Text>
                <Text style={{ marginBottom: 10, paddingHorizontal: 39, marginBottom: 28}}>Set a password</Text>

                <Input placeholder="Enter Password" style={styles.input} onChangeText={(text) => this.setState({ firstName: text })} />

                <Text style={{ marginBottom: 10, paddingHorizontal: 65, textAlign:'center', marginBottom: 28}}>Your password should be atleast 8 characters </Text>

                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._validateForm()}>Continue</Button>
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