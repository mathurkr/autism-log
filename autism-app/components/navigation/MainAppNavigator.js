import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from './TabBarIcon';

// Import bottom dashboard components
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Logs from './Logs';

// Log Management
import ExpandedLog from './ExpandedLog';
import DeleteLog from './DeleteLog';
import EditLog from './EditLog';
import CreateLog from './CreateLog';

import MainHelper from './MainHelper';
import HomeHelper from './HomeHelper';

import IndexScreen from '../../src/screens/IndexScreen';
import CreateScreen from '../../src/screens/CreateScreen';
import EditScreen from '../../src/screens/EditScreen';
import ShowScreen from '../../src/screens/ShowScreen';


// Import device components
// import CameraLog from './camera/CameraLog';
import QuickCamera from './camera/QuickCamera';
import MainCamera from './camera/MainCamera';
// import { createStackNavigator } from 'react-navigation-stack';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

// const HomeStack = createMaterialTopTabNavigator(
//     {
//         QuickCamera: QuickCamera,
//         Home: Home
//     },
//     {
//         initialRouteName: "Home",
//         animationEnabled: true,
//         tabBarOptions: {
//             showLabel: false,
//             showIcon: false,
//             style: { height: 0 }
//         }
//     }
// );

const HomeStack = createStackNavigator(
    {
        // Home: Home,
        // ExpandedLog: ExpandedLog,
        // DeleteLog: DeleteLog,
        // EditLog: EditLog,
        // CreateLog: CreateLog
        IndexScreen: {
            screen:IndexScreen,
            navigationOptions: {
            },

        },
        
        Show: ShowScreen,
        CreateScreen: CreateScreen,
        EditScreen: EditScreen
         //Home: Home
    },
    // config
    {
        initialRouteName: "Home"
    }
    // const HomeStack = createStackNavigator(
    //     {
    //         IndexScreen: {
    //             screen: IndexScreen,
    //             navigationOptions: {
    //                 title: 'Home',
    //             },

    //         },

    //         Show: ShowScreen,
    //         CreateScreen: CreateScreen,
    //         EditScreen: EditScreen
    //         //Home: Home
    //     },
    //     {
    //         initialRouteName: "IndexScreen"
    //     }
    //     //config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

HomeStack.path = '';

const ProfileStack = createSwitchNavigator(
    {
        Profile: Profile,
    },
    config
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-person'} />
    ),
};

ProfileStack.path = '';

const SettingsStack = createSwitchNavigator(
    {
        Settings: Settings,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};

SettingsStack.path = '';

const LogsStack = createSwitchNavigator(
    {
        Logs: Logs,
        Camera: MainCamera,
        QuickCamera: QuickCamera
    },
    config
);

LogsStack.navigationOptions = {
    tabBarLabel: 'Logs',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-paper'} />
    ),
};

LogsStack.path = '';

const TabNavigator = createBottomTabNavigator({
    HomeStack,
    ProfileStack,
    SettingsStack,
    LogsStack
},
    {
        initialRouteName: "HomeStack"
    }
);

TabNavigator.path = '';

const AppNavigator = createSwitchNavigator(
    {
        MainHelper: MainHelper,       // Used to convert params received from Login, SignUp pages
        TabsNavigator: TabNavigator,  // Holds the main navigation tabs 
        HomeHelper: HomeHelper        // Helper to reload Home page when changing the date on the calendar
    },
    {
        initialRouteName: "MainHelper",
        animationEnabled: true,
        tabBarOptions: {
            showLabel: false,
            showIcon: false,
            style: { height: 0 }
        }
    }
);
// const AppNavigator = createSwitchNavigator(
//     {
//         Tabs: TabNavigator,
//         // CameraLog: CameraLog
//     },
//     config
// );

export default AppNavigator;
