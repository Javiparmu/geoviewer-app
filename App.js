import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import { useState } from 'react'
import { ThemeContext } from './contexts/themeContext.js'

const Stack = createNativeStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#ececea' },
  headerTitleStyle: { color: '#505050' },
  headerTintColor: { color: '#ececea' },
}

export default function App() {
  const [theme, setTheme] = useState('Light');

  const themeData = { theme, setTheme };

  const lightTheme = {
    colors: {
      background: '#f9fafe',
      card: '#ffffff',
      text: '#505050',
      border: '#8cbbf1',
    }
  }

  const darkTheme = {
    colors: {
      background: '#15202b',
      card: '#1e2732',
      border: '#8b98a5',
      text: '#fbfcf7',
    }
  }

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme == 'Light' ? lightTheme : darkTheme}>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({

})
