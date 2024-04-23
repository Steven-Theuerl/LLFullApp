import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useReducer, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

import { Onboarding } from './screens/Onboarding';
import { ProfileScreen } from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from "./contexts/AuthContext";


const Stack = createNativeStackNavigator();

export default function App({ navigation }) {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'ONBOARDING' :
                    return {
                        ...prevState,
                        isLoading: false,
                        isOnboardingCompleted: action.isOnboardingCompleted,
                    };
            }
        },
        {
            isLoading: true,
            isOnboardingCompleted: false,
        }
    );

    useEffect(() => {
       (async() => {
        let profileInfo = [];
            try {
                const userSettings = await AsyncStorage.getItem( 'profile' );
                if (userSettings !== null) {
                    profileInfo = userSettings;
                }
            } catch (err) {
                console.error(err)
                } finally {
                    if (Object.keys(profileInfo).length != 0) {
                        dispatch({ type: 'ONBOARDING', isOnboardingCompleted: true });
                    } else {
                        dispatch({ type: 'ONBOARDING', isOnboardingCompleted: false });
                    }
                }
        })();
    }, []);

            const authContext = useMemo(
                () => ({
                    setUserInfo: async ( data ) => {
                        try {
                            const jsonValue = JSON.stringify( data );
                            await AsyncStorage.setItem( 'profile', jsonValue );
                        } catch (err) {
                        console.error(err)
                        }
                        dispatch({ type: 'ONBOARDING', isOnboardingCompleted: true })
                    },
                    updateUserInfo: async ( data ) => {
                        try {
                            const jsonValue = JSON.stringify(data);
                            await AsyncStorage.setItem( 'profile', jsonValue )
                        } catch(err) {
                            alert(err)
                        }
                        Alert.alert('Changes saved!');
                    },
                    logoutUser: async () => {
                        try {
                            await AsyncStorage.clear();
                        } catch(err) {
                        Alert.alert(err)
                        }
                        dispatch({ type: 'ONBOARDING', isOnboardingCompleted: false })
                    },
                }),
                []
            );

    if (state.isLoading) {
        return <SplashScreen />
    }

    return (
        <AuthContext.Provider value={authContext}>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    >
                    {state.isOnboardingCompleted ? (
                        <>
                        <Stack.Screen
                            name='HomeScreen'
                            component={ HomeScreen }
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name='ProfileScreen'
                            component={ ProfileScreen }
                            options={{headerShown: false}}
                        />
                        </>
                    ) : (
                    <Stack.Screen
                        name='Onboarding'
                        component={ Onboarding }
                        options={{ headerShown: false}}
                    />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};