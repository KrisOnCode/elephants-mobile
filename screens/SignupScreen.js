import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button as RNButton } from 'react-native';
import { Button, InputField } from '../components';
import logo from '../assets/logo.png' 

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const { signup } = useSignup()
  

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
    signup(email, password, username)
  }
  

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>SIGN UP</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        placeholder='Choose a username'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='username'
        autoFocus={true}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter an email'
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
        placeholder='Enter a password'
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
        title='SIGN UP'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Text style={styles.title}>Already have an account?</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        backgroundColor='#c8102e'
        title='GO TO SIGN IN'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
    </View>
  );
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
    paddingTop: 24
  }
});