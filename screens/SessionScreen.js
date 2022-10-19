import { StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function SessionScreen({ navigation }){
    return (
      <View style={styles.container}>
         <StatusBar style='light' />
        <View style={styles.content}>
            <Text style={styles.paragraph}>Session Page</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <AntDesign onPress={() => navigation.navigate('Home')} name="home" size={48} color="#A2AAAD" /> 
            <MaterialCommunityIcons name="dumbbell" size={48} color="#A2AAAD" />
            <AntDesign onPress={() => navigation.navigate('Profile')} name="user" size={48} color="#A2AAAD" /> 
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C2340',
    },
    content: {
      flex: 1,
      padding: 60,
    },
    footer: {
      backgroundColor: "#0C2340",
      padding: 40,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#418FDE',
    },

  });
  