import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar, useColorScheme } from 'react-native';
import Navigator from './src/navigation/Navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  LogBox.ignoreAllLogs();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
