import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import { StackNavigator } from 'react-navigation'

import Home from './containers/Home'
import Details from './containers/Details'

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text> */}
//         <Home/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const App = StackNavigator({
  Home: { screen: Home },
  Details: { screen: Details }
},{
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'rgb(77, 217, 148)',
    },
    headerTintColor: 'white'
  }
})

export default App

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated and will be removed in the next major version.',
  'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version.',
]);
