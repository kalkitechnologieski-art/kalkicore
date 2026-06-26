import * as webllm from '@mlc-ai/web-llm';

export const MODEL_ID = 'DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M';

// Custom appConfig with correct GGUF URL and WASM library
const appConfig: webllm.AppConfig = {
  model_list: [
    {
      model_id: MODEL_ID,
      model: 'https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/main/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf',
      model_lib: 'https://raw.githubusercontent.com/mlc-ai/web-llm/main/dist/libs/qwen-1.5b-q4f16_1-webgpu.wasm',
    },
  ],
};

let engine: webllm.MLCEngine | null = null;
let progressCallbacks: ((progress: number, message: string) => void)[] = [];

export function onProgress(callback: (progress: number, message: string) => void) {
  progressCallbacks.push(callback);
  return () => {
    progressCallbacks = progressCallbacks.filter(cb => cb !== callback);
  };
}

function notifyProgress(progress: number, message: string) {
  progressCallbacks.forEach(cb => cb(progress, message));
}

export async function loadEngine(): Promise<webllm.MLCEngine> {
  if (engine) {
    // Simple ping to check if engine is alive
    try {
      await engine.chat.completions.create({
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 1,
        stream: false,
      });
      return engine;
    } catch {
      engine = null;
    }
  }

  notifyProgress(5, 'Initializing WebLLM...');

  const newEngine = new webllm.MLCEngine({
    appConfig,
    initProgressCallback: (report) => {
      // WebLLM gives progress as 0-1
      const progress = report.progress || 0;
      const pct = Math.min(5 + progress * 0.9, 95);
      notifyProgress(Math.round(pct), report.text);
    },
  });

  notifyProgress(10, 'Loading model weights...');
  await newEngine.reload(MODEL_ID);

  notifyProgress(98, 'Warming up...');
  engine = newEngine;

  notifyProgress(100, 'Ready');
  return engine;
}

export function getEngine() {
  return engine;
}

export async function chatCompletion(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  onToken?: (token: string) => void
): Promise<string> {
  const eng = await loadEngine();
  let fullText = '';

  const stream = await eng.chat.completions.create({
    messages,
    max_tokens: 1024,
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || '';
    fullText += delta;
    if (onToken) onToken(delta);
  }
  return fullText;
}
