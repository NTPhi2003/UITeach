import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Regular': require('../../assets/fonts/Inter_18pt-Regular.ttf'),
        'Inter-Medium': require('../../assets/fonts/Inter_18pt-Medium.ttf'),
        'Inter-SemiBold': require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
        'Inter-Bold': require('../../assets/fonts/Inter_18pt-Bold.ttf'),
        'Jua-Regular': require('../../assets/fonts/Jua-Regular.ttf'),
        'SourceSans3-Regular': require('../../assets/fonts/SourceSans3-Regular.ttf'),
        'SourceSans3-Medium': require('../../assets/fonts/SourceSans3-Medium.ttf'),
        'SourceSans3-SemiBold': require('../../assets/fonts/SourceSans3-SemiBold.ttf'),
        'SourceSans3-Bold': require('../../assets/fonts/SourceSans3-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return fontsLoaded;
} 