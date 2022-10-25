import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'
import { InputField } from '../../components';
import { projectFirestore } from '../../firebase/config';

export default function EditProfileScreen({ navigation }){
  const { logout } = useLogout()
  const theme = useTheme();
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
      <View
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
          paddingTop: 16,
          paddingHorizontal: 24,
        }}
      >
        <StatusBar style="light" />
        <View style={styles.content}>
          <View style={styles.headerRow}>
          <Text
              style={{
                color: theme.colors.textColor,
                alignSelf: "center",
                paddingBottom: 12,
                paddingTop: 12,
              }}
              variant="titleMedium"
            >EDIT PROFILE</Text>
           
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
           <View style={styles.row}>
            <Button
            onPress={handleUpdateUsername}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE USERNAME</Button>
          </View>
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
            <View style={styles.row}>
            <Button
            onPress={handleUpdateFirstname}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE FIRSTNAME</Button>
           </View>
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
            <View style={styles.row}>
            <Button
            onPress={handleUpdateLastname}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE LASTNAME</Button>
           </View>
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
            <View style={styles.row}>
            <Button
                  onPress={handleUpdateCity}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE CITY</Button>
           </View>
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
            <View style={styles.row}>
            <Button
                  onPress={handleUpdateSt}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE STATE</Button>
        </View>
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
            <View style={styles.row}>
             <Button
                  onPress={handleUpdateBio}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">UPDATE BIO</Button>
        </View>
        <View style={styles.row}>
        <Button
                  onPress={logout}
        mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">SIGN OUT</Button>
        </View>
        {/* Go to account settings */}
        <View style={styles.row}>
        <Button
         onPress={() => navigation.navigate("AccountSettings")}
        mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">ACCOUNT SETTINGS</Button>
          </View>
       
          
          </ScrollView>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 36,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 8
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
    scrollView: {
      marginHorizontal: 8,
    },
  });