import { useLogout } from '../../hooks/useLogout'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components';
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
      header: {
        margin: 4,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
      },
    });