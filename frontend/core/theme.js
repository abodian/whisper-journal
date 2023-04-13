import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#264653', // Dark gray
    primary: '#2A9D8F', // Forest green
    secondary: '#E9C46A', // Jade green
    error: '#F4A261', // Reddish pink
    background: '#E76F51', // Light grayish background
    surface: '#F8F9FA', // Light grayish surface
  },
}
