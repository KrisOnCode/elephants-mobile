import { useTheme } from 'react-native-paper';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'
import { useLoad } from '../../hooks/useLoad'
import { StyleSheet, View } from 'react-native';
import { Text, Avatar, Surface, Paragraph, Title, Chip } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ProfileScreen({ navigation }){
  const theme = useTheme();
  const { user } = useAuthContext()
  const { document, error } = useDocument('users', user.uid)
  const { load, loadError } = useLoad('loads', user.uid)
        
  if (error) {
        return <Text>{error}</Text>
    }
        if (!document) {
        return <Text>Loading...</Text>
     }
  
     if (loadError) {
      return <Text>{loadError}</Text>
  }
      if (!load) {
      return <Text>Loading...</Text>
   }
  
  // Stats Math
  const elephant = 6000
  // Week
  const loadWeek = load.Oct242022 + load.Oct252022 + load.Oct262022 + load.Oct272022 + load.Oct282022 + load.Oct292022 + load.Oct302022
  const octoberLoad = load.Oct242022 + load.Oct252022 + load.Oct262022 + load.Oct272022 + load.Oct282022 + load.Oct292022 + load.Oct302022 + load.Oct312022
  const yearLoad = octoberLoad


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
          <View style={styles.row}>
            <Surface style={styles.surface} elevation={4}>
              <View style={styles.row}>
                <Avatar.Image size={72} source={{ uri: document.photoURL }} />
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.cardText}>{document.firstname} {document.lastname}</Paragraph>
              </View>
              <View style={styles.profileRow}>
                <Title style={styles.cardText}>@{document.username}</Title>
              </View>
              <View style={styles.profileRow}>
                <Paragraph style={styles.cardText}>Joined: {new Date(
                        document.joined.seconds * 1000
                      ).toLocaleDateString("en-US")}</Paragraph>
              </View>
              <View style={styles.profileRow}>
              <Paragraph style={styles.cardText}>{document.city}, {document.st}</Paragraph>
              </View>
              <View style={styles.profileRow}>
                <Paragraph style={styles.cardText}>{document.bio}</Paragraph>
              </View>
            </Surface>
          </View>
          <Text
              style={{
                color: theme.colors.textColor,
                paddingBottom: 12,
                paddingTop: 12,
              }}
              variant="titleMedium"
            >
              Elephants Lifted
            </Text>
            <View style={styles.statsRow}>
              {/* Lifetime Chip */}
              <Chip style={styles.statsChip}>
              <Text style={{
                  color: theme.colors.textColor,
                }}
                variant="bodySmall">
                  <MaterialCommunityIcons name="elephant" size={12} color="white" />{" "}
                  Since Joining {(document.lifetimeLoad / elephant).toFixed(1)}
                  </Text>
              </Chip>
              {/* Yaer Chip */}
              <Chip style={styles.statsChip}>
              <Text style={{
                  color: theme.colors.textColor,
                }}
                variant="bodySmall">
                  <MaterialCommunityIcons name="calendar" size={12} color="white" />{" "}
                  This Year {(yearLoad / elephant).toFixed(1)}
              </Text>
              </Chip>
            </View>
            <View style={styles.statsRow}>
              {/* Month Chip */}
              <Chip style={styles.statsChip}>
              <Text style={{
                  color: theme.colors.textColor,
                }}
                variant="bodySmall">
                  <MaterialCommunityIcons name="pumpkin" size={12} color="white" />{" "}
                  This Month {(octoberLoad / elephant).toFixed(1)}
              </Text>
              </Chip>
              <Chip style={styles.statsChip}>
              <Text style={{
                  color: theme.colors.textColor,
                }}
                variant="bodySmall">
                  <MaterialCommunityIcons name="calendar-week" size={12} color="white" />{" "}
                  This Week {(loadWeek / elephant).toFixed(1)}
              </Text>
              </Chip>
            </View>
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
    surface: {
      padding: 16,
      height: 280,
      width: 280,
      alignItems: 'center',
      backgroundColor: '#54585A',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    cardText: {
      color: '#ffffff'
    },
    profileRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    statsChip: {
      height: 40,
      width: 160,
      backgroundColor: '#54585A',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 2,
    }
  });