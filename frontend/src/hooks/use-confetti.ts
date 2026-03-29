import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerSuccess = useCallback(() => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#22c55e', '#ff8800', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const triggerSmall = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#22c55e', '#ff8800']
    });
  }, []);

  return { triggerSuccess, triggerSmall };
}
