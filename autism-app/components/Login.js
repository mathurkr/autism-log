import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';

import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';

import { materialTheme, products, Images } from '../constants/';


export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <View style={styles.login}>
                <Text h5>Welcome Back!</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="facebook-square" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Login with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.google}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="google" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>     Login with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 5, marginBottom: 20 }}>OR LOGIN WITH EMAIL</Text>
                <Input placeholder="Email Address" style={styles.input} />
                <Input placeholder="Password" style={styles.input} password viewPass />
                <Text color="#0275d8" p style={styles.forgotPwd}>Forgot Password?</Text>
                <Button shadowless round color="#50C7C7">Login</Button>
            </View>
        );
    }

};

const width = Dimensions.get('window');

const styles = StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    facebook: {
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: "#3b5998",
        borderRadius: 15,
    },
    google: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 37,
        paddingRight: 37,
        backgroundColor: "#bf4334",
        borderRadius: 15,
    },
    iconText: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 3
    },
    input: {
        width: '89%'
    },
    forgotPwd: {
        fontSize: 12,
        textAlign: 'left',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginBottom: 20
    }
});
