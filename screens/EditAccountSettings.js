import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { projectAuth } from '../firebase/config'
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputField } from '../components';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';

export default function EditAccountSettingsScreen({ navigation }){
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
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
        <View style={styles.headerRow}>
            <Text style={styles.header}>EDIT ACCOUNT SETTINGS</Text>
          </View>
          <Text style={styles.paragraph}>Current Password is required to change password or email</Text>
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
        backgroundColor='#418FDE'
        title='UPDATE PASSWORD'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
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
        backgroundColor='#418FDE'
        title='UPDATE EMAIL'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
       <Button
        onPress={() => navigation.navigate("DeleteAccount")}
        backgroundColor='#C8102E'
        title='DELETE ACCOUNT'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <Button
        onPress={() => navigation.navigate("Profile")}
        backgroundColor='#C8102E'
        title='CANCEL'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
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