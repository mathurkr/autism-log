import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import firebase from '../config/DatabaseConfig'

import { Button, Text } from 'galio-framework';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoggerSelection extends Component {
    state = {
        loggerType: ''
    }

    _setSelfLogger() {
        this._addToFirebase()
        this.props.navigation.navigate('Main', { loggerType: this.state.loggerType })
        // Link to medical diagnostic page after setting user type
    }

    _setCaregiver() {
        this._addToFirebase()
        this.props.navigation.navigate('Main', { loggerType: this.state.loggerType })
        // Link to medical diagnostic page after setting user type
    }

    _addToFirebase() {
        //Get user id
        var uid = firebase.auth().currentUser.uid

        //Create entry in db
        firebase.firestore().collection('users').doc(`${uid}`).update({
            loggerType: this.state.loggerType
        })
        .then(function() {
            console.log('Success')
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text h5>What kind of user are you?</Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={styles.container}>
                        <Button
                            onlyIcon
                            icon="adduser"
                            iconFamily="antdesign"
                            iconSize={35}
                            color="#83A3FA"
                            iconColor="#fff"
                            style={{ width: 75, height: 75 }}
                            onPress={() => this.setState({loggerType: 'Self-Logger'}, () => this._setSelfLogger())}
                        >
                        </Button>
                        <Text style={{ fontWeight: 'bold' }} p>Self-Logger</Text>
                    </View>
                    <View style={styles.container}>
                        <Button
                            onlyIcon
                            icon="addusergroup"
                            iconFamily="antdesign"
                            iconSize={35}
                            color="#A970CF"
                            iconColor="#fff"
                            style={{ width: 75, height: 75 }}
                            onPress={() => this.setState({loggerType: 'Caregiver'}, () => this._setCaregiver())}
                        >
                        </Button>
                        <Text style={{ fontWeight: 'bold' }} p>Caregiver</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});