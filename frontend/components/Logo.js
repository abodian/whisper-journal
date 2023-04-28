import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logo-quill.png')} style={styles.image} resizeMode="contain" />
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    marginBottom: 1,
  },
})
