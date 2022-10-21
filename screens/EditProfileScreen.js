import { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useDocument } from '../hooks/useDocument'
import { Button, InputField } from '../components';
import { projectFirestore } from '../firebase/config';

export default function EditProfileScreen({ navigation }){
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [newFirstname, setNewFirstname] = useState()
  const [newLastname, setNewLastname] = useState()
  const [newCity, setNewCity] = useState()
  const [newSt, setNewSt] = useState()
  const [newBio, setNewBio] = useState()
  const [newUsername, setNewUsername] = useState()
  const { document, error } = useDocument('users', user.uid)

        if (error) {
        return <Text>{error}</Text>
    }
        if (!document) {
        return <Text>Loading...</Text>
     }

     const handleUpdateFirstname = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        firstname: newFirstname
      })
     }

     const handleUpdateLastname = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        lastname: newLastname
      })
     }

     const handleUpdateCity = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        city: newCity
      })
     }

     const handleUpdateSt = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        st: newSt
      })
     }

     const handleUpdateBio = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        bio: newBio
      })
     }

     const handleUpdateUsername = async (e) => {
      e.preventDefault()
      await projectFirestore.collection('users').doc(user.uid).update({ 
        username: newUsername
      })
      await user.updateProfile({
        displayName: newUsername,
      })
     }
     
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>EDIT PROFILE</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Profile")}
            >
              DONE
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <Image style={styles.avatar} source={{ uri: document.photoURL }} />
          </View>
          <Text
              style={styles.link}
              onPress={() => navigation.navigate("UploadAvatar")}
            >
              UPDATE PROFILE IMAGE
            </Text>
            {/* Update Username */}
           <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.username}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newUsername}
              onChangeText={(text) => setNewUsername(text)}
            />
           <Button
              onPress={handleUpdateUsername}
              backgroundColor='#418FDE'
              title='UPDATE USERNAME'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
          {/* Update First Name */}
         
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.firstname}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newFirstname}
              onChangeText={(text) => setNewFirstname(text)}
            />
           <Button
              onPress={handleUpdateFirstname}
              backgroundColor='#418FDE'
              title='UPDATE FIRSTNAME'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
            {/* Update Last Name */}
         
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.lastname}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newLastname}
              onChangeText={(text) => setNewLastname(text)}
            />
           <Button
              onPress={handleUpdateLastname}
              backgroundColor='#418FDE'
              title='UPDATE LASTNAME'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
              {/* Update City */}
         
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.city}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newCity}
              onChangeText={(text) => setNewCity(text)}
            />
           <Button
              onPress={handleUpdateCity}
              backgroundColor='#418FDE'
              title='UPDATE CITY'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
               {/* Update State */}
         
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.st}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newSt}
              onChangeText={(text) => setNewSt(text)}
            />
           <Button
              onPress={handleUpdateSt}
              backgroundColor='#418FDE'
              title='UPDATE STATE'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
             {/* Update Bio */}
         
             <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 4,
              }}
              placeholder={document.bio}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              autoFocus={true}
              value={newBio}
              onChangeText={(text) => setNewBio(text)}
            />
           <Button
              onPress={handleUpdateBio}
              backgroundColor='#418FDE'
              title='UPDATE BIO'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
              <Button
              onPress={logout}
              backgroundColor='#C8102E'
              title='SIGN OUT'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
              <Button
              backgroundColor='#8A8D8F'
              title='TERMS'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
               <Button
              backgroundColor='#8A8D8F'
              title='PRIVACY POLICY'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
               <Button
              onPress={() => navigation.navigate("AccountSettings")}
              backgroundColor='#C8102E'
              title='ACCOUNT SETTINGS'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
          <View style={styles.row}>
          
          </View>
          </ScrollView>
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
    link: {
      margin: 4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#418FDE',
    },
    avatar: {
      height: 72,
      width: 72,
      borderRadius: 72/2
    },
    scrollView: {
      marginHorizontal: 8,
    },
  });