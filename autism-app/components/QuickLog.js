import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TextInput } from 'react-native';

import { Button, Slider, Block } from 'galio-framework';
//import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class QuickLog extends Component {
    static navigationOptions = {
        title: 'Quick Log'
    };

    constructor(props) {
        super(props);
        this.state = {
            //media:
            location: '',
            date: new Date(),
            show: false,
            triggers: [],//tags
            severity: 0
            
        };

      }

    //View-related
    toggleDatePicker = ()=>{
        if(!this.show){
            this.setState({show:true});
        }
        else{
            this.setState({show:false});
        }
        
    }
    //Client-side data handlers
    setDate = (event,date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    setSeverity = (severity) =>{
        severity = severity || this.state.severity;

        this.setState({
            severity
        });
    }
    //Data submission
    _submitLog = ()=>{
        //Do data validation
        //Trigger another component to do something with data
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Location</Text>
                {/* Start with single-line text field, transition to location search if a library exists for react native. */}
                <TextInput
                    style={styles.TextInput}
                    onChangeText={location => this.setState({location})}
                    value={this.state.location}
                />
                <Text>{this.state.location}</Text>
                <Button shadowless round color="#ffffff" onPress={this.toggleDatePicker}>
                    <Text>Date:</Text>
                    <Text>{this.state.date.toLocaleString('en-US')}</Text> 
                </Button>
                {/* Find date picker */}
                {this.state.show && <DateTimePicker value={this.state.date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />}
                
                {/* <Text>Picker: {this.state.show.toString()}</Text> */}
                <Text>Meltdown Triggers</Text>
                {/* Need 5 custom buttons with images inside of them. Maybe create a component? */}
                <View style={styles.triggerContainer}>
                    <Button color= '#ffffff' style={styles.triggerButton}>
                        <Image source= {require('../assets/hand.png')}/>
                        <Text>Sensory</Text>
                    </Button>
                    <Button color= '#ffffff' style={styles.triggerButton}>
                        <Text>Social</Text>
                    </Button>
                    <Button color= '#ffffff' style={styles.triggerButton}>
                        
                        <Text>Routine</Text>
                    </Button>
                    <Button color= '#ffffff'style={styles.triggerButton}>
                        <Text>Food</Text>
                    </Button>
                    <Button color='#ffffff' style={styles.triggerButton}>
                        <Text>Item Taken Away</Text>
                    </Button>
                </View>
                <Text>Severity</Text>
                {/* <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={6}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                /> */}
                
                <Slider
                    maximumValue={30}
                    value={this.state.severity}
                    onSlidingcomplete={() => this.setSeverity()}
                />
                
                <Button shadowless round color="#ffffff" /* onPress={() => this._submitLog()} */ style={styles.submitButton}>
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

    triggerButton: {
        width: 100,
        height: 100,
        color: '#ffffff',
        shadowColor: 'blue' 
    }
});