import { LiquidBackground } from '@/components/LiquidBackground';
import { useEffect } from 'react';

export function initBackground() {
  const container = document.getElementById('liquid-background');
  if (container) {
    const background = new LiquidBackground(container);
    
    // Optional: cleanup pada saat unmount
    return () => background.dispose();
  }
}

export function useInitBackground() {
  useEffect(() => {
    const cleanup = initBackground();
    return cleanup;
  }, []);
} 