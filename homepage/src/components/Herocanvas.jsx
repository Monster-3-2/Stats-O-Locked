// src/components/HeroCanvas.jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Stars() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 30;
    return arr;
  }, []);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.02;
    ref.current.rotation.y = t * 0.03;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f0ff" size={0.015} sizeAttenuation depthWrite={false} opacity={0.6} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

function AIOrb() {
  const meshRef = useRef();
  const ringRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.z = t * 0.3;
    }
  });
  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial color="#4a00e0" attach="material" distort={0.45} speed={2} roughness={0.1} metalness={0.8} emissive="#0d00ff" emissiveIntensity={0.3} />
      </Sphere>
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.018, 16, 100]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[2.6, 0.01, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.5} transparent opacity={0.5} />
      </mesh>
      <Sphere args={[1.52, 32, 32]}>
        <meshStandardMaterial color="#00f0ff" wireframe transparent opacity={0.08} />
      </Sphere>
      <pointLight position={[0, 0, 0]} color="#7c3aed" intensity={5} distance={8} />
      <pointLight position={[2, 2, 2]} color="#00f0ff" intensity={2} distance={6} />
    </group>
  );
}

function FloatingNodes() {
  const group = useRef();
  useFrame((state) => { group.current.rotation.y = state.clock.getElapsedTime() * 0.09; });
  const nodes = [
    { pos: [3.5, 1, -1], color: '#00f0ff', size: 0.08 },
    { pos: [-3, 1.5, 0.5], color: '#7c3aed', size: 0.1 },
    { pos: [2.5, -1.5, 0.5], color: '#3b82f6', size: 0.07 },
    { pos: [-2.5, -1, -1], color: '#00f0ff', size: 0.09 },
    { pos: [0.5, 2.5, -2], color: '#7c3aed', size: 0.06 },
    { pos: [-1, -2.5, 1], color: '#3b82f6', size: 0.08 },
  ];
  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 12, 12]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <Stars />
      <AIOrb />
      <FloatingNodes />
    </Canvas>
  );
}
