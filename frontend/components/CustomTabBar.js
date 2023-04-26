// // CustomTabBar.js
// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


// const CustomTabBar = ({ state, descriptors, navigation }) => {
//   return (
//     <View style={styles.container}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label = options.tabBarLabel;
//         const IconComponent = options.tabBarIcon;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           if (route.name !== 'Logout') {
//             navigation.navigate(route.name);
//           } else {
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'StartScreen' }],
//             });
//           }
//         };

//         return (
//           <TouchableOpacity
//             key={route.key}
//             onPress={onPress}
//             style={styles.tabButton}
//           >
//             {IconComponent && (
//               <IconComponent color={isFocused ? '#673ab7' : '#222'} size={24} />
//             )}
//             <Text style={styles.tabButtonText}>{label}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     height: 56,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabButtonText: {
//     fontSize: 12,
//     color: '#222',
//   },
// });

// export default CustomTabBar;
