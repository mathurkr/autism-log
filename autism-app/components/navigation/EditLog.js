// import React, { useState } from 'react';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Slider, Image, ScrollView, Dimensions, Linking, } from 'react-native'
import { ImageBackground } from 'react-native';

import DatePicker from 'react-native-datepicker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utlitities/UserPermissions'
import { FontAwesome } from '@expo/vector-icons';

import { connectActionSheet } from '@expo/react-native-action-sheet';

import DB from '../config/DatabaseConfig';
import * as firebase from 'firebase';

class EditLog extends Component {
    state = {
        title: '',
        content: '',
        location: '',
        date: '',
        triggers: [],
        severity: 0,
        tags: '',
        region: {},
        media: 'https://st.depositphotos.com/1026531/3457/v/950/depositphotos_34579193-stock-illustration-seamless-background-of-digital-cameras.jpg',
        mediaType: '',
        toggle: false,
        toggleSocial: false,
        toggleRoutine: false,
        toggleFood: false,
        toggleItem: false,
        height: 50,
        id: '',

        // Color borders/buttons
        buttonBg: 'white',
        borderClr: 'grey',
        buttonBgSocial: 'white',
        borderClrSocial: 'grey',
        buttonBgRoutine: 'white',
        borderClrRoutine: 'grey',
        buttonBgFood: 'white',
        borderClrFood: 'grey',
        buttonBgItem: 'white',
        borderClrItem: 'grey',
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;

        // Set date
        let timestamp = params.timestamp;
        let date = new Date(timestamp);
        let formatted_date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        // Set triggers and button colors
        let toggle = false;
        let toggleSocial = false;
        let toggleRoutine = false;
        let toggleFood = false;
        let toggleItem = false;


        let buttonBg = 'white';
        let borderClr = 'grey';
        let buttonBgSocial = 'white';
        let borderClrSocial = 'grey';
        let buttonBgRoutine = 'white';
        let borderClrRoutine = 'grey';
        let buttonBgFood = 'white';
        let borderClrFood = 'grey';
        let buttonBgItem = 'white';
        let borderClrItem = 'grey';

        let tags = params.triggers;
        for (let trigger = 0; trigger < tags.length; trigger++) {
            if (tags[trigger].name == "sensory") {
                toggle = true;
                buttonBg = "rgba(110,211,225,0.30)";
                borderClr = "white";
            }
            else if (tags[trigger].name == "social") {
                toggleSocial = true;
                buttonBgSocial = "rgba(110,211,225,0.30)";
                borderClrSocial = "white";
            }
            else if (tags[trigger].name == "routine") {
                toggleRoutine = true;
                buttonBgRoutine = "rgba(110,211,225,0.30)";
                borderClrRoutine = "white";
            }
            else if (tags[trigger].name == "food") {
                toggleFood = true;
                buttonBgFood = "rgba(110,211,225,0.30)";
                borderClrFood = "white";
            }
            else if (tags[trigger].name == "item taken away") {
                toggleItem = true;
                buttonBgItem = "rgba(110,211,225,0.30)";
                borderClrItem = "white";
            }
        }

        this.setState({
            title: params.title,
            content: params.content,
            id: params.id,
            media: params.media,
            mediaType: params.mediaType,
            severity: params.severity,
            location: params.location,
            date: formatted_date,
            height: 50,
            tags: '',
            region: {},
            triggers: tags,
            toggle: toggle,
            toggleSocial: toggleSocial,
            toggleRoutine: toggleRoutine,
            toggleFood: toggleFood,
            toggleItem: toggleItem,

            buttonBg: buttonBg,
            borderClr: borderClr,
            buttonBgSocial: buttonBgSocial,
            borderClrSocial: borderClrSocial,
            buttonBgRoutine: buttonBgRoutine,
            borderClrRoutine: borderClrRoutine,
            buttonBgFood: buttonBgFood,
            borderClrFood: borderClrFood,
            buttonBgItem: buttonBgItem,
            borderClrItem: borderClrItem

        });
    }

    // buttonBg = this.state.toggle ? "white" : "rgba(110,211,225,0.30)";
    // borderClr = this.state.toggle ? "grey" : "white";

    // buttonBgSocial = this.state.toggleSocial ? "white" : "rgba(110,211,225,0.30)";
    // borderClrSocial = this.state.toggleSocial ? "grey" : "white";

    // buttonBgRoutine = this.state.toggleRoutine ? "white" : "rgba(110,211,225,0.30)";
    // borderClrRoutine = this.state.toggleRoutine ? "grey" : "white";

    // buttonBgFood = this.state.toggleFood ? "white" : "rgba(110,211,225,0.30)";
    // borderClrFood = this.state.toggleFood ? "grey" : "white";

    // buttonBgItem = this.state.toggleItem ? "white" : "rgba(110,211,225,0.30)";
    // borderClrItem = this.state.toggleItem ? "grey" : "white";

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }

        const regionData = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

        let region = {
            latitude: regionData.coords.latitude,
            longitude: regionData.coords.longitude,
            // latitudeDelta: 0.045,
            // longitudeDelta: 0.45
        }

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&key=' + 'AIzaSyDku9k2XFLfH8r-s0a2OTniB0-3z4TxPhM')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                var stateName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name;
                var cityName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_2').length > 0)[0].short_name;
                this.setState({ location: cityName + ", " + stateName });
            })

        // this.setState({ region: region });
        // setRegion(region)

    }

    test = () => {
        console.log("tested")
    }

    handleMedia = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ media: result.uri }, () => {
                const { params } = this.props.navigation.state;

                let media = result.uri;
                let mediaType = media.substr(-3);
                // const mediaType = result.uri
                console.log(mediaType);

                this._uploadMedia(media, mediaType, params.doc_id, params.date)
                    .then(() => {
                        // alert('Success!');
                    })
                    .catch((error) => {
                        alert(error);
                    })
            });
            // setMedia(result.uri);
            // const { params } = navigation.state;
            // const { doc_id } = route.params;
            // const { date } = route.date;
            // this._uploadImage(result.uri, doc_id, date)
            //     .then(() => {
            //         // alert('Success!');
            //     })
            //     .catch((error) => {
            //         alert(error);
            //     })
        }
    }

    _uploadMedia = async (uri, type, name, date) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const id = Math.floor(Math.random() * 99999).toString();
        this.setState({ id: id, mediaType: type });

        let ref = firebase.storage().ref().child("media/logs/" + name + "/" + date + "/" + id);
        return ref.put(blob);
    }

    _onPress = () => {
        if (this.state.toggle) {
            this.setState({ toggle: false, buttonBg: 'white', borderClr: 'grey' })
        }
        else {
            this.setState({ toggle: true, buttonBg: 'rgba(110,211,225,0.30)', borderClr: 'white' })
        }
        // this.setState({ toggle: !this.state.toggle });
        // setToggle(!toggle)
    }

    _onPressSocial = () => {
        if (this.state.toggleSocial) {
            this.setState({ toggleSocial: false, buttonBgSocial: 'white', borderClrSocial: 'grey' })
        }
        else {
            this.setState({ toggleSocial: true, buttonBgSocial: 'rgba(110,211,225,0.30)', borderClrSocial: 'white' })
        }
        // this.setState({ toggleSocial: !this.state.toggleSocial });
        // setToggleSocial(!toggleSocial)
    }

    _onPressRoutine = () => {
        if (this.state.toggleRoutine) {
            this.setState({ toggleRoutine: false, buttonBgRoutine: 'white', borderClrRoutine: 'grey' })
        }
        else {
            this.setState({ toggleRoutine: true, buttonBgRoutine: 'rgba(110,211,225,0.30)', borderClrRoutine: 'white' })
        }
        // setToggleRoutine(!toggleRoutine)
        // this.setState({ toggleRoutine: !this.state.toggleRoutine });
    }

    _onPressFood = () => {
        if (this.state.toggleFood) {
            this.setState({ toggleFood: false, buttonBgFood: 'white', borderClrFood: 'grey' })
        }
        else {
            this.setState({ toggleFood: true, buttonBgFood: 'rgba(110,211,225,0.30)', borderClrFood: 'white' })
        }
        // setToggleFood(!toggleFood)
        // this.setState({ toggleFood: !this.state.toggleFood });
    }

    _onPressItem = () => {
        if (this.state.toggleItem) {
            this.setState({ toggleItem: false, buttonBgItem: 'white', borderClrItem: 'grey' })
        }
        else {
            this.setState({ toggleItem: true, buttonBgItem: 'rgba(110,211,225,0.30)', borderClrItem: 'white' })
        }
        // setToggleItem(!toggleItem)
        // this.setState({ toggleItem: !this.state.toggleItem });
    }

    severityLevelTitle = (severity) => {
        // console.log(severity)
        this.setState({ severity: severity })

        if (severity >= 0 && severity <= 20) {
            this.setState({ title: "Slight Pain" });
        }
        else if (severity >= 20 && severity <= 40) {
            this.setState({ title: "Mild" });
        }
        else if (severity >= 40 && severity <= 60) {
            this.setState({ title: "Moderate" });
        }
        else if (severity >= 60 && severity <= 80) {
            this.setState({ title: "Severe" });
        }
        else if (severity >= 80 && severity <= 100) {
            this.setState({ title: "Worst Pain" });
        }
    }

    _updateLog = () => {
        // alert(`${title}, ${content}, ${location}, ${date}, ${triggers}, ${severity}, ${media}`);
        // console.log(this.state.title);
        // console.log(this.state.content);
        // console.log(this.state.location);
        // console.log(this.state.date);
        // console.log(this.state.triggers);
        // console.log(this.state.severity);
        // console.log(this.state.media);

        // Hard behaviors and resolution for now 
        const behaviors = ["Yelling", "Screaming", "Shouting"];
        const resolution = ["Waited it Out", "Gave some medicine", "Redirection"];
        const scale = this.state.title;
        const avatar = "";  // May no longer be necessary 
        const tags = this.state.triggers;
        const text = this.state.content;
        const timestamp = new Date(this.state.date).getTime();
        const id = this.state.id;
        const location = this.state.location;
        const severity = Math.floor(this.state.severity);
        const mediaType = this.state.mediaType;
        // console.log(timestamp);
        // const scale = "Very Severe"
        // const avatar = "";  // May no longer be necessary 
        // const tags =
        //     [
        //         {
        //             name: "Sensory",
        //             icon: "ios-body",
        //         },
        //         {
        //             name: "Routine",
        //             icon: "ios-calendar"
        //         },
        //         {
        //             name: "Social",
        //             icon: "ios-people"
        //         },
        //     ];
        // const text = "Charles felt uncomfortable during Math class";
        // const timestamp = 1569109273726;
        // const id = Math.floor(Math.random() * 99999).toString();


        // const loc = "Anaheim, California";

        // // const { params } = navigation.state;

        const { params } = this.props.navigation.state;

        // // const { doc_id } = route.params;
        // // const { date } = route.params;

        const doc_id = params.doc_id;
        const date = params.date;
        // console.log(date);
        // console.log(id);

        const collection = DB.firestore().collection('logs');
        let ref = firebase.storage().ref().child("media/logs/" + doc_id + "/" + date + "/" + id);

        let all_logs = [];
        // Get download url from storage to store in logs collection
        ref.getDownloadURL()
            .then((url) => {
                // Add unchanged logs to log collection and only alter log with the same id 
                // console.log(url);
                collection.doc(doc_id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            // console.log("Executing");
                            const data = doc.data();
                            // Iterate thru all dates
                            for (const [key, value] of Object.entries(data)) {
                                console.log(key, value);
                                if (key == date) {
                                    sub_logs = [];
                                    for (let i = 0; i < data[date].length; i++) {
                                        if (data[date][i].id != id) {
                                            sub_logs.push(data[date][i]);
                                        }
                                        else {
                                            sub_logs.push({
                                                id: id,
                                                avatar: avatar,
                                                media: url,
                                                mediaType: mediaType,
                                                location: location,
                                                scale: scale,
                                                severity: severity,
                                                text: text,
                                                timestamp: timestamp,
                                                behaviors: behaviors,
                                                resolution: resolution,
                                                tags: tags
                                            })
                                        }
                                    }
                                    all_logs.push({ key: sub_logs });
                                }
                                else {
                                    all_logs.push({ key: value });
                                }
                            }
                            console.log(all_logs);
                            // for (let i = 0; i < data.length; i++) {
                            //     if (d)
                            //         if (data[date][i].id != id) {
                            //             all_logs.push(data[date][i]);
                            //         }
                            //         else {
                            //             all_logs.push({
                            //                 id: id,
                            //                 avatar: avatar,
                            //                 media: url,
                            //                 mediaType: mediaType,
                            //                 location: location,
                            //                 scale: scale,
                            //                 severity: severity,
                            //                 text: text,
                            //                 timestamp: timestamp,
                            //                 behaviors: behaviors,
                            //                 resolution: resolution,
                            //                 tags: tags
                            //             });
                            //         }
                            // }

                            // Set logs collection at date to update logs array
                            collection.doc(doc_id)
                                .set({
                                    [date]: all_logs
                                })
                                .catch((error) => {
                                    alert("Error while updating: " + error);
                                });

                            // // Append new log to logs collection for that date
                            // collection.doc(doc_id)
                            //     .update({
                            //         [date]: firebase.firestore.FieldValue.arrayUnion({
                            //             "id": id,
                            //             "avatar": avatar,
                            //             "image": url,
                            //             "location": location,
                            //             "scale": scale,
                            //             "severity": severity,
                            //             "text": text,
                            //             "timestamp": timestamp,
                            //             "behaviors": behaviors,
                            //             "resolution": resolution,
                            //             "tags": tags
                            //         })
                            //     })
                            //     .catch((error) => {
                            //         alert("Error while appending: " + error);
                            //     });
                            // .catch(function (error) {
                            //     alert(error);
                            // });


                            // Create new date to hold logs in log collection
                            // else {

                            //     const post = [
                            //         {
                            //             id: id,
                            //             avatar: avatar,
                            //             image: url,
                            //             location: location,
                            //             scale: scale,
                            //             severity: severity,
                            //             text: text,
                            //             timestamp: timestamp,
                            //             behaviors: behaviors,
                            //             resolution: resolution,
                            //             tags: tags
                            //         }
                            //     ];

                            //     collection.doc(doc_id)
                            //         .set({
                            //             [date]: post
                            //         })
                            //         .catch((error) => {
                            //             alert("Error while adding: " + error);
                            //         });
                            // }
                            // Return to Home page
                            this._navigateToHome(doc_id);
                        }
                        else {
                            alert('There are currently no logs associated with the user');
                        }
                    })
                    .catch(function (error) {
                        alert("Error getting documents from log collection: ", error);
                    });
            })
            .catch(function (error) {
                alert("Couldn't retrieve image URL: ", error);
            });

        //     collection.doc(doc_id)
        //         .update({
        //             [date]: firebase.firestore.FieldValue.arrayUnion({
        //                 "id": id,
        //                 "avatar": avatar,
        //                 "image": url,
        //                 "location": location,
        //                 "scale": scale,
        //                 "severity": severity,
        //                 "text": text,
        //                 "timestamp": timestamp,
        //                 "behaviors": behaviors,
        //                 "resolution": resolution,
        //                 "tags": tags
        //             })
        //         })
        //     // .catch(function (error) {
        //     //     alert(error);
        //     // });

        //     // Return to Home page
        //     this._navigateToHome(doc_id);
        // })
        // .catch((error) => {
        //     alert(error);
        // });

    }

    _navigateToHome = (doc_id) => {
        const params = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();

        const email = params.getParam("email");
        // const password = params.getParam("password");
        const current_date = params.getParam("date");

        this.props.navigation.navigate('HomeHelper', { email: email, doc_id: doc_id, date: current_date });
    }

    setTriggers = (name, iconName) => {
        let triggers = this.state.triggers;
        let addFlag = true;
        //console.log(triggers)
        for (let oldTrigger = 0; oldTrigger < triggers.length; oldTrigger++) {
            let oldName = triggers[oldTrigger].name;
            if (oldName == name) {
                //remove objectg
                triggers.splice(oldTrigger, 1);
                addFlag = false;
            }
        }
        if (addFlag == true) {
            this.setState({ triggers: [...this.state.triggers, { name: name, icon: iconName }] });
            // triggers.push({ name: name, icon: iconName });
        }
        // console.log(triggers);
    }

    getTriggerStyle = (triggerType) => {
        if (triggerType in this.state.triggers) {
            return styles.triggerClicked;
        }
        else {
            return styles.triggerUnclicked;
        }
    }

    render() {
        return (
            <View styles={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                <ScrollView styles={{}}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: this.state.media }}
                            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        />
                        <View style={styles.overlay} />
                        <View style={styles.headerContent}>

                            <TouchableOpacity activeOpacity={0.9} style={styles.facebook} onPress={() => this.handleMedia()}>
                                <View style={{ flexDirection: "row" }}>
                                    <Ionicons style={styles.cameraIcon} name="ios-camera" color="#ffffff" size={30} />
                                    <Text style={styles.iconText}> Add media </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={{ backgroundColor: '#EFEFEF' }}>
                        <TouchableOpacity onPress={() => this._getLocationAsync()} >
                            <View style={styles.notificationBox}>
                                <Ionicons name="ios-pin" size={20} color="#77909c" style={styles.icon} />
                                <View style={styles.btntextcontainer}>
                                    <Text style={styles.description}>Location</Text>

                                </View>
                                {/* <Text numberOfLines={2} style={styles.subDescription}> Santa Margarita, California{JSON.stringify(this.state.region)} }</Text> */}
                                <Text numberOfLines={2} style={styles.subDescription}>{JSON.stringify(this.state.location)}</Text>

                                <Ionicons style={styles.mblTxt} name="ios-arrow-forward" size={20} color="#77909c" style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._getLocationAsync()} >
                            <View style={styles.notificationBox}>
                                <Ionicons name="ios-time" size={20} color="#77909c" style={styles.icon} />
                                <View style={styles.btntextcontainer}>
                                    <Text style={styles.description}>Date & Time</Text>
                                </View>
                                <Text numberOfLines={2} style={styles.subDescription}> {JSON.stringify(this.state.date)}</Text>
                                <DatePicker
                                    style={{ width: 50, marginRight: 15, }}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="select date"
                                    format="MM/DD/YYYY"
                                    minDate="01-01-2018"
                                    maxDate="01-01-2021"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    hideText
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderBottomWidth: 2,
                                            alignItems: "flex-start"
                                        },
                                        placeholderText: {
                                            fontSize: 17,
                                            color: "white"
                                        },
                                        dateText: {
                                            fontSize: 17,
                                            color: "white",
                                        }
                                    }}
                                    onDateChange={(d) => this.setState({ date: d })}
                                />
                                <Ionicons style={styles.mblTxt} name="ios-arrow-forward" size={20} color="#77909c" style={styles.icon} />
                            </View>
                        </TouchableOpacity>


                        <View style={styles.notificationBox}>
                            <Ionicons name="ios-warning" size={20} color="#77909c" style={styles.icon} />
                            <View style={styles.btntextcontainer}>
                                <Text style={styles.description}>Severity</Text>
                                <View style={styles.SliderContainer}>
                                    <Slider
                                        style={{ width: 300, height: 30, borderRadius: 50 }}
                                        minimumValue={1}
                                        maximumValue={100}
                                        value={this.state.severity}
                                        onValueChange={(severity) => this.severityLevelTitle(severity)}
                                        thumbTintColor='purple'
                                        maximumTrackTintColor='#d3d3d3'
                                        minimumTrackTintColor='blue'
                                    />
                                    <View style={styles.textCon}>
                                        <Text style={{ color: '#48AAAD' }}> Slight Pain </Text>
                                        <Text style={{ color: "#77869e" }}>
                                            {Math.floor(this.state.severity)}
                                        </Text>
                                        <Text style={{ color: "#3200DF" }}> Worst Pain </Text>
                                    </View>
                                </View>
                            </View>
                            <Text numberOfLines={2} style={styles.subDescription}></Text>
                        </View>


                    </View>






                    {/* <Text style={styles.label}> Enter Title </Text>
        <TextInput style={styles.input} value={title} onChangeText={(text => setTitle(text))} /> 
        <Text style={styles.label}> Enter Content </Text>
        <TextInput style={styles.input}value={content} onChangeText={(text) => setContent(text)}/>  */}

                    {/* <Text style={styles.label}> Location </Text>
        <TextInput style={styles.input} onChangeText={(text) => setLocation(text)} value={location} /> */}

                    <Text style={styles.iconTitle}>Triggers</Text>
                    <View style={[styles.cardContent, styles.tagsContent]}>

                        <TouchableOpacity style={{
                            backgroundColor: this.state.buttonBg,
                            padding: 8,
                            borderRadius: 30,
                            marginHorizontal: 3,
                            marginTop: 5,
                            marginLeft: 20,
                            marginBottom: 10,
                            borderColor: this.state.borderClr,
                            borderWidth: 1
                        }}
                            onPress={
                                () => {
                                    this.setTriggers('sensory', 'ios-body');
                                    this._onPress()
                                }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-body" size={15} />
                                <Text style={styles.tag}> Sensory </Text>
                                {/* {console.log(triggers)} */}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: this.state.buttonBgSocial,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.state.borderClrSocial,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('social', 'ios-people');
                                    this._onPressSocial()
                                }}>
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-people" size={15} />
                                <Text style={styles.tag}> Social </Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                backgroundColor: this.state.buttonBgRoutine,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.state.borderClrRoutine,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('routine', 'ios-calendar');
                                    this._onPressRoutine()
                                }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-calendar" size={15} />
                                <Text style={styles.tag}> Routine </Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                backgroundColor: this.state.buttonBgFood,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.state.borderClrFood,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('Food', 'ios-pizza');
                                    this._onPressFood()
                                }}>
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-pizza" size={15} />
                                <Text style={styles.tag}> Food </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: this.state.buttonBgItem,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.state.borderClrItem,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('item taken away', 'ios-sad');
                                    this._onPressItem()
                                }}>

                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-sad" size={15} />
                                <Text style={styles.tag}> Item taken away </Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            multiline
                            placeholder=" Add Note..."
                            placeholderText="#999999 "
                            onContentSizeChange={e => this.setState({ height: e.nativeEvent.contentSize.height })}
                            style={[styles.inputs, { height: this.state.height }]} value={this.state.content} onChangeText={(text) => this.setState({ content: text })} />
                    </View>



                    <View style={{ flex: 1, marginTop: 10 }}>
                        <TouchableOpacity style={{ alignSelf: 'stretch', backgroundColor: '#29d2e4', borderRadius: 27, marginHorizontal: 30 }} onPress={() => this._updateLog()}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>Update Quick Log</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, marginTop: 10 }}>
                        <TouchableOpacity style={{ alignSelf: 'stretch', backgroundColor: 'white', borderRadius: 27, marginHorizontal: 30, borderWidth: 1, borderColor: "black", marginTop: 10 }} onPress={() => { onCancelPress }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: 'black',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>Add More Info</Text>
                        </TouchableOpacity>
                    </View>



                </ScrollView>
            </View>
        );
    }


}


// const CreateLog = ({ onSubmit, initialValues, route, navigation }) => {
//     // const [title, setTitle] = useState(initialValues.title);
//     // const [content, setContent] = useState(initialValues.content);
//     // const [location, setLocation] = useState(initialValues.location);
//     // const [date, setDate] = useState(initialValues.date);
//     // const [triggers, setTriggers] = useState(initialValues.triggers);
//     // const [severity, setSeverity] = useState(initialValues.severity);
//     // const [tags, setTags] = useState(initialValues.tags);

//     // const [region, setRegion] = useState(initialValues.region)

//     // const [media, setMedia] = useState(initialValues.media)

//     // const [toggle, setToggle] = useState(initialValues, toggle)
//     // const [toggleSocial, setToggleSocial] = useState(initialValues, toggleSocial)
//     // const [toggleRoutine, setToggleRoutine] = useState(initialValues, toggleRoutine)
//     // const [toggleFood, setToggleFood] = useState(initialValues, toggleFood)
//     // const [toggleItem, setToggleItem] = useState(initialValues, toggleItem)



//     // const buttonBg = toggle ? "white" : "rgba(110,211,225,0.30)";
//     // const borderClr = toggle ? "grey" : "white";

//     // const buttonBgSocial = toggleSocial ? "white" : "rgba(110,211,225,0.30)";
//     // const borderClrSocial = toggleSocial ? "grey" : "white";

//     // const buttonBgRoutine = toggleRoutine ? "white" : "rgba(110,211,225,0.30)";
//     // const borderClrRoutine = toggleRoutine ? "grey" : "white";

//     // const buttonBgFood = toggleFood ? "white" : "rgba(110,211,225,0.30)";
//     // const borderClrFood = toggleFood ? "grey" : "white";

//     // const buttonBgItem = toggleItem ? "white" : "rgba(110,211,225,0.30)";
//     // const borderClrItem = toggleItem ? "grey" : "white";


//     _getLocationAsync = async () => {
//         const { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== 'granted') {
//             console.log('Permission to access location was denied')
//         }

//         const regionData = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

//         let region = {
//             latitude: regionData.coords.latitude,
//             longitude: regionData.coords.longitude,
//             latitudeDelta: 0.045,
//             longitudeDelta: 0.45
//         }
//         // let regionInfo = ({
//         //     latitude: location.coords.latitude,
//         //     longitude: location.coords.longitude,
//         //     latitudeDelta: 0.045,
//         //     longitudeDelta: 0.045
//         // })

//         setRegion(region)

//     }

//     test = () => {
//         console.log("tested")
//     }

//     handleMedia = async () => {
//         UserPermissions.getCameraPermission();

//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaType: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3]
//         });

//         if (!result.cancelled) {
//             setMedia(result.uri);
//             // const { params } = navigation.state;
//             const { doc_id } = route.params;
//             const { date } = route.date;
//             this._uploadImage(result.uri, doc_id, date)
//                 .then(() => {
//                     // alert('Success!');
//                 })
//                 .catch((error) => {
//                     alert(error);
//                 })
//         }
//     }

//     _uploadImage = async (uri, name, date) => {
//         const response = await fetch(uri);
//         const blob = await response.blob();

//         let ref = firebase.storage().ref().child("images/logs/" + name + "/" + date);
//         return ref.put(blob);
//     }

//     _onPress = () => {
//         setToggle(!toggle)
//     }

//     _onPressSocial = () => {
//         setToggleSocial(!toggleSocial)
//     }

//     _onPressRoutine = () => {
//         setToggleRoutine(!toggleRoutine)
//     }

//     _onPressFood = () => {
//         setToggleFood(!toggleFood)
//     }

//     _onPressItem = () => {
//         setToggleItem(!toggleItem)
//     }

//     _submitLog = (title, content, location, time, triggers, severity, media) => {
//         // alert(`${title}, ${content}, ${location}, ${date}, ${triggers}, ${severity}, ${media}`);

//         // Hard code values for now (except for media)
//         const behaviors = ["Yelling", "Screaming", "Shouting"];
//         const resolution = ["Waited it Out", "Gave some medicine", "Redirection"];
//         const scale = "Very Severe"
//         const avatar = "";  // May no longer be necessary 
//         const tags =
//             [
//                 {
//                     name: "Sensory",
//                     icon: "ios-body",
//                 },
//                 {
//                     name: "Routine",
//                     icon: "ios-calendar"
//                 },
//                 {
//                     name: "Social",
//                     icon: "ios-people"
//                 },
//             ];
//         const text = "Charles felt uncomfortable during Math class";
//         const timestamp = 1569109273726;
//         const id = Math.floor(Math.random() * 99999).toString();


//         const loc = "Anaheim, California";

//         // const { params } = navigation.state;

//         const { doc_id } = route.params;
//         const { date } = route.params;

//         const collection = DB.firestore().collection('logs');
//         let ref = firebase.storage().ref().child("images/profiles/" + doc_id + "/" + date);

//         // Get download url from storage to store in profiles collection
//         ref.getDownloadURL()
//             .then((url) => {
//                 collection.doc(doc_id)
//                     .update({
//                         [date]: firebase.firestore.FieldValue.arrayUnion({
//                             "id": id,
//                             "avatar": avatar,
//                             "image": media,
//                             "location": loc,
//                             "scale": scale,
//                             "text": text,
//                             "timestamp": timestamp,
//                             "behaviors": behaviors,
//                             "resolution": resolution,
//                             "tags": tags
//                         })
//                     })
//                     .catch(function (error) {
//                         alert(error);
//                     });

//                 // Return to Home page
//                 this._navigateToHome();
//             })
//             .catch((error) => {
//                 alert(error);
//             });


//         // // First find logs to keep in the logs collection
//         // DB.firestore().collection("logs").doc(doc_id)
//         //     .update({
//         //         [date]: firebase.firestore.FieldValue.arrayUnion({
//         //             "id": id,
//         //             "avatar": avatar,
//         //             "image": media,
//         //             "location": location,
//         //             "scale": severity,
//         //             "text": text,
//         //             "timestamp": timestamp,
//         //             "behaviors": behaviors,
//         //             "resolution": resolution,
//         //             "tags": tags
//         //         })
//         //     })
//         //     .catch(function (error) {
//         //         alert(error);
//         //     });

//         //     // Return to Home page
//         //     this._navigateToHome();

//         //     .get()
//         //     .then((doc) => {
//         //         if (doc.exists) {
//         //             if (doc.get(date) != null) {
//         //                 const data = doc.data();
//         //                 for (let i = 0; i < data[date].length; i++) {
//         //                     if (data[date][i].id == id) {
//         //                         // Retrieve attributes to be removed from array
//         //                         const avatar = data[ddate][i].avatar;
//         //                         const image = data[ddate][i].image;
//         //                         const id = data[ddate][i].id;
//         //                         const location = data[ddate][i].location;
//         //                         const scale = data[ddate][i].scale;
//         //                         const text = data[ddate][i].text;
//         //                         const timestamp = data[ddate][i].timestamp;
//         //                         const behaviors = data[ddate][i].behaviors;
//         //                         const resolution = data[ddate][i].resolution;
//         //                         const tags = data[ddate][i].tags;

//         //                         // Remove log from logs collection
//         //                         DB.firestore().collection("logs").doc(doc_id)
//         //                             .update({
//         //                                 [ddate]: firebase.firestore.FieldValue.arrayRemove({
//         //                                     "id": id,
//         //                                     "avatar": avatar,
//         //                                     "image": image,
//         //                                     "location": location,
//         //                                     "scale": scale,
//         //                                     "text": text,
//         //                                     "timestamp": timestamp,
//         //                                     "behaviors": behaviors,
//         //                                     "resolution": resolution,
//         //                                     "tags": tags
//         //                                 })
//         //                             })
//         //                             .catch(function (error) {
//         //                                 alert(error);
//         //                             });

//         //                         // Return to Home page
//         //                         this._navigateToHome(doc_id);

//         //                         // this.setState({
//         //                         //     posts: [...this.state.posts, data[ddate][i]]
//         //                         // });
//         //                     }
//         //                 }
//         //             }
//         //             else {
//         //                 alert('Could not find logs matching with date');
//         //             }
//         //         }
//         //         else {
//         //             alert('There are currently no logs associated with the user');
//         //         }

//         //     })
//         //     .catch(function (error) {
//         //         alert(error);
//         //     });
//     }

//     _navigateToHome = (doc_id) => {
//         const params = navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();

//         const email = params.getParam("email");
//         const password = params.getParam("password");
//         const current_date = params.getParam("date");

//         navigation.navigate('HomeHelper', { email: email, password: password, doc_id: doc_id, date: current_date });
//     }

//     return <View styles={{ flex: 1, backgroundColor: '#EFEFEF' }}>
//         <ScrollView styles={{}}>
//             <View style={styles.header}>
//                 <Image
//                     source={{ uri: media }}
//                     style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
//                 />
//                 <View style={styles.overlay} />
//                 <View style={styles.headerContent}>

//                     <TouchableOpacity activeOpacity={0.9} style={styles.facebook} onPress={handleMedia}>
//                         <View style={{ flexDirection: "row" }}>
//                             <Ionicons style={styles.cameraIcon} name="ios-camera" color="#ffffff" size={30} />
//                             <Text style={styles.iconText}> Add media </Text>
//                         </View>
//                     </TouchableOpacity>

//                 </View>
//             </View>


//             <View style={{ backgroundColor: '#EFEFEF' }}>
//                 <TouchableOpacity onPress={_getLocationAsync} >
//                     <View style={styles.notificationBox}>
//                         <Ionicons name="ios-pin" size={20} color="#77909c" style={styles.icon} />
//                         <View style={styles.btntextcontainer}>
//                             <Text style={styles.description}>Location</Text>

//                         </View>
//                         <Text numberOfLines={2} style={styles.subDescription}> Santa Margarita, California{JSON.stringify(region)} }</Text>

//                         <Ionicons style={styles.mblTxt} name="ios-arrow-forward" size={20} color="#77909c" style={styles.icon} />
//                     </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={_getLocationAsync} >
//                     <View style={styles.notificationBox}>
//                         <Ionicons name="ios-time" size={20} color="#77909c" style={styles.icon} />
//                         <View style={styles.btntextcontainer}>
//                             <Text style={styles.description}>Date & Time</Text>
//                         </View>
//                         <Text numberOfLines={2} style={styles.subDescription}> {JSON.stringify(date)}</Text>
//                         <DatePicker
//                             style={{ width: 50, marginRight: 15, }}
//                             date={date} //initial date from state
//                             mode="date" //The enum of date, datetime and time
//                             placeholder="select date"
//                             format="DD-MM-YYYY"
//                             minDate="01-01-2016"
//                             maxDate="01-01-2019"
//                             confirmBtnText="Confirm"
//                             cancelBtnText="Cancel"
//                             showIcon={false}
//                             hideText
//                             customStyles={{
//                                 dateInput: {
//                                     borderWidth: 0,
//                                     borderBottomWidth: 2,
//                                     alignItems: "flex-start"
//                                 },
//                                 placeholderText: {
//                                     fontSize: 17,
//                                     color: "white"
//                                 },
//                                 dateText: {
//                                     fontSize: 17,
//                                     color: "white",
//                                 }
//                             }}
//                             onDateChange={(d) => setDate(d)}
//                         />
//                         <Ionicons style={styles.mblTxt} name="ios-arrow-forward" size={20} color="#77909c" style={styles.icon} />
//                     </View>
//                 </TouchableOpacity>


//                 <View style={styles.notificationBox}>
//                     <Ionicons name="ios-warning" size={20} color="#77909c" style={styles.icon} />
//                     <View style={styles.btntextcontainer}>
//                         <Text style={styles.description}>Severity</Text>
//                         <View style={styles.SliderContainer}>
//                             <Slider
//                                 style={{ width: 300, height: 30, borderRadius: 50 }}
//                                 minimumValue={1}
//                                 maximumValue={100}
//                                 value={CreateLog.defaultProps.initialValues.severity}
//                                 onValueChange={(severity) => setSeverity({ severity })}
//                                 thumbTintColor='purple'
//                                 maximumTrackTintColor='#d3d3d3'
//                                 minimumTrackTintColor='blue'
//                             />
//                             <View style={styles.textCon}>
//                                 <Text style={{ color: '#48AAAD' }}> Moderate </Text>
//                                 <Text style={{ color: "#77869e" }}>
//                                     {Math.floor(severity.severity)}
//                                 </Text>
//                                 <Text style={{ color: "#3200DF" }}> Very Severe </Text>
//                             </View>
//                         </View>
//                     </View>
//                     <Text numberOfLines={2} style={styles.subDescription}></Text>
//                 </View>


//             </View>






//             {/* <Text style={styles.label}> Enter Title </Text>
//         <TextInput style={styles.input} value={title} onChangeText={(text => setTitle(text))} /> 
//         <Text style={styles.label}> Enter Content </Text>
//         <TextInput style={styles.input}value={content} onChangeText={(text) => setContent(text)}/>  */}

//             {/* <Text style={styles.label}> Location </Text>
//         <TextInput style={styles.input} onChangeText={(text) => setLocation(text)} value={location} /> */}

//             <Text style={styles.iconTitle}>Triggers</Text>
//             <View style={[styles.cardContent, styles.tagsContent]}>

//                 <TouchableOpacity style={{
//                     backgroundColor: buttonBg,
//                     padding: 8,
//                     borderRadius: 30,
//                     marginHorizontal: 3,
//                     marginTop: 5,
//                     marginLeft: 20,
//                     marginBottom: 10,
//                     borderColor: borderClr,
//                     borderWidth: 1
//                 }}
//                     onPress={
//                         () => {
//                             this.setTriggers('sensory', 'ios-body');
//                             this._onPress()
//                         }}
//                 >
//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons color="#0047cc" name="ios-body" size={15} />
//                         <Text style={styles.tag}> Sensory </Text>
//                         {console.log(triggers)}
//                     </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: buttonBgSocial,
//                         padding: 8,
//                         borderRadius: 30,
//                         marginHorizontal: 3,
//                         marginTop: 5,
//                         marginLeft: 20,
//                         marginBottom: 10,
//                         borderColor: borderClrSocial,
//                         borderWidth: 1
//                     }}
//                     onPress={
//                         () => {
//                             this.setTriggers('social', 'ios-people');
//                             this._onPressSocial()
//                         }}>
//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons color="#0047cc" name="ios-people" size={15} />
//                         <Text style={styles.tag}> Social </Text>
//                     </View>
//                 </TouchableOpacity>


//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: buttonBgRoutine,
//                         padding: 8,
//                         borderRadius: 30,
//                         marginHorizontal: 3,
//                         marginTop: 5,
//                         marginLeft: 20,
//                         marginBottom: 10,
//                         borderColor: borderClrRoutine,
//                         borderWidth: 1
//                     }}
//                     onPress={
//                         () => {
//                             this.setTriggers('routine', 'ios-calendar');
//                             this._onPressRoutine()
//                         }}
//                 >
//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons color="#0047cc" name="ios-calendar" size={15} />
//                         <Text style={styles.tag}> Routine </Text>
//                     </View>
//                 </TouchableOpacity>


//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: buttonBgFood,
//                         padding: 8,
//                         borderRadius: 30,
//                         marginHorizontal: 3,
//                         marginTop: 5,
//                         marginLeft: 20,
//                         marginBottom: 10,
//                         borderColor: borderClrFood,
//                         borderWidth: 1
//                     }}
//                     onPress={
//                         () => {
//                             this.setTriggers('routine', 'ios-calendar');
//                             this._onPressFood()
//                         }}>
//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons color="#0047cc" name="ios-pizza" size={15} />
//                         <Text style={styles.tag}> Food </Text>
//                     </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: buttonBgItem,
//                         padding: 8,
//                         borderRadius: 30,
//                         marginHorizontal: 3,
//                         marginTop: 5,
//                         marginLeft: 20,
//                         marginBottom: 10,
//                         borderColor: borderClrItem,
//                         borderWidth: 1
//                     }}
//                     onPress={
//                         () => {
//                             this.setTriggers('routine', 'ios-calendar');
//                             this._onPressItem()
//                         }}>

//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons color="#0047cc" name="ios-sad" size={15} />
//                         <Text style={styles.tag}> Item taken away </Text>
//                     </View>
//                 </TouchableOpacity>


//             </View>



//             <View style={{ flex: 1, marginTop: 10 }}>
//                 <TouchableOpacity style={{ alignSelf: 'stretch', backgroundColor: '#29d2e4', borderRadius: 27, marginHorizontal: 30 }} onPress={() => _submitLog(title, content, location, date, triggers, severity, media)}>
//                     <Text style={{
//                         alignSelf: 'center',
//                         color: '#ffffff',
//                         fontSize: 16,
//                         fontWeight: '600',
//                         paddingTop: 10,
//                         paddingBottom: 10
//                     }}>Submit Quick Log</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={{ flex: 1, marginTop: 10 }}>
//                 <TouchableOpacity style={{ alignSelf: 'stretch', backgroundColor: 'white', borderRadius: 27, marginHorizontal: 30, borderWidth: 1, borderColor: "black", marginTop: 10 }} onPress={() => { onCancelPress }}>
//                     <Text style={{
//                         alignSelf: 'center',
//                         color: 'black',
//                         fontSize: 16,
//                         fontWeight: '600',
//                         paddingTop: 10,
//                         paddingBottom: 10
//                     }}>Add More Info</Text>
//                 </TouchableOpacity>
//             </View>



//         </ScrollView>
//     </View>
// }

// CreateLog.defaultProps = {
//     initialValues: {
//         title: '',
//         content: '',
//         location: '',
//         date: '',
//         triggers: [],
//         severity: 0,
//         tags: '',
//         region: {},
//         media: 'https://st.depositphotos.com/1026531/3457/v/950/depositphotos_34579193-stock-illustration-seamless-background-of-digital-cameras.jpg',
//         toggle: false,
//         toggleSocial: false,
//         toggleRoutine: false,
//         toggleFood: false,

//     }
// }



// setTriggers = (name, iconName) => {
//     let triggers = CreateLog.defaultProps.initialValues.triggers;
//     let addFlag = true;
//     //console.log(triggers)
//     for (let oldTrigger = 0; oldTrigger < triggers.length; oldTrigger++) {
//         let oldName = triggers[oldTrigger].name;
//         if (oldName == name) {
//             //remove objectg
//             triggers.splice(oldTrigger, 1);
//             addFlag = false;
//         }
//     }
//     if (addFlag == true) {
//         triggers.push({ name: name, icon: iconName });
//     }
//     // console.log(triggers);
// }








// getTriggerStyle = (triggerType) => {
//     if (triggerType in this.state.triggers) {
//         return styles.triggerClicked;
//     }
//     else {
//         return styles.triggerUnlicked;
//     }
// }


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },

    triggerContainer: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-between'
    },

    triggerUnclicked: {
        width: 100,
        height: 100,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 10
    },
    toggle: {
        height: 60,
        width: 125,
        backgroundColor: 'orange'
    },

    sliderDummy: {
        backgroundColor: '#d3d3d3',
        width: 300,
        height: 30,
        borderRadius: 50,
        position: 'absolute',
    },
    sliderReal: {
        backgroundColor: '#119EC2',
        // width: (CreateLog.state.severity / 50) * 300,
        height: 30,
    },

    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 15
    },
    colorGrey: {
        color: '#d3d3d3'
    },
    colorYellow: {
        color: 'rgb(252, 228, 149)'
    },
    SliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    //

    header: {
        backgroundColor: "orange",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    },

    input: {
        width: '89%',
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        height: 50,
        marginBottom: 65
    },

    facebook: {
        paddingLeft: '5%', paddingRight: '5%',
        backgroundColor: 'transparent',
        borderRadius: 27,
        justifyContent: 'center',
        height: 40,
        borderWidth: 2,
        borderColor: 'white'

    },

    iconText: {
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        paddingLeft: 5,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },

    inputContainer: {
        height: 75,
        backgroundColor: 'white',
        paddingVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: '80%',
        borderColor: "grey",
        borderWidth: 1,
        alignSelf: 'center'
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        marginRight: 16
    },

    inputIcon: {
        marginLeft: 15,
    },

    icon: {
        width: 30,
        height: 30,
    },

    cameraIcon:
    {
        marginTop: 2
    },





    image: {
        width: 60,
        height: 60,
    },
    body: {
        padding: 30,
        backgroundColor: "#E6E6FA",
    },


    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: 'flex-start',
        marginLeft: 10
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
        marginLeft: 20,
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
        marginTop: 5
    },

    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
        alignItems: 'flex-end',

    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },



    //



    notificationBox: {
        padding: 5,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'grey',
        borderBottomWidth: .4,
    },

    notificationBoxSlider: {
        padding: 5,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 10,
    },

    icon: {
        marginVertical: 10,
        paddingRight: 2,
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
        marginLeft: 2,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10

    },

    iconTitle: {
        fontSize: 16,
        color: "#042c5c",
        marginLeft: 15,
        fontWeight: 'bold',
        marginTop: 10

    },

    subDescription: {
        fontSize: 10,
        color: "#77869e",
        marginLeft: 10,
        paddingBottom: 8,
        marginTop: 14,
        alignItems: 'flex-end'

    },

    btntextcontainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    ///

    header: {
        height: 100,
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
    },


    btnColor: {
        padding: 8,
        borderRadius: 30,
        marginHorizontal: 3,
        backgroundColor: 'rgba(110,211,225,0.30)',
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10,
    },

    tag:
    {
        fontSize: 13,
        color: 'black'
    },

    cardContent: {
        flexDirection: 'row',

        //marginLeft:10, 
    },
    imageContent: {
        marginTop: -40,
    },
    tagsContent: {
        marginTop: 10,
        flexWrap: 'wrap'
    },


    //

    buttonContainer: {
        backgroundColor: '#29d2e4',
        paddingVertical: 10,
        borderRadius: 27,
        height: 40,
        marginHorizontal: 70

    },

    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',

    },
})

export default EditLog;