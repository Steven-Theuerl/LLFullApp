import * as React from 'react';
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Onboarding from './screens/Onboarding';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';

export default function App({ navigation }) {


    const Stack = createNativeStackNavigator();

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN' :
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN' :
                    return {
                        ...prevState,
                        isOnboardingCompleted: true,
                        userToken: null,
                    };
                case 'SIGN_OUT' :
                    return {
                        ...prevState,
                        isOnboardingCompleted: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: false,
            isOnboardingCompleted: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
       ( async() => {
            try {
                const state = await AsyncStorage.multiGet(userSettings)
                if (userSettings !== null) {
                    dispatch({type: 'SIGN_IN'})
                } else {
                    dispatch({ type: 'RESTORE_TOKEN'})
            }
            } catch(e) { }
            })})



    if (state.isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
           
                <Stack.Navigator
                    >
                    {state.isOnboardingCompleted ? (
                        // Onboarding completed, user is signed in
                        <Stack.Screen  name="Profile" component={ProfileScreen} />
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