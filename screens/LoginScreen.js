import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button, InputField } from '../components';
import logo from '../assets/logo.png'

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const { login } = useLogin()

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
          setRightIcon('eye-off');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
      }

    return (
        <View style={styles.container}>
        <StatusBar style='light' />
        <Image style={styles.logo} source={logo} /> 
        <Text style={styles.title}>SIGN IN</Text>
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
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          leftIcon='lock'
          placeholder='Enter password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Button
        onPress={handleSubmit}
        backgroundColor='#c8102e'
        title='SIGN IN'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Text style={styles.title}>Forgot your password?</Text>
      <Button
        onPress={() => navigation.navigate('Forgot')}
        backgroundColor='#c8102e'
        title='RESET PASSWORD'
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