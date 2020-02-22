import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

export default class HomeHelper extends Component {
    render() {
        const { params } = this.props.navigation.state;
        this.props.navigation.navigate('Home', { email: params.email, password: params.password, doc_id: params.doc_id, date: params.date })
        return null;
    }
}
