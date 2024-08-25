import { VARIANT_ASSETS } from '@/components/common/GlowingHeader/GlowingHeader.constants';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

const preloadImages = () => {
  const images = [
    VARIANT_ASSETS.white,
    VARIANT_ASSETS.red,
    VARIANT_ASSETS.yellow,
    VARIANT_ASSETS.teal,
  ];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image as any).downloadAsync();
  });

  return Promise.all(cacheImages);
};

export const usePreloadImages = () => {
  const [areImagesReady, setAreImagesReady] = useState(false);

  useEffect(() => {
    preloadImages().then(() => setAreImagesReady(true));
  }, []);

  return {
    areImagesReady,
  };
};
