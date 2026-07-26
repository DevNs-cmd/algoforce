import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

gsap.registerPlugin(ScrollTrigger)

const BrandFilmSection = () => {
  const sectionRef = useRef(null)
  const [viewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: '120px 0px',
  })

  // GSAP scroll-triggered animation: 60fps hardware accelerated reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const targets = el.querySelectorAll('[data-gsap-reveal]')

    const ctx = gsap.context(() => {
      targets.forEach((target, i) => {
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: target,
              start: 'top bottom-=12%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  // Lazy autoplay when visible
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (inView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView])

  return (
    <section
      ref={(node) => {
        sectionRef.current = node
        viewRef(node)
      }}
      id="brand-film"
      className="relative py-16 md:py-24 bg-[#03070d] text-white overflow-hidden border-b border-white/5"
    >
      {/* Decorative ambient glows — matching existing patterns */}
      <div className="absolute top-[-8rem] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 subtle-ai-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div data-gsap-reveal className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            See AlgoForce <span className="premium-serif italic font-normal text-[#cdb4ff]">in Action</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 font-normal leading-relaxed">
            Watch how AlgoForce deploys Enterprise AI software that automates business operations across finance, sales, manufacturing, HR and operations.
          </p>
        </div>

        {/* Premium glassmorphism video player */}
        <div data-gsap-reveal className="flex justify-center">
          <div className="relative w-full md:w-[70%]">
            {/* Outer glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-purple-600/10 to-purple-500/20 rounded-[32px] blur-2xl opacity-50 pointer-events-none" />

            {/* Video container — glassmorphism */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                controls
                playsInline
                preload="metadata"
                poster="/poster-ai.png"
                loading="lazy"
                className="w-full aspect-video object-cover"
                aria-label="AlgoForce Overview — Enterprise AI software automating business operations"
                tabIndex={0}
              >
                <source src="/algoforce-brand-film.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandFilmSection
