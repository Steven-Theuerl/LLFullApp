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

    const AuthContext = React.createContext();
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
                        isOnboardingCompleted: false,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isOnboardingCompleted: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        //Fetch token from storage then navigate to our appropriate screen.
        const bootstrapAsync = async () => {
            let req;
            try {
                req = await SecureStore.multiGet(['userPrefName', 'userPrefEmail'])
            } catch (e) {
                //restoring token failed
            }
            // After restoring the token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this Loading screen will be unmounted and thrown away
            dispatch({ type: 'RESTORE_TOKEN', token: req});
    };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo (
        () => ({
                signIn: async () => {
                    //In a production app, we need to send some data (usually username and password) to server and get
                    //a token. We will also need to handle errors if sign in fails. After getting the token, we need to
                    //persist the token using 'SecureStore'. In this case we'll be using 'dummy-auth-token'
                    dispatch({ type: 'SIGN_IN', token: 'userPrefName'});
                },
                signOut: () => dispatch({ type: 'SIGN_OUT' }),
                signUp: async () => {
                    dispatch({ type: 'SIGN_IN', token: 'userPrefName' });
                },
                }),
            []
    );

    if (state.isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                <Stack.Navigator>
                    {state.isOnboardingCompleted ? (
                        // Onboarding completed, user is signed in
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                    ) : (
                        //User is NOT signed in
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                )}
                </Stack.Navigator>
            </AuthContext.Provider>
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