import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import { Button } from '../components';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { projectFirestore, projectStorage } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'

export default function UploadAvatarScreen({ navigation }){
    const { user } = useAuthContext()
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

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
    <View style={styles.container}>
       <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>UPDATE PROFILE IMAGE</Text>
          </View>
          <View style={styles.row}>
            <Image style={styles.avatar} source={{ uri: user.photoURL }} />
          </View>
          <Button
              onPress={pickImage}
              backgroundColor='#418FDE'
              title='SELECT NEW IMAGE'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
          <View style={styles.imageContainer}>
              {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
          </View>
          <Button
              onPress={uploadImage}
              backgroundColor='#418FDE'
              title='UPLOAD NEW IMAGE'
              tileColor='#fff'
              titleSize={20}
              containerStyle={{
              marginBottom: 8
              }}/>
            <View style={styles.row}>
              <Text style={styles.link} onPress={() => navigation.navigate("Profile")}>RETURN TO PROFILE</Text>
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
      padding: 36,
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
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
  });