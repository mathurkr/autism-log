import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Text, Input, theme} from 'galio-framework';


export default class AgeSetup extends Component {

    // Maybe put in a more seamless validation process here
    _validateForm() {
        if (this.state.age == '') {
            alert('Please enter your age');
        }
        else {
            // alert('Name: ' + this.state.firstName + ' ' + this.state.lastName + ', Gender: ' + this.state.gender + ', Age: ' + this.state.age + ', Phone: ' + this.state.phone);
            this.props.navigation.navigate('LoggerSelection',
                {
                    age: this.state.age,
                });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                
                <Text h5 style={{ paddingHorizontal: 39, textAlign:'center',  marginBottom: 28, marginTop:91  }}> Hi " ", how old are you? </Text>

                <Input placeholder="Enter Age" style={styles.input} onChangeText={(text) => this.setState({ firstName: text })} />

                <Text style={{ marginBottom: 10, paddingHorizontal: 65, textAlign:'center', marginBottom: 28}}> No one else will see this information </Text>

                <Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._validateForm()}> NEXT </Button>
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