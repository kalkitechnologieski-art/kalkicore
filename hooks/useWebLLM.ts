import { useState, useEffect } from 'react';
import { loadEngine, onProgress, MODEL_ID } from '@/lib/webllm/loader';

export function useWebLLM() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const unsubscribe = onProgress((pct, msg) => {
      setProgress(Math.round(pct));
      setStatus(msg);
      if (pct >= 100) setIsLoaded(true);
    });

    // Start loading in background
    const init = async () => {
      try {
        await loadEngine();
      } catch (err) {
        console.error('WebLLM load error:', err);
        setStatus('Failed to load WebLLM');
      }
    };
    init();

    return () => unsubscribe();
  }, []);

  return { isLoaded, progress, status, modelName: MODEL_ID };
}
