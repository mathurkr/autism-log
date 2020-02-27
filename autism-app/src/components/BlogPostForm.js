import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Slider} from 'react-native'
import DatePicker from 'react-native-datepicker';


const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    const [location, setLocation] = useState(initialValues.location);
    const [date, setDate] = useState(initialValues.date);
    const [triggers, setTriggers] = useState(initialValues.triggers);
    const [severity, setSeverity] = useState(initialValues.severity);
    const [tags, setTags] = useState(initialValues.tags);




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

        
        <Slider 
        step={1}
        maximumValue = {100}
        value={BlogPostForm.defaultProps.initialValues.severity}
        onValueChange = {(severity) => setSeverity({severity})}
        />

        


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
        date: new Date(),
        triggers: [],
        severity: 0,
        tags: ''

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
    }


})

export default BlogPostForm;