import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './LoginScreen';  // 确保路径和组件名称正确
import RegisterScreen from './RegisterScreen';  // 确保路径和组件名称正确

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="LoginScreen"> {/* 直接使用 Stack 作为路由管理器 */}
        <Stack.Screen 
          name="LoginScreen" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RegisterScreen" 
        />
      </Stack>
    </ThemeProvider>
  );
}
