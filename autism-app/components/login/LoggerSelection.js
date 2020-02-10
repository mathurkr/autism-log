
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, PropTypes, Text, TouchableHighlight } from 'react-native';
import { Button, Input, theme } from 'galio-framework';

// import Icon from 'react-native-vector-icons/FontAwesome';

import DB from '../config/DatabaseConfig';

export default class LoggerSelection extends Component {
    state = {
        dependent: false,
        caregiver: false,
        doc_id: ''
    }

    constructor(props) {
        super(props);
    }

    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }

    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }

    _continueToProfileSetUp() {
        if (!this.state.dependent && !this.state.caregiver) {
            alert('Please select a Logger Status');
        }
        else {
            const { params } = this.props.navigation.state;
            // Store all user account information here -- profile information will be stored in a separate collection
            const collection = DB.firestore().collection('users');
            collection.add({
                email: params.email,
                password: params.password,  // Find way to not store password directly in database for security reasons?
                name: params.name,
                // phone: params.phone,
                age: params.age,
                // gender: params.gender,
                loggerStatus: (this.state.dependent) ? 'Dependent' : 'Caregiver'
            }).catch((error) => {
                alert('There was an error adding the user to the DB');
            });

            // Fetch newly created Doc ID for this user based on their email and password from users collection
            collection.where("email", "==", params.email).where("password", "==", params.password)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.setState({ doc_id: doc.id }, () => {
                            this.props.navigation.navigate('ChildSetup', { email: params.email, password: params.password, doc_id: this.state.doc_id });
                        });
                    })
                })
                .catch(function (error) {
                    alert("Error getting documents from users collection: ", error);
                });

        }
    }


    componentDidUpdate() {
        // const { params } = this.props.navigation.state;
        // const collection = DB.firestore().collection('users');
        // // Store all user account information so far -- new added information for self-logger will be in another collection
        // collection.add({
        //     email: params.email,
        //     // password: this.state.password  // Don't store password directly in database for security reasons
        //     firstName: params.firstName,
        //     lastName: params.lastName,
        //     phone: params.phone,
        //     age: params.age,
        //     gender: params.gender,
        //     loggerType: this.state.loggerType
        // }).catch((error) => {
        //     alert('There was an error adding the user to the DB');
        // });

        // Go to Profile Set Up
        //this.props.navigation.navigate('ProfileSetUp');
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text h5>What kind of user are you?</Text>
                <View style={{ flexDirection: "row", marginTop: 20, }}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            title="Dependent"
                            style={{
                                width: 105, height: 88,
                                borderRadius: 15, borderWidth: 1, borderColor: "#333333", borderColor: '#d6d7da',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#485a96',
                                height: 88,
                                width: 105,
                                borderRadius: 5,
                                margin: 15,
                                backgroundColor: this.state.dependent ? "#29d2e4" : "white"
                            }}
                            onPress={() => {
                                this.setState({
                                    dependent: !this.state.dependent,
                                    caregiver: false,
                                })
                            }
                            }>
                            <Image style={{ width: 50, marginTop: 25, alignItems: 'center', justifyContent: 'center', height: 50, alignItems: 'center', justifyContent: 'center' }} source={require('../../assets/images/dependent.png')} />
                            <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 20, color: 'black', }}> Dependent </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>

                        <TouchableOpacity
                            title="Caregiver"
                            style={{
                                width: 105, height: 88,
                                borderRadius: 15, borderWidth: 1, borderColor: "#333333", borderColor: '#d6d7da',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#485a96',
                                height: 88,
                                width: 105,
                                borderRadius: 5,
                                margin: 15,
                                backgroundColor: this.state.caregiver ? "#29d2e4" : "white"
                            }}
                            onPress={() => {
                                this.setState({
                                    dependent: false,
                                    caregiver: !this.state.caregiver,
                                })

                            }}>
                            <Image style={{ width: 50, marginTop: 25, alignItems: 'center', justifyContent: 'center', height: 50, alignItems: 'center', justifyContent: 'center' }} source={require('../../assets/images/caregiver.png')} />
                            <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 20, color: 'black', }}> Caregiver </Text>

                        </TouchableOpacity>


                    </View>

                </View><Button shadowless round color="#29d2e4" style={{ marginTop: 10 }} onPress={() => this._continueToProfileSetUp()}>Continue</Button>

            </View>
        );

    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '37%',

    },


    buttonPress: {
        borderColor: "#000066",
        backgroundColor: "#000066",
        borderWidth: 1,
        borderRadius: 10
    }
});