import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Radio, Text, Input, theme } from 'galio-framework';

// import { Select } from '../tools/';


export default class SignUpForm extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        age: '',
        gender: '',
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ email: params.email });
    }

    _setGender = (index, value) => {
        this.setState({ gender: value });
        alert(this.state.gender);
    }

    // Test function to see user input
    _displayUserInput() {
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
        else {
            alert('Name: ' + this.state.firstName + ' ' + this.state.lastName + ', Gender: ' + this.state.gender + ', Age: ' + this.state.age);
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text h5 style={{ marginBottom: 10 }}>Tell us about yourself</Text>
                <Input placeholder="First Name" style={styles.input} onChangeText={(text) => this.setState({ firstName: text })} />
                <Input placeholder="Last Name" style={styles.input} onChangeText={(text) => this.setState({ lastName: text })} />
                {/* <Text style={{ marginTop: 5, marginBottom: 5 }}>Gender</Text> */}
                <View style={{ flexDirection: "row", marginLeft: '8%', marginRight: '12%' }}>
                    <ModalDropdown
                        style={styles.dropdown}
                        defaultValue={"Please select a gender..."}
                        options={['Male', 'Female', 'Other']}
                        onSelect={(index, text) => this.setState({ gender: text })}
                    >
                    </ModalDropdown>
                    <Input placeholder="Age" styles={{ width: '44%' }} keyboardType={'numeric'} onChangeText={(text) => this.setState({ age: text })} />
                </View>
                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._displayUserInput()}>Continue</Button>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '89%'
    },
    dropdown: {
        width: 200,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 9.5,
        borderRadius: 3,
        // shadowColor: "rgba(0, 0, 0, 0.1)",
        // shadowOffset: {width: 0, height: 2 },
        // shadowRadius: 4,
        // shadowOpacity: 1,
    }
});