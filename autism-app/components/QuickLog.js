import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Slider } from 'react-native';
import { TextInput} from 'react-native';

import { Button, Block } from 'galio-framework';
//import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
//import ImagePicker from 'react-native-image-picker';
// import UserPermissions from 'utlitities/UserPermissions';

export default class QuickLog extends Component {
    static navigationOptions = {
        title: 'Quick Log'
    };

    constructor(props) {
        super(props);
        this.state = {
            mediaSource:null,
            location: '',
            date: new Date(),
            show: false,
            triggers: [],//[sensory,social,routine,food,item]
            severity: 5,
            
        };

      }

    //View-related
    toggleDatePicker = ()=>{
        if(!this.show){
            this.setState({show:true});
            console.log("toggle is now "+this.show);
        }
        else{
            this.setState({show:false});
            console.log("toggle is now "+this.show);
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
        if(triggerType in this.state.triggers){
            return styles.triggerClicked;
        }
        else{
            return styles.triggerUnlicked;
        }
    }
    //Client-side data handlers
    setDate = (date) => {
        console.log("changing date...");
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    };

    setSeverity = (severity) =>{
        console.log("changing severity to "+severity);
        this.setState({
            severity 
        });
    };

    setTriggers = (trigger) => {        
        let triggers = this.state.triggers;
        console.log('Trigger list before: '+JSON.stringify(triggers));
        let i = triggers.indexOf(trigger);
        if(i>=0){
            console.log(trigger + ' found in array at index '+i+ ', removing...');
            triggers.splice(i,1);
        }
        else{
            console.log(trigger + ' not found in array, adding at index 0...');
            triggers.splice(0,0,trigger);
        }
        console.log('Trigger list AFTER: '+JSON.stringify(triggers));
        this.setState({
            triggers
        });

    };
    //Data submission
    _submitLog = ()=>{
        //Do data validation
        alert('Severity: '+this.state.severity);
        if(this.state.location==''){
            alert('Please enter a location.');
        }
        else{
            alert('Location: '+this.state.location);
        }
        
    };
    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri:this.state.mediaSource}} style={styles.uploadMedia} />
                <TouchableOpacity style={styles.triggerUnclicked} onPress={this.toggleImagePicker}>
                    <Text>Upload Photo/Video</Text>
                </TouchableOpacity>
                <TouchableOpacity>

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
                {this.state.show && <DateTimePicker value={this.state.date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />}
                
                {/* <Text>Picker: {this.state.show.toString()}</Text> */}
                <Text>Meltdown Triggers</Text>
                {/* Need 5 custom buttons with images inside of them. Maybe create a component? */}
                <View style={styles.triggerContainer}>
                    <TouchableOpacity style={styles.triggerUnclicked} onPress={()=>this.setTriggers('sensory')}>
                        <Image source= {require('../assets/hand.png')}/>
                        <Text>Sensory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

                        <Text>Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>
                        
                        <Text>Routine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

                        <Text>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

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
               
                
                
                <Button shadowless round color="#ffffff" style={styles.submitButton} onPress={() => this._submitLog()}>
                    <Text>Submit </Text>
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
        borderRadius: 10 
    },

    triggerClicked: {
        width: 100,
        height: 100,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 10
        
    },

    uploadMedia:{
        width: '60%',
        height: 200
    }
});