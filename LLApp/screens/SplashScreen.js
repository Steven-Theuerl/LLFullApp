import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {

  return (
    <View style={styles.container}>
        <Text>Splash Screen</Text>
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
});