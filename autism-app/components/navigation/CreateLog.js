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

class CreateLog extends Component {
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
        toggle: false,
        toggleSocial: false,
        toggleRoutine: false,
        toggleFood: false,
    }

    buttonBg = this.state.toggle ? "white" : "rgba(110,211,225,0.30)";
    borderClr = this.state.toggle ? "grey" : "white";

    buttonBgSocial = this.state.toggleSocial ? "white" : "rgba(110,211,225,0.30)";
    borderClrSocial = this.state.toggleSocial ? "grey" : "white";

    buttonBgRoutine = this.state.toggleRoutine ? "white" : "rgba(110,211,225,0.30)";
    borderClrRoutine = this.state.toggleRoutine ? "grey" : "white";

    buttonBgFood = this.state.toggleFood ? "white" : "rgba(110,211,225,0.30)";
    borderClrFood = this.state.toggleFood ? "grey" : "white";

    buttonBgItem = this.state.toggleItem ? "white" : "rgba(110,211,225,0.30)";
    borderClrItem = this.state.toggleItem ? "grey" : "white";

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }

        const regionData = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

        let region = {
            latitude: regionData.coords.latitude,
            longitude: regionData.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.45
        }
        // let regionInfo = ({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     latitudeDelta: 0.045,
        //     longitudeDelta: 0.045
        // })

        this.setState({ region: region });
        // setRegion(region)

    }

    test = () => {
        console.log("tested")
    }

    handleMedia = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ media: result.uri }, () => {
                const { params } = this.props.navigation.state;
                this._uploadImage(result.uri, params.doc_id, params.date)
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

    _uploadImage = async (uri, name, date) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child("images/logs/" + name + "/" + date);
        return ref.put(blob);
    }

    _onPress = () => {
        this.setState({ toggle: !this.state.toggle });
        // setToggle(!toggle)
    }

    _onPressSocial = () => {
        this.setState({ toggleSocial: !this.state.toggleSocial });
        // setToggleSocial(!toggleSocial)
    }

    _onPressRoutine = () => {
        // setToggleRoutine(!toggleRoutine)
        this.setState({ toggleRoutine: !this.state.toggleRoutine });
    }

    _onPressFood = () => {
        // setToggleFood(!toggleFood)
        this.setState({ toggleFood: !this.state.toggleFood });
    }

    _onPressItem = () => {
        // setToggleItem(!toggleItem)
        this.setState({ toggleItem: !this.state.toggleItem }); c
    }

    _submitLog = (title, content, location, time, triggers, severity, media) => {
        // alert(`${title}, ${content}, ${location}, ${date}, ${triggers}, ${severity}, ${media}`);

        // Hard code values for now (except for media)
        const behaviors = ["Yelling", "Screaming", "Shouting"];
        const resolution = ["Waited it Out", "Gave some medicine", "Redirection"];
        const scale = "Very Severe"
        const avatar = "";  // May no longer be necessary 
        const tags =
            [
                {
                    name: "Sensory",
                    icon: "ios-body",
                },
                {
                    name: "Routine",
                    icon: "ios-calendar"
                },
                {
                    name: "Social",
                    icon: "ios-people"
                },
            ];
        const text = "Charles felt uncomfortable during Math class";
        const timestamp = 1569109273726;
        const id = Math.floor(Math.random() * 99999).toString();


        const loc = "Anaheim, California";

        // const { params } = navigation.state;

        const { params } = this.props.navigation.state;

        // const { doc_id } = route.params;
        // const { date } = route.params;

        const doc_id = params.doc_id;
        const date = params.date;

        const collection = DB.firestore().collection('logs');
        let ref = firebase.storage().ref().child("images/logs/" + doc_id + "/" + date);

        // Get download url from storage to store in profiles collection
        ref.getDownloadURL()
            .then((url) => {
                collection.doc(doc_id)
                    .update({
                        [date]: firebase.firestore.FieldValue.arrayUnion({
                            "id": id,
                            "avatar": avatar,
                            "image": url,
                            "location": loc,
                            "scale": scale,
                            "text": text,
                            "timestamp": timestamp,
                            "behaviors": behaviors,
                            "resolution": resolution,
                            "tags": tags
                        })
                    })
                // .catch(function (error) {
                //     alert(error);
                // });

                // Return to Home page
                this._navigateToHome(doc_id);
            })
        // .catch((error) => {
        //     alert(error);
        // });

    }

    _navigateToHome = (doc_id) => {
        const params = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();

        const email = params.getParam("email");
        const password = params.getParam("password");
        const current_date = params.getParam("date");

        this.props.navigation.navigate('HomeHelper', { email: email, password: password, doc_id: doc_id, date: current_date });
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
                                <Text numberOfLines={2} style={styles.subDescription}> Santa Margarita, California{JSON.stringify(this.state.region)} }</Text>

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
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2016"
                                    maxDate="01-01-2019"
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
                                        onValueChange={(severity) => this.setState({ severity: severity })}
                                        thumbTintColor='purple'
                                        maximumTrackTintColor='#d3d3d3'
                                        minimumTrackTintColor='blue'
                                    />
                                    <View style={styles.textCon}>
                                        <Text style={{ color: '#48AAAD' }}> Moderate </Text>
                                        <Text style={{ color: "#77869e" }}>
                                            {Math.floor(this.state.severity.severity)}
                                        </Text>
                                        <Text style={{ color: "#3200DF" }}> Very Severe </Text>
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
                            backgroundColor: this.buttonBg,
                            padding: 8,
                            borderRadius: 30,
                            marginHorizontal: 3,
                            marginTop: 5,
                            marginLeft: 20,
                            marginBottom: 10,
                            borderColor: this.borderClr,
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
                                backgroundColor: this.buttonBgSocial,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.borderClrSocial,
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
                                backgroundColor: this.buttonBgRoutine,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.borderClrRoutine,
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
                                backgroundColor: this.buttonBgFood,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.borderClrFood,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('routine', 'ios-calendar');
                                    this._onPressFood()
                                }}>
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-pizza" size={15} />
                                <Text style={styles.tag}> Food </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: this.buttonBgItem,
                                padding: 8,
                                borderRadius: 30,
                                marginHorizontal: 3,
                                marginTop: 5,
                                marginLeft: 20,
                                marginBottom: 10,
                                borderColor: this.borderClrItem,
                                borderWidth: 1
                            }}
                            onPress={
                                () => {
                                    this.setTriggers('routine', 'ios-calendar');
                                    this._onPressItem()
                                }}>

                            <View style={{ flexDirection: "row" }}>
                                <Ionicons color="#0047cc" name="ios-sad" size={15} />
                                <Text style={styles.tag}> Item taken away </Text>
                            </View>
                        </TouchableOpacity>


                    </View>



                    <View style={{ flex: 1, marginTop: 10 }}>
                        <TouchableOpacity style={{ alignSelf: 'stretch', backgroundColor: '#29d2e4', borderRadius: 27, marginHorizontal: 30 }} onPress={() => this._submitLog(this.state.title, this.state.content, this.state.location, this.state.date, this.state.triggers, this.state.severity, this.state.media)}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: '600',
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>Submit Quick Log</Text>
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
        height: 50,
        backgroundColor: 'white',
        paddingVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 30,
        width: '69%',
        borderColor: "grey",
        borderWidth: 1
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

export default CreateLog;