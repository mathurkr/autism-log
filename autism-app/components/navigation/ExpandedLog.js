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
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient'


posts = [{name: "Social Meltdown", severity: "Very Severe",  timestamp: 1569109273726, id: '1', meltdownType:["ios-body", "ios-calendar", "ios-people"], image: require('../../assets/images/child_photo.png'), text:"Charles felt uncomfortable during science class." },

{name: "Routinary Metldown", severity: "Moderate", timestamp: 1569109273726, id: '2', meltdownType: ["ios-calendar"], image: require('../../assets/images/test2.png'), text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
{name: "Social Meltdown", severity: "Low", timestamp: 1569109273726, id: '3', meltdownType: ["ios-people"], image: require('../../assets/images/child_photo.png')},
{name: "Routinary Meltdown", severity: "Severe", timestamp: 1569109273726, id: '4', meltdownType: ["ios-people"], image: ""}
]


export default class ExpandedLog extends Component {
    static navigationOptions = {
        title: "Log",
        headerRight: () =>
        (
          <TouchableOpacity>
            <Ionicons name="ios-more" style={{marginRight:15}} size={20} />
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


  constructor(props) {
    super(props);
  }

  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart")
  }

  
  renderPost = post => {


    return (
    <TouchableOpacity> 

    </TouchableOpacity>
    )
}

render = post => {

    return (
        <View style={styles.container}>
            <View style={styles.feedItem}>
            <Text style={{color:'purple', fontWeight:"bold", fontSize:22, borderColor:"black", borderWidth:2, marginRight: 10,}}> 7 </Text>

            {/* <Ionicons name={post.meltdownType}style={styles.avatar} size={30} /> */}
            <View style={{ justifyContent:'', borderColor:'black',}}> 
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View>
                        {/* <Text style={styles.name}> {post.name} </Text>  */}
                        <Text style={styles.severity}> Severe </Text>
                        <View style={{flexDirection: "row",  } }>
                            <Ionicons name="ios-pin" size={14} color="#C4C6CE"  style={{marginTop:3, marginRight: 3}} />
                            <Text style={styles.timestamp}> Irvine California  -</Text>
                            <Text style={styles.timestamp}> 12 minutes ago  </Text>
                        </View>
                    </View>
                    </View>  
            <View>
                <Text style={styles.post}> asdfasdfa </Text>
                <Image  style={styles.postImage} source={require('../../assets/images/child_photo.png')} resizeMethod="scale"/>
            </View>


            
            <View>
            <View style={{ borderBottomColor: '#C4C6CE', borderBottomWidth: 1, marginBottom: 25}}/>

                <Text style={{marginBottom: 10, fontSize: 15}}> Meltdown Type </Text>
                <View style={{flexDirection:"row"}} >
                    <Ionicons style={{marginRight: 8}} name={"ios-people"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14,marginRight: 15, color: "grey"}}>Social </Text> 

                    <Ionicons style={{marginRight: 8}} name={"ios-calendar"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, marginRight: 15, color: "grey"}}>Routine </Text> 

                    <Ionicons style={{marginRight: 8}} name={"ios-body"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, color: "grey"}}>Sensory </Text> 
                </View>

            
            <View style={{ borderBottomColor: '#C4C6CE', borderBottomWidth: 1, marginVertical: 25}}/>
                <Text style={{marginBottom: 10, fontSize: 15}}> Behaviors Shown </Text>
                <View style={{flexDirection:"row"}} >
                <Ionicons style={{marginRight: 8}} name={"ios-people"} size={20} color="#C4C6CE"/>
                <Text style={{ fontSize: 14,marginRight: 15, color: "grey"}}>Verbal Aggression </Text> 
                <Ionicons style={{marginRight: 8}} name={"ios-calendar"} size={20} color="#C4C6CE"/>
                <Text style={{ fontSize: 14, marginRight: 15, color: "grey"}}>Hand over ears </Text> 
                <View style={{flex:1}}> 
                    <Ionicons style={{marginRight: 8}} name={"ios-body"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, color: "grey"}}> Rolling on Floor </Text> 
                </View>
            </View>
            </View>


            
        </View>
        
    </View>


    <View style={styles.container}>
    <View style={styles.feedItem}>

    <View style={{flexDirection:'start', marginLeft: 15}}>
            <View style={{ borderBottomColor: '#C4C6CE', borderBottomWidth: 1, marginBottom: 25}}/>

                <Text style={{marginBottom: 10, fontSize: 15}}> Meltdown Type </Text>
                <View style={{flexDirection:"row"}} >
                    <Ionicons style={{marginRight: 8}} name={"ios-people"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14,marginRight: 15, color: "grey"}}>Social </Text> 

                    <Ionicons style={{marginRight: 8}} name={"ios-calendar"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, marginRight: 15, color: "grey"}}>Routine </Text> 

                    <Ionicons style={{marginRight: 8}} name={"ios-body"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, color: "grey"}}>Sensory </Text> 
                </View>

            
            <View style={{ borderBottomColor: '#C4C6CE', borderBottomWidth: 1, marginVertical: 25}}/>
                <Text style={{marginBottom: 10, fontSize: 15}}> Behaviors Shown </Text>
                <View style={{flexDirection:"row"}} >
                <Ionicons style={{marginRight: 8}} name={"ios-people"} size={20} color="#C4C6CE"/>
                <Text style={{ fontSize: 14,marginRight: 15, color: "grey"}}>Verbal Aggression </Text> 
                <Ionicons style={{marginRight: 8}} name={"ios-calendar"} size={20} color="#C4C6CE"/>
                <Text style={{ fontSize: 14, marginRight: 15, color: "grey"}}>Hand over ears </Text> 
                <View style={{flex:1}}> 
                    <Ionicons style={{marginRight: 8}} name={"ios-body"} size={20} color="#C4C6CE"/>
                    <Text style={{ fontSize: 14, color: "grey"}}> Rolling on Floor </Text> 
                </View>
            </View>
            </View>
    </View>
    </View>
    </View>
    );
}
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#EFECF4",
},

feedContainer: {
    flex:1,
    backgroundColor: "#EFECF4",
},

name: {
    fontSize: 13,
    fontWeight: "500",
    color: "#454D65"
},

severity: {
    fontSize: 13,
    color: '#000000',
    fontWeight: "500",
    color: "#000000"
},

timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginVertical: 5,
},

pinnedLocation: {
    fontSize: 11,
    color: "#8c9daa",
    marginTop: 5
},

feed: {
    marginHorizontal: 0,

},

feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    margin: 12,
    borderRadius: 5,
    borderColor:"black",
    borderWidth:2,
    


}
,
avatar: {
    color: '#8c9daa',     
    marginRight: 15,   
},

post: {
    marginTop: 5,
    fontSize: 14,
    color: "#838899",

},

postImage:{
    width: undefined,
    height: 300,

}

});