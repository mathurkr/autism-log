import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './components/Welcome';
import Authenticate from './components/Authenticate';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

const MainNavigator = createStackNavigator({
    Welcome: { screen: Welcome },
    Authenticate: { screen: Authenticate },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Profile: { screen: Profile }
});

const App = createAppContainer(MainNavigator);

export default App;



// export default function App() {
//     return (
//         <View style={styles.container}>
//             <WelcomeScreen />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
