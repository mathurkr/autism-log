import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native';

import { Button } from 'galio-framework';
// import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class QuickLog extends Component {
    static navigationOptions = {
        title: 'Quick Log'
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: new Date(),
            
        };

      }
    
    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Location</Text>
                {/* Start with single-line text field, transition to location search if a library exists for react native. */}
                <TextInput
                    onChangeText={text => this.setState({text})}
                    value={this.state.text}
                />
                <Text>Date</Text>
                {/* Find date picker */}
                <DateTimePicker value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
                <Text>Meltdown Triggers</Text>
                {/* Need 5 custom buttons with images inside of them. Maybe create a component? */}
                <Text>Severity</Text>
                {/* <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={6}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                /> */}
                <Button shadowless round color="#ffffff" /* onPress={() => this._toLoginPage()} */ style={styles.submitButton}>
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
    }
});