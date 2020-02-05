import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationActions, SwitchActions } from 'react-navigation';
// import * as Google from 'expo-google-app-auth';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { materialTheme, products, Images } from '../constants/';

import { withNavigation } from 'react-navigation';

import DB from '../config/DatabaseConfig';


class Login extends Component {
    static navigationOptions = {
        header: null
        //  title: 'Login'
    };

    state = {
        email: '',
        password: '',
        // loggedIn: false,
        // name: ''
    };

    // constructor(props) {
    //     super(props);
    // }

    _userLogin() {
        if (this.state.email == '' || !(this.props._validateEmail(this.state.email))) {
            alert('Please Enter a valid email address');
        }
        else if (this.state.password == '') {
            alert('Please Enter Password');
        }
        else {
            // Sign in user to database (if they exist) with provided email and password (use sample user name for now)
            DB.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                // .then(() => this.props
                //     .navigation
                //     .dispatch(SwitchActions.reset({
                //         index: 0,
                //         actions: [
                //             NavigationActions.navigate({
                //                 routeName: 'Main',
                //                 params: { email: this.state.email, password: this.state.password, name: "Test" },
                //             }),
                //         ],
                //     }))
                // )
                .then(() => this.props.navigation.navigate('Main', { email: this.state.email, password: this.state.password, name: "Test" }))
                // alert('something');
                // const navigateAction = SwitchActions.navigate({
                //     routeName: 'Main',

                //     params: { email: this.state.email, password: this.state.password, name: "Test" },

                //     action: NavigationActions.navigate({ routeName: 'Home' }),
                // });
                // this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }))

                // this.props.navigation.dispatch(navigateAction);
                // })
                // => this.props.navigation.navigate('Home', { email: this.state.email, password: this.state.password, name: "Test" }))
                .catch(error => "User does not exist");
        }
    }

    _forgotPassword() {
        //const { navigate } = this.props.navigation;
        this.props.navigation.navigate('ForgotPassword');
        // alert("Forgot Password Clicked");
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.SignUpMsg}> Welcome Back! </Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="facebook-square" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>Login with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.google} onPress={() => this.props._googleLogin()}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="google" color="#ffffff" size={30} />
                        <Text style={styles.iconText}>Login with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 5, marginBottom: 20, fontSize: 13 }}>OR LOGIN WITH EMAIL</Text>
                <Input placeholder="Email Address" style={styles.input} keyboardType={'email-address'} onChangeText={(text) => this.setState({ email: text })} />
                <Input placeholder="Password" value={this.state.password} style={styles.input} password viewPass onChangeText={(text) => this.setState({ password: text })} />
                <Text color="#0275d8" p style={styles.forgotPwd} onPress={() => this._forgotPassword()}>Forgot Password?</Text>
                <Button shadowless round color="#29d2e4" onPress={() => this._userLogin()} style={styles.loginBtn}> LOGIN </Button>
            </KeyboardAvoidingView>
        );
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    facebook: {
        marginTop: 20,
        paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10,
        backgroundColor: "#3b5998",
        borderRadius: 27,
        width: '82%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    google: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10,
        backgroundColor: "#bf4334",
        borderRadius: 27,
        width: '82%',
        justifyContent: 'center',
        alignItems: 'center',

    },


    iconText: {
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        paddingLeft: 24,
    },

    input: {
        width: '89%',
        backgroundColor: '#E9EDEF',
        height: 50
    },
    forgotPwd: {
        fontSize: 12,
        textAlign: 'left',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginBottom: 12,
        marginTop: 13,
        paddingLeft: 20,
        paddingBottom: 13,
        paddingTop: 8
    },
    SignUpMsg: {
        fontSize: 20,
        paddingBottom: 40
    },

    loginBtn: {
        height: 50,
        paddingHorizontal: 10,
        width: 310,
        width: '82%',

    },

});

export default withNavigation(Login);
