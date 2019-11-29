import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StartUp from './components/StartUp';


export default function App() {
    return (
        <View style={styles.container}>
            <StartUp />
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
});
