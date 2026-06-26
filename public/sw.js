const CACHE_NAME = 'kalki-models-v2';
const MODEL_URL = 'https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf';
const WASM_URL = 'https://raw.githubusercontent.com/mlc-ai/web-llm/main/dist/libs/qwen-1.5b-q4f16_1-webgpu.wasm';

// List of assets to cache
const ASSETS = [
  MODEL_URL,
  WASM_URL,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching model assets');
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Only handle requests for the model or wasm
  if (url.includes('DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf') || url.includes('qwen-1.5b-q4f16_1-webgpu.wasm')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // If not in cache, fetch from network and cache it
        return fetch(event.request).then((response) => {
          // Cache the response for future use
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        });
      })
    );
  }
});
