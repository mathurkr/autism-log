import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, StatusBar, SafeAreaView, Keyboard, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { withNavigation } from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


class SignUp extends Component {
    static navigationOptions = {
        title: 'Sign Up',
        headerMode: 'none'
    };

    state = {
        email: '',
        // password: '',
        // loggedIn: false,
        // name: ''
    };

    // constructor() {
    //     super();
    //     this.ref = DB.firestore().collection('users');
    // }

    _userSignUp() {
        // Validate email
        if (this.state.email == '' || !(this.props._validateEmail(this.state.email))) {
            alert('Please enter a valid email address');
        }
        else {

            this.props.navigation.navigate('SignUpPassword', { email: this.state.email, validatePassword: this.props._validatePassword });

        }
    }

    _showTermsOfService() {
        this.props.navigation.navigate('TermsOfService');
    }

    _showPrivatePolicy() {
        this.props.navigation.navigate('PrivatePolicy');
    }


    render() {

        return (
            // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            //     <Text style={styles.welcomeMessage}>  Sign Up </Text>

            //     <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
            //         <View style={{ flexDirection: "row" }}>
            //             <Icon name="facebook-square" color="#ffffff" size={30} />
            //             <Text style={styles.iconText}>Continue with Facebook</Text>
            //         </View>
            //     </TouchableOpacity>
            //     <TouchableOpacity activeOpacity={0.9} style={styles.google} onPress={() => this.props._googleLogin()}>
            //         <View style={{ flexDirection: "row" }}>
            //             <Icon name="google" color="#ffffff" size={30} />
            //             <Text style={styles.iconText}>Continue with Google</Text>
            //         </View>
            //     </TouchableOpacity>
            //     <Text style={{ marginTop: 5, marginBottom: 20, fontSize: 13 }}>OR SIGN UP WITH EMAIL</Text>
            //     <Input placeholder="Email Address" style={styles.input} keyboardType={'email-address'} onChangeText={(text) => this.setState({ email: text })} />
            //     <Button shadowless round color="#29d2e4" style={{ marginTop: 20 }} onPress={() => this._userSignUp()}>Get Started</Button>
            //     <Text style={{ fontSize: 13, marginTop: 20 }}>By signing up, you agree to Chronaly's</Text>
            //     <View style={{ flexDirection: "row" }}>
            //         <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showTermsOfService()}>Terms of Service</Text>
            //         <Text style={{ fontSize: 13 }}> and </Text>
            //         <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showPrivatePolicy()}>Private Policy</Text>
            //     </View>
            // </KeyboardAvoidingView>

            <KeyboardAwareScrollView>

                <View stye={styles.container}>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.block}>

                            <View style={styles.logoContainer}>
                                <Text style={styles.title}> Sign up to Lumionus </Text>

                                <TouchableOpacity activeOpacity={0.9} style={styles.facebook}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="facebook-square" color="#ffffff" size={30} />
                                        <Text style={styles.iconText}>Login with Facebook</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.9} style={styles.google} onPress={() => this.props._googleLogin()}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="google" color="#ffffff" size={30} sst />
                                        <Text style={styles.iconTextG}>Login with Google</Text>
                                    </View>
                                </TouchableOpacity>

                                <Text style={{ marginTop: 5, marginBottom: 20, fontSize: 13 }}>OR LOGIN WITH EMAIL</Text>



                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="ios-mail" size={30} color="#77909c" style={[styles.inputIcon, styles.icon]} />
                                <TextInput
                                    placeholder="Enter Email"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    placeholder="Email Address"
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />
                            </View>


                            <TouchableOpacity style={styles.buttonContainer} ref={this.signIn} onPress={() => this._userSignUp()}>
                                <Text style={styles.buttonText}> GET STARTED </Text>
                            </TouchableOpacity>


                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 13, marginTop: 20 }}>By signing up, you agree to Luminous's</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showTermsOfService()}>Terms of Service</Text>
                                    <Text style={{ fontSize: 13 }}> and </Text>
                                    <Text style={{ fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this._showPrivatePolicy()}>Private Policy</Text>
                                </View>
                            </View>



                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAwareScrollView>


        );
    }

};


const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        flex: 1,
    },

    logo: {
        width: 128,
        height: 55,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

    block: {
        marginTop: 10
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom: 42,
    },


    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        paddingHorizontal: 10,
        marginBottom: 20,
    },

    buttonContainer: {
        backgroundColor: '#29d2e4',
        paddingVertical: 15,
        borderRadius: 27,
        height: 50,
        paddingHorizontal: 10,

        alignItems: 'center',
        alignItems: 'center',

    },

    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',

    },

    facebook: {
        paddingTop: 10, paddingLeft: '18%', paddingRight: '18%', paddingBottom: 10,
        backgroundColor: "#3b5998",
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,

    },

    google: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10, paddingLeft: '23%', paddingRight: '20%', paddingBottom: 10,
        backgroundColor: "#bf4334",
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,

    },

    iconText: {
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        paddingLeft: 24,
    },

    iconTextG: {
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        paddingLeft: 15,

    },

    inputContainer: {
        height: 50,
        backgroundColor: '#E9EDEF',
        marginBottom: 30,
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 5


    },

    inputs: {
        height: 45,
        marginLeft: 16,
        flex: 1
    },

    inputSection: {
        flex: 1,
        backgroundColor: 'red',
    },

    inputIcon: {
        marginLeft: 15,
    },

    icon: {
        width: 30,
        height: 30,
    },

    forgotPwd: {
        fontSize: 12,
        textAlign: 'left',
        margin: 10,
        paddingBottom: 20,
        paddingTop: 10,
        marginBottom: 20,
        color: "#006AFF"
    },
    //

    // inputSection: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    // },

    // inputContainer:{
    //     width: '89%',
    //     height: 50,
    //     marginBottom: 9,
    //     backgroundColor: '#E9EDEF',
    //     marginBottom: 20, 
    //     flexDirection: "row",
    //     alignItems: 'center'
    // },

    // inputs: {
    //     height: 45,
    //     marginLeft: 16,
    //     flex:1
    // },

    // inputIcon: {
    //     marginLeft:10,
    // },

    // icon:{
    //     width: 30,
    //     height: 30,
    // }




});

export default withNavigation(SignUp);