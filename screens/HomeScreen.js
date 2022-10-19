import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { projectFirestore, timestamp } from '../firebase/config'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLogout } from '../hooks/useLogout'
import { useFirestore } from '../hooks/useFirestore'
import { useDocument } from '../hooks/useDocument'
import { UserInterfaceIdiom } from 'expo-constants';



export default function HomeScreen({ navigation }){
  const { user } = useAuthContext()
  const userID  = user.uid
  const [today, setToday] = useState(null);
  const [date, setDate] = useState(null);
  const { logout } = useLogout()
  // Manipulate Date
  useEffect(() => {
    let day = new Date();
    let date = (day.getMonth()+1)+'-'+day.getDate()+'-'+day.getFullYear()
    let today = (day.getMonth()+1)+'/'+day.getDate()
    setDate(date);
    setToday(today)
  }, []);


  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdBy = { 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }

    const workout = {
      createdBy,
      createdAt: timestamp.fromDate(new Date()),
      sessionLoad: 0,
      elephants: 0,
      lifts: [],
    }

    const {id} = await projectFirestore.collection("workouts").add(workout)
    console.log(id)
    navigation.navigate('Session', {
      id: id,
    });
  }

    return (
      <View style={styles.container}>
         <StatusBar style='light' />
        <View style={styles.content}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.roundButton} onPress={handleSubmit}>
              <FontAwesome5 name="dumbbell" size={36} color="#8A8D8F" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
              <Text style={styles.paragraph}>Start A Workout Session</Text>
            </View>
          <View style={styles.row}>
            <Text onPress={logout} style={styles.paragraph}> LOGOUT</Text>
          </View>
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
      color: '#ffffff',
    },
    roundButton: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#C8102E',
    },
    date: {
    fontSize: 18,
    fontWeight: '800',
    color: '#418FDE',
    }
  });
  