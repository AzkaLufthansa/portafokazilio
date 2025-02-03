import { LiquidBackground } from '@/components/LiquidBackground';
import { useEffect } from 'react';

export function initBackground(onReady?: () => void) {
  const container = document.getElementById('liquid-background');
  if (container) {
    const background = new LiquidBackground(container);
    
    // Tunggu satu frame untuk memastikan renderer sudah siap
    requestAnimationFrame(() => {
      onReady?.();
    });
    
    return () => background.dispose();
  }
}

export function useInitBackground(onReady?: () => void) {
  useEffect(() => {
    const cleanup = initBackground(onReady);
    return cleanup;
  }, [onReady]);
} 