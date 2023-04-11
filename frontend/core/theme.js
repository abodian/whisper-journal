import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#2C2C2C', // Dark gray
    primary: '#2D6A4F', // Forest green
    secondary: '#40916C', // Jade green
    error: '#E63946', // Reddish pink
    background: '#F8F9FA', // Light grayish background
    surface: '#F8F9FA', // Light grayish surface
  },
}
