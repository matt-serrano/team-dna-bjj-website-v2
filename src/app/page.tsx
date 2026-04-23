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
        colorPrimary="#a0c4ff"
        colorAccent="#7b2ff7"
        opacity={0.85}
        density={40}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <h1
            className="text-5xl font-bold tracking-tight md:text-7xl"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a0c4ff 50%, #7b2ff7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DNA BJJ
          </h1>
          <p className="mt-4 text-lg tracking-widest text-white/40 uppercase">
            Animation Preview
          </p>
        </div>
      </div>
    </main>
  );
}
