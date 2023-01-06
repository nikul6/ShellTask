import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import TextInputBox from '../components/TextInputBox';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Login({ navigation }) {

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            AsyncStorage.getItem('disclaimerAccepted').then(disclaimerAccepted => {
              if (disclaimerAccepted !== 'true') {
                navigation.navigate('Disclaimer');
              } else {
                // Login was successful, proceed to the SelectStation screen:
                navigation.navigate('SelectStation');
              }
            }).catch(error => { console.error(error); });
          } else {
            alert('Invalid email or password');
          }
        })
    } catch (error) {
      console.error("error ---> ", error);
      setSubmitting(false);
    }
  }

  const Schema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be more than 8 characters').required('Password is required'),
  })

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Image source={require('../aasets/logo.png')} style={styles.logoImg} />
        <Text style={styles.loignText}>Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={Schema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <>
              <View style={{ margin: 30 }}>
                <TextInputBox
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  leftIcon={require('../aasets/Vector.png')}
                  paddingh={55}
                />
                {errors.email && touched.email && (<Text style={{ color: 'red' }}>{errors.email}</Text>)}
                <TextInputBox
                  secure={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  leftIcon={require('../aasets/Frame.png')}
                  paddingh={55}
                />
                {errors.password && touched.password && (<Text style={{ color: 'red' }}>{errors.password}</Text>)}
              </View>
              <CustomButton
                title={'Login'}
                errowEnabled
                onPress={handleSubmit}
                disabled={isSubmitting}
              />
            </>
          )}

        </Formik>
        <Text style={styles.forgotText}>Forgot Passwrod?</Text>
      </View>
      <Image source={require('../aasets/BG.png')} style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2.8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'
  },
  logoImg: {
    resizeMode: 'contain', marginBottom: 20, flex: 0.5
  },
  loignText: {
    fontSize: 20, fontWeight: 'bold'
  },
  forgotText: {
    fontSize: 15, fontWeight: 'bold', marginTop: 20
  }
});