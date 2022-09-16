import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import { HomeScreen } from './src/screens/HomeScreen'
import { useState } from 'react'
import { ThemeContext } from './src/contexts/themeContext.js'
import { store } from './src/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#ececea' },
  headerTitleStyle: { color: '#505050' },
  headerTintColor: { color: '#ececea' },
}

export default function App() {
  const [theme, setTheme] = useState('Light')

  const themeData = { theme, setTheme }

  const lightTheme = {
    colors: {
      background: '#f9fafe',
      card: '#ffffff',
      text: '#505050',
      dropdowntext: '#000000',
      border: '#8cbbf1',
      buttonDisabledBackground: '#ECECEA',
      buttonEnabledBackground: '#ffffff',
      iconDisabled: '#999999',
      shadow: '#000000',
      closeButton: '#EEEEEE',
    }
  }

  const darkTheme = {
    colors: {
      background: '#15202b',
      card: '#1e2732',
      border: '#8b98a5',
      text: '#fbfcf7',
      dropdowntext: '#ffffff',
      buttonDisabledBackground: '#0A1723',
      buttonEnabledBackground: '#252F3A',
      iconDisabled: '#9C9C94',
      shadow: '#000000',
      closeButton: '#999999',
    }
  }

  return (
    <ThemeContext.Provider value={themeData}>
      <Provider store={store}>
        <NavigationContainer theme={theme == 'Light' ? lightTheme : darkTheme}>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen name='Home' component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({

})
