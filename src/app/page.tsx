"use client";

import dynamic from "next/dynamic";

const DNABackground = dynamic(
  () => import("@/components/dna-background").then((mod) => mod.DNABackground),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030305]">
      <DNABackground
        speed={0.3}
        colorPrimary="#ffffff"
        colorAccent="#22A7B3"
        opacity={0.85}
        density={40}
      />
    </main>
  );
}
