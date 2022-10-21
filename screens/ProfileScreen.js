import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthContext } from '../hooks/useAuthContext'
import { useDocument } from '../hooks/useDocument'

export default function ProfileScreen({ navigation }){
  const { user } = useAuthContext()
  const { document, error } = useDocument('users', user.uid)

        if (error) {
        return <Text>{error}</Text>
    }
        if (!document) {
        return <Text>Loading...</Text>
     }

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>PROFILE</Text>
            <MaterialCommunityIcons onPress={() => navigation.navigate("EditProfile")}  name="account-cog-outline" size={36} color="#ffffff" />
          </View>
          <View style={styles.profileCard}>
          <Image style={styles.avatar} source={{ uri: document.photoURL }} /> 
          <Text style={styles.name}>{document.firstname} {document.lastname}</Text>
          <Text style={styles.details}>@{document.username}</Text>
          <Text style={styles.details}>Joined: {new Date(
                        document.joined.seconds * 1000
                      ).toLocaleDateString("en-US")}</Text>
          <Text style={styles.details}>{document.city}, {document.st}</Text>
          <Text style={styles.details}>{document.bio}</Text>
          </View>
          
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <AntDesign
              onPress={() => navigation.navigate("Home")}
              name="home"
              size={36}
              color="#A2AAAD"
            />
            <AntDesign
              onPress={() => navigation.navigate("Profile")}
              name="user"
              size={36}
              color="#A2AAAD"
            />
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
    footer: {
      backgroundColor: "#0C2340",
      padding: 12,
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 8
    },
    header: {
      margin: 4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#ffffff',
    },
    avatar: {
      height: 72,
      width: 72,
      borderRadius: 72/2
    },
    name: {
      margin: 4,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      color: '#ffffff'
    },
    details: {
      margin: 2,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      color: '#ffffff'
    },
    profileCard: {
      borderBottomWidth: .5,
      borderBottomColor: '#ffffff',
      padding: 8,
    }
  });