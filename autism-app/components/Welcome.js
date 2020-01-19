import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';

import { Button } from 'galio-framework';


export default class Welcome extends Component {
    static navigationOptions = {
        header: null
    };

    // state = {
    //     signedUp: false,
    //     loggedIn: false
    //     // name: ''
    // };

    _toSignUpPage() {
        this.props.navigation.navigate('Authenticate', { signedUp: false, loggedIn: false })
    }

    _toLoginPage() {
        // Need a more formal way of checking if user has an account
        // this.setState({ signedUp: true });
        this.props.navigation.navigate('Authenticate', { signedUp: true, loggedIn: false })
    }

    render() {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        
        return (
            <View style={styles.wrapper}> 

                <ScrollView
                horizontal ={true}
                pagingEnabled= {true}
                >

                    <View style={{flex: 1,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.header}> Welcome to Luminous </Text>
                            <Text style={styles.subTitle}> Offering a better way to manage developmental disabilities and help children and adults with autism </Text>
                        </View>
                    </View>


                    <View style={{flex: 1,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                            <Text style={styles.header}> Capture events while they happen </Text>
                            <Text style={styles.subTitle}>  Observe and monitor behaviors, actions, and day to day interactions, to better manage metltdown or burnouts </Text>
                    </View>

                    <View style={{flex: 1,
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                            <Text style={styles.header}> Welcome to Luminous </Text>
                            <Text style={styles.subTitle}> Offering a better way to manage developmental disabilities and help children and adults with autism </Text>
                    </View>

                </ScrollView>

                <View style={styles.buttonContainer}> 
                    <Button shadowless round color="#29d2e4" onPress={() => this._toSignUpPage()} style={styles.signup}> SIGN UP</Button>
                    <Button shadowless round color="#ffffff" onPress={() => this._toLoginPage()} style={styles.loginButton}>
                        <Text>LOG IN</Text>
                    </Button>
                </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({

    wrapper: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },

    textContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },

    header: {
        fontSize: 20,
        marginBottom: 27,
        fontWeight: 'bold',
        marginTop: 24,
        },
    
    subTitle: {
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: 20,
        padding: 50
    },

    signup: {
       marginBottom: 11, 
       marginTop: 103
    },

    loginButton: {
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff',
    },

});