import { StyleSheet, Text, View, Pressable, Image, TextInput, ScrollView, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import * as ImagePicker from "expo-image-picker";

export const ProfileScreen = ( {navigation})  => {

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        photo: '',
        orderStatus: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    });

    const [discard, setDiscard] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const getProfileData = await AsyncStorage.getItem('profile');
                setProfile(JSON.parse(getProfileData));
                setDiscard(false);
            } catch(err) {
                console.error(err)
            }
        })();
    }, [discard]);

    const { updateUserInfo } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext);

    const updateProfile = ( key, value ) => {
        setProfile((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const selectImage = async () => {
        let selection = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if (!selection.canceled) {
            setProfile((prevState) => ({
                ...prevState,
                ['photo']: selection.assets[0].uri,
            }))
        }
    };

    const removeSelection = () => {
        setProfile((prevState) => ({
            ...prevState,
            ['photo']: ''
        }))
    }

  return (
    <>
      <View style={styles.profileHeader}>
        <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.buttonText}>←</Text>
        </Pressable>
        <Image
            style={styles.imageLogo}
            source={require('../images/Logo.png')}
            resizeMode='contain'
        />
         <View style={styles.avatarContainer}>
          {profile.photo ? (
            <Image source={{ uri: profile.photo }} style={styles.imageProfile} />
          ) : (
            <View style={styles.avatarEmptySmall}>
              <Text style={styles.avatarEmptySmallText}>
                {Array.from(profile.firstName)[0]}
                {Array.from(profile.lastName)[0]}
              </Text>
            </View>
          )}
      </View>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <ScrollView style={styles.profileBody}>

        <Text style={styles.bodyHeader}>Personal Information</Text>
        <Text style={styles.inputLabel}>Avatar</Text>
        <View style={styles.profilePicSettings}>
        <View style={styles.avatarContainer}>
          {profile.photo ? (
            <Image source={{ uri: profile.photo }} style={styles.imageProfileLarge} />
          ) : (
            <View style={styles.avatarEmptyLarge}>
              <Text style={styles.avatarEmptyLargeText}>
                {Array.from(profile.firstName)[0]}
                {Array.from(profile.lastName)[0]}
              </Text>
            </View>
          )}
          </View>
            <Pressable
                style={styles.changePFPButton}
                title='Pick an image from your Camera Roll'
                onPress={selectImage}>
                <Text style={styles.changePFPButtonText}>Change</Text>
            </Pressable>
            <Pressable
                style={styles.removePFPButton}
                title='Pick an image from your Camera Roll'
                onPress={removeSelection}>
                <Text style={styles.removePFPButtonText}>Remove</Text>
            </Pressable>
        </View>

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
            style={styles.inputBox}
            value={profile.firstName}
            onChangeText={(newValue) => updateProfile('firstName', newValue)}
            placeholder={'First Name'}
        />

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
            style={styles.inputBox}
            value={profile.lastName}
            onChangeText={(newValue) => updateProfile('lastName', newValue)}
            placeholder={'Last Name'}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
            style={styles.inputBox}
            value={profile.email}
            onChangeText={(newValue) => updateProfile('email', newValue)}
            placeholder='Email'
            keyboardType='email-address'
        />
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
            style={styles.inputBox}
            value={profile.phoneNumber}
            onChangeText={(newValue) => updateProfile('phoneNumber', newValue)}
            placeholder='Phone Number'
            keyboardType='phone-pad'
        />
        <Text style={styles.bodyHeader}>Email Notifiction Preferences</Text>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={(newValue) => updateProfile('orderStatus', newValue)}
                value={profile.orderStatus}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={profile.orderStatus ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Order Status</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={(newValue) => updateProfile('passwordChanges', newValue)}
                value={profile.passwordChanges}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={profile.passwordChanges ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Password Changes</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={(newValue) => updateProfile('specialOffers', newValue)}
                value={profile.specialOffers}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={profile.specialOffers ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Special Offers</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={(newValue) => updateProfile('newsletter', newValue)}
                value={profile.newsletter}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={profile.newsletter ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Newsletter</Text>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.profileFooter}>
        <Pressable
            style={styles.logoutButton}
            onPress={() => logoutUser()}>
            <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
        <View style={styles.changeButtons}>
            <Pressable
                style={styles.discardChanges}
                onPress={() => setDiscard(true)}>
                <Text style={styles.discardButtonText}>Discard Changes</Text>
            </Pressable>
            <Pressable
                style={styles.saveChanges}
                onPress={() => updateUserInfo(profile)}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFEE',
  },
    profileHeader: {
        flex: .15,
        width: 428,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
  },
    profilePicSettings: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
  },
    changePFPButton: {
        backgroundColor: '#495E57',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.25,
        borderRadius: 12,
        marginRight: 10,
    },
    changePFPButtonText: {
        color: "white",
        fontWeight: '700',
    },

    removePFPButton:{
        backgroundColor: '#EDEFEE',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.25,
        borderRadius: 4,
    },
    removePFPButtonText: {
        color: "gray",
        fontWeight: '700',
    },

    bodyHeader: {
        fontSize: 24,
        padding: 8,
    },
    profileBody: {
        flex: .6,
        border: 2,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: '#EDEFEE'
  },
    profileFooter: {
        flex: .25,
        alignItems: 'center'

  },
     button: {
        marginTop: 15,
        marginLeft: 20,
        width: 50,
        height: 50,
        backgroundColor: '#495E57',
        borderRadius: 50,
  },
    buttonText: {
       fontSize: 30,
       paddingTop: 7,
       paddingLeft: 12,
       color: 'white',
       justifyContent: 'center',
       alignItems: 'center',
    },
    imageLogo: {
       height: 80,
       width: 200,
     },
     imageProfile: {
        height: 60,
        width: 60,
        marginRight: 30,
        marginTop: 12,
        borderRadius: 60,
      },
      imageProfileLarge: {
        height: 80,
        width: 80,
        marginLeft: 10,
        marginRight: 14,
        marginTop: 12,
        borderRadius: 60,
      },

      inputBox: {
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 4,
        marginBottom: 14,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#164E12',
        backgroundColor: '#EDEFEE',
        borderRadius: 10,
        borderWidth: 1.25,
      },

      inputLabel: {
        fontSize: 16,
        padding: 4,
        marginTop: 2,
        marginLeft: 20

      },

      notificationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginTop:10,
        marginBottom: 10,
      },

      notificationSwitchDescription: {
        marginLeft: 20,
      },
      logoutButton: {
        width: 325,
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        backgroundColor: '#F4CE14',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      },
      logoutButtonText: {
        color: "black",
        fontWeight: '700',
      },
      changeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
      },
      discardChanges: {
        backgroundColor: '#EDEFEE',
        width: 140,
        marginLeft: 60,
        marginRight: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.25,
        borderRadius: 12,
      },
      discardButtonText: {
        color: "gray",
        fontWeight: '700',
      },
      saveChanges: {
        backgroundColor: '#495E57',
        width: 120,
        marginLeft: 10,
        marginRight: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.25,
        borderRadius: 12,
      },
      saveButtonText: {
        color: "white",
        fontWeight: '700',
      },

      avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      },

      avatarEmptyLarge: {
        height: 80,
        width: 80,
        marginLeft: 10,
        marginRight: 14,
        marginTop: 12,
        borderRadius: 60,
        backgroundColor: "#EE9972",
        alignItems: "center",
        justifyContent: "center",
      },
      avatarEmptySmall: {
        height: 60,
        width: 60,
        marginRight: 30,
        borderRadius: 60,
        backgroundColor: "#EE9972",
        alignItems: "center",
        justifyContent: "center",
      },
      avatarEmptySmallText: {
        fontSize: 20,
        color: "#FBDABB",
        fontWeight: "bold",
      },
      avatarEmptyLargeText: {
        fontSize: 32,
        color: "#FBDABB",
        fontWeight: "bold",
      },
    })


    