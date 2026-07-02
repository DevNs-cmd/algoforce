import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaBuilding, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ChatBotButton.css';

const SUGGESTIONS = [
  { text: 'Book Free AI Audit', intent: 'audit' },
  { text: 'What services do you offer?', intent: 'services' },
  { text: 'Tally & CRM Integrations', intent: 'integration' },
  { text: 'Data Privacy & Security', intent: 'privacy' },
  { text: 'Office Address & MSME', intent: 'location' },
];

const getBotResponse = (input) => {
  const query = input.toLowerCase();

  if (query.includes('audit') || query.includes('consult') || query.includes('book') || query.includes('schedule') || query.includes('call') || query.includes('meeting')) {
    return `We offer a complimentary 30-Minute AI Readiness Audit & Consultation. During this session, our founder Dev N Suman evaluates your workflows, identifies manual process bottlenecks, and estimates implementation ROI. 
    
    You can book this directly by visiting our Contact page, or email us at contact@algoforceai.com.`;
  }

  if (query.includes('service') || query.includes('what do you') || query.includes('offer') || query.includes('system') || query.includes('product') || query.includes('build')) {
    return `AlgoForce AI delivers premium enterprise AI systems, process automation, and custom software. Our 13 core portfolios include:
    • Custom AI Agents & Internal Assistants (RAG)
    • CRM/ERP Automations (Salesforce, Zoho, SAP, Tally Prime)
    • WhatsApp Business Cloud API Integrations
    • Real-Time Analytics & Reporting Dashboards
    • Custom Database Software & Digital Transformation
    
    You can filter and view them all with Problem/Solution/ROI breakdowns on our /services page.`;
  }

  if (query.includes('tally') || query.includes('crm') || query.includes('erp') || query.includes('sap') || query.includes('zoho') || query.includes('salesforce') || query.includes('integration')) {
    return `We specialize in linking models and automated pipelines to your existing business systems (Tally, Zoho CRM, Salesforce, SAP). 
    
    For example, we frequently automate syncing Shopify orders to Tally Prime or routing WhatsApp sales enquiries directly to custom CRM boards. We build these without replacing your current software.`;
  }

  if (query.includes('privacy') || query.includes('data') || query.includes('secure') || query.includes('leak') || query.includes('cloud') || query.includes('aws') || query.includes('azure')) {
    return `Data privacy is central to our engineering model. We prevent leaks by deploying secure, self-hosted LLMs on your private cloud VPCs (AWS, Azure, Google Cloud). 
    
    Under our AI Policy, your proprietary database and business memory are never used to train public LLM models.`;
  }

  if (query.includes('address') || query.includes('location') || query.includes('delhi') || query.includes('office') || query.includes('where') || query.includes('phone') || query.includes('contact')) {
    return `Our registered headquarters is located at South East Delhi, Kalkaji, New Delhi – 110019, India.
    
    • Official Phone: +918448947436
    • Official Email: contact@algoforceai.com
    • Operating Hour: Monday to Friday (9 AM - 6 PM IST)`;
  }

  if (query.includes('founder') || query.includes('ceo') || query.includes('dev') || query.includes('who is') || query.includes('suman')) {
    return `AlgoForce AI was founded by Dev N Suman in June 2026. Dev is an enterprise systems architect, SaaS copywriter, and performance engineer based in New Delhi. You can read about his story on our /founder page.`;
  }

  if (query.includes('msme') || query.includes('registration') || query.includes('udyam') || query.includes('gst')) {
    return `AlgoForce AI is a registered MSME unit under the Government of India. 
    • MSME registration ID: UDYAM-DL-08-0122150.`;
  }

  if (query.includes('price') || query.includes('cost') || query.includes('quote') || query.includes('free')) {
    return `Our initial AI Readiness Audits and Strategy Consultations are 100% free of charge. 
    
    Custom software integration, automation flow setups, and custom AI systems are priced on a milestone basis depending on complexity. We structure clear ROI estimates before any development begins.`;
  }

  if (query.includes('labs') || query.includes('crucible') || query.includes('talent') || query.includes('startup')) {
    return `Our ecosystem supports two secondary divisions:
    • AlgoForce Labs: Our Talent Development Division training developers to maintain custom enterprise integrations.
    • Crucible: Our Startup Incubation Platform helping early-stage founders validate ideas and build functional MVPs.`;
  }

  return `Hello! I can guide you on how we help businesses automate operations and deploy custom AI integrations. 

  Would you like to learn about:
  1. Booking a Free AI Readiness Audit
  2. Integrating Tally, Salesforce, or Zoho with AI
  3. Our private cloud hosting setup to prevent data leaks?`;
};

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AlgoForce Advisory Assistant. Ask me anything about our enterprise AI integrations, custom database software, or book a free operational audit.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const triggerBotResponse = (userInputText) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(userInputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 900);
  };

  const handleSend = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    triggerBotResponse(textToSend);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (intent) => {
    let queryText = '';
    if (intent === 'audit') queryText = 'How do I book a free AI audit?';
    else if (intent === 'services') queryText = 'What services do you offer?';
    else if (intent === 'integration') queryText = 'Can you connect AI to Tally and CRM?';
    else if (intent === 'privacy') queryText = 'How do you keep our data secure?';
    else if (intent === 'location') queryText = 'Where is your office located?';

    handleSend(queryText);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-[0_8px_30px_rgb(99,102,241,0.4)] flex items-center justify-center text-white hover:shadow-indigo-500/50 transition-all duration-300 chatbot-button floating-button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaRobot size={22} />}
        </motion.div>
        {/* Pulsing Dot */}
        {!isOpen && (
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500 border-2 border-white"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Container Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on Mobile */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9997] md:hidden"
              onClick={toggleChat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              className="fixed z-[9998] flex flex-col border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-slate-950 text-white chat-container w-[calc(100vw-2rem)] sm:w-[360px] h-[480px] bottom-24 right-4 sm:right-6"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FaRobot size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-none">Systems Advisor</h3>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      AlgoForce AI Assistant
                    </p>
                  </div>
                </div>
                <button 
                  onClick={toggleChat}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-slate-950/40 space-y-3 scroll-smooth chat-messages no-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-white/5 border border-white/10 text-slate-100 rounded-bl-none'
                      }`}
                    >
                      {/* Formatted body line breaks */}
                      <p className="whitespace-pre-line">{message.text}</p>
                      
                      {/* Clickable routing triggers in bot responses */}
                      {message.sender === 'bot' && message.text.includes('/services') && (
                        <button
                          onClick={() => { toggleChat(); navigate('/services'); }}
                          className="mt-2 text-indigo-300 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Go to Services <FaChevronRight size={8} />
                        </button>
                      )}
                      {message.sender === 'bot' && message.text.includes('Contact page') && (
                        <button
                          onClick={() => { toggleChat(); navigate('/contact?interest=audit'); }}
                          className="mt-2 text-indigo-300 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Book Free Audit <FaChevronRight size={8} />
                        </button>
                      )}
                      
                      <p className="text-[9px] text-right mt-1.5 opacity-60 leading-none">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions chips */}
              <div className="px-4 py-2 bg-slate-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => handleSuggestionClick(s.intent)}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-indigo-600/30 hover:border-indigo-500/50 transition-colors"
                  >
                    {s.text}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/5 bg-slate-950">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about AI, audits, location..."
                    className="flex-1 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-xs"
                  />
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    className={`p-2 w-8 h-8 rounded-full flex items-center justify-center ${
                      inputValue.trim()
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
                    } transition-colors`}
                    whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                  >
                    <FaPaperPlane size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotButton;