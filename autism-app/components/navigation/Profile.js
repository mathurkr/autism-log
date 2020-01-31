import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, Input } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

 

export default class Profile extends Component {
    constructor(){
        super()
        {
        }
    }

    static navigationOptions = {
        title: "Profile(s)",
        headerRight: () =>
        (
          <TouchableOpacity>
            <FontAwesome name="cog" style={styles.cogIcon} size={30} />
          </TouchableOpacity>
        ),

        headerBackground: (
            <LinearGradient
                colors={['#4AD4D4', '#C395FF']}
                style={{flex: 1}}
                start={{x:0, y:0}}
                end={{x: 1, y:1}}
            />
          ),
        }
        
    render() {
        const dataSource = [{icon: "cog", description: 'Profile Settings', subDescription: 'Update and modify Charles profile', arrow: require('../../assets/images/test2.png')},
        {icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png')},
        {icon: "star", description: 'Goals', subDescription: "Update and manage Charles' goals", arrow: require('../../assets/images/test2.png')},
        {icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png')},
        ]

        const dataSection = [{icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png')},
        {icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png')},
      ]

        return (
          
          <ScrollView style={styles.container}>
          <LinearGradient
                colors={['#4AD4D4', '#C395FF']}
                style={{flex: 1}}
                start={{x:0, y:0}}
                end={{x: 1, y:1}}> 
           <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          </LinearGradient>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Charles Darwin</Text>
              <Text style={styles.info}> 12, Male </Text>              
            </View>

              <Text style={styles.sectionTitle}> GENERAL </Text>
                    <FlatList style={styles.notificationList} 
                    data={dataSource}
                    renderItem ={({item}) => {
                        return (
                          <TouchableOpacity> 
                        <View style={styles.notificationBox}>
                            <FontAwesome name={item.icon} size={25} style={styles.icon} />
                            <View style={styles.btntextcontainer}> 
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.subDescription}>{item.subDescription}</Text>
                            </View>
                          <Image style={styles.arrow} source={item.arrow}/> 
                        </View>
                        </TouchableOpacity>
                     )}}/>


                  <Text style={styles.sectionTitle}> DATA </Text>
                    <FlatList style={styles.notificationList} 
                    data={dataSection}
                    renderItem ={({item}) => {
                        return (
                          <TouchableOpacity> 
                        <View style={styles.notificationBox}>
                            <FontAwesome name={item.icon} size={25} style={styles.icon} />
                            <View style={styles.btntextcontainer}> 
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.subDescription}>{item.subDescription}</Text>
                            </View>
                          <Image style={styles.arrow} source={item.arrow}/> 
                        </View>
                        </TouchableOpacity>
                     )}}/>


          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          
          </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#E9EDEF',
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
        marginTop: 16,
        marginVertical: 8,
        padding: 8,
      },

      description:{
        fontSize:16,
        color: "#042c5c",
        marginLeft:10,
        fontWeight: 'bold',
        paddingTop: 8
      
      },

      subDescription:{
        fontSize:12,
        color: "#77869e",
        marginLeft:10,
        paddingBottom: 8
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
        marginTop:43,
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
        paddingBottom: 15,
      },

      cogIcon: {
        marginRight: 18,
        color: "#5574c3"
      }

      

});
