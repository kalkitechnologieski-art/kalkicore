import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useChat(sessionId: string, botType: 'support' | 'kibot' = 'kibot') {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const sendMessage = useCallback(async (prompt: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/model/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, sessionId, botType }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Request failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMsg]);

      let buffer = '';
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
              if (token) {
                assistantMsg.content += token;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMsg.id ? { ...assistantMsg } : m))
                );
              }
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
  }, [sessionId, botType]);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isGenerating, clearMessages };
}
