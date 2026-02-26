"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshDistortMaterial, Stars, Html } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { supabase } from "@/lib/supabase";

function LeadSatellite({ position, url }: { position: [number, number, number], url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#60a5fa" : "#3b82f6"} 
          emissive="#3b82f6" 
          emissiveIntensity={hovered ? 2 : 0.5} 
        />
      </mesh>
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white whitespace-nowrap border border-blue-500/50 pointer-events-none">
            {url}
          </div>
        </Html>
      )}
    </group>
  );
}

function CelestialBody() {
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase.from("audits").select("url").limit(10);
      if (data) setLeads(data);
    }
    fetchLeads();

    const channel = supabase
      .channel("audit-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "audits" }, (payload) => {
        setLeads((prev) => [payload.new, ...prev].slice(0, 10));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y = clock * 0.1;
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(clock * 0.3) * 5;
      moonRef.current.position.z = Math.cos(clock * 0.3) * 5;
    }
  });

  return (
    <group>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color="#0f172a"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      <mesh ref={moonRef} position={[5, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      {leads.map((lead, i) => {
        const angle = (i / leads.length) * Math.PI * 2;
        const radius = 3 + Math.random();
        return (
          <LeadSatellite 
            key={i} 
            url={lead.url} 
            position={[
              Math.sin(angle) * radius,
              (Math.random() - 0.5) * 2,
              Math.cos(angle) * radius
            ]} 
          />
        );
      })}

      <Sphere args={[2.1, 64, 64]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 8, 15], fov: 35 }}>
        <color attach="background" args={["#000000"]} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#1e40af" />
        <CelestialBody />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
