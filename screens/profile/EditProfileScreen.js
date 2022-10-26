import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'
import { projectFirestore } from '../../firebase/config';
import { StyleSheet, View, ScrollView } from 'react-native';
import { InputField } from '../../components'
import { Text, Button, Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function EditProfileScreen({ navigation }){
  const theme = useTheme();
  const { user } = useAuthContext()
  const { logout } = useLogout()
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
            >Update Profile</Text>
            <Text
              onPress={() => navigation.navigate("Profile")}
              style={{
                color: theme.colors.secondary,
                alignSelf: "center",
                paddingBottom: 12,
                paddingTop: 12,
              }}
              variant="titleMedium"
            >
              DONE
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <Avatar.Image size={72} source={{ uri: document.photoURL }} />
          </View>
          
          <Text
              onPress={() => navigation.navigate("UploadAvatar")}
              style={{
                color: theme.colors.secondary,
                alignSelf: "center",
                paddingBottom: 12,
                paddingTop: 12,
              }}
              variant="titleMedium"
            >
              UPDATE PROFILE IMAGE
            </Text>
            {/* Update Username */}
            <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              Username
            </Text>
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
            style={styles.button}
            onPress={handleUpdateUsername}
            mode="elevated"
            buttonColor={theme.colors.secondary}
            textColor="#ffffff">UPDATE USERNAME</Button>

          {/* Update First Name */}
          <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              First Name
            </Text>
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
            style={styles.button}
            onPress={handleUpdateFirstname}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE FIRSTNAME</Button>
           
            {/* Update Last Name */}
            <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              Last Name
            </Text>
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
            style={styles.button}
            onPress={handleUpdateLastname}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE LASTNAME</Button>
         
              {/* Update City */}
              <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              City
            </Text>
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
            style={styles.button}
                  onPress={handleUpdateCity}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE CITY</Button>
         
               {/* Update State */}
               <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              State
            </Text>
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
            style={styles.button}
                  onPress={handleUpdateSt}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE STATE</Button>
      
             {/* Update Bio */}
             <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 4,
                paddingTop: 4,
              }}
              variant="titleMedium"
            >
              Bio
            </Text>
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
             style={styles.button}
                  onPress={handleUpdateBio}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE BIO</Button>
     
       
        <Button
        style={styles.button}
                  onPress={logout}
        mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">SIGN OUT</Button>
        
        {/* Go to account settings */}
        
        <Button
        style={styles.button}
         onPress={() => navigation.navigate("AccountSettings")}
        mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">ACCOUNT SETTINGS</Button>
       
       
          
          </ScrollView>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 12,
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 4
    },
    scrollView: {
      marginHorizontal: 8,
    },
    button: {
      marginTop: 8,
      marginBottom: 8,
    }
  });