import React, { useContext } from 'react';
import { View, Text, FlatList, Button,TouchableOpacity, StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import { Ionicons } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons'

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost} = useContext(Context);

  return (
    <View>
      <Button title="Add Post" onPress={()=> navigation.navigate('Create')}/>
      <FlatList
      data = {state}
      keyExtractor = {blogPost => blogPost.title}
      renderItem={({item}) =>{
        return (
          <TouchableOpacity onPress={()=> navigation.navigate("Show", {id: item.id})}> 

            <View style={styles.row}> 
              <Text style={styles.title}> {item.title} </Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Text>
                  Delete
                </Text>
              </TouchableOpacity>
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
  }


});

export default IndexScreen;