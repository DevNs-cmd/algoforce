import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Environment, 
  OrbitControls,
  PerspectiveCamera,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const LiquidBlob = ({ position, scale, color, speed, distort, opacity = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.1;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          transmission={1}
          ior={1.2}
          thickness={5}
          roughness={0.02}
          metalness={0.1}
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0}
          opacity={opacity}
          transparent={true}
          attenuationDistance={2}
          attenuationColor={color}
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
          scrub: 2.5,
        }
      });

      tl.to(groupRef.current.rotation, {
        y: Math.PI * 1.2,
        x: Math.PI * 0.05,
        ease: "none",
      }, 0);

      dropletsArr.current.forEach((d, i) => {
        if (d) {
          const moveX = (Math.random() - 0.5) * 12;
          const moveY = (Math.random() - 0.5) * 12;
          const moveZ = -3 - Math.random() * 5;
          tl.to(d.position, {
            x: moveX,
            y: moveY,
            z: moveZ,
            ease: "power2.inOut"
          }, 0);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const droplets = useMemo(() => [
    { pos: [6, 4, -3], sc: 0.8, col: "#d8b4fe", sp: 2, dist: 0.3 },
    { pos: [-6, -3, -5], sc: 0.6, col: "#67e8f9", sp: 1.5, dist: 0.4 },
    { pos: [3, -5, 2], sc: 0.5, col: "#818cf8", sp: 2.5, dist: 0.5 },
    { pos: [-4, 5, -2], sc: 0.4, col: "#bae6fd", sp: 2, dist: 0.4 },
    { pos: [7, -2, -6], sc: 0.55, col: "#f472b6", sp: 1.5, dist: 0.3 },
    { pos: [-8, 2, 3], sc: 0.35, col: "#38bdf8", sp: 3, dist: 0.5 },
    { pos: [0, 7, -4], sc: 0.45, col: "#a78bfa", sp: 2.5, dist: 0.4 },
  ], []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={30} />
      <Environment preset="studio" />
      <ambientLight intensity={0.2} />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={1.5} color="#00f2ff" />
      <pointLight position={[-20, -20, -10]} intensity={1} color="#ff00e5" />
      
      <group ref={groupRef}>
        {/* Main core - Refined "realistic" liquid core */}
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
          <LiquidBlob position={[0, 0, 0]} scale={2.8} color="#ffffff" speed={1.5} distort={0.25} />
        </Float>

        {droplets.map((d, i) => (
          <group key={i} ref={el => dropletsArr.current[i] = el} position={d.pos}>
            <Float speed={d.sp} rotationIntensity={0.6} floatIntensity={1}>
              <LiquidBlob 
                scale={d.sc} 
                color={d.col} 
                speed={d.sp} 
                distort={d.dist} 
                opacity={0.8}
              />
            </Float>
          </group>
        ))}
      </group>

      <ContactShadows position={[0, -8, 0]} opacity={0.25} scale={40} blur={3} far={10} />
    </>
  );
};

const VibeGlass3D = () => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none w-screen h-screen">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 30 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <VibeGlassScene />
      </Canvas>
    </div>
  );
};

export default VibeGlass3D;
