import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { rafThrottle } from '../../utils/performance'

const StickyCTA = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = rafThrottle(() => {
            if (window.scrollY > 800) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        });

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel?.();
        };
    }, []);

    // Don't show on builder/nexus or if too close to bottom
    const isSpecialPage = location.pathname === '/ai-builder' || location.pathname === '/nexus';
    if (isSpecialPage) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-3rem)] max-w-sm"
                >
                    <div className="bg-white/10 backdrop-blur-3xl border border-white/10 p-4 rounded-full flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="pl-4">
                            <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 animate-pulse">Limited Seats</div>
                            <div className="text-[13px] font-bold text-white">Next Batch: April 5</div>
                        </div>
                        <Link to="/academy">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-black rounded-full font-black text-[12px] uppercase tracking-widest"
                            >
                                Start Building AI
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default StickyCTA
