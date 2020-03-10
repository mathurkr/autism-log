import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Platform} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { FontAwesome } from '@expo/vector-icons';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  

  let deviceWidth = Dimensions.get('window').width;

  const line = {
    labels: ['Mar 1', 'Mar 9', 'Mar 17', 'Mar 22', 'Mar 23', 'Mar 24'],
    datasets: [
      {
        data: [7, 7, 6, 4, 4, 3],
        strokeWidth: 2, // optional
      },
    ],
  };


  const pieData = [
    {
      name: 'Sensory',
      population: 220,
      color: 'rgba(63, 203, 200, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Routine',
      population: 73,
      color: '#50aed2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Social',
      population: 59,
      color: '#e80ce0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Food',
      population: 15,
      color: '#794d97',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];


export default function Stats() {
    
  return (
        <View style={{backgroundColor:'#f7f7f7'}}>
        <ScrollView styles={{}}> 

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
                    style={{  top: 0, marginTop:0, marginBottom: 5, borderColor:'#BEBEBE', borderWidth: .5, paddingVertical:10
                    
                }}

                />


         <View style={[styles.card,  {borderColor:'white'}]}> 
            <Text style={styles.cardTitle}>
                Types of Meltdowns
            </Text>

            <PieChart
                data={pieData}
                width={Dimensions.get('window').width } // from react-native
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                    }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                />
            </View>
            
            <View style={[styles.card,  {borderColor:'white'}]}> 
                <Text style={styles.cardTitle}>
                    Activity
                </Text>
                
            <View style={{flex:1 , flexDirection:"row",justifyContent: 'space-evenly', alignItems: 'stretch', marginTop: 5}}> 
                <View style={styles.statSection}>
                    <FontAwesome color="#0047cc" name={"calendar"} style={{alignSelf: "center"}} size={25}/>
                    <Text style={styles.dataTitle}> Last Entry Entered </Text>   
                    <Text style={styles.dataDes}> 11 / 22 / 2019 </Text>   
                </View>
            <View style={{ borderLeftWidth: 1, borderLeftColor: 'grey', }}/>
            <View style={styles.statSection}>
                <FontAwesome color="#0047cc" name={"clock-o"} style={{alignSelf:'center'}} size={25}/>
                <Text style={styles.dataTitle}> Avg Meltdown Time</Text>   
                <Text style={styles.dataDes}> 5:00 min </Text>   
            </View>
            </View>

            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5,  width: deviceWidth - 40,alignSelf: 'center', marginTop: 20}}/>
        
            <View style={{flex:1 , flexDirection:"row",justifyContent: 'space-evenly', alignItems: 'stretch',  marginTop: 25}}> 
            <View style={styles.statSection}>
                <FontAwesome color="#0047cc" name={"bar-chart-o"} style={{alignSelf: "center"}} size={25}/>
                <Text style={styles.dataTitle}> Average Severity </Text>   
                <Text style={styles.dataDes}> 4 </Text>   
            </View>

            <View
                style={{
                borderLeftWidth: 1,
                borderLeftColor: 'grey',
                }}
            />

            <View style={styles.statSection}>
                <FontAwesome color="#0047cc" name={"tasks"} style={{alignSelf:'center'}} size={25}/>
                <Text style={styles.dataTitle}> Logins This Month</Text>   
                <Text style={styles.dataDes}> 18 </Text>   
            </View>
        </View>

        </View>

        <View style={[styles.card,  {borderColor:'white'}]}> 
        <Text style={styles.cardTitle}>
            Severity over time
        </Text>
            <LineChart
                data={line}
                width={Dimensions.get('window').width  } // from react-native
                height={220}
                //yAxisLabel={'$'}
                chartConfig={{
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientFromOpacity: 6,
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                style: {
                    borderRadius: 16
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16,  
                marginHorizontal: -10
                }}
            />
        </View>

        <View style={[styles.card,  {borderColor:'white'}]}> 
        <Text style={styles.cardTitle}>
            Behavior Count
        </Text>
        
            <View style={styles.countContainer}> 
                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: 'rgba(63, 203, 200, 1)',
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        5
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Threatening </Text>   
                </View>

                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#50aed2",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        10
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Rolling Around </Text>   
                </View>



                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#e80ce0",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        6
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}>  Aggression </Text>   
                </View>


                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#794d97",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        3
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Screaming </Text>   
                </View>

                
            </View>


            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5,  width: deviceWidth - 40,alignSelf: 'center', marginTop: 20}}/>


            <View style={{marginTop:10}}/>
            <Text style={styles.cardTitle}>
            Resolution Count
        </Text>
        
            <View style={styles.countContainer}> 
                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: '#A76ACE',
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        9
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Redirection </Text>   
                </View>

                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#85A6FA",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        4
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Trigger Removed </Text>   
                </View>



                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#3B80F9",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        5
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}>  Quiet Time </Text>   
                </View>


                <View style={styles.behaviorContainer}> 
                    <View style = {{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'white',
                            borderColor: "#424880",
                            width:60,	height:60,
                            borderRadius:60,
                            borderWidth:5,
                            alignSelf: "center",

                        }}>

                    <Text style = {{
                        textAlign: 'center',
                        backgroundColor:'none',
                        fontSize:12 - 2 * 10,
                        lineHeight:12 - (Platform.OS === 'ios' ? 2 * 10 : 10),}}>
                        10
                    </Text>
                    </View>

                    <Text style={styles.behaviorCount}> Medicated </Text>   
                </View>

                
            </View>

            
        </View>

        


  






        </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

  cardTitle: {
      marginLeft: 15,
      color: "#485465",
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 10,
  },
  statSection: {
      flexDirection: "column",
      justifyContent: 'center',
    //   borderColor: 'black',
    //   borderWidth: 1,
      alignItems: 'stretch'
  },

  dataTitle: {
    alignSelf: "center",
    marginTop: 6,
    color: "#999999",
    fontWeight: "600",
    alignItems:'center'
  },

  dataDes: {
    alignSelf: "center",
    marginTop: 3,
    color: "#333333",
    fontWeight: "600",
  },

  behaviorCount: {
    alignSelf: "flex-start",
    marginTop: 3,
    color: "#333333",
    fontWeight: "300",
  },

  countContainer: {
      flexDirection:"row",
      justifyContent: "space-evenly",
      flex:1,
  },

  behaviorContainer: {
      flexDirection: "column",
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    //   borderColor:'black',
    //   borderWidth:1,

  }

});


//https://snack.expo.io/r1JiAHXaz
// Used this for text inside circle