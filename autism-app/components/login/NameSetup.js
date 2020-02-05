import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Ionicons} from "@expo/vector-icons";

import { Button, Text, Input, theme} from 'galio-framework';
import { TextInput } from 'react-native-gesture-handler';


export default class NameSetup extends Component {

    // Maybe put in a more seamless validation process here
    _validateForm() {
        if (this.state.name == '') {
            alert('Please enter your first name');
        }
        else {
            // alert('Name: ' + this.state.firstName + ' ' + this.state.lastName + ', Gender: ' + this.state.gender + ', Age: ' + this.state.age + ', Phone: ' + this.state.phone);
            this.props.navigation.navigate('AgeSetup',
                {
                    name: this.state.name,
                });

        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                
                <Text h5 style={{ paddingHorizontal: 39, textAlign:'center',  marginBottom: 28, marginTop:91  }}> What's your name </Text>
                
                <View style={styles.inputContainer}> 
                    <Ionicons name="ios-person" size={30} color="#73788B" style={[styles.inputIcon, styles.icon] }  />
                    <TextInput placeholder="Enter name" style={styles.inputs} onChangeText={(text) => this.setState({ name: text })} />

                </View>


                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._validateForm()}>Continue</Button>
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
        marginBottom: 65
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
    },

    inputSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    inputContainer:{
        width: '89%',
        height: 50,
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        marginBottom: 65, 
        flexDirection: "row",
        alignItems: 'center'
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        flex:1
    },

    inputIcon: {
        marginLeft:10,
    },

    icon:{
        width: 30,
        height: 30,
    }

});