import React, { useContext } from 'react';
import { View, Text, FlatList, Button,TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import {Context} from '../context/BlogContext';
import { Ionicons } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons'
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";

let deviceWidth = Dimensions.get('window').width;


// renderTags = (item) =>{
//   return item.tags.map((tag, key) => {
//     return (
//       <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {}}>
//           <View style={{flexDirection:"row"}}>
//               <Ionicons color="#0047cc" name={tag.icon} size={15}/>
//               <Text style={styles.tag}> {tag.name}</Text>
//            </View>
//       </TouchableOpacity> 
//     );
//   })
// }


// renderTagIcon = (item) =>{
//   return item.tagsIcon.map((tag, key) => {
//     return (
//       <Ionicons name={tag} size={20} />
//     );
//   })
// }


const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost} = useContext(Context);

  return (
    <View style={{flex:1, backgroundColor:'#EFEFEF'}}>                
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
        />

    </View>
    <Button title="Add Post" onPress={()=> navigation.navigate('Create')}/>

      <FlatList
      data = {state}
      keyExtractor = {blogPost => blogPost.title}
      renderItem={({item}) =>{
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
                        source={{uri:'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/177384.jpg'}}
                        resizeMode="cover"
                      />

                    <Text style={{marginHorizontal:10, marginTop: 20, fontSize: 1, }}> Meltdown Type </Text> 

                    <View style={[styles.cardContent, styles.tagsContent]}>
                             {/* {this.renderTags(item)} */}
                    </View>

                    <View style={{flexDirection: "row", marginTop: 15, marginLeft:15 } }>
                            <Ionicons name="ios-pin" size={20} color="#C4C6CE"  style={{marginRight: 3}} />
                            <Text style={styles.timestamp}> Irvine California  </Text>
                </View>


            </TouchableOpacity>

        )
      }}
    />
    </View>
  );
};

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
}



});   


export default IndexScreen;