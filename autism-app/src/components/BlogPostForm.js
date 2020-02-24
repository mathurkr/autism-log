import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Picker} from 'react-native'
import DatePicker from 'react-native-datepicker';

const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    const [location, setLocation] = useState(initialValues.location);
    const [date, setDate] = useState(initialValues.date);
    const [show, setShow] = useState(initialValues.show);
    const [mode, setMode] = useState(initialValues.mode)
    const [triggers, setTriggers] = useState(initialValues.triggers)
    const [severity, setSeverity] = useState(initialValues.severity)




    return <View>
        <Text style={styles.label}> Enter Title </Text>
        <TextInput style={styles.input} value={title} onChangeText={(text => setTitle(text))} /> 
        <Text style={styles.label}> Enter Content </Text>
        <TextInput style={styles.input}value={content} onChangeText={(text) => setContent(text)}/> 

        <Text style={styles.label}> Location </Text>

        <TextInput style={styles.input} onChangeText={(text) => setLocation(text)} value={location} />


        <Text style={styles.label}> Date </Text>
        <DatePicker
          style={{width: 200}}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(d) => setDate(d)}
        />

<View style={styles.triggerContainer}>
                    <TouchableOpacity style={styles.triggerUnclicked} onPress={()=>this.setTriggers('sensory')}>
                        <Image source= {require('../assets/hand.png')}/>
                        <Text>Sensory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

                        <Text>Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>
                        
                        <Text>Routine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

                        <Text>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.triggerUnclicked}>

                        <Text>Item Taken Away</Text>
                    </TouchableOpacity>
                </View>



        <Button 
        title="Save Blog Post"
        onPress={() => onSubmit(title,content,location, date)}
        >
        </Button>
   </View>
}

BlogPostForm.defaultProps = {
    initialValues:{
        title: '',
        content:'',
        location: '',
        date: new Date(),
        show: false,
        mode: 'date',
        triggers: [],//tags
        severity: 1
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


})

export default BlogPostForm;