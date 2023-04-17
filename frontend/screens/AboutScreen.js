import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
  <View style={styles.container}>
    <Text style={{marginTop: 200}}>
      About Screen
    </Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  }
});
