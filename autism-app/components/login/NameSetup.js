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
            <View style={styles.pageContainer}>
            <View style={{alignSelf:'center'}}> 
                 <Image style={{ width: 70, height: 70, }} source={{ uri: 'https://www.chronaly.com/assets/images/favicon.png' }} />
            </View>
            <Text h5 style={{ marginBottom: 10, paddingHorizontal: '10%',fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>Welcome to Luminous! </Text>
            <Text h5 style={{ fontSize: 16, marginBottom: 30, paddingHorizontal: 50, textAlign: 'center', }}> Realtime, convenient recording &amp; mangement of autism </Text>
            <Text style={{ fontWeight: '300', paddingHorizontal: 39, marginBottom: 10 }}>Set a password</Text>


            <View style={styles.inputContainer}> 
                <Ionicons name="ios-lock" size={30} color="#73788B" style={[styles.inputIcon, styles.icon] }  />
                <TextInput secureTextEntry placeholder="Enter Password"  style={styles.inputs} password viewPass onChangeText={(text) => this.setState({ password: text })} />
            </View>

            {/* <Input placeholder="Enter Password" style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} /> */}


            <Text style={{ fontWeight: '300', marginBottom: 10, paddingHorizontal: 65, textAlign: 'center', marginBottom: 20 }}>Your password should be at least 8 characters </Text>

            <Button shadowless round color="#29d2e4" style={{ marginTop: 5 }} onPress={() => this._storeEmailPassword()}>Continue</Button>
            </View>
        
    );
}
}

const styles = StyleSheet.create({
pageContainer: {
    flex:1,
    alignItems:'center',
    borderColor:'black',
    borderWidth:1
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

inputContainer:{
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