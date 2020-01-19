import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image} from 'react-native';

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
        return (


            <View style={styles.container}>
                <ScrollView horizontal={true} pagingEnabled={true} 
                showsHorizontalScrollIndicator = {false} > 

                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                        source={require('../assets/images/father_image.png')}/>
                        <Text style={styles.title} > Welcome to Lumious </Text>
                        <Text style={styles.description} > Offering a better way to manage developmental disabilities and help children and adults with autism </Text>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                        source={require('../assets/images/back_to_school.png')}/>
                        <Text style={styles.title} > Capture events while they happen </Text>
                        <Text style={styles.description} > Observe and monitor behaviors, actions, and day to day interactions, to better manage metldown or burnouts </Text>
                    </View>


                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                        source={require('../assets/images/undraw_data.png')}/>
                        <Text style={styles.title} > Gather and use data for knowledge & insight</Text>
                        <Text style={styles.description} > Aggregate and use customized visualizations to improve care and well being of those with autism </Text>
                    </View>


                    <View style={styles.imageContainer}>
                        <Image style={styles.image}
                        source={require('../assets/images/undraw_community.png')}/>
                        <Text style={styles.title} > Aggregate and share with your community </Text>
                        <Text style={styles.description} > Use as a digital companion to help lead on the road to better health, productivity and happier lives. </Text>
                    </View>




                </ScrollView>

                

                <View style={styles.buttonContainer}>
                    <Button shadowless round color="#29d2e4" onPress={() => this._toSignUpPage()} style={styles.signupBtn}> SIGN UP</Button>
                    <Button shadowless round color="#ffffff" onPress={() => this._toLoginPage()} style={styles.loginBtn}>
                        <Text>LOG IN</Text>
                    </Button>
                </View>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#3498db'
    },
    imageContainer : {
        alignItems:'center',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop:20,
        width: Dimensions.get('window').width
    }, 

    image: {
        width: 300,
        height:300
    },

    title: {
        marginTop: 10,
        width: 297,
        textAlign: 'center',
        fontSize: 20,
        color: '#414141',
        fontWeight: 'bold'
    },

    description: {
        marginTop: 10,
        width: 297,
        textAlign: 'center',
        fontSize: 16,
        color: '#737373'
    },

    buttonContainer: {
        padding: 20
    },

    signupBtn: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10
    },

    loginBtn: {
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff',
        height: 40,
        marginBottom: 40,
        paddingHorizontal: 10
    }


});