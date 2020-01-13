import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from 'galio-framework';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoggerSelection extends Component {
    state = {
        loggerType: ''
    }

    _setSelfLogger() {
        this.setState({ loggerType: 'Self-Logger' })
        // Link to medical diagnostic page after setting user type
    }

    _setCaregiver() {
        this.setState({ loggerType: 'Caregiver' })
        // Link to medical diagnostic page after setting user type
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
                            onPress={() => this._setSelfLogger()}
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
                            onPress={() => this._setCaregiver()}
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