import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

import DB from '../config/DatabaseConfig';

export default class MainHelper extends Component {
    state = {
        doc_id: '',
    };

    componentDidMount() {
        const params = this.props.navigation.dangerouslyGetParent();

        // Retrieve doc_id for given user 
        this._retrieveDocID(params);
    }

    _retrieveDocID = params => {
        const email = params.getParam('email');
        // const password = params.getParam('password')
        const date = params.getParam('date');

        // Fetch ID for this user based on their email and password from users collection
        DB.firestore().collection("users").where("email", "==", email)//.where("password", "==", password)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({ doc_id: doc.id }, () => {
                        // Store doc_id and user's name in parent params
                        params.setParams({ doc_id: doc.id, name: doc.data().name });
                        this._navigateToHome(email, date);
                    });
                })
            })
            .catch(function (error) {
                alert("Error getting documents from user collection: ", error);
            });
    }

    _navigateToHome = (email, date) => {
        this.props.navigation.navigate('Home', { email: email, doc_id: this.state.doc_id, date: date });
    }

    render() {
        return null;
    }
}
