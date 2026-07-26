import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const GOOGLE_REVIEW_URL = 'https://g.page/r/CSblxr3Io_B5EBM/review'

const GoogleReviewCTA = () => {
  const sectionRef = useRef(null)

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

  return (
    <section
      ref={sectionRef}
      id="google-review-cta"
      className="relative py-16 md:py-24 bg-white text-black overflow-hidden"
    >
      {/* Subtle decorative glow — light theme */}
      <div className="absolute top-[-6rem] right-[-8rem] w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-6rem] left-[-8rem] w-[300px] h-[300px] rounded-full bg-purple-50/60 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Premium glass card */}
        <div
          data-gsap-reveal
          className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_24px_60px_rgba(6,47,79,0.08)] p-8 md:p-12 lg:p-16"
        >
          {/* Inner decorative glow */}
          <div className="absolute top-[-6rem] right-[-6rem] w-[20rem] h-[20rem] rounded-full bg-purple-100/30 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Text content */}
            <div data-gsap-reveal className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">Google Reviews</span>
              </span>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
                Loved your experience with{' '}
                <span className="premium-serif italic font-normal text-purple-600">AlgoForce?</span>
              </h2>

              <p className="max-w-lg text-sm md:text-base text-gray-500 font-normal leading-relaxed mb-8">
                Your feedback helps more businesses discover our Enterprise AI solutions. We'd appreciate your honest review on Google.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#06101d] text-white hover:bg-[#0a1a2f] px-8 py-4 text-sm font-bold transition-all shadow-[0_12px_30px_rgba(6,16,29,0.15)]"
                  id="google-review-primary-btn"
                >
                  ⭐ Leave a Google Review
                </a>
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 px-8 py-4 text-sm font-bold transition-all bg-white">
                    Book a Demo
                  </button>
                </Link>
              </div>

              {/* Micro Trust Line */}
              <div data-gsap-reveal className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-gray-400 font-semibold">
                <span className="text-yellow-500 text-base tracking-wider">★★★★★</span>
                <span>Rated by professionals and growing businesses.</span>
              </div>
            </div>

            {/* Right: QR Code */}
            <div data-gsap-reveal className="flex-shrink-0 flex flex-col items-center">
              <div className="rounded-[22px] border border-gray-100 bg-white p-4 shadow-[0_12px_40px_rgba(6,47,79,0.06)]">
                <img
                  src="/algoforce-review-qr.jpeg"
                  alt="QR code to leave a Google review for AlgoForce — scan to open the review page"
                  className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Scan to leave a review
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleReviewCTA
