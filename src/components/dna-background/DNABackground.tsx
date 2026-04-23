"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { DNAHelix } from "./DNAHelix";

export interface DNABackgroundProps {
  speed?: number;
  colorPrimary?: string;
  colorAccent?: string;
  opacity?: number;
  density?: number;
}

export function DNABackground({
  speed = 0.3,
  colorPrimary = "#a0c4ff",
  colorAccent = "#7b2ff7",
  opacity = 0.85,
  density = 40,
}: DNABackgroundProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 10],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        style={{ pointerEvents: "auto" }}
      >
        <color attach="background" args={["#030305"]} />
        <fog attach="fog" args={["#030305", 8, 20]} />

        <ambientLight intensity={0.1} />
        <pointLight
          position={[4, 6, 5]}
          intensity={1.0}
          color={colorPrimary}
          distance={30}
          decay={2}
        />
        <pointLight
          position={[-4, -6, 3]}
          intensity={0.7}
          color={colorAccent}
          distance={30}
          decay={2}
        />
        <pointLight
          position={[0, 0, 8]}
          intensity={0.4}
          color="#ffffff"
          distance={25}
          decay={2}
        />
        <pointLight
          position={[-2, 3, -4]}
          intensity={0.3}
          color={colorAccent}
          distance={20}
          decay={2}
        />

        <Suspense fallback={null}>
          <DNAHelix
            speed={speed}
            colorPrimary={colorPrimary}
            colorAccent={colorAccent}
            opacity={opacity}
            density={density}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
