import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components for the SignUp process
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import SignUpForm from './components/SignUpForm';
import PaymentInfo from './components/PaymentInfo';
import TermsOfService from './components/TermsOfService';
import PrivatePolicy from './components/PrivatePolicy';
import Authenticate from './components/Authenticate';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import VerifyCode from './components/VerifyCode';
import LoggerSelection from './components/LoggerSelection';

// Include MainTabNavigator for main application navigation
import MainAppNavigator from './components/navigation/MainAppNavigator';


// SignUpNavigator holds all components associated with SignUp process -- may divide them up in the future
const SignUpNavigator = createStackNavigator({
    Welcome: { screen: Welcome },
    SignUp: { screen: SignUp },
    SignUpForm: { screen: SignUpForm },
    PaymentInfo: { screen: PaymentInfo },
    TermsOfService: { screen: TermsOfService },
    PrivatePolicy: { screen: PrivatePolicy },
    Authenticate: { screen: Authenticate },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    VerifyCode: { screen: VerifyCode },
    LoggerSelection: { screen: LoggerSelection },
});

// Universal App Navigator
const UniversalNavigator = createSwitchNavigator({
    SignUp: SignUpNavigator,
    Main: MainAppNavigator
});

const App = createAppContainer(UniversalNavigator);

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