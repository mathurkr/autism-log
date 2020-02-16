import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

export default class MainHelper extends Component {
    render() {
        // const { params } = this.props.navigation.state;
        const params = this.props.navigation.dangerouslyGetParent();
        this.props.navigation.navigate('Home', { email: params.getParam('email'), password: params.getParam('password'), date: params.getParam('date') });
        return null;
    }
}
