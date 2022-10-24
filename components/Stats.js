import {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { projectFirestore } from '../firebase/config'
import { useAuthContext} from '../hooks/useAuthContext'
import { useDocument } from '../hooks/useDocument'

export default function Stats(){
    const { user } = useAuthContext()
    const { document, error } = useDocument('loads', user.uid)
   
    if (error) {
      return <Text>{error}</Text>
  }
      if (!document) {
      return <Text>Loading...</Text>
   }
   

   let monday = document.Oct242022 
    if(isNaN(monday)) monday = 0;

   let tuesday = document.Oct252022 
    if(isNaN(tuesday)) tuesday = 0;

  let wednesday = document.Oct262022 
    if(isNaN(wednesday)) wednesday = 0;

  let thursday = document.Oct272022 
    if(isNaN(thursday)) thursday = 0;
  
  let friday = document.Oct282022 
    if(isNaN(friday)) friday = 0;

  let saturday = document.Oct292022 
    if(isNaN(saturday)) saturday = 0;

  let sunday = document.Oct302022 
    if(isNaN(sunday)) sunday = 0;
  
   const weekLoad = monday + tuesday + wednesday + thursday + friday + saturday + sunday
   const elephant = 6000 
   const weekElephants = weekLoad / elephant
   
   console.log(weekElephants)
  
   
    return (
      <View style={styles.headerRow}>
            <Text style={styles.header}></Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
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