import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, PerspectiveCamera, Stars, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

const Page = ({ angle, delay, color = "#f5f5dc" }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
        // Subtle flapping/breathing effect
        meshRef.current.rotation.y = angle + Math.sin(time + delay) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2.4, 3, 0.01]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

const BookModel = () => {
  const lightRef = useRef()
  const coreRef = useRef()

  // Generate many pages to create that "fan" effect from the image
  const pages = useMemo(() => {
    const p = []
    const count = 12
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 1.1) * (i / (count - 1)) - Math.PI / 2.2
      p.push({ angle, delay: i * 0.2 })
    }
    return p
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (lightRef.current) {
        lightRef.current.intensity = 40 + Math.sin(time * 4) * 10
    }
    if (coreRef.current) {
        coreRef.current.rotation.z = time * 0.5
        coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }
  })

  return (
    <group rotation={[0.5, 0, 0]}>
      {/* Book Base / Spine */}
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#2d1b0d" roughness={0.8} />
      </mesh>

      {/* Pages Fan */}
      <group position={[0, 0, 0]}>
        {pages.map((p, i) => (
          <group key={i} rotation={[0, p.angle, 0]}>
             <mesh position={[1.2, 0, 0]}>
                <boxGeometry args={[2.4, 3, 0.01]} />
                <meshStandardMaterial 
                    color={i % 2 === 0 ? "#fffbeb" : "#fef3c7"} 
                    emissive="#fef3c7"
                    emissiveIntensity={0.2}
                />
             </mesh>
          </group>
        ))}
      </group>

      {/* Central "Explosion" of Light */}
      <mesh ref={coreRef} position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" />
        <pointLight 
            ref={lightRef}
            intensity={50} 
            distance={15} 
            color="#fbbf24" 
            decay={2}
        />
      </mesh>

      {/* God Rays / Glow Planes */}
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
            color="#fbbf24" 
            transparent 
            opacity={0.1} 
            blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Sparkling Magic */}
      <Sparkles 
        count={150} 
        scale={6} 
        size={6} 
        speed={0.6} 
        color="#fbbf24"
        opacity={1}
      />
      
      <Sparkles 
        count={50} 
        scale={3} 
        size={12} 
        speed={1} 
        color="#ffffff"
        opacity={0.8}
      />
    </group>
  )
}

const MagicBook = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative mt-[-50px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Warm environment light */}
        <pointLight position={[-5, 5, 5]} color="#7c3aed" intensity={0.5} />

        <Float
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.5} 
        >
            <BookModel />
        </Float>

        <Stars 
            radius={50} 
            depth={50} 
            count={1000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
        />
      </Canvas>
      
      {/* CSS Bokeh Overlay to match the image vibe */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-purple-500/5 to-transparent mix-blend-screen overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/10 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full animate-pulse " style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}

export default MagicBook
