import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Button,
    Platform, TouchableHihglight, Dimensions, TextInput, TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modalbox'
import {Ionicons} from "@expo/vector-icons";

var screen = Dimensions.get('window')

export default class EmailModal extends Component {
    constructor(props){
        super(props)
        this.state={
            newEmail:'',
        }
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }

    render(){
        return(
            <Modal 
                ref={"myModal"}
                style={{
                justifyContent: 'center',
                borderRadius: Platform.OS === 'ios' ? 30:0,
                shadowRadius: 10,
                width: screen.width - 40,
                height: 280
            }}
            position="center"
            backdrop="true"
            onClosed={()=>{
                alert("Email Updated")
            }}
            >

            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 40,
                fontSize:16,
                color: "#042c5c",
                fontWeight: 'bold'
            }}> New email </Text>
            
            {/* <TextInput 
                style={{
                    height: 40,
                    borderBottomColor: 'gray',
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    marginBottom: 10,
                    borderBottomWidth: 1
                }}
                placeholder="Enter new email"
                onChangeText={(text) => this.setState({newEmail:text})}
                value={this.state.newEmail}
                /> */}



<View style={styles.inputContainer}> 
                                    <Ionicons name="ios-mail" size={30} color="#77909c" style={[styles.inputIcon, styles.icon] }  />
                                    <TextInput 
                                    placeholder="Enter new email"
                                    onChangeText={(text) => this.setState({newEmail:text})}
                                    value={this.state.newEmail}
                                    placeholderTextColor='#999999'
                                    autoCorrect = {false}
                                    autoCapitalize = {false}
                                    style={styles.inputs}
                                    />
                                </View>



                <TouchableOpacity style={styles.buttonContainer}
                onPress={() => {
                    if(this.state.newEmail.length == 0){
                        alert("You must enter a valid email")
                        return;
                    }
                    const newEmail = {
                        // Backend logic
                    }
                    this.refs.myModal.close();
                }}>
                    <Text style={{fontSize:18, color:'white'}}> Save </Text>
                </TouchableOpacity>
                </Modal>
        )
    }

}


const styles = StyleSheet.create({

    buttonContainer:{
        backgroundColor: '#29d2e4',
        alignItems: 'center',
        padding: 8,
        margin: 50,
        height: 40, 
        borderRadius: 6,
    },

    inputContainer:{
        height: 50,
        marginBottom: 9,
        backgroundColor: '#E9EDEF',
        marginBottom: 10, 
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 5,
        
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        flex:1
    },

    inputIcon: {
        marginLeft:15,
    },
    
    icon:{
        width: 30,
        height: 30,
    },
    


}
)