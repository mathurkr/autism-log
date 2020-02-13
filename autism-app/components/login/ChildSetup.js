import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, StatusBar, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import UserPermissions from '../utlitities/UserPermissions'
import * as ImagePicker from 'expo-image-picker';

import DB from '../config/DatabaseConfig';

export default class ChildSetup extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        user: {
            name: '',
            age: '',
            gender: '',
            avatar: null
        },
        errorMessage: null

    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } })
        }
    }

    _finishSignUp() {
        const { params } = this.props.navigation.state;

        if (this.state.name == '') {
            alert('Please enter a name');
        }
        else if (this.state.age == '') {
            alert('Please enter an age');
        }
        else if (this.state.gender == '') {
            alert('Please provide a gender');
        }
        else {
            // Store profile into database using doc id of user -- change format in the future to support multiple profiles per user
            const profiles = [
                {
                    name: this.state.user.name,
                    age: this.state.user.age,
                    gender: this.state.user.gender,
                    avatar: this.state.user.avatar
                }
            ];
            const collection = DB.firestore().collection('profiles');
            collection.add({
                profiles: profiles
            }).catch((error) => {
                alert('There was an error adding profiles to the DB');
            });
            this.props.navigation.navigate('Home', { email: params.email, password: params.password, date: new Date() });
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"> </StatusBar>

                <Image
                    source={require('../../assets/images/profile_banner.png')}
                    style={{ marginTop: -100, marginLeft: -294 }}
                ></Image>

                <TouchableOpacity style={styles.back} onPress={() => this.props.naviation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"> </Ionicons>
                </TouchableOpacity>

                <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>

                    <Text style={styles.greeting}> {'Create Profile'}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                        <Ionicons
                            name="ios-add"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 6, marginLeft: 2 }}
                        ></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}> {this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}> Full Name </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ user: { ...this.state.user, name: text } })}
                            value={this.state.user.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}> Age </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType={'numeric'}
                            onChangeText={(text) => this.setState({ user: { ...this.state.user, age: text } })}
                            value={this.state.user.age}
                        ></TextInput>
                    </View>


                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}> Gender </Text>
                        <ModalDropdown
                            style={styles.dropdownLabel}
                            textStyle={{ fontSize: 13, color: '#898989' }}
                            defaultValue={"Please select a gender..."}
                            options={['Male', 'Female', 'Other', 'Prefer not to answer']}
                            onSelect={(index, text) => this.setState({ user: { ...this.state.user, gender: text } })}
                            dropdownStyle={styles.dropdown}
                            dropdownTextStyle={{ paddingLeft: 16, fontSize: 14 }}
                        >
                        </ModalDropdown>
                        {/* <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={gender => this.setState({ gender })}
                            value={this.state.gender}
                        ></TextInput> */}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => this._finishSignUp()}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}> Sign up </Text>
                </TouchableOpacity>



            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#FFF"
    },

    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },

    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },

    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },

    inputTitle: {
        color: "#8A8F9E",
        fontSize: 18,
        textTransform: "uppercase"
    },

    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: .5,
        height: 48,
        fontSize: 15,
        color: "#161F3D"
    },

    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },

    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#rgba(21,22,48,0.1)",
        alignItems: "center",
        justifyContent: "center"
    },

    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        marginTop: 48,
        justifyContent: 'center',
        alignItems: "center"
    },

    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,

    },

    dropdownLabel: {
        width: 200,
        height: 44,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 10,
        borderRadius: 8,
        borderColor: '#898989',
        borderWidth: 1,
        marginTop: 8,
        marginRight: 8
    },

    dropdown: {
        // width: 200,
        marginTop: 0,
        marginLeft: -16,
        borderRadius: 8,
        borderColor: '#898989',
        borderWidth: 1,
    }
});