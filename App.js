import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import getTime from './helpers/getTime';
import { useFonts } from "expo-font";

export default function App() {

  useFonts({
    'outfit': require('./fonts/Outfit-Regular.ttf'),
    'outfit-light': require('./fonts/Outfit-Light.ttf'),
    'outfit-bold': require('./fonts/Outfit-Bold.ttf')
  })
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    const hour = new Date().getHours();
    const color = getTime(hour);
    setBackgroundColor(color);
}, []);

  return (
    <SafeAreaProvider>
      <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
        <StatusBar style="auto" />
        <Main/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
