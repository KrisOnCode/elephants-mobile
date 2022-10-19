import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { projectFirestore, timestamp } from '../firebase/config'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLogout } from '../hooks/useLogout'
import { useFirestore } from '../hooks/useFirestore'
import { useDocument } from '../hooks/useDocument'
import { UserInterfaceIdiom } from 'expo-constants';
import { useCollection } from '../hooks/useCollection'



export default function HomeScreen({ navigation }){
  const { user } = useAuthContext()
  const { documents, error } = useCollection('workouts')
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
        <StatusBar style="light" />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.paragraph}>START A WORKOUT</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              onPress={handleSubmit}
              name="plus-circle"
              size={72}
              color="white"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.paragraph}>PAST WORKOUTS</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            {documents
              .filter((document) => document.createdBy.id === user.uid)
              .map((document) => {
                return (
                  <View style={styles.list} key={document.id}>
                    <Text style={styles.paragraph}>
                      {new Date(
                        document.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                    </Text>
                    <Text style={styles.paragraph}>
                      Session Load {document.sessionLoad} lbs
                    </Text>
                    <Text style={styles.paragraph}>
                      You lifted {document.elephants}{" "}
                      <MaterialCommunityIcons
                        name="elephant"
                        size={24}
                        color="white"
                      />{" "}
                      Elephants
                    </Text>
                  </View>
                );
              })}
          </ScrollView>
          <View style={styles.row}>
            <Text onPress={logout} style={styles.paragraph}>
              {" "}
              LOGOUT
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <AntDesign
              onPress={() => navigation.navigate("Home")}
              name="home"
              size={36}
              color="#A2AAAD"
            />
            <MaterialCommunityIcons name="dumbbell" size={36} color="#A2AAAD" />
            <AntDesign
              onPress={() => navigation.navigate("Profile")}
              name="user"
              size={36}
              color="#A2AAAD"
            />
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
      padding: 36,
    },
    footer: {
      backgroundColor: "#0C2340",
      padding: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 8
    },
    paragraph: {
      margin: 4,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#ffffff',
    },
    title: {
      margin: 4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#ffffff',
    },
    scrollView: {
      marginHorizontal: 8,
    },
    list: {
      marginBottom: 8,
      marginTop: 8,
    }
  });
  