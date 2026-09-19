
"use client";

import Image from "next/image";
import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
}: BeforeAfterSliderProps) {
  const [slider, setSlider] = useState(50);

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <h3 className="mb-5 text-center text-3xl font-bold text-[#B68D2A]">
        {title}
      </h3>

      <div className="relative h-[450px] overflow-hidden rounded-[28px]">
        {/* AFTER IMAGE */}
        <Image
          src={afterImage}
          alt="After Decoration"
          fill
          className="object-cover"
        />

        {/* BEFORE IMAGE */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            width: `${slider}%`,
          }}
        >
          <Image
            src={beforeImage}
            alt="Before Decoration"
            fill
            className="object-cover"
          />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-[#D4AF37]"
          style={{ left: `calc(${slider}% - 2px)` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#D4AF37] shadow-lg">
            <div className="h-6 w-1 rounded bg-white" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
          BEFORE
        </div>

        <div className="absolute right-5 top-5 rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black">
          AFTER
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={100}
        value={slider}
        onChange={(e) => setSlider(Number(e.target.value))}
        className="mt-6 w-full accent-[#D4AF37]"
      />

      <p className="mt-3 text-center text-sm text-gray-500">
        Drag the gold slider to reveal the transformation.
      </p>
    </div>
  );
}