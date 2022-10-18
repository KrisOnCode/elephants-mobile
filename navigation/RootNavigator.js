import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../hooks/useAuthContext';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function RootNavigator() {
  const { user } = useAuthContext()


  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}