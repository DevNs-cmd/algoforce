import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera, ContactShadows, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

const LaptopModel = () => {
  const group = useRef()
  const screenRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
        group.current.rotation.y = Math.sin(t / 2) * 0.1
    }
    if (screenRef.current) {
        screenRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(t) * 0.02
    }
    if (glowRef.current) {
        glowRef.current.intensity = 2 + Math.sin(t * 3) * 1
    }
  })

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 2.5]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
      </mesh>
      
      {/* Keyboard Area - Wireframe Detail */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[3.8, 0.01, 2.3]} />
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Screen Hinge + Lid */}
      <group position={[0, 0, -1.25]} ref={screenRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        {/* Lid Inner (The Screen) */}
        <mesh position={[0, 1.25, 0]}>
          <planeGeometry args={[3.9, 2.4]} />
          <meshStandardMaterial 
            color="#002244" 
            emissive="#00ffff" 
            emissiveIntensity={0.5} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        
        {/* Screen Content - Holographic Grid */}
        <mesh position={[0, 1.25, 0.01]}>
          <planeGeometry args={[3.7, 2.2]} />
          <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.6} />
        </mesh>

        {/* Back of Lid */}
        <mesh position={[0, 1.25, -0.05]}>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Blue Underglow */}
      <pointLight 
        ref={glowRef}
        position={[0, -0.2, 0]} 
        color="#00ffff" 
        intensity={5} 
        distance={5} 
      />

      {/* Floating Hologram Elements */}
      <group position={[0, 1, 0]}>
        <Sparkles 
            count={60} 
            scale={4} 
            size={3} 
            speed={0.4} 
            color="#00ffff" 
        />
        
        {/* Abstract Floating Circuits (Planes) */}
        {[1, 2, 3].map((i) => (
            <mesh key={i} position={[Math.sin(i) * 1.5, Math.cos(i) * 0.5, 1]} rotation={[Math.random(), Math.random(), 0]}>
                <planeGeometry args={[0.5, 0.5]} />
                <meshStandardMaterial 
                    color="#00ffff" 
                    wireframe 
                    transparent 
                    opacity={0.2} 
                />
            </mesh>
        ))}
      </group>

      <ContactShadows 
        position={[0, -0.1, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={1} 
        color="#00ffff" 
      />
    </group>
  )
}

const FuturisticLaptop = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={35} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
        
        <Float
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5} 
        >
            <LaptopModel />
        </Float>

        {/* Cinematic Backdrop Glow */}
        <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[10, 32, 32]} />
            <meshBasicMaterial color="#001122" side={THREE.BackSide} />
        </mesh>
      </Canvas>

      {/* Floating Pulse Rings (CSS) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 border border-cyan-500/20 rounded-full animate-ping opacity-20" />
      </div>
    </div>
  )
}

export default FuturisticLaptop
