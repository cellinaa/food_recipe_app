import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import Navigation from './src/navigation/Navigation';
import { COLORS } from './src/constants';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  // Load custom fonts
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGreen} />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
