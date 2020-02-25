import React,  {useContext} from'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Context} from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';

const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context);

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'))
    
    return <View>
        <TouchableOpacity onPress={()=>navigation.navigate("Edit", {id:navigation.getParam('id')})}>
            <Text> Edit </Text>
        </TouchableOpacity>
        
        
        <Text> {blogPost.title} </Text>
        <Text> {blogPost.content} </Text>
        <Text> {blogPost.date} </Text>

        {console.log(blogPost.severity)}
    </View>
}

ShowScreen.navigationOptions=()=>{
    return{
        headerRight: <TouchableOpacity>
            <EvilIcons name="pencil" size={30} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({


});

export default ShowScreen;