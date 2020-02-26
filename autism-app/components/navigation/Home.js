import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    Dimensions,
    Share
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import DB from '../config/DatabaseConfig';

// Currently storing posts below in the database for now -- then retrieves information to display
// Testing with following account information:
// Email: test1234@gmail.com
// Password: #Test1234
// ID in users collection: CvspxUp71byr6wqJlb6e
// posts = [{ name: "Social Meltdown", tag: "Social", timestamp: 1569109273726, id: '1', avatar: require('../../assets/images/testicon.png'), image: require('../../assets/images/child_photo.png'), text: "Charles felt uncomfortable during science class." },

// { name: "cog", tag: "Sensory", timestamp: 1569109273726, id: '2', avatar: require('../../assets/images/sensory.png'), image: require('../../assets/images/test2.png'), text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
// { name: "cog", timestamp: 1569109273726, id: '3', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png') },
// { name: "cog", timestamp: 1569109273726, id: '4', avatar: require('../../assets/images/test2.png'), image: require('../../assets/images/test2.png') }
// ]

// export default class Home extends Component {
//     state = {
//         months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         date: '',
//         doc_id: '',
//         posts: []
//     };


//     componentWillMount() {
//         // Get params passed from MainHelper
//         const { params } = this.props.navigation.state;

//         // Format current date
//         const date = params.date;
//         let day = date.getDate();
//         if (day < 10) {
//             day = "0" + day;
//         }
//         let full_date = this.state.months[date.getMonth()] + " " + day + " " + date.getFullYear();

//         // Retrieve logs for the user and posts corresponding to user email and password
//         this._retrieveLogs(params.doc_id, full_date);
//     }

//     _retrieveLogs = (doc_id, date) => {
//         let ddate = "Feb 03 2020"  // Test this for now
//         DB.firestore().collection("logs").doc(doc_id)
//             .get()
//             .then((doc) => {
//                 if (doc.exists) {
//                     if (doc.get(date) != null) {
//                         const data = doc.data();
//                         for (let i = 0; i < data[date].length; i++) {
//                             this.setState({
//                                 posts: [...this.state.posts, data[date][i]]
//                             });
//                         }

//                     }
//                     else {
//                         alert('Could not find logs matching with date');
//                     }
//                 }
//                 else {
//                     alert('There are currently no logs associated with the user');
//                 }

//             })
//             .catch(function (error) {
//                 alert("Error getting documents from log collection: ", error);
//             });

//     }

//     _fetchNewDate = selectedDate => {
//         // Reload Home page with new date
//         const { params } = this.props.navigation.state;
//         const new_date = new Date(selectedDate);

//         // Use HomeHelper to refresh the Home component -- possibly a better way to refresh Home available?
//         this.props.navigation.navigate('HomeHelper', { email: params.email, password: params.password, doc_id: params.doc_id, date: new_date });

//         // const resetAction = NavigationActions.reset({
//         //     index: 0,
//         //     actions: [
//         //         NavigationActions.navigate({ "Home", new_params })
//         //     ],
//         // });

//         // navigation.dispatch(resetAction);

//         // NavigationActions.push({ routeName: 'Home', params: { email: params.email, password: params.password, date: new_date } })
//     }

//     renderPost = post => {

//         return (
//             <View style={styles.feedItem}>
//                 <Image source={{ uri: post.avatar }} style={styles.avatar} />
//                 <View style={{ flex: 1 }}>
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <View>
//                             <Text style={styles.name}> {post.name}</Text>
//                             <Text style={styles.timestamp}> {moment(post.timestamp).fromNow()} </Text>
//                         </View>

//                         <Ionicons name="ios-more" size={24} color="#73788B" />
//                     </View>

//                     <Text style={styles.post}> {post.text} </Text>
//                     <Image source={{ uri: post.image }} style={styles.postImage} resizeMethod="auto" />

//                     <View style={{ flexDirection: "row" }}>
//                         <Ionicons name="ios-pin" size={20} color="#73788B" style={{ marginRight: 10 }} />
//                         <Text style={styles.pinnedLocation}> Irvine California </Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }

//     render() {
//         // const posts = this._retrieveLogs();
//         const { params } = this.props.navigation.state;
//         return (

//             // <View>
//             <View style={styles.container}>
//                 <CalendarStrip
//                     // ref={'CalendarStrip'}
//                     selectedDate={params.date}
//                     minDayComponentSize={60}
//                     // calendarAnimation={{ type: 'sequence', duration: 30 }}
//                     selection={'border'}
//                     selectionAnimation={{ duration: 300, borderWidth: 1 }}
//                     style={{ position: 'absolute', top: 0, paddingTop: 10, paddingBottom: 10 }}
//                     calendarHeaderStyle={{ color: 'black', width: deviceWidth, marginBottom: 10 }}
//                     onDateSelected={selectedDate => this._fetchNewDate(selectedDate)}
//                     // calendarColor={'#7743CE'}
//                     highlightColor={'#9265DC'}
//                     dateNumberStyle={{ color: 'black' }}
//                     dateNameStyle={{ color: 'black' }}
//                     highlightDateNumberStyle={{ color: '#A970CF' }}
//                     highlightDateNameStyle={{ color: '#A970CF' }}
//                     innerStyle={{}}
//                     // borderHighlightColor={'black'}
//                     // markedDatesStyle={{ color: 'blue', marginTop: -100 }}
//                     // iconLeft={require('./img/left-arrow.png')}
//                     // iconRight={require('./img/right-arrow.png')}
//                     iconContainer={{ flex: 0.1 }}
//                 />
//                 {/* </View> */}

//                 {/* <View> */}
//                 <View>
//                     <FlatList
//                         style={styles.feed}
//                         data={this.state.posts}
//                         renderItem={({ item }) => this.renderPost(item)}
//                         keyExtractor={item => item.id}
//                         showsVerticalScrollIndicator={false}
//                     />
//                 </View>
//             </View>
//             // </View>
//         );
//     }
// }
let deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {
    static navigationOptions = {
        header: null,

    };

    state = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        date: '',
        doc_id: '',
        posts: []
    };


    componentWillMount() {
        // Get params passed from MainHelper
        const { params } = this.props.navigation.state;

        // Format current date
        const date = params.date;
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let full_date = this.state.months[date.getMonth()] + " " + day + " " + date.getFullYear();
        this.setState({ date: full_date, doc_id: params.doc_id });

        // Retrieve logs for the user 
        this._retrieveLogs(params.doc_id, full_date);
    }

    _retrieveLogs = (doc_id, date) => {
        let ddate = "Feb 24 2020"  // Test this for now
        DB.firestore().collection("logs").doc(doc_id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.get(date) != null) {
                        const data = doc.data();
                        for (let i = 0; i < data[date].length; i++) {
                            this.setState({
                                posts: [...this.state.posts, data[date][i]]
                            });
                        }

                    }
                    else {
                        alert('Could not find logs matching with date');
                    }
                }
                else {
                    alert('There are currently no logs associated with the user');
                }

            })
            .catch(function (error) {
                alert("Error getting documents from log collection: ", error);
            });
    }

    _fetchNewDate = selectedDate => {
        // Reload Home page with new date
        const { params } = this.props.navigation.state;
        const new_date = new Date(selectedDate);

        // Use HomeHelper to refresh the Home component -- possibly a better way to refresh Home available?
        this.props.navigation.navigate('HomeHelper', { email: params.email, doc_id: params.doc_id, date: new_date });

        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ "Home", new_params })
        //     ],
        // });

        // navigation.dispatch(resetAction);

        // NavigationActions.push({ routeName: 'Home', params: { email: params.email, password: params.password, date: new_date } })
    }


    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       posts: [
    //         {id:1, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ]

    //         , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
    //         behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,

    //         {id:2, color:"#333FDF", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ],
    //          image: require('../../assets/images/test2.png'), text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}, 

    //         {id:3, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ]

    //         , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
    //         behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,


    //         {id:4, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ]

    //         , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
    //         behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,


    //         {id:5, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ]

    //         , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
    //         behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,


    //         {id:6, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
    //         tags:

    //         [
    //             {
    //                 name:"Sensory",
    //                 icon: "ios-body",
    //             },
    //             { 
    //                 name:"Routine",
    //                 icon:"ios-calendar"
    //             },
    //             { 
    //                 name:"Social",
    //                 icon:"ios-people"
    //             },
    //         ]

    //         , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
    //         behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,

    //       ],
    //     };
    //   }


    renderTags = (item) => {
        return item.tags.map((tag, key) => {
            return (
                <TouchableOpacity key={key} style={styles.btnColor} onPress={() => { }}>
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons color="#0047cc" name={tag.icon} size={15} />
                        <Text style={styles.tag}> {tag.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        })
    }


    renderTagIcon = (item) => {
        return item.tagsIcon.map((tag, key) => {
            return (
                <Ionicons name={tag} size={20} />
            );
        })
    }

    actionOnRow = (item, index) => {
        const post = this.state.posts[index];

        // Navigate to Expanded Log
        this.props.navigation.navigate('ExpandedLog', {
            date: this.state.date,
            doc_id: this.state.doc_id,
            avatar: post.avatar,
            behaviors: post.behaviors,
            id: post.id,
            image: post.image,
            location: post.location,
            resolution: post.resolution,
            scale: post.scale,
            tags: post.tags,
            text: post.text,
            timestamp: post.timestamp
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        return (

            <View style={styles.container}>
                <CalendarStrip
                    // ref={'CalendarStrip'}
                    selectedDate={params.date}
                    minDayComponentSize={60}
                    // calendarAnimation={{ type: 'sequence', duration: 30 }}
                    selection={'border'}
                    selectionAnimation={{ duration: 300, borderWidth: 1 }}
                    style={{ position: 'absolute', top: 20, paddingTop: 10, paddingBottom: 0 }}
                    calendarHeaderStyle={{ color: 'black', width: deviceWidth, marginBottom: 10 }}
                    onDateSelected={selectedDate => this._fetchNewDate(selectedDate)}
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

                <FlatList
                    style={styles.notificationList}
                    data={this.state.posts}
                    keyExtractor={(item) => {
                        return item.id;
                    }}

                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ backgroundColor: '#EFEFEF' }}>




                                <TouchableOpacity style={[styles.card, { borderColor: "white" }]} onPress={() => this.actionOnRow(item, index)} >

                                    <View style={{ flexDirection: "row", }}>
                                        <View style={[styles.circle, { backgroundColor: "#3200DF" }]} />
                                        <Text style={[styles.name, { color: item.color }]}>{item.scale}</Text>
                                        <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>
                                    </View>

                                    <View style={[styles.cardContent, { backgroundColor: "rgba(41, 210, 228, 0.4)" }]}>

                                    </View>

                                    <Text style={styles.post}> {item.text}  </Text>
                                    <Image source={{ uri: item.image }} uri={item.image} style={styles.postImage} resizeMethod="auto" />

                                    <Text style={{ marginHorizontal: 10, marginTop: 20, fontSize: 14, }}> Meltdown Type </Text>

                                    <View style={[styles.cardContent, styles.tagsContent]}>
                                        {this.renderTags(item)}
                                    </View>
                                </TouchableOpacity>

                                {/* <View sttle={{}}> 
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9' }]} />
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9' }]} />
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9', marginBottom: 10}]} />
                </View> */}

                                {/* // feedContainer: {
    //     flex: 1,
    //     backgroundColor: "#EFECF4",
    // },

    notificationList: {
        marginTop: 140,
        padding: 10,
    },
    card: {
        height: null,
        //paddingTop:10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 8, */}


                            </View>
                        )
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


    notificationList: {
        marginTop: 140,
        padding: 10,
        backgroundColor: "#EFEFEF"
    },
    card: {
        height: null,
        //paddingTop:10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 8,



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
    tag:
    {
        fontSize: 13,
        color: 'black'
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    btnColor: {
        padding: 8,
        borderRadius: 30,
        marginHorizontal: 3,
        backgroundColor: 'rgba(110,211,225,0.30)',
        marginTop: 5,
        marginLeft: 20
    },


    post: {
        margin: 10,
        fontSize: 14,
        color: "#838899",
    },

    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginHorizontal: 10,
    },

    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginVertical: 5,
    },

    timestamp2: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 8,
        marginLeft: -5
    },

    circle: {
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        marginTop: 9,
        marginLeft: 10
    }
    ,

    bottomCircle: {
        width: 5,
        height: 5,
        borderRadius: 5 / 2,
        marginTop: 9,
        marginLeft: 10
    }


    // post: {
    //     margin: 10,
    //     fontSize: 14,
    //     color: "#838899",
    // },

    // // feedItem: {
    // //     backgroundColor: "#FFF",
    // //     borderRadius: 5,
    // //     padding: 8,
    // //     flexDirection: "row",
    // //     marginVertical: 12,
    // //     borderRadius: 10,
    // //     borderWidth: 2,
    // //     borderColor: "#DFDFDF",
    // //     shadowColor: "#000",
    // //     shadowOffset: {
    // //         width: 0,
    // //         height: 4,
    // //     },
    // //     shadowOpacity: 0.30,
    // //     shadowRadius: 4.65,
    // //     elevation: 8,
    // // }
    // // ,
    // // avatar: {
    // //     width: 20,
    // //     height: 30,
    // //     marginRight: 16,
    // // },
    // postImage: {
    //     width: undefined,
    //     height: 150,
    //     borderRadius: 5,
    //     marginHorizontal: 10,
    // },

    // timestamp: {
    //     fontSize: 11,
    //     color: "#C4C6CE",
    //     marginVertical: 5,
    // },

    // timestamp2: {
    //     fontSize: 11,
    //     color: "#C4C6CE",
    //     marginTop: 8,
    //     marginLeft: -5
    // },

    // circle: {
    //     width: 8,
    //     height: 8,
    //     borderRadius: 8 / 2,
    //     marginTop: 9,
    //     marginLeft: 10
    // }
    // ,

    // bottomCircle: {
    //     width: 5,
    //     height: 5,
    //     borderRadius: 5 / 2,
    //     marginTop: 9,
    //     marginLeft: 10
    // }


    // postImage: {
    //     width: undefined,
    //     height: 150,
    //     borderRadius: 5,
    //     marginVertical: 16
    // }

});   
