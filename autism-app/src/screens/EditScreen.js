import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet, TextInput } from 'react-native'
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation}) => {
    const id = navigation.getParam('id');

    const {state, editBlogPost} = useContext(Context);

    const blogPost = state.find(
        blogPost => blogPost.id === id
    )
    

    return <View>
        <BlogPostForm 
            initialValues={{ title: blogPost.title, content:blogPost.content, location:blogPost.location, date:blogPost.date,
             triggers:blogPost.triggers, severity:blogPost.severity, tags:blogPost.tags, media:blogPost.media}}
            onSubmit={(title,content, location, date, triggers, severity, tags, media) => {
            editBlogPost(id, title, content, location, date, triggers, severity, tags,  media, () => navigation.pop())
        }}/>
    </View>
}

const styles = StyleSheet.create({})

export default EditScreen;