// WebLLM loader – currently disabled to focus on cloud APIs
export const MODEL_ID = 'webllm-disabled';

export function onProgress(callback: (progress: number, message: string) => void) {
  return () => {};
}

export async function loadEngine() {
  throw new Error('WebLLM is temporarily disabled. Using cloud providers.');
}

export async function chatCompletion(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  onToken?: (token: string) => void
): Promise<string> {
  throw new Error('WebLLM is temporarily disabled. Using cloud providers.');
}
