import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';

export default function Onboarding(state) {

    const [name, nameChange] = useState('');
    const [email, emailChange] = useState('');

    const setUserInfo = async () => {
        const userName = ['userPrefName', name]
        const userEmail = ['userPrefEmail', email]
        try {
            await AsyncStorage.multiSet([userName, userEmail])
        } catch(e) {}
        alert('User info updated')
    } 

    cxInfo = []

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Image
                style={styles.image}
                source={require('../images/Logo.png')}
                resizeMode='contain'
            />
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.bodyHeader}>Let us get to know you</Text>
            <View>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.inputBox}
                    value={name}
                    onChangeText={(text) => nameChange(text)}
                    placeholder={'Name'}
                    keyboardType={'email-address'}
                />
            </View>
            <View>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={(text) => emailChange(text)}
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                />
            </View>
        </View>
        <View style={styles.footerContainer}>
            <Pressable style={styles.button}
                        onPress={() => setUserInfo()}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: .15,
    justifyContent: 'center'

  },

  bodyContainer: {
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyHeader: {
    fontSize: 30,
    marginBottom: 150,
    
  },

  image: {
    width: 350,
    height: 200,
    borderRadius: 20,
    marginLeft: 100,
    marginRight: 100,
},

inputBox: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#164E12',
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    borderWidth: 1.5,
  },

  inputLabel: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 135,
    marginRight: 135,
  },

button: {
    width: 140,
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    marginLeft: 168,
    marginBottom:  40,
    backgroundColor: '#164E12',
    borderWidth: 2,
    borderRadius: 16,
  },
  buttonText: {
    color: '#EDEFEE',
    textAlign: 'center',
    fontSize: 25,
  },
});