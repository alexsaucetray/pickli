import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import type { PickliAnalysis } from '../types';
import { chatAboutProduct } from '../lib/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SUGGESTED = [
  'Is this safe for kids?',
  'Compare to a whole food alternative',
  'What ingredient concerns me most?',
  'Is this good for daily use?',
];

export default function ChatPanel({ analysis }: { analysis: PickliAnalysis }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatAboutProduct(analysis, [...messages, userMsg], text.trim());
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[60vh] -mx-5 -mt-4 animate-fade-in">
      {/* Chat header */}
      <div className="px-5 py-3 bg-pickle-50 border-b border-pickle-100 flex items-center gap-2">
        <div className="bg-pickle-400 p-1.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-pickle-800">Ask Pickli</p>
          <p className="text-[9px] text-pickle-500 font-medium">
            AI-powered nutrition Q&A about {analysis.productName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        {messages.length === 0 && (
          <div className="space-y-3 animate-fade-in-up">
            <p className="text-xs text-cream-400 text-center mb-4 font-medium">
              Ask anything about this product's nutrition or ingredients
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-left px-3 py-2.5 bg-white border border-cream-200 rounded-xl text-[11px] font-medium text-pickle-600 hover:bg-pickle-50 hover:border-pickle-200 active:scale-[0.97] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 animate-fade-in-up ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'ai' && (
              <div className="w-7 h-7 bg-pickle-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-pickle-500" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                m.role === 'user'
                  ? 'bg-pickle-400 text-white rounded-br-md'
                  : 'bg-white border border-cream-200 text-pickle-700 rounded-bl-md'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 bg-pickle-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 bg-pickle-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-pickle-500" />
            </div>
            <div className="bg-white border border-cream-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-pickle-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-pickle-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-pickle-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-cream-50 border-t border-cream-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this product..."
            className="flex-1 bg-white border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-medium text-pickle-700 placeholder:text-cream-400 focus:outline-none focus:border-pickle-300 focus:ring-2 focus:ring-pickle-100 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-pickle-400 text-white p-2.5 rounded-xl hover:bg-pickle-500 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
