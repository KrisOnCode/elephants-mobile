import { useState } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, InputField } from '../components';
import { timestamp } from '../firebase/config';
import { useFirestore } from '../hooks/useFirestore';
import { useDocument } from '../hooks/useDocument'


export default function SessionScreen({ route, navigation }){
  const { id } = route.params;
  const { document, error } = useDocument('workouts', id)
  const { updateDocument, response } = useFirestore('workouts')
  const [newLift, setNewLift] = useState('')
  const [newLoad, setNewLoad] = useState('')
  const [newSets, setNewSets] = useState('')
  const [newReps, setNewReps] = useState('')

  console.log(id)
  
  if (error) {
    return <Text>{error}</Text>
  }
  if (!document) {
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

    return (
      <View style={styles.container}>
         <StatusBar style='light' />
        <View style={styles.content}>
            <Text style={styles.paragraph}>Current Workout Session</Text>
            {/* Lift Name */}
            <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          placeholder='Lift Type'
          autoCapitalize='none'
          keyboardType='default'
          textContentType='none'
          autoFocus={true}
          value={newLift}
          onChangeText={text => setNewLift(text)}
        />
         {/* Lift Load */}
         <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          placeholder='Lift Load'
          autoCapitalize='none'
          keyboardType='number-pad'
          textContentType='none'
          autoFocus={true}
          value={newLoad}
          onChangeText={text => setNewLoad(text)}
        />
          {/* Lift Sets */}
          <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          placeholder='Lift Sets'
          autoCapitalize='none'
          keyboardType='number-pad'
          textContentType='none'
          autoFocus={true}
          value={newSets}
          onChangeText={text => setNewSets(text)}
        />
        {/* Lift Reps */}
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          placeholder='Lift Reps'
          autoCapitalize='none'
          keyboardType='number-pad'
          textContentType='none'
          autoFocus={true}
          value={newReps}
          onChangeText={text => setNewReps(text)}
        />
        <Button
        onPress={handleSubmit}
        backgroundColor='#c8102e'
        title='ADD LIFT'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
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

  });
  