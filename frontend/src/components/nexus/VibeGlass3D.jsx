import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Environment, 
  PerspectiveCamera,
  ContactShadows,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Efficient Blob Component
const LiquidBlob = ({ position, scale, color, speed, distort, opacity = 1, highQuality = false }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    meshRef.current.rotation.y = Math.cos(time * 0.1) * 0.05;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale}>
        {/* Optimized Geometry */}
        <sphereGeometry args={[1, highQuality ? 64 : 32, highQuality ? 64 : 32]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          transmission={0.9}
          ior={1.1}
          thickness={highQuality ? 2 : 1}
          roughness={0.05}
          metalness={0.05}
          envMapIntensity={2}
          clearcoat={highQuality ? 0.5 : 0}
          opacity={opacity}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

const VibeGlassScene = () => {
  const groupRef = useRef();
  const dropletsArr = useRef([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!groupRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Reduced scrub for lower latency
        }
      });

      tl.to(groupRef.current.rotation, {
        y: Math.PI * 0.8, // Reduced rotation range
        ease: "none",
      }, 0);

      dropletsArr.current.forEach((d, i) => {
        if (d) {
          const moveX = (Math.random() - 0.5) * 8;
          const moveY = (Math.random() - 0.5) * 8;
          const moveZ = -2 - Math.random() * 3;
          tl.to(d.position, {
            x: moveX,
            y: moveY,
            z: moveZ,
            ease: "power1.inOut"
          }, 0);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const droplets = useMemo(() => [
    { pos: [6, 4, -3], sc: 0.8, col: "#d8b4fe", sp: 1.5, dist: 0.3 },
    { pos: [-6, -3, -5], sc: 0.6, col: "#67e8f9", sp: 1.2, dist: 0.4 },
    { pos: [3, -5, 2], sc: 0.5, col: "#818cf8", sp: 2, dist: 0.5 },
    { pos: [-4, 5, -2], sc: 0.4, col: "#bae6fd", sp: 1.5, dist: 0.4 },
    { pos: [7, -2, -6], sc: 0.55, col: "#f472b6", sp: 1.2, dist: 0.3 },
  ], []); // Reduced number of droplets for performance

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={30} />
      <Environment preset="night" /> {/*night is cheaper than studio*/}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
      
      <group ref={groupRef}>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <LiquidBlob position={[0, 0, 0]} scale={2.8} color="#ffffff" speed={1.2} distort={0.2} highQuality={true} />
        </Float>

        {droplets.map((d, i) => (
          <group key={i} ref={el => dropletsArr.current[i] = el} position={d.pos}>
            <Float speed={d.sp} rotationIntensity={0.4} floatIntensity={0.5}>
              <LiquidBlob 
                scale={d.sc} 
                color={d.col} 
                speed={d.sp} 
                distort={d.dist} 
                opacity={0.7}
                highQuality={false}
              />
            </Float>
          </group>
        ))}
      </group>

      <Preload all />
      <ContactShadows position={[0, -8, 0]} opacity={0.2} scale={40} blur={4} far={10} />
    </>
  );
};

const VibeGlass3D = () => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none w-screen h-screen overflow-hidden">
      <Canvas 
        shadows={false} // Disabling dynamic shadows for significant performance boost
        dpr={1} // Capping DPR for performance
        camera={{ position: [0, 0, 15], fov: 30 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <VibeGlassScene />
      </Canvas>
    </div>
  );
};

export default VibeGlass3D;
