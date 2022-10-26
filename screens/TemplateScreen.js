import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';
export default function TemplateScreen({ navigation }){
  const theme = useTheme();
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
            >Screen Header</Text>
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
  });