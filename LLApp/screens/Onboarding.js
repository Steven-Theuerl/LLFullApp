import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';

import {AuthContext} from "../contexts/AuthContext";



export const Onboarding = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');

    const { setUserInfo } =  useContext(AuthContext);

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
                    onChangeText={setName}
                    placeholder={'Name'}
                    keyboardType={'email-address'}
                />
            </View>
            <View>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                />
            </View>
        </View>
        <View style={styles.footerContainer}>
            <Pressable style={styles.button}
                        onPress={() => setUserInfo({ name, email })}>
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