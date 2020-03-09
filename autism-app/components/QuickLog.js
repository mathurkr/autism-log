import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Slider } from 'react-native';
import { TextInput} from 'react-native';

import { Button, Block } from 'galio-framework';
//import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {Notifications} from 'expo';
// import UserPermissions from 'utlitities/UserPermissions';

//import firebase from '../config/DatabaseConfig';

export default class QuickLog extends Component {
    static navigationOptions = {
        title: 'Quick Log'
    };
    //pass userID as a prop
    static defaultProps = {
        mediaSource:null,
        location: '',
        date: new Date(),
        show: false,
        triggers: [],
        severity: 5,
    };
    //GOAL: Look at Jason's code for the concept of 'context'

    constructor(props) {
        super(props);
        this.state = {
            mediaSource:this.props.mediaSource,
            location: this.props.location,
            date: this.props.date,
            show: this.props.show,
            triggers: this.props.triggers,//array of objects
            severity: this.props.severity,
            id: null
            
        };

      }

    //Notifications
    //https://snack.expo.io/@wapeo/local-notification-with-ios
    handleNotification = () => {
        const localnotification = {
          title: 'Luminous',
          body: 'Do you need to log any meltdowns this week?',
          android: {
            sound: false,
          },
          ios: {
            sound: false,
          },
        };
        let NotifTime = Date.now();
        NotifTime += 10000;
    
        const schedulingOptions = { time: NotifTime };
        let promise = Notifications.scheduleLocalNotificationAsync(
          localnotification,
          schedulingOptions
        );
        this.setState({id : promise});
        console.log(this.state.id);
    };

    //View-related
    toggleDatePicker = ()=>{
        console.log(this.state);
        if(!this.show){
            this.setState({show:true});
            console.log("toggle is now "+this.state.show);
        }
        else{
            this.setState({show:false});
            console.log("toggle is now "+this.state.show);
        }
        
    };

    toggleImagePicker = async () =>{
        //UserPermissions.getCameraPermission();
        const options = {
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        };
        
        let response = await ImagePicker.launchImageLibraryAsync(options);
        
        console.log('Response = ', response);
        
        if (response.cancelled) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            this.setState({
                mediaSource: response.uri
            });
        }
        
    };
    getTriggerStyle=(triggerType)=>{
        
        for(let t = 0;t<this.state.triggers.length;t++){
            
            if(this.state.triggers[t].name==triggerType){
                console.log(triggerType + " clicked!");
                return styles.triggerClicked;
            }
        }
        console.log(triggerType + " unclicked!");
        return styles.triggerUnclicked;
        
    }
    //Client-side data handlers
    setDate = (date) => {
        console.log("changing date...");
        date = date || this.state.date;

        this.setState({
            date,
        });
    };

    setSeverity = (severity) =>{
        console.log("changing severity to "+severity);
        this.setState({
            severity 
        });
    };

    setTriggers = (name,iconName) => {        
        let triggers = this.state.triggers;
        console.log('Trigger list before: '+JSON.stringify(triggers));
        let addFlag=true;
        for(let oldTrigger=0;oldTrigger<triggers.length;oldTrigger++){
            let oldName=triggers[oldTrigger].name;
            if(oldName==name){
                triggers.splice(oldTrigger,1);
                addFlag=false;
            }
        }
        if(addFlag==true){
            triggers.push({name:name,icon:iconName});
        }
        console.log('Trigger list AFTER: '+JSON.stringify(triggers));
        this.setState({
            triggers
        });
        this.getTriggerStyle(name);

    };
    //Data submission
    _submitLog = ()=>{
        //Do data validation
        if(this.state.location==''){
            alert('Please enter a location.');
        }
        else if(this.state.triggers.length==0){
            alert('Please select at least one trigger.');
        }
        else{
            alert('No errors.\nSeverity: '+this.state.severity+ '\n' + 'Location: '+this.state.location);
            
        }
        
    };
    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri:this.state.mediaSource}} style={styles.uploadMedia} />
                <TouchableOpacity style={styles.submitButton} onPress={this.toggleImagePicker}>
                    <Text>Upload Photo/Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={this.handleNotification}>
                    <Text>Set 10 second notificaiton</Text>
                </TouchableOpacity>
                <Text>Location</Text>
                {/* Start with single-line text field, transition to location search if a library exists for react native. */}
                <TextInput
                    style={styles.TextInput}
                    onChangeText={location => this.setState({location})}
                    value={this.state.location}
                />
                {/* <Button shadowless round color="#ffffff" onPress={this.toggleDatePicker}>
                    <Text>Date:</Text>
                    <Text>{this.state.date.toLocaleString('en-US')}</Text> 
                </Button> */}
                {/* Date picker broken for now... stack trace "Unhandled promise rejection: TypeError: null is not an object (evaluating.....RNDatePickerAndroid.open" */}
                {/* {this.state.show && <DateTimePicker value={this.state.date} mode='date' is24Hour={true} display="default" onChange={this.setDate} /> } */}
                <DatePicker 
                    date={this.state.date}
                    mode="datetime"
                    format="MMMM Do YYYY, h:mm a"
                    onDateChange={this.setDate}/>
                
                
                {/* <Text>Picker: {this.state.show.toString()}</Text> */}
                <Text>Meltdown Triggers</Text>
                {/* Need 5 custom buttons with images inside of them. Maybe create a component? */}
                <View style={styles.triggerContainer}>
                    <TouchableOpacity style={this.getTriggerStyle('sensory')} onPress={()=>this.setTriggers('sensory','ios-body')}>
                        {/* <Image source= {require('../assets/hand.png')}/> */}
                        {/* <Ionicons name="ios-body" size={30} /> */}
                        <Text>Sensory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.getTriggerStyle('social')} onPress={()=>this.setTriggers('social','ios-people')}>
                        <Ionicons name="ios-people" size={30} />
                        <Text>Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.getTriggerStyle('routine')} onPress={()=>this.setTriggers('routine','ios-calendar')}>
                        <Ionicons name="ios-calendar" size={30} />
                        <Text>Routine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.getTriggerStyle('food')} onPress={()=>this.setTriggers('food','fast-food')}>
                        <Ionicons name="ios-restaurant" size={30} />
                        <Text>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.getTriggerStyle('item')} onPress={()=>this.setTriggers('item','fast-food')}>
                        <Ionicons name='ios-arrow-dropleft-circle' size={30}/>
                    {/* ios-arrow-dropleft-circle */}
                        <Text>Item Taken Away</Text>
                    </TouchableOpacity>
                </View>
                <Text>Severity</Text>
                <Slider
                    style={{width: '80%', height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    value={this.state.severity}
                    minimumTrackTintColor="#6ed3e1"
                    maximumTrackTintColor="#ffffff"
                    onSlidingComplete={severity => this.setSeverity(severity)}
                />

                {/* Galio Slider below... */}
                {/* <Slider
                    minimumValue={1}
                    maximumValue={30}
                    value={this.state.severity}
                    onSlidingComplete={severity => this.setState({severity})}//this.setSeverity(severity)
                /> */}
               
                
               {/* <Button shadowless round color="#ffffff" style={styles.submitButton} onPress={}>
                    <Text>Additional Info</Text>
                </Button> */}
                <Button shadowless round color="#ffffff" style={styles.submitButton} onPress={() => this._submitLog()}>
                    <Text>Submit</Text>
                </Button>
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
    submitButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff'
    },

    TextInput: {
        width: '90%',
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1 
    },

    triggerContainer: {
        width: '80%',
        flexDirection:'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-between'
    },

    triggerUnclicked: {
        width: 100,
        height: 100,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'center',

        
    },

    triggerClicked: {
        width: 100,
        height: 50,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'center',

        
        
    },

    uploadMedia:{
        width: '60%',
        height: 200
    }
});