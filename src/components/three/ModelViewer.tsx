import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float,
  MeshDistortMaterial,
  useGLTF,
  Center
} from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  modelUrl?: string | null;
  color?: string;
  wireframe?: boolean;
  environment?: "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby";
}

const DemoModel = ({ color = "#00d4ff", wireframe = false }: { color?: string; wireframe?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        scale={hovered ? 1.1 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const GLBModel = ({ url, wireframe = false }: { url: string; wireframe?: boolean }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  // Apply wireframe to all meshes in the scene
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
          });
        } else {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} scale={2} />
      </group>
    </Center>
  );
};

const ModelViewer = ({ 
  modelUrl = null,
  color = "#00d4ff", 
  wireframe = false,
  environment = "city"
}: ModelViewerProps) => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {modelUrl ? (
            <GLBModel url={modelUrl} wireframe={wireframe} />
          ) : (
            <DemoModel color={color} wireframe={wireframe} />
          )}

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />

          <Environment preset={environment} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
