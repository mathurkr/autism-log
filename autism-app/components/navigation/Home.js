import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image } from 'react-native';
import { Button, Text, Input } from 'galio-framework';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import DB from '../config/DatabaseConfig';

// Currently storing posts below in the database for now -- then retrieves information to display
// Testing with following account information:
// Email: test1234@gmail.com
// Password: #Test1234
// ID in users collection: CvspxUp71byr6wqJlb6e
posts = [{ name: "Social Meltdown", tag: "Social", timestamp: 1569109273726, id: '1', avatar: require('../../assets/images/testicon.png'), image: require('../../assets/images/child_photo.png'), text: "Charles felt uncomfortable during science class." },

{ name: "cog", tag: "Sensory", timestamp: 1569109273726, id: '2', avatar: require('../../assets/images/sensory.png'), image: require('../../assets/images/test2.png'), text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
{ name: "cog", timestamp: 1569109273726, id: '3', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png') },
{ name: "cog", timestamp: 1569109273726, id: '4', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png') }
]

export default class Home extends Component {
    state = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        date: '',
        doc_id: '',
        posts: []
    };


    componentDidMount() {
        // Get email and password from parent
        const parent = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();

        // Format current date
        const date = new Date();
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let full_date = this.state.months[date.getMonth()] + " " + day + " " + date.getFullYear();

        // Retrieve Doc ID and posts corresponding to user email and password
        this._queryDocID(parent, full_date);

    }

    _queryDocID = (parent, date) => {
        // Fetch ID for this user based on their email and password from users collection
        DB.firestore().collection("users").where("email", "==", parent.getParam("email")).where("password", "==", parent.getParam("password"))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({ doc_id: doc.id }, () => {
                        this._retrieveLogs(date);
                    });
                })
            })
            .catch(function (error) {
                alert("Error getting documents from user collection: ", error);
            });
    }

    _retrieveLogs = date => {
        let ddate = "Feb 03 2020"  // Test this for now
        DB.firestore().collection("logs").doc(this.state.doc_id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.get(ddate) != null) {
                        const data = doc.data();
                        for (let i = 0; i < data[ddate].length; i++) {
                            this.setState({
                                posts: [...this.state.posts, data[ddate][i]]
                            });
                        }

                    }
                    else {
                        alert('Could not find logs matching with date');
                    }
                }
                else {
                    alert('Document does not exist');
                }

            })
            .catch(function (error) {
                alert("Error getting documents from log collection: ", error);
            });

    }


    renderPost = post => {

        return (
            <View style={styles.feedItem}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}> {post.name}</Text>
                            <Text style={styles.timestamp}> {moment(post.timestamp).fromNow()} </Text>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>

                    <Text style={styles.post}> {post.text} </Text>
                    <Image source={{ uri: post.image }} style={styles.postImage} resizeMethod="auto" />

                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-pin" size={20} color="#73788B" style={{ marginRight: 10 }} />
                        <Text style={styles.pinnedLocation}> Irvine California </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        // const posts = this._retrieveLogs();
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

                <View>
                    <View>
                        <FlatList
                            style={styles.feed}
                            data={this.state.posts}
                            renderItem={({ item }) => this.renderPost(item)}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
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
        flex: 1,
        backgroundColor: "#EFECF4",
    },

    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },

    pinnedLocation: {
        fontSize: 11,
        color: "#C4C6CE",
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
        borderRadius: 10,
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
    },

    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },

    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }

});