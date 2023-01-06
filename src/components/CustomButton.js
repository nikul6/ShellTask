import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function CustomButton({ title, errowEnabled, onPress, disabled }) {
    return (
        <TouchableOpacity style={[styles.mainContainer, { width: errowEnabled ? 110 : 200 }]} onPress={onPress} disabled={disabled}>
            <Text style={styles.titleText}>{title}</Text>
            {errowEnabled && (
                <Image source={require('../aasets/Errow.png')} style={styles.errowImg} />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#DD1D21', borderRadius: 30, paddingHorizontal: 25, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', flexDirection: 'row',

    },
    errowImg: {
        height: 20, width: 20, resizeMode: 'contain'
    },
    titleText: {
        fontSize: 16, fontWeight: 'bold', color: '#fff', marginRight: 10
    },
});