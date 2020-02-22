import React, { Component, useState } from 'react';
import { StyleSheet, View, Linking, Image, ScrollView, FlatList, TouchableOpacity, Share, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, Input } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

import DB from '../config/DatabaseConfig';

export default class Profile extends Component {
    state = {
        name: '',
        age: '',
        gender: '',
        avatar: ''
    };

    constructor() {
        super()
        {
        }
    }

    componentWillMount() {
        // Retrieve params from parent
        const params = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();
        const doc_id = params.getParam('doc_id');
        // alert(`Email: ${params.getParam('email')}, Password: ${params.getParam('password')}, Doc ID: ${params.getParam('doc_id')}`);
        // Retrieve Profile associated with the User
        this._retrieveProfile(doc_id);

    }

    _retrieveProfile = doc_id => {
        DB.firestore().collection("profiles").doc(doc_id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    // Set profile state info
                    this.setState({
                        name: data.profiles[0].name,
                        age: data.profiles[0].age,
                        gender: data.profiles[0].gender,
                        avatar: data.profiles[0].avatar
                    });
                }
                else {
                    alert('There are currently no profiles associated with the user');
                }

            })
            .catch(function (error) {
                alert("Error getting documents from profiles collection: ", error);
            });
    }


    // onPress = (item, index) => {
    //     //console.log(item.key);
    //     //console.log(id);
    //     //console.log(index);

    //     //console.log(elem.id);
    //     // if(elem.id == index)
    //     // {
    //     //   elem.toggle = true
    //     // }

    // }

    static navigationOptions = {
        title: "Profile(s)",
        headerRight: () =>
            (
                <TouchableOpacity>
                    <FontAwesome name="cog" style={styles.cogIcon} size={30} />
                </TouchableOpacity>
            ),

        headerBackground: (
            <LinearGradient
                colors={['#4AD4D4', '#C395FF']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        ),
    }

    actionOnRow(item, index) {

        if (index == 0) {
            Alert.alert("Navigate to Profile Settings")
        }

        if (index == 1) {
            Alert.alert("Navigate to Notification")
        }

        if (index == 2) {
            Alert.alert("Goals")
        }

        if (index == 3) {
            this.onShare()
        }
    }

    onShare = async () => {
        Share.share(
            {
                message: 'Hey I use this great app. Luminous enables you to keep a private diary to empower people with Autism and their care community.',
                url: 'https://apps.apple.com/us/app/chronaly/id1202635037'
            }
        )
    }

    onOpenApp = async () => {
        const AppStore = 'itms-apps://itunes.apple.com';
        const Settings = 'app-settings://';
        return Linking.openURL(AppStore);
    }

    onLinkToIns

    render() {
        // alert(this.state.age);
        // alert(this.state.gender);
        // alert(this.state.name);

        const dataSource = [{ id: 0, toggle: false, icon: "cog", description: 'Profile Settings', subDescription: `Update and Modify ${this.state.name}'s Profile`, arrow: require('../../assets/images/test2.png') },
        { id: 1, toggle: false, icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png') },
        { id: 2, toggle: false, icon: "star", description: 'Goals', subDescription: `Update and Manage ${this.state.name}'s Goals`, arrow: require('../../assets/images/test2.png') },
        { id: 3, toggle: false, icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png') },
        ]

        const dataSection = [{ icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png') },
        { icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png') },
        ]


        // const dataSource = [{ icon: "cog", description: 'Profile Settings', subDescription: `Update and Modify ${this.state.name}'s Profile`, arrow: require('../../assets/images/test2.png') },
        // { icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png') },
        // { icon: "star", description: 'Goals', subDescription: `Update and Manage ${this.state.name}'s Goals`, arrow: require('../../assets/images/test2.png') },
        // { icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png') },
        // ]

        // const dataSection = [{ icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png') },
        // { icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png') },
        // ]

        return (

            <ScrollView style={styles.container}>
                <LinearGradient
                    colors={['#4AD4D4', '#C395FF']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{ uri: this.state.avatar }} />
                </LinearGradient>

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{this.state.name}</Text>
                        <Text style={styles.info}>{this.state.age}, {this.state.gender}</Text>
                    </View>

                    <Text style={styles.sectionTitle}> GENERAL </Text>
                    <FlatList style={styles.notificationList}
                        data={dataSource}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity>
                                    <View style={styles.notificationBox}>
                                        <FontAwesome name={item.icon} size={25} style={styles.icon} />
                                        <View style={styles.btntextcontainer}>
                                            <Text style={styles.description}>{item.description}</Text>
                                            <Text style={styles.subDescription}>{item.subDescription}</Text>
                                        </View>
                                        <Image style={styles.arrow} source={item.arrow} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />


                    <Text style={styles.sectionTitle}> DATA </Text>
                    <FlatList style={styles.notificationList}
                        data={dataSection}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => this.actionOnRow(item, index)}>
                                    <View style={styles.notificationBox}>
                                        <FontAwesome name={item.icon} size={25} style={styles.icon} />
                                        <View style={styles.btntextcontainer}>
                                            <Text style={styles.description}>{item.description}</Text>
                                            <Text style={styles.subDescription}>{item.subDescription}</Text>
                                        </View>
                                        <Image style={styles.arrow} source={item.arrow} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />


                </View>
                <Image style={styles.avatar} source={{ uri: this.state.avatar }} />

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFEF"
    },

    sectionTitle: {
        color: '#8485f9',
        fontWeight: 'bold',
        fontSize: 13,
        paddingLeft: 20,
        fontWeight: 'bold'
    },

    ////

    notificationList: {
        marginVertical: 10,
        paddingHorizontal: 21,
    },

    notificationBox: {
        padding: 5,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 10,
    },

    icon: {
        marginVertical: 10,
        paddingRight: 10,
        marginHorizontal: 10,
        color: '#0047cc'

    },

    arrow: {
        width: 6,
        height: 12,
        marginTop: 16,
        marginVertical: 8,
        padding: 8,
    },

    description: {
        fontSize: 16,
        color: "#042c5c",
        marginLeft: 10,
        fontWeight: 'bold',
        paddingTop: 8

    },

    subDescription: {
        fontSize: 12,
        color: "#77869e",
        marginLeft: 10,
        paddingBottom: 8
    },

    btntextcontainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    ///

    header: {
        height: 120,
    },

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 43,
    },

    name: {
        fontSize: 22,
        color: "black",
        fontWeight: '600',
    },

    body: {
        marginTop: 20,
    },

    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        paddingBottom: 15,
    },

    cogIcon: {
        marginRight: 18,
        color: "#5574c3"
    }



});

