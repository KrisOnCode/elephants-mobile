import { useTheme } from 'react-native-paper';
import { useAuthContext } from '../hooks/useAuthContext'
import { projectFirestore, timestamp } from '../firebase/config'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCollection } from '../hooks/useCollection'


export default function HomeScreen({ navigation }){
  const { user } = useAuthContext()
  const theme = useTheme();
  const { documents, error } = useCollection('workouts')

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const workout = {
      createdBy: user.uid,
      createdAt: timestamp.fromDate(new Date()),
      sessionLoad: 0,
      elephants: 0,
      lifts: [],
    }

    const {id} = await projectFirestore.collection("workouts").add(workout)
    console.log(id)
    navigation.navigate('Session', {
      id: id,
    });
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
            >Your Workouts</Text>
          </View>
          <Text
              style={{
                color: theme.colors.textColor,
                alignSelf: "center",
                paddingBottom: 12,
                paddingTop: 12,
              }}
              variant="titleSmall"
            >Start Today's Workout</Text>
          <View style={styles.row}>
            <MaterialCommunityIcons
              onPress={handleSubmit}
              name="plus-circle"
              size={48}
              color="white"
            />
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.listContainer}>
            {documents && documents
              .filter((document) => document.createdBy === user.uid)
              .map((document) => {
                return (
                  <View key={document.id} style={styles.list}>
                   <Surface style={styles.surface} elevation={4}>
                   <Text style={styles.listItem}>Session Date:</Text>
                      <Text style={styles.listItem}>{new Date(
                        document.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US")}</Text>
                      <Text style={styles.listItem}>Session Load:</Text>
                      <Text style={styles.listItem}>{document.sessionLoad} lbs</Text>
                      <Text style={styles.listItem}>{document.elephants}{" "}<MaterialCommunityIcons
                        name="elephant"
                        size={16}
                        color="white"
                      />{" "}lifted</Text>
                  </Surface>
                  </View>
                );
              })}
              </View>
          </ScrollView>
        </View>
       
        <View style={styles.footer}>
          <View style={styles.row}>
            <AntDesign
              onPress={() => navigation.navigate("Home")}
              name="home"
              size={24}
              color="#A2AAAD"
            />
          
            <AntDesign
              onPress={() => navigation.navigate("Profile")}
              name="user"
              size={24}
              color="#A2AAAD"
            />
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 16,
    },
    footer: {
      backgroundColor: "#0C2340",
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 4
    },
    scrollView: {
      marginHorizontal: 2,
    },
    list: {
      marginBottom: 8,
      marginTop: 8,
    },
    listContainer: {
      alignItems: 'center'
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
    listItem: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'bold',
      margin: 1,
    },
    surface: {
      padding: 8,
      height: 120,
      width: 120,
      borderRadius: 120/2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#418FDE',
    },

  });
  