import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaBuilding, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ChatBotButton.css';

const SUGGESTIONS = [
  { text: 'Book Free AI Audit', intent: 'audit' },
  { text: 'What services do you offer?', intent: 'services' },
  { text: 'Retainer Pricing Plans', intent: 'price' },
  { text: 'Tally & CRM Integrations', intent: 'integration' },
  { text: 'Data Privacy & Cloud Security', intent: 'privacy' },
];

const KNOWLEDGE_BASE = [
  {
    keywords: ['what is algoforce', 'about algoforce', 'what does algoforce do', 'who are you', 'what is this website'],
    response: `AlgoForce AI is a premium Enterprise AI Consulting and Custom Software Development firm based in South East Delhi, India. 
    
    We build custom AI systems, database software, workflow automation, and CRM/ERP integrations that automate repetitive manual tasks, reduce operational costs, and drive clear business ROI. We operate as a registered MSME unit.`
  },
  {
    keywords: ['service', 'what do you offer', 'portfolios', 'capabilities', 'what do you build'],
    response: `We offer 13 core enterprise services across three main categories:
    1. AI & Custom Software: Enterprise AI Solutions, AI Agents, Custom Software, Internal AI Assistants, and Digital Transformation.
    2. Process Automation: Business Automation, CRM Automation, WhatsApp Automation, and Workflow Automation (using n8n/Make).
    3. Data & ERP Integration: ERP Integration (Tally, SAP, Oracle), Knowledge Management, Reporting Dashboards, and Data Integration (ETL).
    
    You can view details like Problem/Solution/ROI for each service on our /services page.`
  },
  {
    keywords: ['tally', 'crm', 'erp', 'sap', 'zoho', 'salesforce', 'integrate', 'sync'],
    response: `We build secure middleware integrations to connect custom AI and workflow automations to your existing business systems (Tally Prime, SAP, Zoho CRM, Salesforce, Shopify). 
    
    For instance, we can automate syncs between e-commerce orders and Tally, or feed incoming WhatsApp leads directly into your Salesforce CRM pipelines.`
  },
  {
    keywords: ['whatsapp', 'message', 'chat', 'api'],
    response: `We set up official WhatsApp Cloud API integrations. This allows you to build 24/7 automated booking or lead-nurturing agents. 
    
    Our setups have helped hospitality clients increase direct reservations by 19% and cut front-desk calendar booking work by 30+ hours per week.`
  },
  {
    keywords: ['privacy', 'security', 'secure', 'leak', 'vpc', 'cloud', 'aws', 'azure', 'llama', 'private host', 'data'],
    response: `Data security is our top priority. We prevent data leaks by hosting fine-tuned LLM models on your private cloud VPC (AWS, Azure, Google Cloud). 
    
    Under our strict AI Policy, your proprietary business datasets and databases are completely isolated and never used to train public LLM models.`
  },
  {
    keywords: ['price', 'pricing', 'cost', 'retainer', 'starter', 'growth', 'scale', 'fees', 'invoice', 'razorpay'],
    response: `We offer simple, transparent pricing models:
    • Starter Retainer: $29/mo (Basic automation, monthly reports, 2 AI services).
    • Growth Retainer: $69/mo (Advanced AI flows, weekly reports, 5 AI services).
    • Scale Retainer: $99/mo (Custom AI systems, dedicated team, 24/7 support).
    • Project-Based: From $79 (scoped setups like custom CRM/ERP integrations).
    • Corporate Training: From $99/quarter (AI training and certifications for teams).
    
    Payments are secured via Razorpay. We suggest booking a Free AI Audit first to scope details.`
  },
  {
    keywords: ['audit', 'consult', 'free operational', 'readiness', 'book', 'schedule', 'call', 'meeting', 'strategy'],
    response: `We offer a complimentary 30-Minute AI Readiness Audit & Strategy Consultation. 
    
    Our founder, Dev N Suman, will analyze your manual workflows, identify bottlenecks, recommend technology stacks, and estimate implementation ROI. You can book this on our Contact page or email contact@algoforceai.com.`
  },
  {
    keywords: ['address', 'location', 'delhi', 'office', 'where', 'headquarter', 'kalkaji', 'contact', 'phone', 'email'],
    response: `Our registered headquarters is located at South East Delhi, Kalkaji, New Delhi – 110019, India.
    
    • Phone: +918448947436
    • Email: contact@algoforceai.com
    • Hours: Monday - Friday (9 AM - 6 PM IST)`
  },
  {
    keywords: ['msme', 'registration', 'udyam', 'gst', 'legal', 'licence'],
    response: `AlgoForce AI is a legally registered MSME unit under the Government of India. 
    
    • Registration Number: UDYAM-DL-08-0122150.
    Our invoices and agreements fully support GST/MSME compliance requirements.`
  },
  {
    keywords: ['founder', 'ceo', 'dev', 'suman', 'who founded', 'built by', 'creator'],
    response: `AlgoForce AI was founded in June 2026 by Dev N Suman in New Delhi. Dev is an enterprise systems architect, SaaS developer, and Next.js performance engineer. You can learn more about him and view his projects on the /founder page.`
  },
  {
    keywords: ['crucible', 'incubator', 'startup'],
    response: `Crucible is our Startup Incubation Platform. It provides early-stage founders with workspaces, concept validation, milestone tracking, and MVP support to speed up execution. Details start at $29+.`
  },
  {
    keywords: ['labs', 'course', 'academy', 'learn', 'training', 'talent'],
    response: `AlgoForce Labs is our Talent Development Division. We run custom training cohorts and AI courses starting at $19+ to train professionals and corporate teams to maintain custom database systems and automations.`
  },
  {
    keywords: ['velqora', 'performer', 'event'],
    response: `Velqora is a specialized division within our ecosystem. It operates as a management and booking OS for live entertainment performers, booking teams, and contracts.`
  }
];

const getBotResponse = (input) => {
  const query = input.toLowerCase().trim();
  
  // Find matching knowledge base entry based on keyword score
  let bestMatch = null;
  let maxScore = 0;
  
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (query.includes(keyword)) {
        score += keyword.split(' ').length; // Higher weight to multi-word matching keywords
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }
  
  if (bestMatch && maxScore > 0) {
    return bestMatch.response;
  }
  
  return `I can guide you on how AlgoForce AI builds custom software and automates operations. Ask me about:
  • Our 13 enterprise AI, CRM/ERP, and Tally services
  • Retainer packages starting from $29/mo
  • Booking a Free AI Readiness Audit
  • Private cloud VPC hosting for data security
  • Credentials (MSME registration: UDYAM-DL-08-0122150)
  
  What can I answer for you?`;
};

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AlgoForce Advisory Assistant. Ask me anything about our enterprise AI integrations, custom database software, pricing, or book a free operational audit.",
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
    else if (intent === 'price') queryText = 'What are your retainer pricing plans?';
    else if (intent === 'integration') queryText = 'Can you connect AI to Tally and CRM?';
    else if (intent === 'privacy') queryText = 'How do you keep our data secure?';

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
                      {message.sender === 'bot' && message.text.includes('/founder') && (
                        <button
                          onClick={() => { toggleChat(); navigate('/founder'); }}
                          className="mt-2 text-indigo-300 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Meet Dev N Suman <FaChevronRight size={8} />
                        </button>
                      )}
                      {message.sender === 'bot' && message.text.includes('/pricing') && (
                        <button
                          onClick={() => { toggleChat(); navigate('/pricing'); }}
                          className="mt-2 text-indigo-300 font-bold hover:underline flex items-center gap-0.5"
                        >
                          Go to Pricing <FaChevronRight size={8} />
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
                    placeholder="Ask about AI, audits, pricing, location..."
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