import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { projectAuth } from '../../firebase/config'
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { InputField } from '../../components';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';

export default function DeleteAccountScreen({ navigation }){
  const theme = useTheme();
  const [currentPassword, setCurrentPassword] = useState()
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  // Show and Hide Password
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
 
  // Reauthenticate the user for firebase
  const reauthenticate = (currentPassword) => {
    const user = projectAuth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  
  // Delete the current user
  const handleSubmit = () => {
    reauthenticate(currentPassword).then(() => {
      const user = projectAuth.currentUser;
      user.delete()
      navigation.navigate("DeleteConfirm")
  })}

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
            >Delete Account</Text>
          </View>

          <Text style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 8,
            }}
            variant="bodyLarge" >Click on the delete account button to delete your EllaLift account
            and all data stored by EllaLift. Once completed this action cannot
            be undone.</Text>
            <InputField
            inputStyle={{
              fontSize: 14,
            }}
            containerStyle={{
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            leftIcon="lock"
            placeholder="Current password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <Button
            onPress={handleSubmit}
            mode="elevated"
        buttonColor={theme.colors.primary}
        textColor="#ffffff">DELETE ACCOUNT</Button>
        <Text
            style={{
              color: theme.colors.textColor,
              alignSelf: "center",
              paddingBottom: 12,
              paddingTop: 12,
            }}
            variant="bodyLarge"
          >
            Decided to stay?
          </Text>
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
      padding: 4
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 4
    },
  });