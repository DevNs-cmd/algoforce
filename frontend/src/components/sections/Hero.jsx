import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import TrustBadges from './common/TrustBadges'

const Hero = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] md:min-h-screen overflow-hidden bg-[#020205] text-white pt-20 md:pt-28 pb-12 md:pb-16">

      {/* iOS Liquid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full opacity-60 transform-gpu"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -150, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[900px] h-[900px] bg-blue-600/15 blur-[180px] rounded-full opacity-50 transform-gpu"
        />
      </div>

      <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tagline - Soft and Small */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500">AI Education & Execution</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500">Govt Registered MSME</span>
            </motion.div>
          </div>

          {/* Headline - Ultra Tight Tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight glow-text-purple"
          >
            Build Real AI Products <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-purple-400/50">
              In 2 Hours.
            </span>
            <div className="text-2xl md:text-4xl lg:text-5xl text-gray-500 font-medium mt-4 italic tracking-normal">No Coding Required.</div>
          </motion.h1>

          {/* Description - Modern Clarity */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-16 text-sm md:text-xl text-gray-400 font-medium leading-relaxed italic"
          >
            MSME-certified AI training with real-world projects, execution labs, and job-ready skills. <br />
            <span className="text-white font-bold opacity-100 italic">Join 500+ students already building AI apps today.</span>
          </motion.p>

          {/* NEW: Live Stats & Demo Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl flex items-center justify-around">
                <div className="text-center">
                    <div className="text-3xl font-black text-white italic tracking-tighter">500+</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-600">Students Trained</div>
                </div>
                <div className="w-px h-12 bg-white/5" />
                <div className="text-center">
                    <div className="text-3xl font-black text-white italic tracking-tighter">1,200+</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-600">Projects Built</div>
                </div>
            </div>
            <div className="group relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-indigo-950/20 flex items-center justify-center cursor-pointer shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-blue-600/10 opacity-40 group-hover:opacity-60 transition-opacity" />
                 <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                 </div>
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">See how it works in 60s</div>
            </div>
          </motion.div>

          {/* Action CTAs - iOS Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/academy">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-14 py-5 bg-white text-black rounded-full font-black text-[15px] flex items-center gap-4 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:bg-gray-100 transition-all uppercase tracking-widest"
              >
                Join Academy {'->'}
              </motion.button>
            </Link>
            <Link to="/nexus">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="px-14 py-5 border border-white/10 rounded-full font-black text-[15px] text-white hover:border-white/30 backdrop-blur-xl transition-all uppercase tracking-widest"
              >
                Try Demo
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-20">
            <TrustBadges />
          </div>
        </motion.div>

        {/* Feature Island - iOS Glassmorphism */}
        <div ref={statsRef} className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Learn',
              desc: 'Master AI automation & product engineering.',
              gradient: 'from-purple-500/20 to-transparent'
            },
            {
              title: 'Build',
              desc: 'Deploy real-world AI systems in hours.',
              gradient: 'from-blue-500/20 to-transparent'
            },
            {
              title: 'Certify',
              desc: 'Official Govt MSME certification.',
              gradient: 'from-white/10 to-transparent'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + (idx * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-[50px] overflow-hidden group transition-all duration-700 hover:bg-white/[0.06] hover:scale-[1.02] cursor-default"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 transition-opacity group-hover:opacity-40`} />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 italic uppercase text-white group-hover:text-purple-400 transition-colors tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
