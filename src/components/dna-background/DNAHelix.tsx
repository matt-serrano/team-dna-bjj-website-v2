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
}

function createHelixCurve(offset: number, height: number, turns: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const segments = 200;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * turns + offset;
    const x = Math.cos(angle) * radius;
    const y = (t - 0.5) * height;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

export function DNAHelix({ speed, colorPrimary, colorAccent, opacity, density }: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const smoothRotation = useRef({ x: 0.15, y: 0 });

  const responsiveScale = useMemo(() => {
    const w = viewport.width;
    if (w < 6) return 0.55;
    if (w < 10) return 0.75;
    return 1;
  }, [viewport.width]);

  const helixHeight = 14;
  const helixTurns = 3;
  const helixRadius = 1.2;

  const curveA = useMemo(
    () => createHelixCurve(0, helixHeight, helixTurns, helixRadius),
    []
  );
  const curveB = useMemo(
    () => createHelixCurve(Math.PI, helixHeight, helixTurns, helixRadius),
    []
  );

  const tubeGeoA = useMemo(
    () => new THREE.TubeGeometry(curveA, 256, 0.08, 10, false),
    [curveA]
  );
  const tubeGeoB = useMemo(
    () => new THREE.TubeGeometry(curveB, 256, 0.08, 10, false),
    [curveB]
  );

  const strandMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorPrimary),
        emissive: new THREE.Color(colorPrimary),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: opacity * 0.9,
        roughness: 0.25,
        metalness: 0.15,
        side: THREE.DoubleSide,
      }),
    [colorPrimary, opacity]
  );

  const rungMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorAccent),
        emissive: new THREE.Color(colorAccent),
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: opacity * 0.5,
        roughness: 0.35,
        metalness: 0.2,
      }),
    [colorAccent, opacity]
  );

  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorPrimary),
        emissive: new THREE.Color(colorPrimary),
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: opacity * 0.95,
        roughness: 0.15,
        metalness: 0.3,
      }),
    [colorPrimary, opacity]
  );

  const rungData = useMemo(() => {
    const data: { posA: THREE.Vector3; posB: THREE.Vector3; midpoint: THREE.Vector3; direction: THREE.Vector3; length: number }[] = [];
    for (let i = 0; i < density; i++) {
      const t = (i + 0.5) / density;
      const pA = curveA.getPointAt(t);
      const pB = curveB.getPointAt(t);
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(pB, pA);
      const len = dir.length();
      dir.normalize();
      data.push({ posA: pA, posB: pB, midpoint: mid, direction: dir, length: len });
    }
    return data;
  }, [curveA, curveB, density]);

  const rungGeometry = useMemo(() => new THREE.CylinderGeometry(0.028, 0.028, 1, 6), []);
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.085, 8, 6), []);

  const rungInstancedRef = useRef<THREE.InstancedMesh>(null);
  const nodeInstancedRef = useRef<THREE.InstancedMesh>(null);

  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempQuat = useMemo(() => new THREE.Quaternion(), []);
  const upVector = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const identityQuat = useMemo(() => new THREE.Quaternion(), []);
  const oneVec = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  const yRotAccum = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.elapsedTime;

    yRotAccum.current += delta * speed * 0.15;

    const targetX = 0.15 + pointer.y * 0.04;
    const targetY = yRotAccum.current + pointer.x * 0.06;

    smoothRotation.current.x += (targetX - smoothRotation.current.x) * 0.03;
    smoothRotation.current.y += (targetY - smoothRotation.current.y) * 0.05;

    groupRef.current.rotation.x = smoothRotation.current.x;
    groupRef.current.rotation.y = smoothRotation.current.y;
    groupRef.current.rotation.z = 0.08;

    groupRef.current.position.y = Math.sin(elapsed * 0.25) * 0.12;

    const rungMesh = rungInstancedRef.current;
    const nodeMesh = nodeInstancedRef.current;
    if (!rungMesh || !nodeMesh) return;

    for (let i = 0; i < rungData.length; i++) {
      const { midpoint, direction, length } = rungData[i];

      tempQuat.setFromUnitVectors(upVector, direction);
      tempMatrix.compose(midpoint, tempQuat, new THREE.Vector3(1, length, 1));
      rungMesh.setMatrixAt(i, tempMatrix);

      tempMatrix.compose(rungData[i].posA, identityQuat, oneVec);
      nodeMesh.setMatrixAt(i * 2, tempMatrix);

      tempMatrix.compose(rungData[i].posB, identityQuat, oneVec);
      nodeMesh.setMatrixAt(i * 2 + 1, tempMatrix);
    }

    rungMesh.instanceMatrix.needsUpdate = true;
    nodeMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} scale={responsiveScale}>
      <mesh geometry={tubeGeoA} material={strandMaterial} />
      <mesh geometry={tubeGeoB} material={strandMaterial} />

      <instancedMesh
        ref={rungInstancedRef}
        args={[rungGeometry, rungMaterial, density]}
        frustumCulled={false}
      />

      <instancedMesh
        ref={nodeInstancedRef}
        args={[nodeGeometry, nodeMaterial, density * 2]}
        frustumCulled={false}
      />
    </group>
  );
}
