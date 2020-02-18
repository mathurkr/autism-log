import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
  Share,
  Slider,
  ActionSheetIOS,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import {SingleImage} from 'react-native-zoom-lightbox';

var { width, height } = Dimensions.get('window')

var Lightbox = require('react-native-lightbox');

export default class ExpandedLog extends Component {
    static navigationOptions = ({navigation}) => {
        const {params={}} = navigation.state;
        return {
            title: 'Log',
            message: 'hey',
            headerTitleStyle :{color:'black'},
            headerStyle: {backgroundColor:'white'},
            headerRight: <Ionicons name="ios-more" style={{ marginRight:15,color:'black' }} size={30} onPress={() => params.handleActionSheet()} />
        };
        
        }

        
  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = {result: ''}
    this.state={
        value: 15
    }
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

        , text:"Charles felt uncomfortable during science class", image: "https://296y67419hmo2gej4j232hyf-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/japheth-mast-679884-unsplash.jpg",
        behaviors:["Verbal Aggression", "Rolling on the Floor", "Destroying Property"], resolution:["Trigger removed", "Redirection", "Waited it out"]} ,
      ],
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }


    _showResult(result){
        this.setState({result})
    }


    componentDidMount() {
        this.props.navigation.setParams({ handleActionSheet: this._onOpenActionSheet});
        this.props.navigation.setParams({ handleShare: this._shareMessage });

    }

    _shareMessage = async() =>  {
        const uri = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQke1-AID5bmLopVaEGKNMorH2oKLh6ZGoI0AyjTmEJqeDhoWYh"
        Share.share({
            message: "This is a test",
            url: uri,
        },
        { 
            excludedActivityTypes: [
                'com.apple.UIKit.activity.Print',
                'com.apple.UIKit.activity.SaveToCameraRoll',
                'com.apple.UIKit.activity.AirDrop',

            ]
        }
        ).then(this._showResult);
        
    }

    _onOpenActionSheet(){
        ActionSheetIOS.showActionSheetWithOptions(
            { 
                options: ['Cancel', 'Delete', 'Share', 'Edit'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if(buttonIndex == 1) {
                    // destructive action
                }
                if(buttonIndex == 2)
                {
                    this.handleShare()
                }
            }
        )
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

  renderBehavior = (item) =>{
    return item.behaviors.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor2} onPress={() => {}}>
             <Text style={styles.tag}> {tag}</Text>
        </TouchableOpacity> 
      );
    })
  }

  renderTagsIcon = (item) =>{
    return item.tagsIcon.map((tag, key) => {
      return (
        <Ionicon name={tag} /> 
      );
    })
  }

  renderResolution = (item) =>{
    return item.resolution.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor2} onPress={() => {}}>
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
    const {value} = this.state;

    return (

      <View style={styles.container}>


            <View> 
            {/* <Text style={styles.text}>{String(value)}</Text> */}
                    {/* <Slider
                    step={1}
                    maximumValue={100}
                    onValueChange={this.change.bind(this)}
                    value={value}
                    /> */}
            </View>
          {/* <Text>
              {JSON.stringify(this.state.result)}
          </Text> */}
        <FlatList 
          style={styles.notificationList}
          data={this.state.posts}
          keyExtractor= {(item) => {
            return item.id;
          }}

          renderItem={({item}) => {
            return (   
            <View>  
                 <View style={[styles.card, {borderColor:"white"} ]} >
                    <View style={{flexDirection:"row",}}>
                        <View style={[styles.circle, {backgroundColor: item.color}]} />
                        <Text style={[styles.name, {color:item.color}]}>{item.name}</Text>
                        <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>
                    </View>
 
 

                    <Text style={styles.post}> {item.text}  </Text>
                    
                    <SingleImage uri={item.image} style={styles.postImage}  />

                        
                    <Text style={{marginHorizontal:10, marginTop: 20, fontSize: 14, }}> Meltdown Type </Text> 

                    <View style={[styles.cardContent, styles.tagsContent]}>
                    {this.renderTags(item)}
                    </View>

                    <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                            <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                            <Text style={styles.timestamp}> Irvine California  </Text>
                    </View>
                    
                    <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.8, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginVertical: 20}}>
                    </View>

                    <View style={{}}>
                        <Text style={styles.behaviors}> Behaviors Shown </Text>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            {this.renderBehavior(item)}
                        </View>
                    </View>


                    <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.8, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginVertical: 20}}>
                    </View>

                    <View style={{}}>
                        <Text style={styles.behaviors}> Resolution </Text>
                        <View style={[styles.cardContent, styles.tagsContent]}>
                            {this.renderResolution(item)}
                        </View>
                    </View>
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
    padding:10,
    backgroundColor:"#EFEFEF"
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
    marginLeft: 20

  },

  btnColor2: {
    padding:8,
    borderRadius:30,
    marginHorizontal:3,
    backgroundColor:'rgba(110,211,225,0.30)',
    marginTop:5,
    marginLeft: 20

  },


  post: {
    margin:10 ,
    fontSize: 14,
    color: "#838899",
},

postImage:{
    //width: undefined,
    //height: 150,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 300,
    flex: 1,
    width: null
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
},

behaviors: {
    marginHorizontal:10 ,
    marginVertical: 0,
    fontSize: 14,
    color: "black",
},


});   
