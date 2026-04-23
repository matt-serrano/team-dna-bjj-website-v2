"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
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
  colorPrimary = "#ffffff",
  colorAccent = "#22A7B3",
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
          position: [0, 1.5, 14],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "auto" }}
      >
        <color attach="background" args={["#030305"]} />
        <fog attach="fog" args={["#030305", 15, 40]} />

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
