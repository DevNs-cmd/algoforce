import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaQrcode, FaCreditCard, FaLock, FaCheckCircle, FaTimes, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

const PaymentGateway = ({ title = "Secure Payment Gateway", subtitle = "Choose your plan and start building today." }) => {
    const [selectedPlan, setSelectedPlan] = useState('startup');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const plans = [
        {
            id: 'startup',
            name: 'Base Execution',
            description: 'Secure the base execution for your vision.',
            price: 'As Asked By Merchant',
            features: ['Direct Support', 'Milestone Tracking', 'Beta Access'],
            color: 'from-blue-600 to-purple-600'
        },
        {
            id: 'enterprise',
            name: 'Enterprise Sprint',
            description: 'Accelerated development and premium consulting.',
            price: 'As Asked By Merchant',
            features: ['24/7 Priority', 'Custom Architecture', 'Legal Artifacts'],
            color: 'from-purple-600 to-pink-600'
        }
    ];

    const currentPlan = plans.find(p => p.id === selectedPlan);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsVerifying(false);
    };

    const contactDetails = {
        phone: "+91 844947436",
        email: "af@algoforceaii.com"
    };

    return (
        <section id="payment" className="bg-[#020205] py-24 px-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <FaShieldAlt className="text-purple-500 text-xs" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Secure Merchant Terminal</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">{title}</h2>
                    <p className="text-gray-500 max-w-xl mx-auto font-medium">{subtitle}</p>

                    <div className="mt-8 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 inline-block">
                        <p className="text-[10px] md:text-xs text-purple-300 font-bold uppercase tracking-[0.2em]">
                            Notice: The final amount should be paid as discussed with the owner or mentioned below.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {plans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] cursor-pointer transition-all duration-500 border
                                    ${selectedPlan === plan.id
                                        ? 'bg-white/[0.08] border-purple-500/50 shadow-[0_20px_50px_rgba(168,85,247,0.1)]'
                                        : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}
                                `}
                            >
                                <div className="mb-6 md:mb-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-500">{plan.description || plan.desc}</p>
                                </div>
                                <div className="mb-8 md:mb-10 text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">{plan.price}</div>
                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-400">
                                            <FaCheckCircle className="text-purple-500 text-xs" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${selectedPlan === plan.id ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10'}`}
                                >
                                    {selectedPlan === plan.id ? 'Proceed to Pay' : 'Select Plan'}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Payment Methods Marquee */}
                    <div className="relative w-full overflow-hidden pt-12">
                        <div className="flex animate-marquee-fast whitespace-nowrap gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex items-center gap-12 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white">
                                    <span>UPI</span>
                                    <span className="text-purple-600">BHIM</span>
                                    <span>PAYTM</span>
                                    <span className="text-blue-500">GPAY</span>
                                    <span>PHONEPE</span>
                                    <span className="text-purple-400">AMAZON PAY</span>
                                    <span className="text-green-500">WHATSAPP PAY</span>
                                    <span className="text-gray-500">BANK TRANSFER</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* PAYMENT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />

                        <motion.div
                            initial={{ scale: 0.95, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 30, opacity: 0 }}
                            className="relative w-full max-w-[340px] sm:max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-50 p-2 text-lg"
                            >
                                <FaTimes />
                            </button>

                            <div className="text-center">
                                {!isVerifying ? (
                                    <>
                                        <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
                                            <FaQrcode className="text-2xl text-purple-500" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight transition-all">Scan & Pay</h3>
                                        <p className="text-[10px] text-gray-500 mb-8 font-bold uppercase tracking-widest leading-none">
                                            {currentPlan.name} — {currentPlan.price}
                                        </p>

                                        {/* QR CODE IMAGE */}
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="relative w-48 h-48 mx-auto mb-10 p-4 bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                                        >
                                            <img
                                                src="/qr.jpeg"
                                                alt="Payment QR Code"
                                                className="w-full h-full object-contain"
                                            />
                                            <motion.div
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                className="absolute left-0 right-0 h-1 bg-purple-500/40 blur-[2px] z-20 pointer-events-none"
                                            />
                                        </motion.div>

                                        <div className="space-y-4">
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Waiting for Payment...</span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setIsVerifying(true)}
                                                className="w-full py-4 bg-white text-black rounded-xl font-black text-xs shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                                            >
                                                <FaLock className="text-[10px]" /> Verify Transaction
                                            </motion.button>
                                            <div className="relative w-full overflow-hidden py-6 mt-4 border-t border-white/5">
                                                <div className="flex animate-marquee-fast whitespace-nowrap gap-10">
                                                    {[...Array(2)].map((_, i) => (
                                                        <div key={i} className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">
                                                            <span>UPI</span>
                                                            <span className="text-purple-600">BHIM</span>
                                                            <span>PAYTM</span>
                                                            <span className="text-blue-500">GPAY</span>
                                                            <span>PHONEPE</span>
                                                            <span className="text-purple-400">AMAZON PAY</span>
                                                            <span className="text-green-500">WHATSAPP</span>
                                                            <span className="text-gray-500">BANK TRANSFER</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="py-4"
                                    >
                                        <div className="inline-flex p-3 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                                            <FaShieldAlt className="text-2xl text-green-500" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">Verification Center</h3>
                                        <p className="text-[10px] text-gray-500 mb-10 font-bold uppercase tracking-widest leading-relaxed">
                                            Contact our official support to confirm your transaction manually.
                                        </p>

                                        <div className="space-y-4">
                                            <a
                                                href={`https://wa.me/91844947436?text=${encodeURIComponent(`Hello AlgoForce Team, I have completed the payment for the ${currentPlan.name} plan. Here is my screenshot for verification.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex flex-col items-center justify-center p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all"
                                            >
                                                <FaWhatsapp className="mb-3 text-green-500 group-hover:scale-110 transition-transform" />
                                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">DM the ScreenShot</span>
                                                <span className="text-lg font-black text-white tracking-widest">WhatsApp Support</span>
                                            </a>

                                            <a
                                                href={`mailto:${contactDetails.email}`}
                                                className="group flex flex-col items-center justify-center p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                                            >
                                                <FaEnvelope className="mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Official Email</span>
                                                <span className="text-lg font-black text-white lowercase tracking-tight">{contactDetails.email}</span>
                                            </a>
                                        </div>

                                        <button
                                            onClick={() => setIsVerifying(false)}
                                            className="mt-8 text-xs font-bold text-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                                        >
                                            ← Back to QR Code
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PaymentGateway;
