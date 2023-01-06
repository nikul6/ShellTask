import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({ route, navigation }) {
    const { stationDetails } = route.params;
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const interval = useRef();
    const timerKey = `@Timer:${stationDetails.id}:elapsedTime`;

    useEffect(() => {
        AsyncStorage.getItem(timerKey).then(value => {
            if (value !== null) {
                setElapsedTime(Number(value));
            }
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(timerKey, elapsedTime.toString());
    }, [elapsedTime]);

    const startTimer = () => {
        interval.current = setInterval(() => {
            setElapsedTime(elapsedTime => elapsedTime + 1);
        }, 1000);
        setIsRunning(true);
    }

    const stopTimer = () => {
        // console.log('Stopping timer');
        clearInterval(interval.current);
        setIsRunning(false);
    }

    const toggleTimer = () => {
        // console.log('Toggling timer');
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../aasets/BG.png')} style={styles.bgConatiner} >
                <TouchableOpacity style={{ flex: 1, paddingLeft: 20 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../aasets/Back_Button.png')} style={{ resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.headerText}>Details</Text>
                </View>
                <View style={{ flex: 1 }} />
            </ImageBackground>
            <View style={styles.mainConatiner}>
                <View style={styles.searchBox}>
                    <Text style={styles.subscribedText}>{isRunning ? 'Station Subscribed' : 'Subscribe Station'}</Text>
                </View>
                <View style={styles.subscribedConatiner}>
                    <Text style={styles.activeText}>ACTIVE FROM</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <>
                            <Text style={styles.secondTimerText}>{elapsedTime}</Text>
                            <Text style={styles.secondText}>Seconds</Text>
                        </>
                        <TouchableOpacity style={{
                            backgroundColor: '#DD1D21', borderRadius: 25,
                            paddingLeft: 50, paddingRight: 50, padding: 10, justifyContent: 'center',
                            alignItems: 'center', overflow: 'hidden'
                        }} onPress={toggleTimer}>
                            <Text style={styles.disclaimerText}>{isRunning ? 'Stop' : 'Start'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.infoText}>MORE INFO</Text>
                        <Image source={require('../aasets/Btn.png')} style={{ resizeMode: 'contain' }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subscribedText: {
        fontSize: 25, marginTop: 0, fontWeight: 'bold'
    },
    disclaimerText: {
        fontSize: 14, fontWeight: '500',
        color: '#fff'
    },
    secondTimerText: {
        fontSize: 30, marginTop: 0, fontWeight: 'bold'
    },
    secondText: {
        fontSize: 10, marginTop: 0, fontWeight: 'bold',
        position: 'absolute',
        top: -4,
        left: 14
    },
    activeText: {
        fontSize: 20, marginTop: 0, fontWeight: 'bold'
    },
    infoText: {
        fontSize: 14, marginTop: 0, fontWeight: 'bold'
    },
    subscribedConatiner: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 0,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerText: {
        fontSize: 20, fontWeight: 'bold'
    },
    bgConatiner: {
        flex: 0.5,
        // justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainConatiner: {
        backgroundColor: '#fff', flex: 1, marginTop: -90, borderRadius: 30,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,

    },
    searchBox: {
        margin: 20,
        marginBottom: 0,
        padding: 15,
    }
});