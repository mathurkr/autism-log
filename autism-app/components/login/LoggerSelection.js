import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from 'galio-framework';
// import Icon from 'react-native-vector-icons/FontAwesome';

import DB from '../config/DatabaseConfig';


export default class LoggerSelection extends Component {
    state = {
        loggerType: ''
    }

    componentDidUpdate() {
        const { params } = this.props.navigation.state;
        const collection = DB.firestore().collection('users');
        // Store all user account information so far -- new added information for self-logger will be in another collection
        collection.add({
            email: params.email,
            password: params.password,  // Should use a hash function to encrypt password for security reasons
            firstName: params.firstName,
            lastName: params.lastName,
            phone: params.phone,
            age: params.age,
            gender: params.gender,
            loggerType: this.state.loggerType
        }).catch((error) => {
            alert('There was an error adding the user to the DB');
        });

        // Go to Profile Set Up
        this.props.navigation.navigate('ProfileSetUp');
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
                            onPress={() => this.setState({ loggerType: 'Self-Logger' })}
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
                            onPress={() => this.setState({ loggerType: 'Caregiver' })}
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