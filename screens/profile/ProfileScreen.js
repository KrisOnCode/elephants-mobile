import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'


export default function ProfileScreen({ navigation }){
  const { user } = useAuthContext()
  const theme = useTheme();
  const { document, error } = useDocument('users', user.uid)

        if (error) {
        return <Text>{error}</Text>
    }
        if (!document) {
        return <Text>Loading...</Text>
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
            >
              PROFILE
            </Text>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("EditProfile")}
              name="account-cog-outline"
              size={24}
              color="#ffffff"
            />
          </View>
          <Card mode="elevated" style={styles.profileCard}>
            <View style={styles.row}>
              <Avatar.Image size={72} source={{ uri: document.photoURL }} />
            </View>
            <Card.Content>
              <View style={styles.row}>
                <Paragraph style={styles.cardText}>{document.firstname} {document.lastname}</Paragraph>
              </View>
              <View style={styles.row}>
                <Title style={styles.cardText}>@{document.username}</Title>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.cardText}>Joined: {new Date(
                        document.joined.seconds * 1000
                      ).toLocaleDateString("en-US")}</Paragraph>
              </View>
              <View style={styles.row}>
              <Paragraph style={styles.cardText}>{document.city}, {document.st}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.cardText}>{document.bio}</Paragraph>
              </View>
            </Card.Content>
          </Card>
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
      margin: 1
    },
    profileCard: {
      backgroundColor: '#0C2340'
    },
    cardText: {
      color: '#ffffff'
    }
  });