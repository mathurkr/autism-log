import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, StatusBar, SafeAreaView, Keyboard, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity, } from 'react-native';
// import * as Google from 'expo-google-app-auth';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { materialTheme, products, Images } from '../constants/';
import { Ionicons } from "@expo/vector-icons";

import { withNavigation } from 'react-navigation';

import DB from '../config/DatabaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


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
                .then(() => this.props.navigation.navigate('Main', { email: this.state.email, date: new Date() }))
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
                .catch(error => "Error occurred while trying to login in user: " + error);
            this.props.navigation.navigate('IndexScreen', { email: this.state.email, password: this.state.password, date: new Date() })
            // alert("User account does not exist with provided email and password");
            // this.props.navigation.navigate('Home');

        }
    }

    _forgotPassword() {
        //const { navigate } = this.props.navigation;
        this.props.navigation.navigate('ForgotPassword');
        // alert("Forgot Password Clicked");
    }

    render() {
        this.secondTextInputRef = React.createRef();
        this.signIn = React.createRef();

        return (

            <SafeAreaView stye={styles.container}>

                <StatusBar />
                <KeyboardAwareScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.block}>

                            <View style={styles.logoContainer}>
                                <Text style={styles.title}> Welcome back to Luminous! </Text>

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
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    placeholder="Email Address"
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />
                            </View>


                            <View style={styles.inputContainer}>
                                <Ionicons name="ios-lock" size={30} color="#77909c" style={[styles.inputIcon, styles.icon]} />
                                <TextInput
                                    placeholder="Enter password"
                                    autoCapitalize='none'
                                    placeholderTextColor='#999999'
                                    returnKeyType="go"
                                    secureTextEntry
                                    autoCorrect={false}
                                    ref={this.secondTextInputRef}
                                    onSubmitEditing={() => this._userLogin()}
                                    style={styles.inputs}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>
                            <Text color="#0275d8" p style={styles.forgotPwd} onPress={() => this._forgotPassword()}>Forgot Password?</Text>

                            <TouchableOpacity style={styles.buttonContainer} ref={this.signIn} onPress={() => this._userLogin()}>
                                <Text style={styles.buttonText}> LOGIN </Text>
                            </TouchableOpacity>



                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            </SafeAreaView>


        );
    }

};


const styles = StyleSheet.create({
    container: {
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
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        marginBottom: 10,
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

export default withNavigation(Login);