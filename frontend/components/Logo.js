import React from 'react';
import { StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import logoSvg from '../assets/logo_quill.svg';

export default function Logo() {
  return <SvgUri source={logoSvg} style={styles.svg} />;
}

const styles = StyleSheet.create({
  svg: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
