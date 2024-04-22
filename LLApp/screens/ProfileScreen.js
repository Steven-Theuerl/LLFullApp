import { StyleSheet, Text, View, Pressable, Image, TextInput, ScrollView, Switch } from 'react-native';
import { useState } from 'react';



export default function ProfileScreen() {
    const [orderStatus, setOrderStatus] = useState(false)
    const toggleOrderStatus = () => setOrderStatus(previousState => !previousState)

    const [passwordChanges, setPasswordChanges] = useState(false)
    const togglePasswordChanges = () => setPasswordChanges(previousState => !previousState)

    const [specialOffers, setSpecialOffers] = useState(false)
    const toggleSpecialOffers = () => setSpecialOffers(previousState => !previousState)

    const [newsletter, setNewsletter] = useState(false)
    const toggleNewsletter = () => setNewsletter(previousState => !previousState)




  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>←</Text>
        </Pressable>
        <Image
            style={styles.imageLogo}
            source={require('../images/Logo.png')}
            resizeMode='contain'
        />
         <Image
            style={styles.imageProfile}
            source={require('../images/Profile.png')}
            resizeMode='stretch'
        />
      </View>
      <ScrollView style={styles.profileBody}>


        <Text style={styles.bodyHeader}>Personal Information</Text>
        <Text style={styles.inputLabel}>Avatar</Text>
        <View style={styles.profilePicSettings}>
            <Image
            style={styles.imageProfileLarge}
            source={require('../images/Profile.png')}
            resizeMode='stretch'/>
            <Pressable style={styles.changePFPButton}>
                <Text style={styles.changePFPButtonText}>Change</Text>
            </Pressable>
            <Pressable style={styles.removePFPButton}>
                <Text style={styles.removePFPButtonText}>Remove</Text>
            </Pressable>
        </View>

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.inputBox}>Sandra</TextInput>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.inputBox}>Sansa</TextInput>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.inputBox}>sandrasansa@somethingorother.com</TextInput>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput style={styles.inputBox}>(202) 358-0001</TextInput>




        <Text style={styles.bodyHeader}>Email Notifiction Preferences</Text>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={toggleOrderStatus}
                value={orderStatus}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={orderStatus ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Order Status</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={togglePasswordChanges}
                value={passwordChanges}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={passwordChanges ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Password Changes</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={toggleSpecialOffers}
                value={specialOffers}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={specialOffers ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Special Offers</Text>
        </View>
        <View style={styles.notificationOption}>
            <Switch
                onValueChange={toggleNewsletter}
                value={newsletter}
                trackColor={{false: '#767577', true: '#495E57'}}
                thumbColor={newsletter ? '#F4CE14' : '#f4f3f4'}
            />
            <Text style={styles.notificationSwitchDescription}>Newsletter</Text>
        </View>
        
        



      </ScrollView>
      <View style={styles.profileFooter}>
        <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
        <View style={styles.changeButtons}>
            <Pressable style={styles.discardChanges}>
                <Text style={styles.discardButtonText}>Discard Changes</Text>
            </Pressable>
            <Pressable style={styles.saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
        </View>
      </View>
    </View>
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
        height: 100,
        width: 100,
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
    })