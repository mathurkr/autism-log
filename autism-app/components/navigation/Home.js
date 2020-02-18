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
  Dimensions
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";

let deviceWidth = Dimensions.get('window').width;

export default class Users extends Component {
    static navigationOptions = {
        header: null,
        
    };


  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {id:1, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ]

        , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,

        {id:2, color:"#333FDF", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ],
         image: require('../../assets/images/test2.png'), text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}, 

        {id:3, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ]

        , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,
        

        {id:4, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ]

        , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,
        

        {id:5, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ]

        , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,
        

        {id:6, color:"#3200DF", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, 
        tags:

        [
            {
                name:"Sensory",
                icon: "ios-body",
            },
            { 
                name:"Routine",
                icon:"ios-calendar"
            },
            { 
                name:"Social",
                icon:"ios-people"
            },
        ]

        , text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'),
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,
        
      ],
    };
  }




  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {}}>
            <View style={{flexDirection:"row"}}>
                <Ionicons color="#0047cc" name={tag.icon} size={15}/>
                <Text style={styles.tag}> {tag.name}</Text>
             </View>
        </TouchableOpacity> 
      );
    })
  }
  

  renderTagIcon = (item) =>{
    return item.tagsIcon.map((tag, key) => {
      return (
        <Ionicons name={tag} size={20} />
      );
    })
  }

  render() {
    return (
        
      <View style={styles.container}>
          <CalendarStrip
                        minDayComponentSize={60}
                        calendarAnimation={{ type: 'sequence', duration: 30 }}
                        selection={'border'}
                        selectionAnimation={{ duration: 300, borderWidth: 1 }}
                        style={{ position: 'absolute', top: 0, marginTop: '10%', marginBottom: '10%'  }}
                        calendarHeaderStyle={{ color: 'black', width: deviceWidth, marginBottom: 10  }}
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
          keyExtractor= {(item) => {
            return item.id;
          }}

          renderItem={({item}) => {
            return (   
            <View>  



                
                <TouchableOpacity style={[styles.card, {borderColor:"white"} ]} >

                <View style={{flexDirection:"row",}}>
                    <View style={[styles.circle, {backgroundColor: item.color}]} />
                    <Text style={[styles.name, {color:item.color}]}>{item.name}</Text>
                    <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>
                </View>
                
                    <View style={[styles.cardContent, {backgroundColor:"rgba(41, 210, 228, 0.4)"}]}>
                    
                    </View>

                    <Text style={styles.post}> {item.text}  </Text>
                    <Image source={item.image} uri={item.iamge} style={styles.postImage} resizeMethod="cover" />

                        
                    <View style={[styles.cardContent, styles.tagsContent]}>
                    {this.renderTags(item)}
                    </View>

                    <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                            <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                            <Text style={styles.timestamp}> Irvine California  </Text>
                        </View>
                </TouchableOpacity>
                
                <View sttle={{}}> 
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9' }]} />
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9' }]} />
                    <View style={[styles.bottomCircle, {backgroundColor: '#E9E9E9', marginBottom: 10}]} />
                </View>



              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },


  notificationList:{
    marginTop:140,
    padding:10,
  },
  card: {
    height:null,
    //paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:10,
    marginBottom:10,
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
  cardContent:{
    flexDirection:'row',

    //marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  tag:
  {
      fontSize: 13,
      color: 'black'
  },

  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginHorizontal:10,
  },
  btnColor: {
    padding:8,
    borderRadius:30,
    marginHorizontal:3,
    backgroundColor:'rgba(110,211,225,0.30)',
    marginTop:5,
  },


  post: {
    margin:10 ,
    fontSize: 14,
    color: "#838899",
},

postImage:{
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
    borderRadius: 8/2,
    marginTop: 9,
    marginLeft: 10
}
,

bottomCircle: {
    width: 5,
    height: 5,
    borderRadius: 5/2,
    marginTop: 9,
    marginLeft: 10
}



});   
