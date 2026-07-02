import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUserAlt, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ALGOFORCE_KNOWLEDGE } from './knowledge';

const SUGGESTIONS = [
  { text: 'Book Free AI Audit', intent: 'audit' },
  { text: 'What services do you offer?', intent: 'services' },
  { text: 'Retainer Pricing Plans', intent: 'price' },
  { text: 'Tally & CRM Integrations', intent: 'integration' },
  { text: 'Data Privacy & Cloud Security', intent: 'privacy' },
];

const generateAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Audit / Consultation
  if (q.includes('audit') || q.includes('consult') || q.includes('book') || q.includes('schedule') || q.includes('call') || q.includes('meeting') || q.includes('strategy')) {
    return ALGOFORCE_KNOWLEDGE.faq.audit;
  }

  // 2. Services / Portfolios / Core Work
  if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('portfolio') || q.includes('capability') || q.includes('build')) {
    const list = ALGOFORCE_KNOWLEDGE.products.map(p => `• ${p}`).join('\n');
    return `AlgoForce AI delivers custom enterprise AI systems, database software, and workflow automation. Our main portfolios include:\n\n${list}\n\nWe support 13 distinct services. View the complete catalog with Problem/Solution/ROI pairs on our /services page.`;
  }

  // 3. Tally / CRM / ERP / Integrations
  if (q.includes('tally') || q.includes('crm') || q.includes('erp') || q.includes('sap') || q.includes('zoho') || q.includes('salesforce') || q.includes('integration') || q.includes('sync')) {
    return `We construct secure middleware integrations connecting custom AI pipelines and automation flows directly into your existing business systems (Tally Prime, SAP, Zoho CRM, Salesforce, Shopify). 
    
    This replaces manual copy-pasting of datasets and registers, keeping your existing software infrastructure untouched.`;
  }

  // 4. WhatsApp Automation
  if (q.includes('whatsapp') || q.includes('chat') || q.includes('message') || q.includes('api')) {
    const waService = ALGOFORCE_KNOWLEDGE.services.find(s => s.title.includes('WhatsApp'));
    return `WhatsApp Automation:\nWe integrate official WhatsApp Cloud APIs with database systems and booking workflows.\n\n• **Problem**: ${waService.problem}\n• **Solution**: ${waService.solution}\n• **ROI**: ${waService.roi}\n• **Implementation**: ${waService.time}`;
  }

  // 5. Data Privacy & Security
  if (q.includes('privacy') || q.includes('security') || q.includes('secure') || q.includes('leak') || q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('llama') || q.includes('data')) {
    return `${ALGOFORCE_KNOWLEDGE.security.privacy}\n\n${ALGOFORCE_KNOWLEDGE.security.policy}`;
  }

  // 6. Pricing & Packages
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('retainer') || q.includes('fees') || q.includes('razorpay')) {
    const list = ALGOFORCE_KNOWLEDGE.packages.map(p => `• **${p.name}** (${p.price}): ${p.description}`).join('\n\n');
    return `We offer simple milestone pricing and transparent retainers:\n\n${list}\n\nPayments are secured via Razorpay. View full pricing tiers on our /pricing page.`;
  }

  // 7. Location & Contact
  if (q.includes('address') || q.includes('location') || q.includes('delhi') || q.includes('office') || query.includes('where') || q.includes('phone') || q.includes('contact') || q.includes('email')) {
    return `Our registered headquarters is located at:\n${ALGOFORCE_KNOWLEDGE.agency.globalHQ}\n\n• **Official Phone**: ${ALGOFORCE_KNOWLEDGE.agency.phone}\n• **Official Email**: ${ALGOFORCE_KNOWLEDGE.agency.email}\n• **Operating Hours**: ${ALGOFORCE_KNOWLEDGE.agency.operatingHours}`;
  }

  // 8. MSME Registration
  if (q.includes('msme') || q.includes('registration') || q.includes('udyam') || q.includes('gst') || q.includes('legal')) {
    return `AlgoForce AI is a registered MSME unit under the Government of India.\n\n• **Registration ID**: ${ALGOFORCE_KNOWLEDGE.agency.msmeId}\nAll contracts and invoicing are fully GST and MSME compliant.`;
  }

  // 9. Founder Dev N Suman
  if (q.includes('founder') || q.includes('ceo') || q.includes('dev') || q.includes('suman') || q.includes('who made') || q.includes('creator')) {
    return `AlgoForce AI was founded in June 2026 by Dev N Suman in New Delhi. Dev is an enterprise systems architect, SaaS developer, and Next.js performance engineer. You can read more about him on our /founder page.`;
  }

  // 10. Crucible, Labs & Velqora divisions
  if (q.includes('crucible') || q.includes('incubator') || q.includes('labs') || q.includes('talent') || q.includes('training') || q.includes('velqora') || q.includes('performer')) {
    return `Our ecosystem includes specialized divisions:
    • **Crucible**: Our Startup Incubation Platform assisting early-stage founders with concepts, MVPs, and roadmap tracking.
    • **AlgoForce Labs**: Our Talent Development Division training developers to build and manage enterprise database systems.
    • **Velqora**: A specialized booking and contract OS for live entertainment performers.`;
  }

  // 11. Greeting fallback
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
    return `Greetings. How can I assist you with your business systems and workflow integrations today?\n\n• Ask about Tally/CRM Sync\n• Ask about Retainer Pricing\n• Ask about our Free AI Audit`;
  }

  return `I can answer queries about the AlgoForce ecosystem:\n\n• Our 13 enterprise AI, CRM/ERP, and Tally services\n• Retainer packages starting from $29/mo\n• Free 30-Minute AI Readiness Audits\n• Private cloud VPC hosting for data security\n• Credentials (MSME registration: ${ALGOFORCE_KNOWLEDGE.agency.msmeId})\n\nWhat would you like to explore?`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: ALGOFORCE_KNOWLEDGE.persona.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAIResponse(textToSend);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSuggestionClick = (intent) => {
    let queryText = '';
    if (intent === 'audit') queryText = 'How do I book a free AI audit?';
    else if (intent === 'services') queryText = 'What services do you offer?';
    else if (intent === 'price') queryText = 'What are your retainer pricing plans?';
    else if (intent === 'integration') queryText = 'Can you connect AI to Tally and CRM?';
    else if (intent === 'privacy') queryText = 'How do you keep our data secure?';

    handleSend(queryText);
  };

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-[100000] pointer-events-none">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 bg-[#06101d] border border-white/15 rounded-full shadow-[0_18_45px_rgba(6,16,29,0.32)] flex items-center justify-center text-white hover:bg-[#0b1d31] transition-all group relative"
          >
            <FaRobot size={25} className="text-[#b783ff]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8f38ff] rounded-full border-2 border-[#03070d]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[380px] h-[min(75dvh,620px)] sm:h-[550px] max-h-[calc(100dvh-2rem)] bg-[#03070d]/94 backdrop-blur-2xl border border-white/12 rounded-[28px] shadow-[0_35px_90px_rgba(0,0,0,0.48)] flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-transparent flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/6 border border-white/12 rounded-2xl flex items-center justify-center">
                  <FaRobot size={23} className="text-[#b783ff]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-[15px]">AlgoForce AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-[#8f38ff] rounded-full animate-pulse" />
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide no-scrollbar"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'bot' ? 'bg-[#8f38ff]' : 'bg-white/10'}`}>
                      {msg.role === 'bot' ? <FaRobot /> : <FaUserAlt />}
                    </div>
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line font-medium ${msg.role === 'bot' ? 'bg-white/5 border border-white/10 text-gray-200' : 'bg-white text-black'}`}>
                      <p>{msg.content}</p>
                      
                      {/* Clickable links inside bot messages */}
                      {msg.role === 'bot' && msg.content.includes('/services') && (
                        <button
                          onClick={() => { setIsOpen(false); navigate('/services'); }}
                          className="mt-2 text-[#b783ff] font-bold hover:underline flex items-center gap-0.5 text-xs"
                        >
                          Go to Services <FaChevronRight size={8} />
                        </button>
                      )}
                      {msg.role === 'bot' && msg.content.includes('Contact page') && (
                        <button
                          onClick={() => { setIsOpen(false); navigate('/contact?interest=audit'); }}
                          className="mt-2 text-[#b783ff] font-bold hover:underline flex items-center gap-0.5 text-xs"
                        >
                          Book Free Audit <FaChevronRight size={8} />
                        </button>
                      )}
                      {msg.role === 'bot' && msg.content.includes('/founder') && (
                        <button
                          onClick={() => { setIsOpen(false); navigate('/founder'); }}
                          className="mt-2 text-[#b783ff] font-bold hover:underline flex items-center gap-0.5 text-xs"
                        >
                          Meet Dev N Suman <FaChevronRight size={8} />
                        </button>
                      )}
                      {msg.role === 'bot' && msg.content.includes('/pricing') && (
                        <button
                          onClick={() => { setIsOpen(false); navigate('/pricing'); }}
                          className="mt-2 text-[#b783ff] font-bold hover:underline flex items-center gap-0.5 text-xs"
                        >
                          Go to Pricing <FaChevronRight size={8} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl rounded-bl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            <div className="px-4 py-2 bg-[#03070d]/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar scrollbar-hide whitespace-nowrap">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.text}
                  onClick={() => handleSuggestionClick(s.intent)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-[#8f38ff]/30 hover:border-[#8f38ff]/50 transition-colors cursor-pointer"
                >
                  {s.text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AI, audits, pricing, location..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-[13px] font-medium focus:outline-none focus:bg-white/10 focus:border-[#8f38ff]/60 text-white placeholder-gray-500 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-[#8f38ff] rounded-xl text-white hover:bg-[#7f2bec] transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  disabled={!input.trim() || isTyping}
                >
                  <FaPaperPlane size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
