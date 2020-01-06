import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, Input } from 'galio-framework';
import CalendarStrip from 'react-native-calendar-strip';

export default class Home extends Component {
    render() {
        // const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                {/* <Text>This is the Home Screen</Text> */}
                <CalendarStrip
                    minDayComponentSize={60}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    selection={'border'}
                    selectionAnimation={{ duration: 300, borderWidth: 1 }}
                    style={{ position: 'absolute', top: 0, paddingTop: 30, paddingBottom: 10 }}
                    calendarHeaderStyle={{ color: 'black', width: deviceWidth, marginBottom: 10 }}
                    // calendarColor={'#7743CE'}
                    highlightColor={'#9265DC'}
                    dateNumberStyle={{ color: 'black' }}
                    dateNameStyle={{ color: 'black' }}
                    highlightDateNumberStyle={{ color: '#A970CF' }}
                    highlightDateNameStyle={{ color: '#A970CF' }}
                    innerStyle={{}}
                    // borderHighlightColor={'black'}
                    // markedDatesStyle={{ color: 'blue', marginTop: -100 }}
                    // iconLeft={require('./img/left-arrow.png')}
                    // iconRight={require('./img/right-arrow.png')}
                    iconContainer={{ flex: 0.1 }}
                />
            </View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});