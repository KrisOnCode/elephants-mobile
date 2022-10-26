import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup'
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { InputField } from '../../components';
import logo from '../../assets/logo.png' 

export default function SignupScreen({ navigation }) {
  const theme = useTheme();
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
    <View style={{ backgroundColor: theme.colors.background, flex: 1, paddingTop: 120, paddingHorizontal: 48 }}>
      <StatusBar style='light' />
      <Image style={styles.logo} source={logo} />
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineMedium">Sign Up</Text>
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
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">SIGN UP</Button>
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineSmall">Already have an account?</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff"
      >GO TO SIGN IN</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    paddingTop: 24,
    marginBottom: 12,
    height: 120,
    width: 120,
  }
});