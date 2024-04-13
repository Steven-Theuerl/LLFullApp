import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './screens/Onboarding';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';

export default function App() {

    const Stack = createNativeStackNavigator();

    const updateUserState = async (userState) => {
        try {
            const jsonState = JSON.stringify(userState)
            await AsyncStorage.setItem('my-key', jsonState);
        } catch (e) {
            // saving the error
        }
    }

    const userState = {
        isLoading: false,
        isOnboardingCompleted: false,
    }

    updateUserState(userState);

    const getData = async () => {
        try {
            const jsonState = await AsyncStorage.getItem('my-key');
            return jsonState != null ? JSON.parse(jsonState) : null;
        } catch (e) {
            //error reading value
        }
    };

    if (userState.isLoading) {
        return <ProfileScreen />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userState.isOnboardingCompleted ? (
                    // Onboarding completed, user is signed in
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                ) : (
                    //User is NOT signed in
                <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
