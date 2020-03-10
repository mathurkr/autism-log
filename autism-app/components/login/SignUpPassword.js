import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';

import { Button, Text, Input, theme } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import DB from '../config/DatabaseConfig';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

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
                .then(() => this.props.navigation.navigate('NameSetup', { email: this.state.email }))
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
            <KeyboardAwareScrollView>
                <View style={styles.pageContainer}>
                    <Image style={{ width: 70, height: 70, marginTop: "12%", marginBottom: 24, }} source={{ uri: 'https://www.chronaly.com/assets/images/favicon.png' }} />
                    <Text h5 style={{ marginBottom: 10, paddingHorizontal: '10%', fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>Welcome to Luminous! </Text>
                    <Text h5 style={{ fontSize: 16, marginBottom: 30, paddingHorizontal: 50, textAlign: 'center', }}> Realtime, convenient recording &amp; mangement of autism </Text>
                    <Text style={{ fontWeight: '300', paddingHorizontal: 39, marginBottom: 10 }}>Set a password</Text>


                    <View style={styles.inputContainer}>
                        <Ionicons name="ios-lock" size={30} color="#73788B" style={[styles.inputIcon, styles.icon]} />
                        <TextInput secureTextEntry placeholder="Enter Password" value={this.state.password} style={styles.inputs} password viewPass onChangeText={(text) => this.setState({ password: text })} />
                    </View>

                    {/* <Input placeholder="Enter Password" style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} /> */}


                    <Text style={{ fontWeight: '300', marginBottom: 10, paddingHorizontal: 65, textAlign: 'center', marginBottom: 20 }}>Your password should be at least 8 characters </Text>

                    <Button shadowless round color="#29d2e4" style={{ marginTop: 5 }} onPress={() => this._storeEmailPassword()}>Continue</Button>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
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

    //

    inputSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    inputContainer: {
        width: '89%',
        height: 50,
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        marginBottom: 20,
        flexDirection: "row",
        alignItems: 'center'
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        flex: 1
    },

    inputIcon: {
        marginLeft: 10,
    },

    icon: {
        width: 30,
        height: 30,
    }


});