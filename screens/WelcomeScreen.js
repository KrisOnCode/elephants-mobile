import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button } from '../components';
import logo from '../assets/logo.png' 

export default function WelcomeScreen({ navigation }) { 
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>Already have an account?</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        backgroundColor='#c8102e'
        title='SIGN IN'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Text style={styles.title}>New to EllaLift?</Text>
      <Button
        onPress={() => navigation.navigate('Signup')}
        backgroundColor='#418fde'
        title='GET STARTED'
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
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    alignSelf: 'center',
    paddingBottom: 24
  }, 
  logo: {
    alignSelf: 'center',
    paddingTop: 24,
    height: 150,
    width: 150,
    marginBottom: 24
  }
});