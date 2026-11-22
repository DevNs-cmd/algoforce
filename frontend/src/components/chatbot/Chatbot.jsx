import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUserAlt, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ALGOFORCE_KNOWLEDGE } from './knowledge';

const SUGGESTIONS = [
  { text: 'Discuss a Requirement', intent: 'requirement' },
  { text: 'Technology Consulting', intent: 'consulting' },
  { text: 'Custom Software & Apps', intent: 'engineering' },
  { text: 'AI & Workflow Automation', intent: 'ai' },
  { text: 'Partner with AlgoForce', intent: 'partner' },
];

const generateAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Partnerships
  if (q.includes('partner') || q.includes('collaborat') || q.includes('white-label') || q.includes('reseller') || q.includes('agency')) {
    return `🤝 **Technology Partnerships with AlgoForce**\n\nWe collaborate with business consultants, IT service providers, agencies, and independent professionals across:\n\n• **Software Delivery**: Reliable engineering capacity for web, mobile & cloud systems.\n• **AI & Automation Implementation**: Co-building LLM agents & workflow integrations.\n• **White-Label Delivery**: Seamless fulfillment under your brand name.\n• **Referral & Reseller Models**: Structured commissions and long-term revenue share.\n\nExplore our partner ecosystem or apply directly at /partnerships.`;
  }

  // 2. Consulting & Advisory
  if (q.includes('consult') || q.includes('advisor') || q.includes('architecture') || q.includes('audit') || q.includes('assessment')) {
    return `💡 **Technology Consulting Division**\n\nAlgoForce provides end-to-end technology advisory, digital transformation roadmaps, solution architecture, and system audits to help you make informed technology investments before writing code.\n\nStart with a discussion about your requirement at /contact.`;
  }

  // 3. Custom Software & Engineering
  if (q.includes('software') || q.includes('app') || q.includes('web') || q.includes('mobile') || q.includes('api') || q.includes('engineering')) {
    return `⚙️ **Software & Digital Engineering**\n\nWe design, engineer, and deploy high-performance custom applications:\n\n• Scalable web & mobile apps (React, Next.js, Flutter, React Native)\n• Robust backend APIs, microservices & cloud infrastructure (AWS/GCP/Azure)\n• Secure enterprise database architecture & system integrations\n\nTell us about your project at /contact.`;
  }

  // 4. AI & Intelligent Automation
  if (q.includes('ai') || q.includes('automat') || q.includes('agent') || q.includes('llm') || q.includes('tally') || q.includes('document')) {
    return `🤖 **AI & Intelligent Automation**\n\nWe build production-ready AI systems tailored to real business workflows:\n\n• **TallyGPT**: Natural language accounting & ledger querying directly from Tally ERP/Prime.\n• **Intelligent Agents**: Workflow automation connecting CRM, ERP, and communication channels.\n• **Document Processing**: Automated invoice, contract, and form extraction.\n\nLearn more at /products or /services.`;
  }

  // 5. Managed Services
  if (q.includes('support') || q.includes('managed') || q.includes('maintenance') || q.includes('sla') || q.includes('monitor')) {
    return `🛡️ **Managed Technology Services**\n\nWe provide 24/7 system monitoring, proactive maintenance, security patching, and continuous feature enhancements under dedicated SLA agreements.`;
  }

  // 6. Contact / Requirement
  if (q.includes('contact') || q.includes('quote') || q.includes('hire') || q.includes('requirement') || q.includes('reach')) {
    return `📬 **Discuss Your Requirement**\n\nYou can reach our engineering team directly through our Contact page (/contact) or via WhatsApp (+91 84489 47436). We typically respond within 24 business hours.`;
  }

  // 7. Orion Advanced Space Systems
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
    return `Greetings! I am your AlgoForce Technology Advisor. How can I assist your business or institution today?\n\n• Technology Consulting & Advisory\n• Custom Software & Digital Engineering\n• AI & Intelligent Automation (including TallyGPT)\n• Technology Partnerships & White-Label Delivery`;
  }

  return `I am programmed with full AlgoForce ecosystem knowledge:\n\n• **Core Divisions**: Consulting, Engineering, AI & Automation, Enterprise Solutions, Managed Services, Products & R&D\n• **Products**: TallyGPT, FactoryGPT, CiteRank GEO\n• **Credentials**: MSME ID (${ALGOFORCE_KNOWLEDGE.agency.msmeId})\n\nWhat would you like to explore?`;
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
    if (intent === 'requirement') queryText = 'I want to discuss a new technology requirement.';
    else if (intent === 'consulting') queryText = 'What does your Technology Consulting division provide?';
    else if (intent === 'engineering') queryText = 'Tell me about your custom software & web application engineering.';
    else if (intent === 'ai') queryText = 'How do you build AI and workflow automation for businesses?';
    else if (intent === 'partner') queryText = 'How can our agency or consultancy partner with AlgoForce?';

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
                        {msg.role === 'bot' && msg.content.includes('/partnerships') && (
                          <button
                            onClick={() => { setIsOpen(false); navigate('/partnerships'); }}
                            className="mt-2.5 text-[#b783ff] hover:text-[#cbb5ff] font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                          >
                            Explore Partnerships <FaChevronRight size={8} />
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
