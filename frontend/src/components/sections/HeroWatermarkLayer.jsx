import { motion, useReducedMotion } from 'framer-motion'

/**
 * Editorial luxury-monogram inspired AlgoForce watermark distribution.
 * Layer 1 (Primary): Larger, asymmetrically placed anchors including cropped boundary bleeds (3–5% opacity).
 * Layer 2 (Micro): Smaller subtle instances distributed in negative space (2–3.5% opacity).
 */
const PRIMARY_WATERMARKS = [
  {
    id: 'p-top-left-bleed',
    positionClass: '-top-6 -left-14 sm:-top-8 sm:-left-12 lg:-top-10 lg:-left-10',
    sizeClass: 'w-[220px] sm:w-[360px] lg:w-[490px]',
    rotateClass: '-rotate-[7deg]',
    opacityClass: 'opacity-[0.042] sm:opacity-[0.048]',
    toneClass: 'watermark-navy',
  },
  {
    id: 'p-top-right',
    positionClass: 'top-[10%] -right-10 sm:top-[7%] sm:right-[4%] lg:top-[8%] lg:right-[9%]',
    sizeClass: 'w-[190px] sm:w-[300px] lg:w-[390px]',
    rotateClass: 'rotate-[3deg]',
    opacityClass: 'opacity-[0.036] sm:opacity-[0.040]',
    toneClass: 'watermark-brand-tint',
  },
  {
    id: 'p-mid-left',
    positionClass: 'top-[48%] -left-10 sm:top-[44%] sm:-left-6 lg:top-[43%] lg:-left-4',
    sizeClass: 'w-[170px] sm:w-[290px] lg:w-[370px]',
    rotateClass: 'rotate-[5deg]',
    opacityClass: 'opacity-[0.034] sm:opacity-[0.042]',
    toneClass: 'watermark-mono',
  },
  {
    id: 'p-bottom-right-bleed',
    positionClass: 'bottom-[3%] -right-12 sm:-bottom-8 sm:-right-10 lg:-bottom-10 lg:-right-8',
    sizeClass: 'w-[230px] sm:w-[370px] lg:w-[510px]',
    rotateClass: '-rotate-[5deg]',
    opacityClass: 'opacity-[0.040] sm:opacity-[0.046]',
    toneClass: 'watermark-brand-tint',
  },
  {
    id: 'p-bottom-left-inner',
    positionClass: 'hidden sm:block bottom-[8%] left-[12%] lg:bottom-[5%] lg:left-[16%]',
    sizeClass: 'w-[260px] lg:w-[350px]',
    rotateClass: 'rotate-0',
    opacityClass: 'opacity-[0.034]',
    toneClass: 'watermark-mono',
  },
]

const MICRO_WATERMARKS = [
  {
    id: 'm-upper-left-gap',
    positionClass: 'hidden sm:block top-[19%] left-[21%] lg:top-[18%] lg:left-[24%]',
    sizeClass: 'w-[130px] lg:w-[165px]',
    rotateClass: '-rotate-[4deg]',
    opacityClass: 'opacity-[0.028]',
    toneClass: 'watermark-mono',
  },
  {
    id: 'm-upper-right-inner',
    positionClass: 'top-[25%] right-[14%] sm:top-[28%] sm:right-[21%] lg:top-[27%] lg:right-[23%]',
    sizeClass: 'w-[110px] sm:w-[135px] lg:w-[165px]',
    rotateClass: 'rotate-[5deg]',
    opacityClass: 'opacity-[0.026] sm:opacity-[0.030]',
    toneClass: 'watermark-brand-tint',
  },
  {
    id: 'm-top-center-offset',
    positionClass: 'hidden md:block top-[11%] left-[53%]',
    sizeClass: 'w-[120px] lg:w-[140px]',
    rotateClass: 'rotate-0',
    opacityClass: 'opacity-[0.024]',
    toneClass: 'watermark-navy',
  },
  {
    id: 'm-lower-left-gap',
    positionClass: 'bottom-[12%] left-[6%] sm:bottom-[30%] sm:left-[18%] lg:bottom-[34%] lg:left-[21%]',
    sizeClass: 'w-[115px] sm:w-[130px] lg:w-[155px]',
    rotateClass: 'rotate-[4deg]',
    opacityClass: 'opacity-[0.028]',
    toneClass: 'watermark-mono',
  },
  {
    id: 'm-mid-right-edge',
    positionClass: 'hidden sm:block top-[56%] right-[15%] lg:top-[55%] lg:right-[17%]',
    sizeClass: 'w-[135px] lg:w-[160px]',
    rotateClass: '-rotate-[3deg]',
    opacityClass: 'opacity-[0.030]',
    toneClass: 'watermark-navy',
  },
  {
    id: 'm-bottom-center-right',
    positionClass: 'hidden lg:block bottom-[16%] right-[31%]',
    sizeClass: 'w-[145px]',
    rotateClass: '-rotate-[6deg]',
    opacityClass: 'opacity-[0.028]',
    toneClass: 'watermark-brand-tint',
  },
]

const renderWatermarkItems = (items) =>
  items.map((item) => (
    <div
      key={item.id}
      className={`absolute ${item.positionClass} ${item.sizeClass} ${item.rotateClass}`}
    >
      <img
        src="/algoforce-watermark-logo.png"
        alt=""
        width={605}
        height={227}
        loading="eager"
        decoding="async"
        draggable={false}
        className={`w-full h-auto object-contain select-none ${item.toneClass} ${item.opacityClass}`}
      />
    </div>
  ))

/**
 * Non-interactive, layered watermark backdrop using verbatim AlgoForce logo assets.
 */
const HeroWatermarkLayer = ({
  depthPrimaryX,
  depthPrimaryY,
  depthMicroX,
  depthMicroY,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const driftAnimation = (yDrift, duration) =>
    prefersReducedMotion
      ? undefined
      : {
          y: [0, yDrift, 0],
          opacity: [0.94, 1, 0.94],
          transition: {
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
    >
      {/* Layer 1 — Primary Large & Cropped Editorial Anchors */}
      <motion.div
        style={prefersReducedMotion ? undefined : { x: depthPrimaryX, y: depthPrimaryY }}
        animate={driftAnimation(-5, 20)}
        className="saas-motion-safe absolute inset-0 mix-blend-multiply"
      >
        {renderWatermarkItems(PRIMARY_WATERMARKS)}
      </motion.div>

      {/* Layer 2 — Micro Accent Watermark Pattern */}
      <motion.div
        style={prefersReducedMotion ? undefined : { x: depthMicroX, y: depthMicroY }}
        animate={driftAnimation(5, 24)}
        className="saas-motion-safe absolute inset-0 mix-blend-multiply"
      >
        {renderWatermarkItems(MICRO_WATERMARKS)}
      </motion.div>
    </div>
  )
}

export default HeroWatermarkLayer
