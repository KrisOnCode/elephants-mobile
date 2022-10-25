import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { InputField } from '../../components';
import logo from '../../assets/logo.png'
import { projectAuth } from '../../firebase/config'

export default function ForgotPasswordScreen({ navigation }){
   const theme = useTheme();
   const [email, setEmail] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault()
        projectAuth.sendPasswordResetEmail(email)
        navigation.push('Login')
      }

    return (
      <View style={{ backgroundColor: theme.colors.background, flex: 1, paddingTop: 50, paddingHorizontal: 48 }}>
        <StatusBar style='light' />
        <Image style={styles.logo} source={logo} /> 
        <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineMedium">Reset Your Password</Text>
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
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">SEND PASSWORD RESET EMAIL</Button>
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineSmall">Remember password?</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">GO TO LOGIN</Button>
      </View>
    )
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12
  }
});