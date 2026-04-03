import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { FaGlobe, FaArrowRight } from 'react-icons/fa'

const LANG_CONFIG = {
    es: { name: 'Español (Coming Soon)', title: 'Socio de ejecución de IA premium' },
    fr: { name: 'Français (Bientôt)', title: 'Partenaire d\'exécution IA premium' },
    de: { name: 'Deutsch (Bald verfügbar)', title: 'Premium-KI-Ausführungspartner' }
};

const LanguagePlaceholder = () => {
    const { lang } = useParams();
    const config = LANG_CONFIG[lang] || { name: 'International', title: 'AI Execution Partner' };

    return (
        <div className="min-h-screen bg-white text-black pt-40 pb-20 flex flex-col items-center justify-center text-center px-6">
            <Helmet>
                <title>{config.title} | AlgoForce AI</title>
                <link rel="alternate" hreflang="en" href="https://www.algoforceaii.com/" />
                <link rel="alternate" hreflang={lang} href={`https://www.algoforceaii.com/${lang}`} />
            </Helmet>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
                <FaGlobe className="text-6xl text-purple-600 mb-12 mx-auto" />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">{config.name}</h2>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                    Expansion in <span className="text-gray-300 italic px-2">Progress.</span>
                </h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                    We are currently localizing our technical ecosystems for the European and Hispanic markets. 
                    Core services remain available globally through our primary English infrastructure.
                </p>
                <Link to="/" className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-purple-600 transition-all">
                    Return to English Site <FaArrowRight />
                </Link>
            </motion.div>
        </div>
    );
};

export default LanguagePlaceholder;
