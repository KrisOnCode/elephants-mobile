import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTheme } from 'react-native-paper';
import { projectAuth } from '../../firebase/config'
import * as firebase from 'firebase';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { InputField } from '../../components'

import { Text, Button } from 'react-native-paper';

export default function EditAccountScreen({ navigation }){
  const theme = useTheme();
  const { user } = useAuthContext()
  const [currentPassword, setCurrentPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [newEmail, setNewEmail] = useState()
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const reauthenticate = (currentPassword) => {
    const user = projectAuth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  const handlePasswordChange = () => {
    reauthenticate(currentPassword).then(() => {
      const user = projectAuth.currentUser;
      user.updatePassword(newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
    navigation.navigate("Profile")
  }

  const handleEmailChange = () => {
    reauthenticate(currentPassword).then(() => {
      const user = projectAuth.currentUser;
      user.updateEmail(newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
    navigation.navigate("Profile")
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
            >Update Account Settings</Text>
            
          </View>
          <Text
            style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 12,
            }}
            variant="bodyLarge"
          >Current Password is required to change password or email</Text>
          <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          leftIcon='lock'
          placeholder='Current password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          value={currentPassword}
          onChangeText={text => setCurrentPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        
         <Text
            style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 12,
            }}
            variant="bodyLarge"
          >If you wish to change your password, enter a new password. To keep your current password, leave as is.</Text>
           <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          leftIcon='lock'
          placeholder='Enter new password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Button
            onPress={handlePasswordChange}
            mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">UPDATE PASSWORD</Button>
          <Text
            style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 12,
            }}
            variant="bodyLarge"
          >If you wish to change your email, enter a new email. To keep your current email, leave as is.</Text>
           <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          leftIcon='email'
          placeholder='Enter new email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          value={newEmail}
          onChangeText={text => setNewEmail(text)}
        />
        <Button
            onPress={handleEmailChange}
            mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">UPDATE EMAIL</Button>
        <Text
            style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 12,
            }}
            variant="bodyLarge"
          >If you do not wish to make any changes, return to profile.</Text>
          <Button
            onPress={() => navigation.navigate("Profile")}
            mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">CANCEL</Button>
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
      padding: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 4
    },
  });