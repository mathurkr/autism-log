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
        {id:1, color:"#002F6F", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "Very Severe", timestamp: 1569109273726, tags:['Sensory', 'Routine', 'Social', 'Custom', 'Other',], text:"Charles felt uncomfortable during science class", image: require('../../assets/images/child_photo.png'), tagsIcon:["ios-body", "ios-calendar", "ios-people"] } ,
        {id:2, color:"#0050A1", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "Severe", timestamp: 1569109273726, tags:['tag 1', 'tag 2', 'tag 3', 'Dey-Dey', 'Developer'],  image: require('../../assets/images/test2.png'), text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}, 
        {id:3, color:"#0D92CB", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", name: "Moderate", timestamp: 1569109273726, tags:['tag 1', 'tag 2', 'tag 3'], image: require('../../assets/images/child_photo.png')}, 
        {id:4, color:"#93CBE4", icon:"https://bootdey.com/img/Content/avatar/avatar4.png", name: "Mild", timestamp: 1569109273726, tags:['tag 1', 'tag 2', 'tag 3']}, 
        {id:5, color:"#DBECF9", icon:"https://bootdey.com/img/Content/avatar/avatar5.png", name: "Slight", tags:['tag 1', 'tag 2', 'tag 3']}, 
        {id:6, color:"#002F6F", icon:"https://bootdey.com/img/Content/avatar/avatar6.png", name: "User 6", tags:['tag 1', 'tag 2', 'tag 3']}, 
        {id:7, color:"#002F6F", icon:"https://bootdey.com/img/Content/avatar/avatar1.png", name: "User 7", tags:['tag 1', 'tag 2', 'tag 3']}, 
        {id:8, color:"#002F6F", icon:"https://bootdey.com/img/Content/avatar/avatar2.png", name: "User 8", tags:['tag 1', 'tag 2', 'tag 3']},
        {id:9, color:"#002F6F", icon:"https://bootdey.com/img/Content/avatar/avatar3.png", name: "User 9", tags:['tag 1', 'tag 2', 'tag 3']},
      ],
    };
  }




  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {}}>
             <Text style={styles.tag}> {tag}</Text>
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
              <TouchableOpacity style={[styles.card, {borderColor:item.color}]} >
                <View style={styles.cardContent}>

                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>

                  
                </View>

                <Text style={styles.post}> {item.text}  </Text>
                <Image source={item.image} style={styles.postImage} resizeMethod="cover" />

                    
                <View style={[styles.cardContent, styles.tagsContent]}>
                  {this.renderTags(item)}
                </View>

                <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                        <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                        <Text style={styles.timestamp}> Irvine California  -</Text>
                    </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:140,
    padding:10,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:20,
    marginBottom:20,
    borderRadius: 10
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
    alignSelf: 'center'
  },
  btnColor: {
    padding:8,
    borderRadius:30,
    marginHorizontal:3,
    backgroundColor:'#eee',
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

});   
