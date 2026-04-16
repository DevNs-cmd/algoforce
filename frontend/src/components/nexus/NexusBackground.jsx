import React from 'react';

const NexusBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
      {/* Liquid Organic Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.08)_0%,transparent_50%)] animate-liquid-drift" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(135,0,255,0.08)_0%,transparent_50%)] animate-liquid-drift-reverse" />
      </div>

      {/* Subtle Noise / Depth */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          filter: 'contrast(150%) brightness(100%)'
        }}
      />

      {/* Modern Floor Grid (Smoother) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          perspective: '1500px',
          transform: 'rotateX(75deg) translateY(-10%) scale(2)',
          transformOrigin: 'center center'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205] opacity-50" />

      <style>{`
        @keyframes liquid-drift {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-5%) scale(1.05) rotate(5deg); }
        }
        @keyframes liquid-drift-reverse {
          0%, 100% { transform: translateY(0) scale(1.05) rotate(0deg); }
          50% { transform: translateY(5%) scale(1) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

export default NexusBackground;
