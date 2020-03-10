import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Switch, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Ionicons} from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';

import { Button, Text, Input, theme } from 'galio-framework';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default function App() {

  getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    console.log(finalStatus)

    // Get the token that uniquely identifies this device
    console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
  }


  return (
    <View style={styles.container}>
      <View style={{alignItems:'center', marginVertical: 0, marginHorizontal:0, backgroundColor:'#EFEFEF'}}>
        <Image style={styles.productImg} source={{uri:'https://iconsplace.com/wp-content/uploads/_icons/40e0d0/256/png/alarm-clock-icon-17-256.png'}}/>
        <Text style={styles.description}>
          To receive notification on your phone
          first turn on notification for Luminous in:
        </Text>
        <Text style={styles.price}> Settings -> Luminous -> Notifications</Text>
        <TouchableOpacity> 
          <Text style={{color:'#29D2E4', fontSize:12, marginTop: 10, marginBottom: 30 }}> Open Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modal}>
        
      <View style={styles.inputContainerModal}>
        <View style={styles.textContainer}>
          <Text style={styles.dataName}> Daily Reminders</Text> 
          <Switch style={styles.dataModal1} onTintColor="#00ff00" thumbTintColor="#0000ff" tintColor="#ff0000"/>  
        </View>
      </View>

      <View style={styles.inputContainerModal}>
        <View style={styles.textContainer}>
          <Text style={styles.dataName}> Morning Notifications</Text> 
          <Switch style={styles.dataModal1} onTintColor="#00ff00" thumbTintColor="#0000ff" tintColor="#ff0000"/>  
        </View>
      </View>

      <View style={styles.inputContainerModal}>
        <View style={styles.textContainer}>
          <Text style={styles.dataName}> Afternoon Notifications</Text> 
          <Switch style={styles.dataModal1} onTintColor="#00ff00" thumbTintColor="#0000ff" tintColor="#ff0000"/>  
        </View>
      </View>

      <View style={styles.inputContainerModal}>
        <View style={styles.textContainer}>
          <Text style={styles.dataName}> Evening Notifications</Text> 
          <Switch style={styles.dataModal1} onTintColor="#00ff00" thumbTintColor="#0000ff" tintColor="#ff0000"/>  
        </View>
      </View>


      <View style={styles.inputContainerModal}>
        <View style={styles.textContainer}>
          <Text style={styles.dataName}> End of Day</Text> 
          <Switch style={styles.dataModal1} onTintColor="#00ff00" thumbTintColor="#0000ff" tintColor="#ff0000"/>  
        </View>
      </View>
      </View> 

  </View>
);
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  productImg:{
    width:70,
    height:70,
    marginTop: 15
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:14,
    color:"#130303",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  },


  //

  inputContainerModal: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: .25,
    justifyContent: 'space-between',
},


textContainer: {
  flexDirection: "row",
  justifyContent: 'space-between',
},

dataName: {
  color: '#999999',
  fontWeight: 'bold',
  fontSize: 15,
  paddingLeft: 0,
  fontWeight: 'bold',
  marginLeft: 15,
  width: '77%',
  marginTop: 5,
  
},

dataModal1: {
  color: '#8485f9',
  fontWeight: 'bold',
  fontSize: 13,
  paddingLeft: 0,
  fontWeight: 'bold',
  flex: 1, flexWrap: 'wrap',
  textAlign:'right',
  marginRight: 15
  
},

modal:{
  flex: 1,
  backgroundColor: '#EFEFEF',
  padding: 0
},

});     