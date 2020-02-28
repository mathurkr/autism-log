import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Slider, Image, Dimensions, Linking,} from 'react-native'
import {ImageBackground} from 'react-native';

import DatePicker from 'react-native-datepicker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../../components/utlitities/UserPermissions'
import { FontAwesome } from '@expo/vector-icons';

import { connectActionSheet } from '@expo/react-native-action-sheet';


const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    const [location, setLocation] = useState(initialValues.location);
    const [date, setDate] = useState(initialValues.date);
    const [triggers, setTriggers] = useState(initialValues.triggers);
    const [severity, setSeverity] = useState(initialValues.severity);
    const [tags, setTags] = useState(initialValues.tags);

    const [region, setRegion] = useState(initialValues.region)

    const [media, setMedia] = useState(initialValues.media)

    const screenWidth = Dimensions.get('window').width;

    _getLocationAsync = async() => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted'){
            console.log('Permission to access location was denied')
        }

        const regionData = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        let region = {
            latitude: regionData.coords.latitude,
            longitude: regionData.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.45
        }
        // let regionInfo = ({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     latitudeDelta: 0.045,
        //     longitudeDelta: 0.045
        // })

        setRegion(region)

    }

    test = () =>
    {
        console.log("tested")
    }

    handleMedia = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if(!result.cancelled)
        {
            setMedia(result.uri)
        }

    }


    return <View styles={{flex:1}}>

        <View style={styles.header}>
        <Image         
            source={{uri: media}}
            style={{ width:'100%', height: '100%', position:'absolute', top:0, left:0}}
            /> 
            <View style={styles.overlay} />
            <View style={styles.headerContent}>

            <TouchableOpacity  activeOpacity={0.9} style={styles.facebook} onPress={handleMedia}>
                <View style={{ flexDirection: "row" }}>
                    <Ionicons name="ios-camera" color="#ffffff" size={30}  />
                    <Text style={styles.iconText}> Add media </Text>
                    </View>
            </TouchableOpacity>

            </View>
        </View>



        <TouchableOpacity onPress={_getLocationAsync} > 
            <View style={styles.notificationBox}>
                <Ionicons name="ios-pin" size={20} color="#77909c" style={styles.icon }  />
                <View style={styles.btntextcontainer}> 
                <Text style={styles.description}>Location</Text>

            </View>
                <Text numberOfLines={2} style={styles.subDescription}> Santa Margarita, California{JSON.stringify(region)} }</Text>

                <Ionicons  style={styles.mblTxt} name="ios-arrow-forward" size={20} color="#77909c" style={styles.icon }  />
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={_getLocationAsync} > 
            <View style={styles.notificationBox}>
                <Ionicons name="ios-calendar" size={20} color="#77909c" style={styles.icon }  />
                <View style={styles.btntextcontainer}> 
                <Text style={styles.description}>Date & Time</Text>
            </View>
                <Text numberOfLines={2} style={styles.subDescription}> {JSON.stringify(date)} }</Text>
                <DatePicker
                    style={{width: 50, marginRight:15,  backgroundColor:'orange'}}
                    date={date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon="false"
                    hideText
                    customStyles={{
                        dateInput: { 
                            borderWidth: 0,
                            borderBottomWidth: 2,
                            alignItems: "flex-start"
                          },
                          placeholderText: {
                            fontSize: 17,
                            color: "white"
                          },
                          dateText: {
                            fontSize: 17,
                            color: "white",
                          }
                    }}
                    onDateChange={(d) => setDate(d)}
                    />
            </View>
        </TouchableOpacity>
        


        <View style={styles.notificationBox}>
                <Ionicons name="ios-calendar" size={20} color="#77909c" style={styles.icon }  />
                <View style={styles.btntextcontainer}> 
                <Text style={styles.description}>Severity</Text>
                <View style={styles.SliderContainer}> 
                 <Slider 
                    style={{width: 300, height: 30, borderRadius: 50}}
                    minimumValue={1}
                    maximumValue={100}
                    value={BlogPostForm.defaultProps.initialValues.severity}
                    onValueChange = {(severity) => setSeverity({severity})}
                    thumbTintColor='purple'
                    maximumTrackTintColor='#d3d3d3' 
                    minimumTrackTintColor='blue'
                    />  

                    <View style={styles.textCon}>
                            <Text style={styles.colorGrey}> Moderate </Text>
                            <Text style={styles.colorYellow}>
                                {Math.floor(severity.severity)}
                            </Text>
                            <Text style={styles.colorGrey}> Very Severe </Text>
                        </View>
                </View>
            </View>
            </View>

        


 




        <Text style={styles.label}> Enter Title </Text>
        <TextInput style={styles.input} value={title} onChangeText={(text => setTitle(text))} /> 
        <Text style={styles.label}> Enter Content </Text>
        <TextInput style={styles.input}value={content} onChangeText={(text) => setContent(text)}/> 

        <Text style={styles.label}> Location </Text>

        <TextInput style={styles.input} onChangeText={(text) => setLocation(text)} value={location} />


        <Text style={styles.label}> Date </Text>
  

        <View style={styles.triggerContainer}>
                    <TouchableOpacity style={styles.triggerUnclicked} onPress={() => this.setTriggers('sensory', 'ios-body')}>
                        {/* <Image source= {require('../../assets/images/cog.png')}/> */}
                        <Text> Sensory </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.triggerUnclicked}  onPress={() => this.setTriggers('social', 'ios-people')}>

                        <Text>Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}  onPress={() => this.setTriggers('routine', 'ios-calendar')}>
                        
                        <Text>Routine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked} onPress={() => this.setTriggers('food')}>

                        <Text>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked} onPress={() => this.setTriggers('Item Taken Away')}>

                        <Text>Item Taken Away</Text>
                    </TouchableOpacity>
                </View>

        


        


        <Button 
        title="Save Blog Post"
        onPress={() => onSubmit(title,content,location, date, triggers, severity, tags)}
        >
        </Button>
   </View>
}

BlogPostForm.defaultProps = {
    initialValues:{
        title: '',
        content:'',
        location: '',
        date: null,
        triggers: [],
        severity: 0,
        tags: '',
        region: {},
        media: 'https://0.s3.envato.com/files/38017250/Seamless%20Icons%20Background%201.jpg'

    }
}



setTriggers = (name, iconName) => {        
    let triggers = BlogPostForm.defaultProps.initialValues.triggers;
    let addFlag=true;
    //console.log(triggers)
    for(let oldTrigger=0;oldTrigger<triggers.length;oldTrigger++){
        let oldName=triggers[oldTrigger].name;
        if(oldName==name){
            //remove objectg
            triggers.splice(oldTrigger,1);
            addFlag=false;
        }        
    }
    if(addFlag==true){
        triggers.push({name:name, icon: iconName});
    }
   // console.log(triggers);
    }








getTriggerStyle=(triggerType)=>{
    if(triggerType in this.state.triggers){
        return styles.triggerClicked;
    }
    else{
        return styles.triggerUnlicked;
    }
}


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },

     triggerContainer: {
        width: '80%',
        flexDirection:'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'space-between'
    },

    triggerUnclicked: {
        width: 100,
        height: 100,
        color: '#ffffff',
        borderWidth: 1,
        borderRadius: 10 
    },
    toggle: {
        height: 60,
        width:125,
        backgroundColor: 'orange'
    },

    sliderDummy: {
        backgroundColor: '#d3d3d3',
        width: 300,
        height:30,
        borderRadius: 50,
        position: 'absolute',                
    },
    sliderReal: {
        backgroundColor: '#119EC2',
        width: (BlogPostForm.defaultProps.initialValues.severity/50) * 300,
        height:30,
    },

    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colorGrey: {
        color: '#d3d3d3'
    },
    colorYellow: {
        color: 'rgb(252, 228, 149)'
    },
    SliderContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    //

    header:{
        backgroundColor: "orange",
      },
      headerContent:{
        padding:50,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      textInfo:{
        fontSize:18,
        marginTop:20,
        color: "#696969",
      },

      input: {
        width: '89%',
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        height: 50,
        marginBottom: 65
    },

    facebook: {
        paddingTop:10, paddingLeft:'18%', paddingRight:'18%', paddingBottom:10,
        backgroundColor: 'transparent',
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'white'

    },

    iconText: {
        fontSize: 16,
        color: "#ffffff",
        alignSelf: 'center',
        paddingLeft: 15,
    },
    
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    inputContainer:{
        height: 50,
        backgroundColor: 'white',
        paddingVertical: 5, 
        borderRadius: 5,
        paddingHorizontal: 30,
        width: '69%',
        borderColor: "grey", 
        borderWidth: 1
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        marginRight:16
    },

    inputIcon: {
        marginLeft:15,
    },
    
    icon:{
        width: 30,
        height: 30,
    },



    image:{
        width: 60,
        height: 60,
      },
      body: {
        padding:30,
        backgroundColor :"#E6E6FA",
      },


      username:{
        color: "#20B2AA",
        fontSize:22,
        alignSelf:'flex-start',
        marginLeft:10
      },


      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 5,
        marginLeft:20,
      },

      nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
      },
      nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width:170,
        marginTop: 5
      },

      mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
        alignItems: 'flex-end',

      },
      msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
      },



      //

    
      
      notificationBox: {
        padding:5,
        marginTop:5,
        marginBottom:10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius:10,
        borderColor: 'grey',
        borderBottomWidth: 1,
      },

      icon: {
        marginVertical: 10,
        paddingRight: 2,
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
        marginLeft:2,
        fontWeight: 'bold',
        marginTop: 10
      
      },

      subDescription:{
        fontSize:10,
        color: "#77869e",
        marginLeft:10,
        paddingBottom: 8,
        marginTop: 14,
        alignItems:'flex-end'

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
})

export default BlogPostForm;