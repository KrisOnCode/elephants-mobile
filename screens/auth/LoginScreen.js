import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin'
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { InputField } from '../../components';
import logo from '../../assets/logo.png'

export default function LoginScreen({ navigation }){
    const theme = useTheme();
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
      <View style={{ backgroundColor: theme.colors.background, flex: 1, paddingTop: 50, paddingHorizontal: 48 }}>
        <StatusBar style='light' />
        <Image style={styles.logo} source={logo} /> 
        <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineMedium">Sign In</Text>
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
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">SIGN IN</Button>
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineSmall">Forgot your password?</Text>
      <Button
        onPress={() => navigation.navigate('Forgot')}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">GO TO FORGOT PASSWORD</Button>
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 12, paddingTop: 12}} variant="headlineSmall">Need an account?</Text>
      <Button
        onPress={() => navigation.navigate('Signup')}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">GO TO SIGN UP</Button>
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