import { useLogout } from '../hooks/useLogout'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components';
import { StatusBar } from 'expo-status-bar';


export default function DeleteConfirmScreen({ navigation }){
    const { logout } = useLogout()
    
    return (
        <View style={styles.container}>
          <StatusBar style="light" />
          <Text style={styles.header}>Your EllaLift account has successfully been deleted.</Text>
          <Button
        onPress={logout}
        backgroundColor='#C8102E'
        title='EXIT APP'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
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