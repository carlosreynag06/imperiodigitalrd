// components/ChatbotWidget.tsx
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
    // This wrapper participates in the parent's flex column and spacing.
    <div className="relative">
      {/* TOGGLE BUTTON (no fixed positioning here) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-full shadow-lg flex items-center justify-center text-4xl cursor-pointer bg-imperial-void border-2 border-cyber-flare text-liquid-gold"
        whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(0, 229, 255, 0.7)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? <FaTimes className="text-stark-white text-3xl" /> : <span>🤖</span>}
      </motion.button>

      {/* PANEL (positioned above the button, relative to this wrapper) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="absolute bottom-20 right-0 z-50 w-[min(92vw,380px)] md:w-96"
          >
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-cyber-flare/70 via-blue-500/50 to-transparent shadow-2xl">
              <div className="rounded-2xl bg-imperial-void/90 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col">
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyber-flare/70 to-blue-500/70 flex items-center justify-center text-imperial-void text-lg shadow">
                        🤖
                      </div>
                      <div className="leading-tight">
                        <div className="font-playfair text-stark-white text-base font-semibold">Asistente Digital</div>
                        <div className="flex items-center gap-1 text-xs text-stark-white/70">
                          <span className="inline-block w-2 h-2 rounded-full bg-success-green"></span>
                          En línea
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-stark-white/70 hover:text-stark-white transition-colors p-2 rounded-md hover:bg-stark-white/5"
                      aria-label="Cerrar ventana de chat"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div
                  ref={listRef}
                  className="max-h-[420px] overflow-y-auto px-3 py-4 space-y-3 bg-atmospheric-gray/20"
                >
                  {messages.map(msg => {
                    if (msg.type === 'typing') {
                      return (
                        <div key={msg.id} className="flex justify-start">
                          <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-atmospheric-gray/60 border border-white/10 shadow-sm">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-stark-white/70 animate-bounce" />
                              <span
                                className="w-2 h-2 rounded-full bg-stark-white/70 animate-bounce"
                                style={{ animationDelay: '0.12s' }}
                              />
                              <span
                                className="w-2 h-2 rounded-full bg-stark-white/70 animate-bounce"
                                style={{ animationDelay: '0.24s' }}
                              />
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
                          className={[
                            'px-4 py-3 rounded-2xl max-w-[80%] leading-relaxed text-sm shadow',
                            isUser
                              ? 'bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void rounded-br-sm'
                              : 'bg-atmospheric-gray/60 text-stark-white rounded-tl-sm border border-white/10',
                          ].join(' ')}
                          dangerouslySetInnerHTML={{
                            __html: (msg as BotOrUser).text,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 bg-imperial-void/60 border-t border-white/10">
                  <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-atmospheric-gray/40 focus-within:border-cyber-flare/60 focus-within:ring-1 focus-within:ring-cyber-flare/40 transition">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Escribe tu mensaje…"
                      className="flex-1 resize-none px-3 py-2 bg-transparent text-stark-white placeholder-stark-white/50 outline-none"
                      aria-label="Escribe tu mensaje"
                    />
                    <button
                      type="submit"
                      aria-label="Enviar mensaje"
                      disabled={!inputValue.trim()}
                      className={[
                        'shrink-0 w-10 h-10 mr-1 mb-1 rounded-lg flex items-center justify-center',
                        'bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void',
                        'shadow hover:opacity-95 transition disabled:opacity-40 disabled:pointer-events-none',
                      ].join(' ')}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-stark-white/50 text-center">
                    Pulsa <span className="text-stark-white/70">Enter</span> para enviar •{' '}
                    <span className="text-stark-white/70">Shift+Enter</span> para saltar de línea
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
