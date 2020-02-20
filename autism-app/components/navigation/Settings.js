import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, FlatList, TouchableOpacity, Alert, Dimensions, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, Input } from 'galio-framework';
import { FontAwesome, Foundation} from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import EmailModal from '../navigation/EmailModal';
var screen = Dimensions.get("window");


const dataSource = [{icon: "mail", description: 'Email', subDescription: 'jason.almaraz808@gmailcom', arrow: require('../../assets/images/test2.png')},
{icon: "lock", description: 'Reset Password', subDescription: '', arrow: require('../../assets/images/test2.png')},
{icon: "torso", description: 'Edit Profile', subDescription: "Jason Almaraz", arrow: require('../../assets/images/test2.png')},
{icon: 'credit-card', description: 'Manage Subscriptions', subDescription: '', arrow: require('../../assets/images/test2.png')},
]

const communitySection = [{icon: "star", description: 'Rate us on App Store', arrow: require('../../assets/images/test2.png')},
{icon: "torsos-all", description: 'Find Lumious Online', arrow: require('../../assets/images/test2.png')},
{icon: "link", description: 'Share Luminous w/ a Friend', arrow: require('../../assets/images/test2.png')},

]

export default class Profile extends Component {
    constructor(props){
        super(props)
        {
        }
        //this._onPressAdd = this._onPressAdd.bind(this);
    }

    static navigationOptions = {
        title: "Settings",
        }

    
        actionOnRow(item, index) {

          if(index==0)
          {
            this.refs.addModal.showAddModal();
          }

          if(index==1)
          {
            Alert.alert("Reset Password")
          }

          if(index==2)
          {
            Alert.alert("Edit Profile")
          }

          if(index==3)
          {
            Alert.alert("Manage Subscription")
          }
      }

    


        
    render() {
      

        return (
          
          <ScrollView style={styles.container}>

          <View style={styles.body}>
            </View>

              <Text style={styles.sectionTitle}> GENERAL </Text>
                    <FlatList style={styles.notificationList} 
                    data={dataSource}
                    renderItem ={({item, index}) => {
                        return (

                        <TouchableOpacity onPress={()=> this.actionOnRow(item,index)}> 
                        <View style={styles.notificationBox}>
                            <Foundation name={item.icon} size={25} style={styles.icon} />
                            <View style={styles.btntextcontainer}> 
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                            <Text style={styles.subDescription}>{item.subDescription}</Text>
                          {/* <Image style={styles.arrow} source={item.arrow}/>  */}
                        </View>
                        </TouchableOpacity>
                     )}}/>

                     <EmailModal ref={'addModal'}>


                     </EmailModal>

                     


                  <Text style={styles.sectionTitle}> Community </Text>
                  <FlatList style={styles.notificationList} 
                    data={communitySection}
                    renderItem ={({item}) => {
                        return (
                          <TouchableOpacity> 
                        <View style={styles.notificationBox}>
                            <Foundation name={item.icon} size={25} style={styles.icon} />
                            <View style={styles.btntextcontainer}> 
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                            <Text style={styles.subDescription}>{item.subDescription}</Text>
                          <Image style={styles.arrow} source={item.arrow}/> 
                        </View>
                        </TouchableOpacity>
                     )}}/>

          </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%",
        backgroundColor: '#EFEFEF'
    },

    sectionTitle: {
        color: '#8485f9',
        fontWeight: 'bold',
        fontSize: 13,
        paddingLeft: 20,
        fontWeight: 'bold'
    },

////

      notificationList:{
        marginVertical:10,
        paddingHorizontal:21,
      },
      
      notificationBox: {
        padding:5,
        marginTop:5,
        marginBottom:10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius:10,
      },

      icon: {
        marginVertical: 10,
        paddingRight: 10,
        marginHorizontal: 10,
        color: '#0047cc'

      },

      arrow:{
        width: 6,
        height: 12,
        marginTop: 12,
        marginVertical: 8,
        padding: 8,
        
      },

      description:{
        fontSize:16,
        color: "#042c5c",
        marginLeft:5,
        fontWeight: 'bold',
        paddingTop: 12
      
      },

      subDescription:{
        fontSize:12,
        color: "#77869e",
        paddingTop: 14, 
        marginRight: 8
      },

      btntextcontainer :{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
      },

      ///

      header:{
        height:120,
      },

      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:40,
      },
      
      name:{
        fontSize:22,
        color:"black",
        fontWeight:'600',
      },

      body:{
        marginTop:20,
      },
      
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },

      cogIcon: {
        marginRight: 18,
        color: "#5574c3"
      }

      

});
