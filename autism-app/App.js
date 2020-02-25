import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components for the SignUp process
import Welcome from './components/Welcome';
import SignUp from './components/login/SignUp';
import SignUpPassword from './components/login/SignUpPassword';
import SignUpForm from './components/login/SignUpForm';
import PaymentInfo from './components/login/PaymentInfo';
import TermsOfService from './components/login/TermsOfService';
import PrivatePolicy from './components/login/PrivatePolicy';
import Authenticate from './components/login/Authenticate';
import Login from './components/login/Login';
import ForgotPassword from './components/login/ForgotPassword';
import VerifyCode from './components/login/VerifyCode';
import LoggerSelection from './components/login/LoggerSelection';
import ProfileSetUp from './components/login/ProfileSetUp';

import NameSetup from './components/login/NameSetup';
import ChildSetup from './components/login/ChildSetup';
import AgeSetup from './components/login/AgeSetup';
import ExpandedLog from './components/navigation/ExpandedLog'

// Include MainTabNavigator for main application navigation
import MainAppNavigator from './components/navigation/MainAppNavigator';
import Profile from './components/navigation/Profile';
import Settings from './components/navigation/Settings'
import Home from './components/navigation/Home'


// SignUpNavigator holds all components associated with SignUp process -- may divide them up in the future
const SignUpNavigator = createStackNavigator({
    Welcome: { screen: Welcome },
    SignUp: { screen: SignUp },
    SignUpPassword: { screen: SignUpPassword },
    SignUpForm: { screen: SignUpForm },
    NameSetup: { screen: NameSetup },
    AgeSetup: { screen: AgeSetup },
    PaymentInfo: { screen: PaymentInfo },
    TermsOfService: { screen: TermsOfService },
    PrivatePolicy: { screen: PrivatePolicy },
    Authenticate: { screen: Authenticate },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    VerifyCode: { screen: VerifyCode },
    LoggerSelection: { screen: LoggerSelection },
    ProfileSetUp: { screen: ProfileSetUp },
    ChildSetup: { screen: ChildSetup },


    // ExpandedLog: { screen: ExpandedLog },

});

// class MainAppNav extends Component {
//     render() {
//         const { navigation } = this.props;
//         return <MainAppNavigator
//             screenProps={{
//                 params: navigation.state.params,
//                 rootNavigation: navigation
//             }} />
//     }
// }

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