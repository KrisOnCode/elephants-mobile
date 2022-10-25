import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import logo from '../../assets/logo.png' 

export default function WelcomeScreen({ navigation }) { 
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, paddingTop: 50, paddingHorizontal: 48 }}>
      <StatusBar style='light' />
      <Image style={styles.logo} source={logo} />
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 24, paddingTop: 24}} variant="headlineMedium">Sign In</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff"> SIGN IN
    
      </Button>
      <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 24, paddingTop: 24}} variant="headlineMedium">New to EllaLift?</Text>
      <Button
        onPress={() => navigation.navigate('Signup')}
        type="elevated"
        buttonColor='#c8102e'
        textColor="#ffffff"> GET STARTED
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    paddingTop: 24,
    height: 150,
    width: 150,
    marginBottom: 24
  }
});