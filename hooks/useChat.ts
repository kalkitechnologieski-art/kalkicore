import { useState, useCallback } from 'react';
import { chatCompletion } from '@/lib/webllm/loader';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useChat(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const sendMessage = useCallback(
    async (prompt: string) => {
      const userMsg: Message = { id: Date.now().toString(), role: 'user', content: prompt };
      setMessages((prev) => [...prev, userMsg]);
      setIsGenerating(true);

      try {
        // Call the API
        const response = await fetch('/api/model/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, sessionId, useWebLLM: false }),
        });

        if (!response.body) throw new Error('No response body');

        // Read the first chunk to detect if it's JSON (WebLLM flag) or stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let firstChunk = '';
        let isWebLLMFlag = false;

        // Read first chunk
        const { value, done } = await reader.read();
        if (!done && value) {
          firstChunk = decoder.decode(value, { stream: true });
          // Check if it looks like JSON
          const trimmed = firstChunk.trim();
          if (trimmed.startsWith('{') && trimmed.includes('"type":"webllm"')) {
            isWebLLMFlag = true;
          }
        }

        if (isWebLLMFlag) {
          // Parse the JSON flag
          let jsonData = firstChunk;
          // Continue reading until we have complete JSON
          while (!jsonData.includes('}') && !done) {
            const next = await reader.read();
            if (next.done) break;
            jsonData += decoder.decode(next.value, { stream: true });
          }
          const data = JSON.parse(jsonData);
          if (data.type === 'webllm') {
            // Use WebLLM
            const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
            setMessages((prev) => [...prev, assistantMsg]);
            await chatCompletion(
              [
                { role: 'system', content: 'You are a helpful AI assistant.' },
                { role: 'user', content: prompt },
              ],
              (token) => {
                assistantMsg.content += token;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMsg.id ? { ...assistantMsg } : m))
                );
              }
            );
            setIsGenerating(false);
            return;
          }
        }

        // Otherwise, process as streaming tokens (SSE)
        // We already have the first chunk in the buffer, so we need to process it
        let assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMsg]);

        let buffer = firstChunk;
        // Continue reading the rest of the stream
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const payload = line.slice(6);
              if (payload === '[DONE]') continue;
              try {
                const parsed = JSON.parse(payload);
                const token = parsed.token || '';
                assistantMsg.content += token;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMsg.id ? { ...assistantMsg } : m))
                );
              } catch (_) { /* ignore */ }
            }
          }
        }
      } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: 'Sorry, an error occurred. Please try again later.',
          },
        ]);
      } finally {
        setIsGenerating(false);
      }
    },
    [sessionId]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isGenerating, clearMessages };
}
