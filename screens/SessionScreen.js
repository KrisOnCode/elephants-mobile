import { useState, useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InputField } from '../components';
import { timestamp } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { projectFirestore } from '../firebase/config'
import { useDocument } from '../hooks/useDocument'
import { useUserDocument } from '../hooks/useUserDocument'
import { useAuthContext } from '../hooks/useAuthContext'
import moment from 'moment'


export default function SessionScreen({ route, navigation }){
  const { id } = route.params;
  const { user } = useAuthContext()
  const theme = useTheme();
  const { document, error } = useDocument('workouts', id)
  const { userDocument, userDocError } = useUserDocument('users', user.uid)
  const { updateDocument, response } = useFirestore('workouts')
  const [newLift, setNewLift] = useState('')
  const [newLoad, setNewLoad] = useState('')
  const [newSets, setNewSets] = useState('')
  const [newReps, setNewReps] = useState('')
  const today = moment().format('MMMDDYYYY')

  console.log(today)

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
    let key = today
    await projectFirestore.collection('loads').doc(user.uid).update({ 
      [key]: currentSessionLoad
    })

    await projectFirestore.collection('users').doc(user.uid).update({ 
      lifetimeLoad: userDocument.lifetimeLoad + elephantLoad
    })
    navigation.navigate("Home")
}

    return (
      <View
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
          paddingTop: 24,
          paddingHorizontal: 16,
        }}
      >
        <StatusBar style="light" />
        <View style={styles.content}>
        <View style={styles.headerRow}>
        <Text
              style={{
                color: theme.colors.textColor,
                alignSelf: "center",
                paddingBottom: 2,
                paddingTop: 2,
              }}
              variant="titleMedium"
            >Today's Workout</Text>
          </View>
          <Text
              style={{
                color: theme.colors.textColor,
                alignSelf: "center",
                paddingBottom: 1,
                paddingTop: 1,
              }}
              variant="titleMedium"
            >
            {new Date(document.createdAt.seconds * 1000).toLocaleDateString(
              "en-US"
            )}
          </Text>
          <Text
              style={{
                color: theme.colors.textColor,
                alignSelf: "center",
                paddingBottom: 1,
                paddingTop: 1,
              }}
              variant="titleMedium"
            >
            Today's Load: {document.sessionLoad}
          </Text>

          <View style={styles.row}>
            <View style={{alignSelf: "center"}}>
            <Text
              style={{
                color: theme.colors.textColor,
              }}
              variant="titleSmall"
            >You have lifted: </Text>
            <Text style={{
                alignSelf: "center",
                color: theme.colors.textColor,
              }}>
              {document.elephants.toFixed(1)}{" "}
              <MaterialCommunityIcons name="elephant" size={16} color="white" />
            </Text>
            
            </View>
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
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">ADD LIFT</Button>
        <Text style={{color: theme.colors.textColor, alignSelf: 'center',
    paddingBottom: 2, paddingTop: 2}} variant="labelSmall">Complete Session</Text>
     <Button
        onPress={handleEndSession}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">END TODAY'S WORKOUT</Button>
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
              size={24}
              color="#A2AAAD"
            />
            <AntDesign
              onPress={() => navigation.navigate("Profile")}
              name="user"
              size={24}
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
      padding: 16,
    },
    footer: {
      backgroundColor: "#0C2340",
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 4
    },
    paragraph: {
      margin: 4,
      fontSize: 16,
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
      borderBottomWidth: 1,
      borderBottomColor: '#ffffff',
      padding: 4
    },
  });
  