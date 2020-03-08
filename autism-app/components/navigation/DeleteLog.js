import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, Input } from 'galio-framework';

import DB from '../config/DatabaseConfig';
import * as firebase from 'firebase';

export default class DeleteLog extends Component {
    state = {
        posts: [],
        doc_id: '',
        id: '',
        date: ''
    }
    // componentDidMount() {
    //     const params = this.props.navigation.dangerouslyGetParent();

    //     // Retrieve doc_id for given user 
    //     this._retrieveDocID(params);
    // }

    // constructor(props) {
    //     super(props)
    componentWillMount() {

        // Retrieve params 
        const { params } = this.props.navigation.state;

        const doc_id = params.doc_id;
        const id = params.id;
        const date = params.date;

        this.state = {
            posts: [],
            doc_id: doc_id,
            id: id,
            date: date
        };

        this._fetchLogs(doc_id, id, date);
    }

    _fetchLogs = (doc_id, id, date) => {
        // Test this date for now
        // const ddate = "Feb 24 2020";

        // First find logs to keep in the logs collection
        DB.firestore().collection("logs").doc(doc_id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.get(date) != null) {
                        const data = doc.data();
                        for (let i = 0; i < data[date].length; i++) {
                            if (data[date][i].id == id) {
                                // Retrieve attributes to be removed from array
                                const avatar = data[date][i].avatar;
                                const image = data[date][i].image;
                                const id = data[date][i].id;
                                const location = data[date][i].location;
                                const scale = data[date][i].scale;
                                const text = data[date][i].text;
                                const timestamp = data[date][i].timestamp;
                                const behaviors = data[date][i].behaviors;
                                const resolution = data[date][i].resolution;
                                const tags = data[date][i].tags;
                                const severity = data[date][i].severity;

                                // Remove log from logs collection
                                DB.firestore().collection("logs").doc(doc_id)
                                    .update({
                                        [date]: firebase.firestore.FieldValue.arrayRemove({
                                            "id": id,
                                            "avatar": avatar,
                                            "image": image,
                                            "location": location,
                                            "scale": scale,
                                            "text": text,
                                            "timestamp": timestamp,
                                            "behaviors": behaviors,
                                            "resolution": resolution,
                                            "tags": tags,
                                            "severity": severity
                                        })
                                    })
                                    .catch(function (error) {
                                        alert(error);
                                    });

                                // Return to Home page
                                this._navigateToHome();

                                // this.setState({
                                //     posts: [...this.state.posts, data[ddate][i]]
                                // });
                            }
                        }
                    }
                    else {
                        alert('Could not find logs matching with date');
                    }
                }
                else {
                    alert('There are currently no logs associated with the user');
                }

            })
            .catch(function (error) {
                alert(error);
            });
    }

    // _deleteLog = () => {
    //     //     // let posts = [];
    //     //     // alert(id);
    //     //     // Test this date for now
    //     //     // const ddate = "Feb 03 2020";

    //     //     // // Retrieve all logs whose id is not the one to be deleted
    //     //     // DB.firestore().collection("logs").doc(doc_id)
    //     //     //     .get()
    //     //     //     .then((doc) => {
    //     //     //         if (doc.exists) {
    //     //     //             if (doc.get(date) != null) {
    //     //     //                 const data = doc.data();
    //     //     //                 for (let i = 0; i < data[date].length; i++) {
    //     //     //                     // alert(data[date].length);
    //     //     //                     // alert(data[date][i].id);
    //     //     //                     if (data[date][i].id != id) {
    //     //     //                         this.setState({
    //     //     //                             posts: [...this.state.posts, data[date][i]]
    //     //     //                             // }, () => {
    //     //     //                             //     alert(this.state.posts);
    //     //     //                             // }
    //     //     //                         });
    //     //     //                     }
    //     //     //                 }
    //     //     //             }
    //     //     //             else {
    //     //     //                 alert('Could not find logs matching with date');
    //     //     //             }
    //     //     //         }
    //     //     //         else {
    //     //     //             alert('There are currently no logs associated with the user');
    //     //     //         }

    //     //     //     })
    //     //     //     .catch(function (error) {
    //     //     //         alert("Error getting documents from log collection: ", error);
    //     //     //     });

    //     // Test this date for now
    //     const ddate = "Feb 27 2020";

    //     let posts = [];

    //     // Build out array
    //     for (let i = 0; i < this.state.posts.length; i++) {
    //         // alert(this.state.posts[i].scale);
    //         // posts.push(this.state.posts[i]);
    //         posts = posts.concat('Dog');
    //     }

    //     // alert(posts.length);

    //     // const posts = this.state.posts;
    //     // alert(posts);
    //     // Update user logs for that date with modified posts array
    //     // DB.firestore().collection("logs").doc(this.state.doc_id)
    //     //     .update({
    //     //         [ddate]: posts
    //     //     })
    //     //     .catch(function (error) {
    //     //         alert("Error updating documents from log collection: ", error);
    //     //     });

    //     // // Return to Home page
    //     // this._navigateToHome();

    // }

    _navigateToHome = () => {
        const params = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();

        const email = params.getParam("email");
        const password = params.getParam("password");
        const current_date = params.getParam("date");

        this.props.navigation.navigate('HomeHelper', { email: email, password: password, doc_id: this.state.doc_id, date: current_date });
    }

    render() {
        // this._deleteLog();
        return null;
    }
}
