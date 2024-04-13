import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {

    const getData = async () => {
        try {
            const jsonState = await AsyncStorage.getItem('my-key');
            return jsonState != null ? JSON.parse(jsonState) : null;
        } catch (e) {
            //error reading value
        }
    }

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
      <View style={styles.profileBody}></View>
      <View style={styles.profileFooter}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
  },
    profileHeader: {
        flex: .15,
        backgroundColor: 'gray',
        width: 428,
        flexDirection: 'row',
        justifyContent: 'space-between',
  },
    profileBody: {
        flex: .6
  },
    profileFooter: {
        flex: .2
  },
     button: {
        marginTop: 60,
        marginLeft: 30,
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
       height: 175,
       width: 200,
     },
     imageProfile: {
        height: 60,
        width: 60,
        marginRight: 30,
        marginTop: 55,
        borderRadius: 60,
      },
});