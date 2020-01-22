import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, Input } from 'galio-framework';


 

export default class Profile extends Component {
    constructor(){
        super()
        {

        }
    }
    
    static navigationOptions = {
        title: "Profile(s)",
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

        const dataSource = [{icon: 'icon', description: 'Profile Settings', subDescription: 'Update and modify Charles profile', arrow: 'arrow'},
        {icon: 'icon', description: 'Notifications', subDescription: 'Change your notifications settings'},
        {icon: 'icon', description: 'Goals', subDescription: "Update and manage Charles' goals"},
        {icon: 'icon', description: 'Tell your Friends', subDescription: 'Let other know about this app'},

    ]


        // const { params } = this.props.navigation.state;
        return (
            <ScrollView style={styles.container}>
                <LinearGradient
                colors={['#4AD4D4', '#C395FF']}
                style={{flex: 1}}
                start={{x:0, y:0}}
                end={{x: 1, y:1}}> 

<View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                <Text style={styles.profileName}> Charles Darwin </Text>
                <Text style={styles.profileInfo}> 12, Male </Text>      

            </View>
          </View>

                </LinearGradient>


                <View style={styles.container}>
                    <Text style={styles.sectionTitle}> GENERAL </Text>
                    <FlatList style={styles.notificationList} 
                    data={dataSource}
                    renderItem ={({item}) => {
                        return (
                        <View style={styles.notificationBox}>
                            <Text style={styles.icon}> {item.icon} </Text>
                            <View style={styles.btntextcontainer}> 
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.subDescription}>{item.subDescription}</Text>
                            </View>
                            <Text style={styles.arrow}> {item.arrow} </Text>

                        </View>

                        )}}/>
                </View>


            </ScrollView>



           
           
 
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
    
    profileName: {
        fontSize: 18,
        alignItems: 'center', 
        fontSize: 18,
        padding: 3
    },

    profileInfo: {
        fontSize: 14,
        alignItems: 'center',
        color: '#9d9d9d'
    },

    sectionTitle: {
        marginLeft: 20,
        color: '#8485f9',
        fontWeight: 'bold',
        fontSize: 13
    },

    circleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    
    gradient: {
        height: '10%',
        width: '150%',
    },

    mainCircle: {
        borderRadius: 120/2,
        backgroundColor: 'red',
        height: 94,
        width: 94,
        borderColor: "white",
        marginBottom:10,
        borderWidth: 4,

    },

    leftCircle: {
        borderRadius: 120/2,
        backgroundColor: 'orange',
        position: 'absolute',
        top: -40,
        left: 49,
        height: 62,
        width: 62,
        padding: 25

    },

    rightCircle: {
        borderRadius: 120/2,
        backgroundColor: 'orange',
        position: 'absolute',
        top: -40,
        left: 320,
        height: 62,
        width: 62,
        padding: 25
    },

    item: {
        height: 200,
        width: 375,
        marginTop: 10,
        backgroundColor: 'green'
      },

      buttonContainer: {
        padding: 12,
    },

////

      notificationList:{
        marginTop:12,
        padding:21,
      },
      notificationBox: {
        padding:20,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#E9EDEF',
        flexDirection: 'row',
        borderRadius:10,
        borderWidth: 5,
        borderColor: 'red',
        height: 100
      },
      icon:{
        width:45,
        height:45,
      },

      arrow:{
        width:45,
        height:45,
      },
      description:{
        fontSize:16,
        color: "#042c5c",
        marginLeft:10,
      },

      subDescription:{
        fontSize:12,
        color: "#77869e",
        marginLeft:10,
      },

      btntextcontainer :{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      },

      ///

      header:{
      },


      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom:10,
      },
      image:{
        width: 60,
        height: 60,
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
});
