"use client";

export default function Main() {
  return (
    <div className="mt-25 mb-50 flex flex-col justify-center items-center">
      <div>
        <div className="relative">
          <img
            src="pulseras_all.png"
            alt="pulseras all"
            className="max-w-[96dvw] min-w-[96dvw] h-auto rounded-2xl"
          />
          <h2 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-14 py-6 rounded-xl text-white border border-white/70 bg-white/20 backdrop-blur-xs text-8xl font-bold">
            Notte Club
          </h2>
        </div>
      </div>
      <main className="py-10 flex flex-row items-center justify-center">
        <img src="pulsera1.png" alt="pulsera1" className="w-[24dvw] h-auto" />
        <img src="pulsera2.png" alt="pulsera1" className="w-[24dvw] h-auto" />
        <img src="pulsera3.png" alt="pulsera1" className="w-[24dvw] h-auto" />
        <img src="pulsera4.png" alt="pulsera1" className="w-[24dvw] h-auto" />
      </main>
    </div>
  );
}
