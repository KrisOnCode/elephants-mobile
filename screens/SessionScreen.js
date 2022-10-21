import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, InputField } from '../components';
import { timestamp } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { useLoad } from '../hooks/useLoad';
import { useDocument } from '../hooks/useDocument'
import { useUserDocument } from '../hooks/useUserDocument'
import { useAuthContext } from '../hooks/useAuthContext'


export default function SessionScreen({ route, navigation }){
  const { id } = route.params;
  const { user } = useAuthContext()
  const { document, error } = useDocument('workouts', id)
  const { userDocument, userDocError } = useUserDocument('users', user.uid)
  const { updateDocument, response } = useFirestore('workouts')
  const { updateLoad } = useLoad('users')
  const [newLift, setNewLift] = useState('')
  const [newLoad, setNewLoad] = useState('')
  const [newSets, setNewSets] = useState('')
  const [newReps, setNewReps] = useState('')
  
  if (error) {
    return <Text>{error}</Text>
  }
  if (!document) {
    return <Text>Loading...</Text>
  }

  if (userDocError) {
    return <Text>{userDocError}</Text>
  }
  if (!userDocument) {
    return <Text>Loading...</Text>
  }
  
   // Load Math
   const currentSessionLoad = document.sessionLoad
   const totalReps = newSets * newReps
   const liftTotalLoad = totalReps * newLoad
   const elephant = 6000
   const elephantLoad = liftTotalLoad + currentSessionLoad
   const elephantTotal = elephantLoad / elephant

  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const liftToAdd = {
      lift: newLift,
      load: newLoad,
      reps: newReps,
      sets: newSets,
      totalLoad: liftTotalLoad,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    await updateDocument(document.id, {
      lifts: [...document.lifts, liftToAdd],
      sessionLoad: currentSessionLoad + liftTotalLoad,
      elephants: elephantTotal,
    })
    if (!response.error) {
      setNewLift('')
      setNewLoad('')
      setNewReps('')
      setNewSets('')
    } 
  }

  const handleEndSession = async (e) => {
    e.preventDefault()
    const loadToAdd = {
      dayLoad: elephantLoad,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    await updateLoad(user.uid, {
      workouts: [...userDocument.workouts, loadToAdd],
    })
    navigation.navigate("Home")
}

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
        <View style={styles.headerRow}>
            <Text style={styles.header}>Today's Session</Text>
          </View>
          <Text style={styles.paragraph}>
            {new Date(document.createdAt.seconds * 1000).toLocaleDateString(
              "en-US"
            )}
          </Text>
          <Text style={styles.paragraph}>
            Session Load: {document.sessionLoad}
          </Text>

          <View style={styles.row}>
            <Text style={styles.paragraph}>You have lifted: </Text>
            <Text style={styles.paragraph}>
              {document.elephants.toFixed(1)}{" "}
            </Text>
            <MaterialCommunityIcons name="elephant" size={24} color="white" />
            <Text style={styles.paragraph}>Elephants</Text>
          </View>
          {/* Lift Name */}
          <InputField
            inputStyle={{
              fontSize: 12,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 4,
            }}
            placeholder="Lift Type"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="none"
            autoFocus={true}
            value={newLift}
            onChangeText={(text) => setNewLift(text)}
          />
          {/* Lift Load */}
          <InputField
            inputStyle={{
              fontSize: 12,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 4,
            }}
            placeholder="Lift Load"
            autoCapitalize="none"
            keyboardType="number-pad"
            textContentType="none"
            autoFocus={true}
            value={newLoad}
            onChangeText={(text) => setNewLoad(text)}
          />

          {/* Lift Sets */}
          <InputField
            inputStyle={{
              fontSize: 12,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 4,
            }}
            placeholder="Lift Sets"
            autoCapitalize="none"
            keyboardType="number-pad"
            textContentType="none"
            autoFocus={true}
            value={newSets}
            onChangeText={(text) => setNewSets(text)}
          />
          {/* Lift Reps */}
          <InputField
            inputStyle={{
              fontSize: 12,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 4,
            }}
            placeholder="Lift Reps"
            autoCapitalize="none"
            keyboardType="number-pad"
            textContentType="none"
            autoFocus={true}
            value={newReps}
            onChangeText={(text) => setNewReps(text)}
          />
          <Button
            onPress={handleSubmit}
            backgroundColor="#c8102e"
            title="ADD LIFT"
            tileColor="#fff"
            titleSize={16}
            containerStyle={{
              marginBottom: 12,
            }}
          />
          <Button
            onPress={handleEndSession}
            backgroundColor="#c8102e"
            title="END SESSION"
            tileColor="#fff"
            titleSize={16}
            containerStyle={{
              marginBottom: 12,
            }}
          />
          <ScrollView style={styles.scrollView}>
            {document.lifts.map((lift) => {
              return (
                <View key={lift.id}>
                  <Text style={styles.paragraph}>{lift.lift}</Text>
                  <Text style={styles.paragraph}>
                    {lift.sets} sets x {lift.reps} reps of {lift.load} lbs{" "}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
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
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 8,
      borderBottomWidth: .5,
      borderBottomColor: '#ffffff',
      padding: 4
    },
    header: {
      margin: 4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#ffffff',
    },
  });
  