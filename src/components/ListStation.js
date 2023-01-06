import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

export default function ListStation({ details }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.stationConatiner} onPress={() => navigation.navigate('Details', { stationDetails: details })}>
            <Image source={require('../aasets/petrol.png')} style={{ resizeMode: 'contain' }} />
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.stationText}>{details.pantone_value}</Text>
                <Text style={styles.pantoneText}>{details.name.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    stationText: {
        fontSize: 16, marginTop: 0, fontWeight: 'bold'
    },
    pantoneText: {
        fontSize: 14, marginTop: 5, fontWeight: '500',
        color: '#ADB7C6'
    },
    stationConatiner: {
        flexDirection: 'row', margin: 20, alignItems: 'center', padding: 20, borderBottomWidth: 1.5, borderBottomColor: '#F0F4F5', paddingTop: 0
    },
});