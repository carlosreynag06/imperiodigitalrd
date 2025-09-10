'use client'; 
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

type BotOrUser = { id: string; type: 'bot' | 'user'; text: string };
type Typing = { id: string; type: 'typing' };
type Message = BotOrUser | Typing;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: '¡Hola! Soy Atlas, tu arquitecto digital. Estoy aquí para ayudarte a construir el sistema web que tu negocio necesita. ¿Qué proyecto tienes en mente?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [inputValue]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: BotOrUser = { id: `${Date.now()}-user`, type: 'user', text: trimmed };
    const typingId = `${Date.now()}-typing`;

    const newMessages = [...messages, userMsg];

    setMessages([...newMessages, { id: typingId, type: 'typing' }]);
    setInputValue('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botReply: BotOrUser = { id: `${Date.now()}-bot`, type: 'bot', text: data.reply };
      setMessages(prev => [...prev.filter(m => m.id !== typingId), botReply]);
    } catch (error) {
      console.error('Failed to get bot reply:', error);
      const errorReply: BotOrUser = {
        id: `${Date.now()}-bot-error`,
        type: 'bot',
        text: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo más tarde.',
      };
      setMessages(prev => [...prev.filter(m => m.id !== typingId), errorReply]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {/* TOGGLE BUTTON + Tooltip */}
      <div className="relative inline-block group">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--color-carbon)] text-4xl shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        >
          {/* CORRECTED: Original robot emoji icon restored */}
          {isOpen ? <FaTimes className="text-[var(--color-brilliant-white)]" size={24} /> : <span>🤖</span>}
        </motion.button>
        {/* Tooltip bubble (single line, better proportions) */}
        <div
          className="pointer-events-none absolute right-[80px] top-1/2 -translate-y-1/2 bg-[var(--color-carbon)] text-[var(--color-brilliant-white)] text-sm font-medium px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap leading-none"
          aria-hidden="true"
        >
          ¿Tienes alguna pregunta?
        </div>
      </div>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="absolute bottom-[110%] right-0 z-50 w-[min(92vw,380px)] md:w-96"
          >
            <div className="rounded-2xl bg-[var(--color-cloud-gray)]/90 backdrop-blur-lg border border-[var(--color-feather-gray)] shadow-2xl overflow-hidden flex flex-col h-[60vh] max-h-[500px]">
              {/* Header */}
              <div className="relative p-4 border-b border-[var(--color-feather-gray)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-sunstone-orange)] flex items-center justify-center text-lg shadow">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="leading-tight">
                    <div className="font-serif text-[var(--color-carbon)] text-base font-semibold">Asistente Digital</div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      En línea
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-carbon)]/60 hover:text-[var(--color-carbon)] transition-colors p-2 rounded-md"
                  aria-label="Cerrar ventana de chat"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Message List */}
              <div ref={listRef} className="flex-grow overflow-y-auto px-3 py-4 space-y-3">
                {messages.map(msg => {
                  if (msg.type === 'typing') {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--color-feather-gray)] border border-[var(--color-carbon)]/5 shadow-sm">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-carbon)]/50 animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-[var(--color-carbon)]/50 animate-bounce" style={{ animationDelay: '0.12s' }} />
                            <span className="w-2 h-2 rounded-full bg-[var(--color-carbon)]/50 animate-bounce" style={{ animationDelay: '0.24s' }} />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isUser = (msg as BotOrUser).type === 'user';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[80%] leading-relaxed text-sm shadow-sm ${
                          isUser
                            ? 'bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] rounded-br-sm'
                            : 'bg-[var(--color-feather-gray)] text-[var(--color-carbon)] rounded-bl-sm border border-[var(--color-carbon)]/5'
                        }`}
                        dangerouslySetInnerHTML={{ __html: (msg as BotOrUser).text }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[var(--color-feather-gray)]">
                <div className="flex items-end gap-2 rounded-xl border border-[var(--color-carbon)]/10 bg-[var(--color-feather-gray)] focus-within:border-[var(--color-sunstone-orange)]/60 focus-within:ring-1 focus-within:ring-[var(--color-sunstone-orange)]/40 transition">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Escribe tu mensaje…"
                    className="flex-1 resize-none px-3 py-2 bg-transparent text-[var(--color-carbon)] placeholder-[var(--color-carbon)]/50 outline-none"
                    aria-label="Escribe tu mensaje"
                  />
                  <button
                    type="submit"
                    aria-label="Enviar mensaje"
                    disabled={!inputValue.trim()}
                    className="shrink-0 w-10 h-10 mr-1 mb-1 rounded-lg flex items-center justify-center bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] shadow transition hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <div className="mt-2 text-[11px] text-[var(--color-carbon)]/50 text-center">
                  Pulsa <span className="text-[var(--color-carbon)]/70 font-semibold">Enter</span> para enviar •{' '}
                  <span className="text-[var(--color-carbon)]/70 font-semibold">Shift+Enter</span> para saltar de línea
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
