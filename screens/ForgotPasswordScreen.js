import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View} from 'react-native';
import { Button, InputField } from '../components';
import logo from '../assets/logo.png'
import { projectAuth } from '../firebase/config'

export default function ForgotPasswordScreen({ navigation }){
    const [email, setEmail] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault()
        projectAuth.sendPasswordResetEmail(email)
        navigation.push('Login')
      }

    return (
        <View style={styles.container}>
        <StatusBar style='light' />
        <Image style={styles.logo} source={logo} /> 
        <Text style={styles.title}>RESET YOUR PASSWORD</Text>
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          leftIcon='email'
          placeholder='Enter email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Button
        onPress={handleSubmit}
        backgroundColor='#c8102e'
        title='SEND PASSWORD RESET EMAIL'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Text style={styles.title}>Remeber your password?</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        backgroundColor='#c8102e'
        title='GO TO LOGIN'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C2340',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#54585a',
    alignSelf: 'center',
    paddingBottom: 24
  }, 
  logo: {
    alignSelf: 'center',
    marginTop: 12,
  }
});