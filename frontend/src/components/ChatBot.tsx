import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatBotProps {
  initialMessage?: string;
}

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hindi') || lower.includes('translate')) {
    return `अनुवाद: "${input.replace(/hindi|translate/gi, '').trim()}" (यह हिंदी में है)`;
  }
  if (lower.includes('summarize') || lower.includes('summary')) {
    return `Here's a summary: "${input.replace(/summarize|summary/gi, '').trim()}" refers to an important topic currently in the news.`;
  }
  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! I am Khabrilal, your AI news assistant. Ask me to translate, explain, or summarize any news topic!';
  }
  return `Let me explain: "${input}" — This is a topic making headlines. I can translate, summarize, or provide deeper insight on any topic. Try asking "explain in Hindi" or "summarize this"!`;
}

export default function ChatBot({ initialMessage }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi! I am Khabrilal 🤖 I can translate or explain news in any language. Type below 👇' },
  ]);
  const [input, setInput] = useState(initialMessage || '');
  const [position, setPosition] = useState({ bottom: 150, right: 20 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, bottom: 0, right: 0 });
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const botMsg: Message = { sender: 'bot', text: getResponse(text) };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      bottom: position.bottom,
      right: position.right,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = dragStart.current.x - e.clientX;
      const dy = dragStart.current.y - e.clientY;
      setPosition({
        right: Math.max(0, dragStart.current.right + dx),
        bottom: Math.max(80, dragStart.current.bottom + dy),
      });
    };
    const handleMouseUp = () => { isDragging.current = false; };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-40 flex flex-col rounded-xl overflow-hidden shadow-xl"
          style={{
            bottom: position.bottom + 70,
            right: position.right,
            width: '300px',
            backgroundColor: '#1f1f1f',
            border: '1px solid #333',
          }}
        >
          <div
            className="flex items-center justify-between px-3 py-2 font-bold"
            style={{ backgroundColor: '#ff3c3c' }}
          >
            <span>🤖 Khabrilal</span>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none text-white cursor-pointer text-lg leading-none"
            >
              ×
            </button>
          </div>
          <div
            ref={chatBodyRef}
            className="p-3 overflow-y-auto text-sm"
            style={{ height: '200px', color: '#ddd' }}
          >
            {messages.map((msg, i) => (
              <p key={i} className="mb-2">
                <strong style={{ color: msg.sender === 'bot' ? '#ff3c3c' : '#00bfff' }}>
                  {msg.sender === 'bot' ? 'Khabrilal' : 'You'}:
                </strong>{' '}
                {msg.text}
              </p>
            ))}
          </div>
          <div className="flex" style={{ borderTop: '1px solid #333' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 p-2 text-sm border-none outline-none"
              style={{ backgroundColor: '#222', color: 'white' }}
            />
            <button
              onClick={sendMessage}
              className="px-3 text-white border-none cursor-pointer text-sm"
              style={{ backgroundColor: '#ff3c3c' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Draggable Icon */}
      <div
        onMouseDown={handleMouseDown}
        onClick={() => { if (!isDragging.current) setIsOpen((o) => !o); }}
        className="fixed z-50 flex items-center justify-center rounded-full text-white text-2xl cursor-grab select-none shadow-lg"
        style={{
          bottom: position.bottom,
          right: position.right,
          width: '60px',
          height: '60px',
          backgroundColor: '#ff3c3c',
        }}
        title="Khabrilal AI"
      >
        🤖
      </div>
    </>
  );
}
