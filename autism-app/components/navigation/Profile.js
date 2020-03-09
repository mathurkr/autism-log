import React, { Component, useState } from 'react';
import { StyleSheet, View, Linking, Image, ScrollView, FlatList, Modal, TouchableOpacity, TextInput, TouchableHighlight,  Share, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, Input } from 'galio-framework';
import { FontAwesome } from '@expo/vector-icons';

const dataSource = [{id: 0, toggle: false, icon: "cog", description: 'Profile Settings', subDescription: 'Update and modify Charles profile', arrow: require('../../assets/images/test2.png')},
{id: 1, toggle: false, icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png')},
{id: 2, toggle: false, icon: "star", description: 'Goals', subDescription: "Update and manage Charles' goals", arrow: require('../../assets/images/test2.png')},
{id: 3, toggle: false, icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png')},
]

const dataSection = [{icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png')},
{icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png')},
]

export default class Profile extends Component {
    state = {
        modalOpen: false
    }

    onPress = (item, index) => {
      //console.log(item.key);
      //console.log(id);
      //console.log(index);

        //console.log(elem.id);
        // if(elem.id == index)
        // {
        //   elem.toggle = true
        // }
      
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

        actionOnRow(item, index) {

          if(index==0)
          {
            //Alert.alert("Navigate to Profile Settings")
            this.setState({modalOpen: !this.state.modalOpen})

          }

          if(index==1)
          {
            Alert.alert("Navigate to Notification")
          }

          if(index==2)
          {
            Alert.alert("Goals")
          }

          if(index==3)
          {
            this.onShare()
          }
      }



        onShare = async ()  => {
          Share.share(
              {
                  message: 'Hey I use this great app. Luminous enables you to keep a private diary to empower people with Autism and their care community.',
                  url: 'https://apps.apple.com/us/app/chronaly/id1202635037'
              }
          )
      }

      onOpenApp = async () => {
        const AppStore = 'itms-apps://itunes.apple.com';
        const Settings = 'app-settings://';
        return Linking.openURL(AppStore);
      }

      onLinkToIns
     
    render() {
      const { modalOpen } = this.state;

        return (
        <ScrollView style={styles.container}>
            
            {/* Modal Markup */}
            <Modal visible={modalOpen} animationType="slide">
              <View style={styles.modal}>
                
                <FontAwesome name="times-circle" style={{margin:30}}size={35} onPress={()=> this.setState({modalOpen: false})}/>  

                    <View style={styles.headerContent2}>
                        <Image style={styles.avatar2} source={{uri: 'https://images.unsplash.com/photo-1525111149894-307b4255c9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}}/>
                    </View>

                    <Text style={styles.sectionTitle2}> CHILD PROFILE </Text>

                    <TouchableOpacity style={styles.inputContainerModal}>
                                <TextInput
                                    placeholder="Enter Email"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    editable={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />  
                                <Text style={styles.dataModal}> Charles </Text>
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.inputContainerModal}>
                                <TextInput
                                    placeholder="Last name"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    editable={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />  
                                <Text style={styles.dataModal}> Darwin </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.inputContainerModal}>
                                <TextInput
                                    placeholder="Sex"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    editable={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />  
                                <Text style={styles.dataModal}> Boy </Text>
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.inputContainerModal}>
                                <TextInput
                                    placeholder="Birthday"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    editable={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />  
                                <Text style={styles.dataModal}> 02/15/2015 </Text>
                      </TouchableOpacity>


                      <TouchableOpacity style={styles.inputContainerModal}>
                                <TextInput
                                    placeholder="Relationship to the baby?"
                                    placeholderTextColor='#999999'
                                    returnKeyType={"next"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    editable={false}
                                    // onSubmitEditing={() => { this.secondTextInputRef.current.focus(); }}
                                    keyboardType={'email-address'} style={styles.inputs} onChangeText={(text) => this.setState({ email: text })} />  
                                <Text style={styles.dataModal}> Mother </Text>
                      </TouchableOpacity>
                
                


              </View>
          </Modal>


          <LinearGradient
                colors={['#4AD4D4', '#C395FF']}
                style={{flex: 1}}
                start={{x:0, y:0}}
                end={{x: 1, y:1}}> 
           <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1525111149894-307b4255c9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}}/>
          </LinearGradient>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Charles Darwin</Text>
              <Text style={styles.info}> 12, Male </Text>              
            </View>

              <Text style={styles.sectionTitle}> GENERAL </Text>
                    <FlatList style={styles.notificationList} 
                    data={dataSource}
                    keyExtractor={(item, index) => item.key}
                    renderItem ={({item, index}) => {
                        return (
                        
                        <TouchableOpacity onPress={()=> this.actionOnRow(item,index)}> 
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
                    renderItem ={({item, index}) => {
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
          <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1525111149894-307b4255c9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}}/>
          
          </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFEF"
      },

    sectionTitle: {
        color: '#8485f9',
        fontWeight: 'bold',
        fontSize: 13,
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    sectionTitle2: {
      color: '#8485f9',
      fontWeight: 'bold',
      fontSize: 13,
      paddingLeft: 0,
      fontWeight: 'bold',
      marginLeft: 15,
      marginBottom: 10,
  },

  dataModal: {
    color: '#8485f9',
    fontWeight: 'bold',
    fontSize: 13,
    paddingLeft: 0,
    fontWeight: 'bold',
    marginRight: 15,

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
      },

      modal:{
        flex: 1,
        backgroundColor: '#EFEFEF',
        padding: 0
      },


      header2:{
        backgroundColor: "#20B2AA",
      },
      headerContent2:{
        alignItems: 'center',
        backgroundColor: '#EFEFEF',

      },
      avatar2: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom:10,
      },

      name2:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },

      inputContainer: {
        marginTop: 10, 
        height: 50,
        backgroundColor: 'white',
        marginBottom: 30,
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 5,
        width: '100%'
    },

    inputContainerModal: {
      height: 50,
      backgroundColor: 'white',
      flexDirection: "row",
      alignItems: 'center',
      borderRadius: 5,
      width: '100%',
      borderBottomColor: 'grey',
      borderBottomWidth: .25,
    
  },

    inputs: {
        height: 45,
        marginLeft: 20,
        flex: 1
    },
});



// import React, { Component, useState } from 'react';
// import { StyleSheet, View, Linking, Image, ScrollView, FlatList, Modal, TouchableOpacity, TextInput, TouchableHighlight,  Share, Alert} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'
// import { Button, Text, Input } from 'galio-framework';
// import { FontAwesome } from '@expo/vector-icons';

// import DB from '../config/DatabaseConfig';

// export default class Profile extends Component {
//     state = {
//         name: '',
//         age: '',
//         gender: '',
//         avatar: ''
//     };

//     constructor() {
//         super()
//         {
//         }
//     }

//     componentWillMount() {
//         // Retrieve params from parent
//         const params = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();
//         const doc_id = params.getParam('doc_id');
//         // alert(`Email: ${params.getParam('email')}, Password: ${params.getParam('password')}, Doc ID: ${params.getParam('doc_id')}`);
//         // Retrieve Profile associated with the User
//         this._retrieveProfile(doc_id);

//     }

//     _retrieveProfile = doc_id => {
//         DB.firestore().collection("profiles").doc(doc_id)
//             .get()
//             .then((doc) => {
//                 if (doc.exists) {
//                     const data = doc.data();
//                     // Set profile state info
//                     this.setState({
//                         name: data.profiles[0].name,
//                         age: data.profiles[0].age,
//                         gender: data.profiles[0].gender,
//                         avatar: data.profiles[0].avatar
//                     });
//                 }
//                 else {
//                     alert('There are currently no profiles associated with the user');
//                 }

//             })
//             .catch(function (error) {
//                 alert("Error getting documents from profiles collection: ", error);
//             });
//     }


//     // onPress = (item, index) => {
//     //     //console.log(item.key);
//     //     //console.log(id);
//     //     //console.log(index);

//     //     //console.log(elem.id);
//     //     // if(elem.id == index)
//     //     // {
//     //     //   elem.toggle = true
//     //     // }

//     // }

//     static navigationOptions = {
//         title: "Profile(s)",
//         headerRight: () =>
//             (
//                 <TouchableOpacity>
//                     <FontAwesome name="cog" style={styles.cogIcon} size={30} />
//                 </TouchableOpacity>
//             ),

//         headerBackground: (
//             <LinearGradient
//                 colors={['#4AD4D4', '#C395FF']}
//                 style={{ flex: 1 }}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//             />
//         ),
//     }

//     actionOnRow(item, index) {

//         if (index == 0) {
//             Alert.alert("Navigate to Profile Settings")
//         }

//         if (index == 1) {
//             Alert.alert("Navigate to Notification")
//         }

//         if (index == 2) {
//             Alert.alert("Goals")
//         }

//         if (index == 3) {
//             this.onShare()
//         }
//     }

//     onShare = async () => {
//         Share.share(
//             {
//                 message: 'Hey I use this great app. Luminous enables you to keep a private diary to empower people with Autism and their care community.',
//                 url: 'https://apps.apple.com/us/app/chronaly/id1202635037'
//             }
//         )
//     }

//     onOpenApp = async () => {
//         const AppStore = 'itms-apps://itunes.apple.com';
//         const Settings = 'app-settings://';
//         return Linking.openURL(AppStore);
//     }

//     onLinkToIns

//     render() {
//         // alert(this.state.age);
//         // alert(this.state.gender);
//         // alert(this.state.name);

//         const dataSource = [{ id: 0, toggle: false, icon: "cog", description: 'Profile Settings', subDescription: `Update and Modify ${this.state.name}'s Profile`, arrow: require('../../assets/images/test2.png') },
//         { id: 1, toggle: false, icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png') },
//         { id: 2, toggle: false, icon: "star", description: 'Goals', subDescription: `Update and Manage ${this.state.name}'s Goals`, arrow: require('../../assets/images/test2.png') },
//         { id: 3, toggle: false, icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png') },
//         ]

//         const dataSection = [{ icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png') },
//         { icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png') },
//         ]


//         // const dataSource = [{ icon: "cog", description: 'Profile Settings', subDescription: `Update and Modify ${this.state.name}'s Profile`, arrow: require('../../assets/images/test2.png') },
//         // { icon: "bell", description: 'Notifications', subDescription: 'Change your notifications settings', arrow: require('../../assets/images/test2.png') },
//         // { icon: "star", description: 'Goals', subDescription: `Update and Manage ${this.state.name}'s Goals`, arrow: require('../../assets/images/test2.png') },
//         // { icon: 'group', description: 'Tell your Friends', subDescription: 'Let other know about this app', arrow: require('../../assets/images/test2.png') },
//         // ]

//         // const dataSection = [{ icon: "bar-chart-o", description: 'Weekly Reports', subDescription: "View previous week's activites", arrow: require('../../assets/images/test2.png') },
//         // { icon: "pie-chart", description: 'Export Entries', subDescription: 'Download and share entries', arrow: require('../../assets/images/test2.png') },
//         // ]

//         return (

//             <ScrollView style={styles.container}>
//                 <LinearGradient
//                     colors={['#4AD4D4', '#C395FF']}
//                     style={{ flex: 1 }}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}>
//                     <View style={styles.header}></View>
//                     <Image style={styles.avatar} source={{ uri: this.state.avatar }} />
//                 </LinearGradient>

//                 <View style={styles.body}>
//                     <View style={styles.bodyContent}>
//                         <Text style={styles.name}>{this.state.name}</Text>
//                         <Text style={styles.info}>{this.state.age}, {this.state.gender}</Text>
//                     </View>

//                     <Text style={styles.sectionTitle}> GENERAL </Text>
//                     <FlatList style={styles.notificationList}
//                         data={dataSource}
//                         renderItem={({ item }) => {
//                             return (
//                                 <TouchableOpacity>
//                                     <View style={styles.notificationBox}>
//                                         <FontAwesome name={item.icon} size={25} style={styles.icon} />
//                                         <View style={styles.btntextcontainer}>
//                                             <Text style={styles.description}>{item.description}</Text>
//                                             <Text style={styles.subDescription}>{item.subDescription}</Text>
//                                         </View>
//                                         <Image style={styles.arrow} source={item.arrow} />
//                                     </View>
//                                 </TouchableOpacity>
//                             )
//                         }} />


//                     <Text style={styles.sectionTitle}> DATA </Text>
//                     <FlatList style={styles.notificationList}
//                         data={dataSection}
//                         renderItem={({ item }) => {
//                             return (
//                                 <TouchableOpacity onPress={() => this.actionOnRow(item, index)}>
//                                     <View style={styles.notificationBox}>
//                                         <FontAwesome name={item.icon} size={25} style={styles.icon} />
//                                         <View style={styles.btntextcontainer}>
//                                             <Text style={styles.description}>{item.description}</Text>
//                                             <Text style={styles.subDescription}>{item.subDescription}</Text>
//                                         </View>
//                                         <Image style={styles.arrow} source={item.arrow} />
//                                     </View>
//                                 </TouchableOpacity>
//                             )
//                         }} />


//                 </View>
//                 <Image style={styles.avatar} source={{ uri: this.state.avatar }} />

//             </ScrollView>

//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#EFEFEF"
//     },

//     sectionTitle: {
//         color: '#8485f9',
//         fontWeight: 'bold',
//         fontSize: 13,
//         paddingLeft: 20,
//         fontWeight: 'bold'
//     },
//     sectionTitle2: {
//       color: '#8485f9',
//       fontWeight: 'bold',
//       fontSize: 13,
//       paddingLeft: 0,
//       fontWeight: 'bold',
//       marginLeft: 15,
//       marginBottom: 10,
//   },

//   dataModal: {
//     color: '#8485f9',
//     fontWeight: 'bold',
//     fontSize: 13,
//     paddingLeft: 0,
//     fontWeight: 'bold',
//     marginRight: 15,

// },


//     ////

//     notificationList: {
//         marginVertical: 10,
//         paddingHorizontal: 21,
//     },

//     notificationBox: {
//         padding: 5,
//         marginTop: 5,
//         marginBottom: 10,
//         backgroundColor: 'white',
//         flexDirection: 'row',
//         borderRadius: 10,
//     },

//     icon: {
//         marginVertical: 10,
//         paddingRight: 10,
//         marginHorizontal: 10,
//         color: '#0047cc'

//     },

//     arrow: {
//         width: 6,
//         height: 12,
//         marginTop: 16,
//         marginVertical: 8,
//         padding: 8,
//     },

//     description: {
//         fontSize: 16,
//         color: "#042c5c",
//         marginLeft: 10,
//         fontWeight: 'bold',
//         paddingTop: 8

//     },

//     subDescription: {
//         fontSize: 12,
//         color: "#77869e",
//         marginLeft: 10,
//         paddingBottom: 8
//     },

//     btntextcontainer: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'flex-start'
//     },

//     ///

//     header: {
//         height: 120,
//     },

//     avatar: {
//         width: 130,
//         height: 130,
//         borderRadius: 63,
//         borderWidth: 4,
//         borderColor: "white",
//         marginBottom: 10,
//         alignSelf: 'center',
//         position: 'absolute',
//         marginTop: 43,
//     },

//     name: {
//         fontSize: 22,
//         color: "black",
//         fontWeight: '600',
//     },

//     body: {
//         marginTop: 20,
//     },

//     bodyContent: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 30,
//         paddingBottom: 15,
//     },

//     cogIcon: {
//         marginRight: 18,
//         color: "#5574c3"
    



//       },
//       avatar2: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         borderWidth: 4,
//         borderColor: "#FFFFFF",
//         marginBottom:10,
//       },

//       name2:{
//         fontSize:22,
//         color:"#FFFFFF",
//         fontWeight:'600',
//       },

//       inputContainer: {
//         marginTop: 10, 
//         height: 50,
//         backgroundColor: 'white',
//         marginBottom: 30,
//         flexDirection: "row",
//         alignItems: 'center',
//         borderRadius: 5,
//         width: '100%'
//     },

//     inputContainerModal: {
//       height: 50,
//       backgroundColor: 'white',
//       flexDirection: "row",
//       alignItems: 'center',
//       borderRadius: 5,
//       width: '100%',
//       borderBottomColor: 'grey',
//       borderBottomWidth: .25,
    
//   },

//     inputs: {
//         height: 45,
//         marginLeft: 20,
//         flex: 1
//     },
// });

