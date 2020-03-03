import React,  {useContext, useState} from'react';
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

import moment from "moment";

import {Context} from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import { connectActionSheet } from '@expo/react-native-action-sheet'
import {SingleImage} from 'react-native-zoom-lightbox';
import {deleteBlogPost} from '../context/BlogContext'
import {state} from '../context/BlogContext'

var { width, height } = Dimensions.get('window')
var Lightbox = require('react-native-lightbox');



renderTags = (item) =>{
    console.log(item);
    return item.triggers.map((tag, key) => {
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
  
//   renderBehavior = (item) =>{
//     return item.behaviors.map((tag, key) => {
//       return (
//         <TouchableOpacity key={key} style={styles.btnColor2} onPress={() => {}}>
//              <Text style={styles.tag}> {tag}</Text>
//         </TouchableOpacity> 
//       );
//     })
//   }





const ShowScreen = ({navigation}) => {
    const {state, deleteBlogPost} = useContext(Context);

    const [results, setResults] = useState('');

    const item = state.find(blogPost => blogPost.id === navigation.getParam('id'))
    

    _onOpenActionSheet = (navigation) => {

        ActionSheetIOS.showActionSheetWithOptions(
            { 
                options: ['Cancel', 'Delete', 'Share', 'Edit'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if(buttonIndex == 1) {
                    navigation.navigate("Index")
                    //Still needs to be refactored
                    {console.log("BEFORE: " + state[1])}

                    () => deleteBlogPost(item.id)
                    
                    {console.log("AFTER: " + item.id)}

                }
                if(buttonIndex == 2)
                {
                    _shareMessage()
                }
                if(buttonIndex == 3)
                {
                    navigation.navigate("Edit", {id:navigation.getParam('id')})

                }
            }
        )
    }
    return ( 
    <View styles={{flex:1}}>
        <ScrollView styles={{}}> 

        <View style={[styles.card, {borderColor:"white"} ]}>
            <View style={{flexDirection:"row"}}>
                <View style={[styles.circle, {backgroundColor:"purple"}]} />
                <Text style={[styles.name, {color:"purple"}]}>{item.title}</Text>
                <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>
            </View>
            <Text style={styles.post}> {item.content}  </Text>
            <SingleImage uri={item.media} style={styles.postImage} />


            <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                <Text style={styles.timestamp}> {item.location}  </Text>
            </View>

            <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.5, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginTop: 20}}>
            </View>

            <Text style={{marginHorizontal:20, marginTop: 20, fontSize: 14,fontWeight:'bold' }}> Meltdown Type </Text> 
            <View style={[styles.cardContent, styles.tagsContent]}>
                {this.renderTags(item)}
            </View>


            <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.5, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginTop: 20}}>
            </View>


            <Text style={{marginHorizontal:20, marginTop: 20, fontSize: 14, fontWeight:'bold'}}> Date of Meltdown </Text> 
            <Text style={{marginHorizontal:20, marginTop: 20, fontSize: 14, }}> {item.date} </Text> 

            <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.5, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginTop: 20}}>
            </View>


            <Text style={{marginHorizontal:20, marginTop: 20, fontSize: 14, fontWeight:'bold'}}> Resolution </Text> 


            {/* <View style={{}}>
                <Text style={styles.behaviors}> Behaviors Shown </Text>
                <View style={[styles.cardContent, styles.tagsContent]}>
                    {this.renderBehavior(item)}
                </View>
             </View> */}
             

            {/* <View style={{
                        borderBottomColor: 'grey', 
                        borderBottomWidth: 0.8, 
                        width: width - 40,
                        alignSelf: 'center',
                        marginVertical: 20}}>
            </View> */}
                    



        </View>
        {/* <TouchableOpacity onPress={()=>navigation.navigate("Edit", {id:navigation.getParam('id')})}>
            <Text> Edit </Text>
        </TouchableOpacity>
        
        
        <Text> {blogPost.title} </Text>
        
        <Text> {blogPost.content} </Text>
        <Text> {blogPost.date} </Text>

        {console.log(blogPost.severity)} */}
        </ScrollView>
    </View>
    )
}

ShowScreen.navigationOptions=({navigation})=>{
    return{
        title: 'Log',
        message: 'hey',
        headerTitleStyle :{color:'black'},
        headerStyle: {backgroundColor:'white'},
        headerRight:(
            <TouchableOpacity onPress={() => _onOpenActionSheet(navigation)}> 
            <Ionicons name="ios-more" style={{ marginRight:15,color:'black' }} size={30}  />
            </TouchableOpacity>
        )
    }
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



_showResult = (result) => {
    this.setState({result})
}


componentDidMount = () => {
    this.props.navigation.setParams({ handleActionSheet: this._onOpenActionSheet});
    this.props.navigation.setParams({ handleShare: this._shareMessage });
}




export default ShowScreen;

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
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginHorizontal: 10,
      height: 300,

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