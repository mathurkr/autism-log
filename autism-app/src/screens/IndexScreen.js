import React, { useContext, useState} from 'react';
import { View, Text, FlatList, Button,TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import {Context} from '../context/BlogContext';
import { Ionicons } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient'

var { width, height } = Dimensions.get('window')

let deviceWidth = Dimensions.get('window').width;

const email = ''; //here I want to load the values from class component
const date = new Date();





renderTags = (item) =>{
  //console.log(item);
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





const IndexScreen = ({navigation}) => {

  const [months, setMonths] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  const [caldendarDate, setcaldendarDate] = useState('')
  const [posts, setPosts] = useState([])

  

  
  const password = navigation.getParam('password');
  const email = navigation.getParam('email');

  console.log("EMAIL: " + email);
  console.log("PASSWORD: " + password);

  //console.log(password);
  

  const {state, deleteBlogPost} = useContext(Context);
  console.log("THREE LOGS: " + state);

  return (
    <View style={{flex:1, backgroundColor:'#f7f7f7'}}>                
    <View>

    <CalendarStrip
            minDayComponentSize={60}
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            selection={'border'}
            selectionAnimation={{ duration: 300, borderWidth: 1 }}
            style={{  top: 0, }}
            calendarHeaderStyle={{ color: 'black', width: deviceWidth, marginBottom: 10  }}
            calendarColor={'white'}
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
            style={{  top: 0, marginTop:0, marginBottom: 5, borderColor:'#BEBEBE', borderWidth: .5 
            
          }}

        />
    </View>

    {/* <Button title="Add Post" onPress={()=> navigation.navigate('Create')}/> */}

      <FlatList
      data = {state}
      keyExtractor = {blogPost => blogPost.title}
      renderItem={({item}) =>{
          console.log(item.media);
        return (

          <TouchableOpacity  style={[styles.card, {borderColor:'white'}]} onPress={()=> navigation.navigate("Show", {id: item.id})}> 
            <View style={{flexDirection:"row"}}> 
              <View style={[styles.circle, {backgroundColor: 'purple'}]} />
              <Text style={[styles.name, {color:item.color}]}> {item.title} </Text>
              <Text style={styles.timestamp2}> {moment(item.timestamp).fromNow()}  </Text>

              {/* <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Text>
                  Delete
                </Text>
              </TouchableOpacity> */}
              </View>

              <View style={[styles.cardContent]}>

              </View>

              <Text style={styles.post}> {item.content}  </Text>
                  <Image
                        style={{
                          borderRadius:5,
                          marginHorizontal:10,
                          height: 150,
                          width: undefined,
                        }}
                        source={{uri:item.media}}
                        resizeMode="cover"
                      />

                <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                   <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                   <Text style={styles.timestamp}> {(item.location)} </Text>
                </View>


                    <View style={[styles.cardContent, styles.tagsContent]}>
                    {this.renderTags(item)}
                    </View>




            </TouchableOpacity>

        )
      }}
    />
    </View>
  );
};



IndexScreen.navigationOptions=({navigation})=>{
  return{
      Title: 'Luminous',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,      
        backgroundColor:'white'
      },
      headerRight:(
        <View> 
          <TouchableOpacity onPress={()=> navigation.navigate('CreateScreen')}> 
          <Ionicons name="ios-add-circle-outline" style={{ marginRight:15,color:'#29d2e4' }} size={30}  />
          </TouchableOpacity>

        </View>
      ),

      // headerTitle:(
      //   <Image style={{alignSelf:'center', width:30, height: 30}} source={{uri:'https://www.chronaly.com/assets/images/favicon.png'}}/>
      // ),
      headerLeft:(

          <Image style={styles.avatar} source={{uri: 'https://images.unsplash.com/photo-1525111149894-307b4255c9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}/>


      )
  }
}


IndexScreen.naviationOptions = () => {
  return {
  }
}


const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 18
  },

  icon: {
    fontSize: 24
  },

  container: {
    flex: 1,
  },


  notificationList:{
    marginTop:140,
    padding:10,
    backgroundColor: "#EFEFEF"
  },
  card: {
    height:null,
    //paddingTop:10,
    paddingBottom:10,
    marginTop:0,
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
    marginTop:5,
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
    marginLeft: 15,
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

avatar: {
  width: 38,
  height: 38,
  borderRadius: 38/2,
  borderWidth: 4,
  borderColor: "#FFFFFF",
  marginLeft:15,
  marginTop: 5,
  paddingRight: 15
},

});   


export default IndexScreen;