import React from 'react';

const NexusBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#080810]">
      {/* Animated gradient blobs */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: '600px', height: '600px',
          top: '-10%', left: '-10%',
          background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob1 12s ease-in-out infinite'
        }}
      />
      <div
        className="absolute rounded-full opacity-15"
        style={{
          width: '500px', height: '500px',
          bottom: '-10%', right: '-10%',
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob2 15s ease-in-out infinite'
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: '400px', height: '400px',
          top: '40%', left: '40%',
          background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blob3 18s ease-in-out infinite'
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(80px, -60px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-100px, 80px) scale(1.15); }
          66% { transform: translate(50px, -50px) scale(0.85); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-80px, 80px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default NexusBackground;
