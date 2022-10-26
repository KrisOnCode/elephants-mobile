import { useState } from 'react'
import { useTheme } from 'react-native-paper';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'
import { projectFirestore, projectStorage } from '../../firebase/config'
import { StyleSheet, View } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';


export default function UploadAvatarScreen({ navigation }){
  const theme = useTheme();
  const { user } = useAuthContext()
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { document, error } = useDocument('users', user.uid)

      if (error) {
      return <Text>{error}</Text>
  }
      if (!document) {
      return <Text>Loading...</Text>
   }

   const pickImage = async () => {
        
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);

};

const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const uploadPath = `avatars/${user.uid}/${user.displayName}`
    const img = await projectStorage.ref(uploadPath).put(blob)
    const imgUrl = await img.ref.getDownloadURL()
    await user.updateProfile({ photoURL: imgUrl })
    await projectFirestore.collection('users').doc(user.uid).update({ photoURL: imgUrl })
    setUploading(false);
    Alert.alert(
      'Photo uploaded!!!',
    );
    setImage(null);
  };

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
            >Update Profile Image</Text>
          </View>
          <View style={styles.row}>
            <Avatar.Image size={96} source={{ uri: document.photoURL }} />
          </View>
          <Button
       onPress={pickImage}
        mode="elevated"
        buttonColor={theme.colors.secondary}
        textColor="#ffffff">SELECT NEW IMAGE</Button>
          <View style={styles.imageContainer}>
              {image && <Avatar.Image size={96} source={{ uri: image.uri }} />}
          </View>
          <Button
              onPress={uploadImage}
              mode="elevated"
              buttonColor={theme.colors.secondary}
              textColor="#ffffff"
            >UPLOAD NEW IMAGE</Button>
             <View style={styles.row}>
              <Text style={styles.link} onPress={() => navigation.navigate("Profile")}>RETURN TO PROFILE</Text>
            </View>
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
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    link: {
      margin: 4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#418FDE',
    },
  });