"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
  speed: number;
  colorPrimary: string;
  colorAccent: string;
  opacity: number;
  density: number;
  scale?: number;
}

const CORE_PER_STRAND = 2000;
const SECONDARY_PER_STRAND = 1200;
const AMBIENT_TOTAL = 600;
const RUNG_COUNT = 45;
const RUNG_PARTICLES_PER_LINE = 20;
const RUNG_LINES = 5;
const RUNG_PARTICLES = RUNG_PARTICLES_PER_LINE * RUNG_LINES;
const HELIX_LENGTH = 32.0;
const HELIX_RADIUS = 1.6;
const HELIX_TURNS = 5.0;
const FLOW_SPEED = 0.04;
const ROTATION_SPEED = 0.3;

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

const snoiseGLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uRotationSpeed;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uHelixLength;
  uniform float uHelixRadius;
  uniform float uHelixTurns;

  attribute float aProgress;
  attribute float aRadialOffset;
  attribute float aSize;
  attribute float aPhase;
  attribute float aStrand;
  attribute float aIsRung;
  attribute float aRungBase;
  attribute float aRungLine; // -1, 0, or 1 for multi-line rungs
  attribute float aLayer; // 0=core, 1=secondary, 2=ambient

  varying float vAlpha;
  varying float vStrand;
  varying float vProgress;
  varying float vLayer;

  #define PI 3.14159265359
  ${snoiseGLSL}

  void main() {
    float t = fract(aProgress + uTime * uFlowSpeed);
    float x = (t - 0.5) * uHelixLength;

    float helixAngle = t * PI * 2.0 * uHelixTurns + aStrand * PI + uTime * uRotationSpeed;
    float y, z;

    if (aIsRung > 0.5) {
      float angleA = t * PI * 2.0 * uHelixTurns + uTime * uRotationSpeed;
      float angleB = angleA + PI;
      y = mix(cos(angleA), cos(angleB), aRungBase) * uHelixRadius;
      z = mix(sin(angleA), sin(angleB), aRungBase) * uHelixRadius;
      // Offset x for multi-line rungs (3 parallel lines)
      x += aRungLine * 0.05;
    } else {
      float radius = uHelixRadius;

      // Ambient particles: orbit outward with time-varying displacement
      if (aLayer > 1.5) {
        float orbitPhase = aPhase + uTime * 0.15;
        float driftR = 0.3 + 0.25 * sin(orbitPhase * 2.3);
        float driftAngle = orbitPhase * 1.7 + aProgress * 12.0;
        radius += driftR;
        helixAngle += sin(driftAngle) * 0.15;
      }
      // Secondary particles: slight outward scatter
      else if (aLayer > 0.5) {
        radius += aRadialOffset * 0.12;
      }

      y = cos(helixAngle) * radius;
      z = sin(helixAngle) * radius;
    }

    // Noise displacement — scaled by layer
    float noiseTime = uTime * 0.2;
    float nAmp = aLayer > 1.5 ? 0.25 : (aLayer > 0.5 ? 0.18 : 0.12);
    float rungDamp = aIsRung > 0.5 ? 0.25 : 1.0;
    float nx = snoise(vec3(x * 0.15 + noiseTime, y * 0.4, z * 0.4)) * nAmp * rungDamp;
    float ny = snoise(vec3(y * 0.3 + noiseTime * 0.7, x * 0.15, z * 0.4 + 1.0)) * nAmp * rungDamp;
    float nz = snoise(vec3(z * 0.3, y * 0.4 + noiseTime * 0.5, x * 0.15 + 2.0)) * nAmp * rungDamp;

    vec3 pos = vec3(x + nx, y + ny + aRadialOffset * 0.06, z + nz + aRadialOffset * 0.04);

    // Ambient vertical drift
    if (aLayer > 1.5) {
      pos.y += sin(uTime * 0.3 + aPhase * 5.0) * 0.15;
    }

    pos.y += uMouse.y * 0.35 * smoothstep(0.0, 0.5, abs(t - 0.5));
    pos.z += uMouse.x * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mvPosition.z;

    float edgeFade = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t);
    float depthFade = smoothstep(35.0, 10.0, dist);
    float flicker = 0.82 + 0.18 * sin(uTime * 3.0 + aPhase * 25.0);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.2 - t * 12.0);

    // Rung-specific brightness pulse
    float rungPulse = 1.0;
    if (aIsRung > 0.5) {
      rungPulse = 0.6 + 0.4 * sin(uTime * 2.0 - t * 18.0 + aRungBase * 3.14);
    }

    // Layer-based alpha
    float layerAlpha = aLayer > 1.5 ? 0.5 : (aLayer > 0.5 ? 0.65 : 1.0);
    float rungAlpha = aIsRung > 0.5 ? 0.7 * rungPulse : 1.0;

    vAlpha = edgeFade * depthFade * flicker * pulse * layerAlpha * rungAlpha;
    vStrand = aStrand;
    vProgress = t;
    vLayer = aLayer;

    // Layer-based sizing
    float layerSize = aLayer > 1.5 ? 0.7 : (aLayer > 0.5 ? 0.75 : 1.0);
    float rungSize = aIsRung > 0.5 ? 0.55 : 1.0;
    float sz = aSize * layerSize * rungSize;

    gl_PointSize = sz * uPixelRatio * (120.0 / dist) * depthFade;
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorAccent;
  uniform float uOpacity;

  varying float vAlpha;
  varying float vStrand;
  varying float vProgress;
  varying float vLayer;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Layer-dependent glow profile
    float core, halo;
    if (vLayer > 1.5) {
      core = smoothstep(0.5, 0.2, d) * 0.8;
      halo = smoothstep(0.5, 0.32, d) * 0.3;
    } else if (vLayer > 0.5) {
      core = smoothstep(0.5, 0.18, d) * 0.8;
      halo = smoothstep(0.5, 0.3, d) * 0.25;
    } else {
      core = smoothstep(0.5, 0.1, d);
      halo = smoothstep(0.5, 0.28, d) * 0.3;
    }
    float brightness = core + halo;

    // Strand-based dual-tone: strand 0 = white, strand 1 = accent
    // Sharpen the white side: anything below 0.3 is pure white
    float strandMix = smoothstep(0.2, 0.8, vStrand);
    vec3 color = mix(uColorPrimary, uColorAccent, strandMix);

    // White strand: ensure pure white with hot center
    if (vStrand < 0.3) {
      color = vec3(1.0);
      if (vLayer < 0.5) {
        color = mix(color, vec3(1.0), core * 0.3);
      }
    }

    // Purple strand: boost emissive slightly for visibility against black
    if (vStrand > 0.7) {
      float purpleBoost = core * 0.4;
      color += uColorAccent * purpleBoost;
    }

    // Depth desaturation: particles further away become more muted
    float depthMute = smoothstep(0.0, 0.6, vAlpha);
    color = mix(color * 0.4, color, depthMute);

    float alpha = brightness * vAlpha * uOpacity;

    // Purple strand gets slightly higher minimum alpha for visibility
    if (vStrand > 0.7) {
      alpha = max(alpha, brightness * 0.08 * uOpacity);
    }

    gl_FragColor = vec4(color * brightness, clamp(alpha, 0.0, 1.0));
  }
`;

const lineVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uFlowSpeed;
  uniform float uRotationSpeed;
  uniform float uHelixLength;
  uniform float uHelixRadius;
  uniform float uHelixTurns;
  attribute float aLineProgress;
  attribute float aLineSide;
  varying float vLineFade;
  #define PI 3.14159265359

  void main() {
    float t = fract(aLineProgress + uTime * uFlowSpeed);
    float x = (t - 0.5) * uHelixLength;
    float angle = t * PI * 2.0 * uHelixTurns + uTime * uRotationSpeed + aLineSide * PI;
    vec3 pos = vec3(x, cos(angle) * uHelixRadius, sin(angle) * uHelixRadius);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float edgeFade = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t);
    float depthFade = smoothstep(35.0, 10.0, -mvPosition.z);
    vLineFade = edgeFade * depthFade;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const lineFragmentShader = /* glsl */ `
  uniform vec3 uColorAccent;
  uniform float uOpacity;
  uniform float uTime;
  varying float vLineFade;

  void main() {
    float pulse = 0.6 + 0.4 * sin(uTime * 1.0 + vLineFade * 8.0);
    float alpha = vLineFade * uOpacity * 0.12 * pulse;
    gl_FragColor = vec4(uColorAccent * 0.7, alpha);
  }
`;

export function DNAHelix({
  speed,
  colorPrimary,
  colorAccent,
  opacity,
  density,
  scale = 1,
}: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, pointer, viewport } = useThree();

  const responsiveScale = useMemo(() => {
    const w = viewport.width;
    if (w < 6) return 0.8 * scale;
    if (w < 10) return 0.98 * scale;
    if (w < 14) return 1.16 * scale;
    if (w < 18) return 1.36 * scale;
    return 1.56 * scale;
  }, [scale, viewport.width]);

  const totalStrand = (CORE_PER_STRAND + SECONDARY_PER_STRAND) * 2;
  const totalRung = RUNG_COUNT * RUNG_PARTICLES;
  const totalParticles = totalStrand + AMBIENT_TOTAL + totalRung;

  const particleBuffers = useMemo(() => {
    const random = createSeededRandom(
      0x1f2e3d4c ^ totalParticles ^ Math.round(density * 100)
    );
    const progress = new Float32Array(totalParticles);
    const radialOffset = new Float32Array(totalParticles);
    const size = new Float32Array(totalParticles);
    const phase = new Float32Array(totalParticles);
    const strand = new Float32Array(totalParticles);
    const isRung = new Float32Array(totalParticles);
    const rungBase = new Float32Array(totalParticles);
    const rungLine = new Float32Array(totalParticles);
    const layer = new Float32Array(totalParticles);
    const positions = new Float32Array(totalParticles * 3);

    let idx = 0;

    // Core particles — 2 strands
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < CORE_PER_STRAND; i++) {
        progress[idx] = i / CORE_PER_STRAND + (random() - 0.5) * 0.002;
        radialOffset[idx] = (random() - 0.5) * 1.0;
        size[idx] = 1.2 + random() * 1.8;
        phase[idx] = random() * Math.PI * 2;
        strand[idx] = s;
        isRung[idx] = 0; rungBase[idx] = 0; rungLine[idx] = 0;
        layer[idx] = 0;
        positions[idx * 3] = 0; positions[idx * 3 + 1] = 0; positions[idx * 3 + 2] = 0;
        idx++;
      }
    }

    // Secondary particles — 2 strands
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < SECONDARY_PER_STRAND; i++) {
        progress[idx] = i / SECONDARY_PER_STRAND + (random() - 0.5) * 0.005;
        radialOffset[idx] = (random() - 0.5) * 2.5;
        size[idx] = 0.8 + random() * 1.4;
        phase[idx] = random() * Math.PI * 2;
        strand[idx] = s;
        isRung[idx] = 0; rungBase[idx] = 0; rungLine[idx] = 0;
        layer[idx] = 1;
        positions[idx * 3] = 0; positions[idx * 3 + 1] = 0; positions[idx * 3 + 2] = 0;
        idx++;
      }
    }

    // Ambient dispersion particles
    for (let i = 0; i < AMBIENT_TOTAL; i++) {
      progress[idx] = random();
      radialOffset[idx] = (random() - 0.5) * 3.0;
      size[idx] = 0.6 + random() * 1.0;
      phase[idx] = random() * Math.PI * 2;
      strand[idx] = random();
      isRung[idx] = 0; rungBase[idx] = 0; rungLine[idx] = 0;
      layer[idx] = 2;
      positions[idx * 3] = 0; positions[idx * 3 + 1] = 0; positions[idx * 3 + 2] = 0;
      idx++;
    }

    // Rung particles — 3 parallel lines per rung
    for (let r = 0; r < RUNG_COUNT; r++) {
      const rungT = (r + 0.5) / RUNG_COUNT;
      for (let line = -1; line <= 1; line++) {
        for (let p = 0; p < RUNG_PARTICLES_PER_LINE; p++) {
          const lerpVal = p / (RUNG_PARTICLES_PER_LINE - 1);
          progress[idx] = rungT + (random() - 0.5) * 0.002;
          radialOffset[idx] = (random() - 0.5) * 0.4;
          size[idx] = 0.7 + random() * 0.9;
          phase[idx] = random() * Math.PI * 2;
          strand[idx] = lerpVal;
          isRung[idx] = 1;
          rungBase[idx] = lerpVal;
          rungLine[idx] = line;
          layer[idx] = 0;
          positions[idx * 3] = 0; positions[idx * 3 + 1] = 0; positions[idx * 3 + 2] = 0;
          idx++;
        }
      }
    }

    return { positions, progress, radialOffset, size, phase, strand, isRung, rungBase, rungLine, layer };
  }, [density, totalParticles]);

  const lineBuffers = useMemo(() => {
    const lineProgress = new Float32Array(RUNG_COUNT * 2);
    const lineSide = new Float32Array(RUNG_COUNT * 2);
    const positions = new Float32Array(RUNG_COUNT * 6);
    for (let r = 0; r < RUNG_COUNT; r++) {
      const t = (r + 0.5) / RUNG_COUNT;
      lineProgress[r * 2] = t; lineProgress[r * 2 + 1] = t;
      lineSide[r * 2] = 0.0; lineSide[r * 2 + 1] = 1.0;
      for (let j = 0; j < 6; j++) positions[r * 6 + j] = 0;
    }
    return { positions, lineProgress, lineSide };
  }, []);

  const particleMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        uTime: { value: 0 }, uFlowSpeed: { value: FLOW_SPEED },
        uRotationSpeed: { value: ROTATION_SPEED },
        uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHelixLength: { value: HELIX_LENGTH }, uHelixRadius: { value: HELIX_RADIUS },
        uHelixTurns: { value: HELIX_TURNS },
        uColorPrimary: { value: new THREE.Color(colorPrimary) },
        uColorAccent: { value: new THREE.Color(colorAccent) },
        uOpacity: { value: opacity },
      },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true,
    }),
    [colorPrimary, colorAccent, gl, opacity]
  );

  const lineMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader: lineVertexShader, fragmentShader: lineFragmentShader,
      uniforms: {
        uTime: { value: 0 }, uFlowSpeed: { value: FLOW_SPEED },
        uRotationSpeed: { value: ROTATION_SPEED },
        uHelixLength: { value: HELIX_LENGTH }, uHelixRadius: { value: HELIX_RADIUS },
        uHelixTurns: { value: HELIX_TURNS },
        uColorAccent: { value: new THREE.Color(colorAccent) },
        uOpacity: { value: opacity },
      },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true,
    }),
    [colorAccent, opacity]
  );

  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime * speed;
    smoothMouse.current.x += (pointer.x - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (pointer.y - smoothMouse.current.y) * 0.03;
    particleMaterial.uniforms.uTime.value = elapsed;
    particleMaterial.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 1.5);
    particleMaterial.uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
    lineMaterial.uniforms.uTime.value = elapsed;
    if (groupRef.current) {
      groupRef.current.rotation.x = smoothMouse.current.y * 0.06 + 0.12;
      groupRef.current.rotation.z = smoothMouse.current.x * 0.04;
    }
  });

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particleBuffers.positions, 3));
    geo.setAttribute("aProgress", new THREE.BufferAttribute(particleBuffers.progress, 1));
    geo.setAttribute("aRadialOffset", new THREE.BufferAttribute(particleBuffers.radialOffset, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(particleBuffers.size, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(particleBuffers.phase, 1));
    geo.setAttribute("aStrand", new THREE.BufferAttribute(particleBuffers.strand, 1));
    geo.setAttribute("aIsRung", new THREE.BufferAttribute(particleBuffers.isRung, 1));
    geo.setAttribute("aRungBase", new THREE.BufferAttribute(particleBuffers.rungBase, 1));
    geo.setAttribute("aRungLine", new THREE.BufferAttribute(particleBuffers.rungLine, 1));
    geo.setAttribute("aLayer", new THREE.BufferAttribute(particleBuffers.layer, 1));
    return geo;
  }, [particleBuffers]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lineBuffers.positions, 3));
    geo.setAttribute("aLineProgress", new THREE.BufferAttribute(lineBuffers.lineProgress, 1));
    geo.setAttribute("aLineSide", new THREE.BufferAttribute(lineBuffers.lineSide, 1));
    return geo;
  }, [lineBuffers]);

  return (
    <group ref={groupRef} scale={responsiveScale} rotation={[0.12, 0, 0.05]}>
      <points geometry={particleGeometry} material={particleMaterial} frustumCulled={false} />
      <lineSegments geometry={lineGeometry} material={lineMaterial} frustumCulled={false} />
    </group>
  );
}
