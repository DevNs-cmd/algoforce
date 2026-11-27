import { motion, useReducedMotion } from 'framer-motion'
import './SectionSurfaces.css'

/**
 * Rounded ChronoTask-inspired dot-grid outer section shell.
 */
export const SectionCanvas = ({ id, children, outerClassName = 'bg-white py-6 sm:py-8', innerClassName = 'py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12' }) => (
  <section id={id} className={`w-full px-3 sm:px-5 lg:px-7 overflow-x-clip ${outerClassName}`}>
    <div className={`saas-canvas relative mx-auto max-w-[1400px] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] border border-[#e3e8f0] overflow-hidden shadow-[0_1px_3px_rgba(10,42,67,0.03),0_20px_50px_-28px_rgba(10,42,67,0.08)] ${innerClassName}`}>
      <div className="saas-dot-matrix absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="saas-center-halo absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  </section>
)

/**
 * Shared centered Swiss-SaaS header with dark primary line + muted secondary line.
 */
export const SectionHeader = ({ badge, titlePrimary, titleMuted, description, inView = true, className = 'mb-12 sm:mb-14' }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`text-center max-w-3xl mx-auto ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-[0_2px_8px_rgba(10,42,67,0.04)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A2A43] font-mono">
            {badge}
          </span>
        </div>
      )}

      <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0A2A43] mb-4">
        <span className="block">{titlePrimary}</span>
        {titleMuted && (
          <span className="block mt-1 text-[#6E7B8C] font-medium">
            {titleMuted}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-[#4A5769] text-sm sm:text-base leading-[1.65] font-normal max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}

/**
 * Decorative folder-tab top silhouette echoing the ChronoTask card geometry.
 */
export const FolderTabEar = ({ bgClass = 'bg-white/95' }) => (
  <div
    className={`hidden sm:block absolute -top-[9px] left-5 h-[10px] w-16 rounded-t-lg ${bgClass} border-t border-x border-[#e3e8f0]`}
    aria-hidden="true"
  />
)
