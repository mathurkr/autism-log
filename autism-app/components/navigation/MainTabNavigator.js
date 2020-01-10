import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';

import TabBarIcon from './TabBarIcon';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const HomeStack = createSwitchNavigator(
    {
        Home: Home,
    },
    config
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
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
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

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    ProfileStack,
    SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
