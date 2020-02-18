import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Image, Animated } from 'react-native';

import { Button } from 'galio-framework';
const { width } = Dimensions.get('window');


const photos = [
    {
        photo: require('..//assets/images/father_image.png'),
        title: "Welcome to Luminous",
        description: "Offering a better way to manage developmental disabilities and help children and adults with autism"
    },

    {
        photo: require('../assets/images/back_to_school.png'),
        title: "Capture events while they happen",
        description: "Observe and monitor behaviors, actions, and day to day interactions, to better manage metldown or burnouts"
    },

    {
        photo: require('../assets/images/undraw_data.png'),
        title: "Gather and use data for knowledge & insight",
        description: "Aggregate and use customized visualizations to improve care and well being of those with autism"
    },
    {
        photo: require('../assets/images/undraw_community.png'),
        title: "Aggregate and share with your community",
        description: "Use as a digital companion to help lead on the road to better health, productivity and happier lives."
    }

]



export default class Welcome extends React.Component {
    static navigationOptions = {
        header: null
    };
    scrollRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }


    setSelectedIndex = event => {
        // width of the viewSize
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        // get current position of the scrollView
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize)
        this.setState({ selectedIndex })
    }


    // state = {
    //     signedUp: false,
    //     loggedIn: false
    //     // name: ''
    // };

    _toSignUpPage() {
        this.props.navigation.navigate('Authenticate', { signedUp: false, loggedIn: false })
    }

    _toLoginPage() {
        // Need a more formal way of checking if user has an account
        // this.setState({ signedUp: true });
        this.props.navigation.navigate('Authenticate', { signedUp: true, loggedIn: false })
    }

    render() {
        const { selectedIndex } = this.state;
        return (
            <View style={styles.container}>

                <ScrollView horizontal={true} pagingEnabled={true}
                    showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.setSelectedIndex}>

                    {photos.map((source, i) => { // for every object in the photos array...
                        return ( // ... we will return an Image with the corresponding object as the source
                            <View style={styles.imageContainer}>
                                <Image style={styles.images}
                                    key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                                    style={{
                                        width: 300,
                                        height: 300
                                    }}
                                    source={source.photo}
                                />
                                <View>
                                    <Text style={styles.title}> {source.title} </Text>
                                    <Text style={styles.description}> {source.description} </Text>
                                </View>
                            </View>
                        );
                    })}

                </ScrollView>

                <View style={styles.circleDiv}>
                    {photos.map((source, i) => (
                        <View
                            key={source.photo}
                            style={[styles.whiteCircle, { opacity: i === selectedIndex ? 0.5 : 1 }]}
                        />
                    ))}
                </View>




                <View style={styles.buttonContainer}>
                    <Button shadowless round color="#29d2e4" onPress={() => this._toSignUpPage()} style={styles.signupBtn}> SIGN UP</Button>
                    <Button shadowless round color="#ffffff" onPress={() => this._toLoginPage()} style={styles.loginBtn}>
                        <Text>LOG IN</Text>
                    </Button>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    imageContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
    },


    title: {
        marginTop: 10,
        width: 297,
        textAlign: 'center',
        fontSize: 20,
        color: '#414141',
        fontWeight: 'bold'
    },

    description: {
        marginTop: 10,
        width: 297,
        textAlign: 'center',
        fontSize: 16,
        color: '#737373'
    },

    buttonContainer: {
        padding: 20,
        justifyContent: 'center', alignItems: 'center'
    },

    signupBtn: {
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '82%',

    },

    loginBtn: {
        borderWidth: 1,
        borderColor: '#000000',
        color: '#ffffff',
        height: 50,
        marginBottom: 40,
        paddingHorizontal: 10,
        width: '82%',
    },

    circleDiv:
    {
        height: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        display: 'flex',

    },

    whiteCircle:
    {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: 'grey'
    }


});