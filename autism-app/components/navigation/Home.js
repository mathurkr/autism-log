import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image } from 'react-native';
import { Button, Text, Input } from 'galio-framework';
import CalendarStrip from 'react-native-calendar-strip';
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";

posts = [{name: "Social Meltdown", severity: "Very Severe",  timestamp: 1569109273726, id: '1', avatar: require('../../assets/images/testicon.png'), image: require('../../assets/images/child_photo.png'), text:"Charles felt uncomfortable during science class." },

{name: "cog", severity: "Moderate", timestamp: 1569109273726, id: '2', avatar: require('../../assets/images/sensory.png'), image: require('../../assets/images/test2.png'), text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
{name: "cog", severity: "Low", timestamp: 1569109273726, id: '3', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png')},
{name: "cog", severity: "Severe", timestamp: 1569109273726, id: '4', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png')}
]

export default class Home extends Component {

    static navigationOptions = {
        //To hide the NavigationBar from current Screen
        header: null
      };

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}> 
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text> 
                                <Text style={styles.name}> {post.name} </Text> 
                                <Text style={styles.timestamp}> {moment(post.timestamp).fromNow()} </Text>
                            </Text>
                            <Text style={{marginTop: 5}}> 
                                <Text style={styles.name}> Severity Level: </Text>
                                <Text style={styles.severity}> {post.severity} </Text>
                            </Text>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    
                    <Text style={styles.post}> {post.text}  </Text>
                    <Image source={post.image} style={styles.postImage} resizeMethod="cover" />

                    <View style={{flexDirection: "row"}}>
                        <Ionicons name="ios-pin" size={20} color="#0047cc" style={{marginRight: 10}} />
                        <Text style={styles.pinnedLocation}> Irvine California </Text>



                    </View>
            </View>
        </View>
        )
    }

    render() {

        // const { params } = this.props.navigation.state;
        return (
            
            <View> 
                                <View style={styles.container}>
                    {/* <Text>This is the Home Screen</Text> */}
                    <CalendarStrip
                        minDayComponentSize={60}
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        selection={'border'}
                        selectionAnimation={{ duration: 300, borderWidth: 1 }}
                        style={{ position: 'absolute', top: 0, marginTop: '10%', marginBottom: '10%' }}
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

                    <FlatList 
                    style={styles.feed}
                     data={posts} 
                     renderItem = {({ item }) => this.renderPost(item)}
                     keyExtractor = { item => item.id}
                     showsVerticalScrollIndicator={false}
                     />
                                     </View>

        );
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },

    feedContainer: {
        flex:1,
        backgroundColor: "#EFECF4",
    },

    name: {
        fontSize: 13,
        fontWeight: "500",
        color: "#454D65"
    },

    severity: {
        fontSize: 13,
        color: '#000000',
        marginTop: 10,
        fontWeight: "500",
        color: "#000000"
    },

    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginVertical: 5,
    },

    pinnedLocation: {
        fontSize: 11,
        color: "#8c9daa",
        marginTop: 5
    },

    feed: {
        marginHorizontal: 12,
        marginTop: 120,
    },

    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 12,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DFDFDF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
,
    avatar: {
        width: 20,
        height: 30,
        marginRight: 16,
        color: '#8c9daa'
    },

    post: {
        marginTop: 10,
        fontSize: 14,
        color: "#838899"
    },

    postImage:{
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }

});