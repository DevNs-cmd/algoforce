import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUserAlt, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ALGOFORCE_KNOWLEDGE } from './knowledge';

const SUGGESTIONS = [
  { text: 'Summit 2026 Delhi', intent: 'summit' },
  { text: 'Book Free AI Audit', intent: 'audit' },
  { text: 'Tally & CRM AI Sync', intent: 'tally' },
  { text: 'Retainer Pricing Plans', intent: 'price' },
  { text: 'Data Privacy & Cloud Security', intent: 'privacy' },
];

const generateAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Summit 2026 Event
  if (q.includes('summit') || q.includes('delhi') || q.includes('28 oct') || q.includes('october') || q.includes('event') || q.includes('ticket') || q.includes('luma') || q.includes('unstop')) {
    const s = ALGOFORCE_KNOWLEDGE.summit;
    const topics = s.keyTopics.slice(0, 5).map(t => `• ${t}`).join('\n');
    return `🚀 **${s.title}**\n\n• **Date**: ${s.date} (9 AM - 6 PM IST)\n• **City**: ${s.city}\n• **Theme**: ${s.theme}\n• **Audience**: ${s.audience}\n\n**Key Topics**:\n${topics}\n\n**Registration Options**:\n• Reserve on Luma (${s.lumaUrl})\n• Reserve on Unstop (${s.unstopUrl})`;
  }

  // 2. Audit / Consultation
  if (q.includes('audit') || q.includes('consult') || q.includes('book') || q.includes('schedule') || q.includes('call') || q.includes('meeting') || q.includes('strategy')) {
    return `${ALGOFORCE_KNOWLEDGE.faq.audit}\n\nYou can book a free 30-Minute AI Audit directly on our Contact page.`;
  }

  // 3. Tally & Accounting AI (TallyGPT)
  if (q.includes('tally') || q.includes('tallygpt') || q.includes('finance') || q.includes('accounting') || q.includes('gst') || q.includes('ledger') || q.includes('erp') || q.includes('sap')) {
    const p = ALGOFORCE_KNOWLEDGE.products.find(prod => prod.id === 'tallygpt');
    return `📊 **${p.name}**\n\n${p.description}\n\n• **Zero Copy-Pasting**: Direct API & middleware connector.\n• **GST Autopilot**: Real-time invoice & ledger reconciliation.\n• **Desktop Installer**: Available at /releases/tallygpt-desktop.exe.`;
  }

  // 4. LeadBolt & WhatsApp Automation
  if (q.includes('leadbolt') || q.includes('whatsapp') || q.includes('crm') || q.includes('sales') || q.includes('lead') || q.includes('zoho') || q.includes('salesforce')) {
    const s = ALGOFORCE_KNOWLEDGE.services.find(serv => serv.title.includes('WhatsApp'));
    return `📱 **LeadBolt & Official WhatsApp Automation**\n\n${s.solution}\n\n• **Problem Solved**: ${s.problem}\n• **Expected ROI**: ${s.roi}\n• **Integration Time**: ${s.time}`;
  }

  // 5. Orion Advanced Space Systems
  if (q.includes('orion') || q.includes('space') || q.includes('spacecraft') || q.includes('orbital') || q.includes('satellite')) {
    const p = ALGOFORCE_KNOWLEDGE.products.find(prod => prod.id === 'orion');
    return `🌌 **${p.name}**\n\n${p.description}\n\nWe connect autonomous mission software, robotics, and orbital infrastructure builders. Learn more on our /orion page.`;
  }

  // 6. Services & Products Overview
  if (q.includes('service') || q.includes('product') || q.includes('what do you do') || q.includes('offer') || q.includes('portfolio') || q.includes('capability') || q.includes('build') || q.includes('factory') || q.includes('hotel') || q.includes('brain')) {
    const list = ALGOFORCE_KNOWLEDGE.products.map(p => `• **${p.name}**: ${p.description}`).join('\n\n');
    return `AlgoForce AI builds production-grade enterprise software products:\n\n${list}\n\nView complete service details on our /services page.`;
  }

  // 7. Data Privacy & Cloud Security
  if (q.includes('privacy') || q.includes('security') || q.includes('secure') || q.includes('leak') || q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('llama') || q.includes('vpc')) {
    return `🛡️ **Enterprise Data Security & Cloud VPC**\n\n${ALGOFORCE_KNOWLEDGE.security.privacy}\n\n${ALGOFORCE_KNOWLEDGE.security.policy}`;
  }

  // 8. Pricing & Packages
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('retainer') || q.includes('fees') || q.includes('razorpay') || q.includes('$29')) {
    const list = ALGOFORCE_KNOWLEDGE.packages.map(p => `• **${p.name}** (${p.price}): ${p.description}`).join('\n\n');
    return `AlgoForce offers transparent milestone pricing and retainers:\n\n${list}\n\nPayments are secured via Razorpay. View full pricing tiers on our /pricing page.`;
  }

  // 9. Location, HQ & Contact
  if (q.includes('address') || q.includes('location') || q.includes('delhi') || q.includes('office') || q.includes('where') || q.includes('phone') || q.includes('contact') || q.includes('email') || q.includes('kalkaji')) {
    return `🏢 **AlgoForce Global HQ**\n\n${ALGOFORCE_KNOWLEDGE.agency.globalHQ}\n\n• **Official Phone**: ${ALGOFORCE_KNOWLEDGE.agency.phone}\n• **Official Email**: ${ALGOFORCE_KNOWLEDGE.agency.email}\n• **Operating Hours**: ${ALGOFORCE_KNOWLEDGE.agency.operatingHours}`;
  }

  // 10. MSME Registration & Legal
  if (q.includes('msme') || q.includes('registration') || q.includes('udyam') || q.includes('gst') || q.includes('legal')) {
    return `📜 **Government Registration & Legal Credentials**\n\nAlgoForce AI OS is a registered MSME unit under the Government of India.\n\n• **MSME Udyam Registration ID**: ${ALGOFORCE_KNOWLEDGE.agency.msmeId}\nAll contracts and invoicing are fully GST and MSME compliant.`;
  }

  // 11. Founder Dev N Suman
  if (q.includes('founder') || q.includes('ceo') || q.includes('dev') || q.includes('suman') || q.includes('who made') || q.includes('creator')) {
    return `👨‍💻 **Founder Dev N Suman**\n\nAlgoForce AI OS was founded in June 2026 by Dev N Suman in New Delhi. Dev is an enterprise systems architect, SaaS developer, and Next.js performance engineer. Read more on our /founder page.`;
  }

  // 12. Ecosystem: Crucible, Labs, Velqora
  if (q.includes('crucible') || q.includes('incubator') || q.includes('labs') || q.includes('talent') || q.includes('velqora') || q.includes('performer')) {
    const e = ALGOFORCE_KNOWLEDGE.ecosystem;
    return `⚡ **AlgoForce Ecosystem Divisions**\n\n• **Crucible**: ${e.crucible}\n• **AlgoForce Labs**: ${e.labs}\n• **Velqora**: ${e.velqora}`;
  }

  // 13. Greeting fallback
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
    return `Greetings! I am your AlgoForce AI Systems Advisor. How can I assist your business today?\n\n• Ask about Summit 2026 Delhi\n• Ask about TallyGPT & CRM Sync\n• Ask about Retainer Pricing ($29/mo)\n• Book a Free 30-Min AI Audit`;
  }

  return `I am programmed with full AlgoForce ecosystem knowledge:\n\n• **Summit 2026**: Delhi event on 28 Oct 2026\n• **Products**: TallyGPT, LeadBolt, FactoryGPT, HotelGPT, Corporate Brain, Orion Space\n• **Credentials**: MSME ID (${ALGOFORCE_KNOWLEDGE.agency.msmeId})\n• **Pricing**: Retainers from $29/mo\n\nWhat would you like to explore?`;
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
    }, 700);
  };

  const handleSuggestionClick = (intent) => {
    let queryText = '';
    if (intent === 'summit') queryText = 'Tell me about the Summit 2026 in Delhi';
    else if (intent === 'audit') queryText = 'How do I book a free AI audit?';
    else if (intent === 'tally') queryText = 'How does TallyGPT connect with Tally Prime?';
    else if (intent === 'price') queryText = 'What are your retainer pricing plans?';
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
          <>
            {/* Solid Backdrop on Mobile to prevent background text bleed-through */}
            <motion.div 
              className="fixed inset-0 bg-[#090b0e]/90 z-[99998] md:hidden pointer-events-auto"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto fixed md:absolute bottom-6 md:bottom-0 right-4 sm:right-6 md:right-0 z-[99999] w-[calc(100vw-2rem)] sm:w-[380px] h-[min(75dvh,620px)] sm:h-[550px] max-h-[calc(100dvh-2rem)] bg-[#0c0e14] border border-white/10 rounded-[28px] shadow-[0_35px_90px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden text-white"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 bg-[#0e1017] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    <FaRobot size={23} className="text-[#b783ff]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[15px]">AlgoForce AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 bg-[#8f38ff] rounded-full animate-pulse" />
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Systems Advisor</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 cursor-pointer"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#0c0e14]"
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
                    <div className={`flex gap-2.5 max-w-[85%] ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'bot' ? 'bg-[#8f38ff]' : 'bg-white/15'}`}>
                        {msg.role === 'bot' ? <FaRobot /> : <FaUserAlt />}
                      </div>
                      
                      {/* iOS themes: iMessage blue (#007aff) for users, system dark-gray for bots */}
                      <div className={`p-4 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line font-medium ${
                        msg.role === 'bot' 
                          ? 'bg-[#1c1e28] border border-white/5 text-gray-100 rounded-bl-none' 
                          : 'bg-[#007aff] text-white rounded-br-none shadow-md'
                      }`}>
                        <p>{msg.content}</p>
                        
                        {/* Clickable links inside bot messages */}
                        {msg.role === 'bot' && msg.content.includes('/services') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/services'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Go to Services <FaChevronRight size={8} />
                          </button>
                        )}
                        {msg.role === 'bot' && msg.content.includes('Contact page') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/contact?interest=audit'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Book Free Audit <FaChevronRight size={8} />
                          </button>
                        )}
                        {msg.role === 'bot' && msg.content.includes('/founder') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/founder'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Meet Dev N Suman <FaChevronRight size={8} />
                          </button>
                        )}
                        {msg.role === 'bot' && msg.content.includes('/orion') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/orion'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Explore Orion Space <FaChevronRight size={8} />
                          </button>
                        )}
                        {msg.role === 'bot' && (msg.content.includes('Summit') || msg.content.includes('luma')) && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/#summit'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Go to Summit 2026 Details <FaChevronRight size={8} />
                          </button>
                        )}
                        {msg.role === 'bot' && msg.content.includes('/pricing') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/pricing'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
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
                    <div className="bg-[#1c1e28] border border-white/5 px-4 py-2.5 rounded-2xl rounded-bl-none flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Chips — Styled like iOS segments */}
              <div className="px-4 py-2.5 bg-[#0e1017] border-t border-white/10 flex gap-1.5 overflow-x-auto no-scrollbar scrollbar-hide whitespace-nowrap">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => handleSuggestionClick(s.intent)}
                    className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 bg-[#1c1e28] text-slate-300 hover:text-white hover:bg-[#8f38ff]/30 hover:border-[#8f38ff]/50 transition-colors cursor-pointer"
                  >
                    {s.text}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#0e1017] border-t border-white/10">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about AI, audits, pricing..."
                    className="flex-1 bg-[#1c1e28] border border-white/5 rounded-2xl px-5 py-3 text-[13px] font-medium focus:outline-none focus:bg-white/10 focus:border-[#8f38ff]/60 text-white placeholder-gray-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#007aff] rounded-xl text-white hover:bg-[#0062cc] transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-md"
                    disabled={!input.trim() || isTyping}
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
