import { View, Text, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

const disclaimerTextStr = "The information provided by the Zdaly Fuel\nNetwork Optimizer app is based on historical data.\nData on Zdaly Light is updated once daily at 8:00\na.m. eastern time. Any prospective information is\nbased on that data and should not be relied on as\na estimation of future performance. Any future\nproduct prices are the manufacturer's suggested\nretail price (MSRP) only. Sites are independent\noperators free to set their retail\nprice."

export default function Disclaimer({ navigation }) {

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('disclaimerAccepted', 'true');
      navigation.navigate('SelectStation');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../aasets/BG.png')} style={styles.bgConatiner} >
        <Image source={require('../aasets/logo.png')} style={{ resizeMode: 'contain' }} />
      </ImageBackground>
      <View style={styles.mainConatiner}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.subContainer}>
            <Text style={styles.disclaimerMainText}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>{disclaimerTextStr}</Text>
          </View>
          <CustomButton
            title={'I Accept'}
            onPress={handleAccept}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  disclaimerMainText: {
    fontSize: 20, marginTop: 20, fontWeight: 'bold'
  },
  disclaimerText: {
    fontSize: 15, marginTop: 20, fontWeight: '400', lineHeight: 26, textAlign: 'left'
  },
  bgConatiner: {
    flex: 0.5, justifyContent: 'center', alignItems: 'center'
  },
  mainConatiner: {
    backgroundColor: '#fff', flex: 1, marginTop: -90,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    }, shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
  },
  subContainer: {
    justifyContent: 'center', alignItems: 'center', margin: 20
  }
});