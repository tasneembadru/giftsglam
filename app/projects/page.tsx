
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight, MessageCircle } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
const whatsappNumber = "25768600080";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
  {

    title: "Luxury Living Room Transformation",
    category: "Living Room",
    image: "/images/projects/living-room.jpg",
    description:
      "Elegant beige, gold and white living room styling with premium décor accessories.",
  },
  {
    title: "Modern Bedroom Makeover",
    category: "Bedroom",
    image: "/images/projects/bedroom.jpg",
    description:
      "Warm textures, luxury curtains, lighting and elegant bedroom styling.",
  },
  {
    title: "Elegant Dining Room Styling",
    category: "Dining",
    image: "/images/projects/dining.jpg",
    description:
      "Luxury dining setup with floral centerpiece and gold table décor.",
  },
  {
    title: "Luxury Office Decoration",
    category: "Office",
    image: "/images/projects/office.jpg",
    description:
      "Professional office styling with modern décor and elegant furniture.",
  },
  {
    title: "Wedding Decoration",
    category: "Events",
    image: "/images/projects/wedding.jpg",
    description:
      "Complete wedding decoration with luxury floral arrangements and glamorous styling.",
  },
  {
    title: "Luxury Floral Corner",
    category: "Flowers",
    image: "/images/projects/flowers.jpg",
    description:
      "Premium artificial flowers designed for elegant home interiors.",
  },
]);
  useEffect(() => {
  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
  }

  fetchProjects();
}, []);
  return (
    <main className="bg-[#FAF8F2] text-[#1A1A1A]">

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-20 text-center">
        <div className="absolute inset-0 bg-black/30" />

        <Image
          src="/images/hero.jpg"
          alt="Luxury Home Decoration"
          fill
          priority
          className="object-cover"
        />

        <div className="relative z-10 max-w-3xl text-white">
          <p className="mb-4 uppercase tracking-[4px] text-[#F2D27A]">
            GiftsGlam 
          </p>

          <h1 className="mb-8 text-6xl font-bold leading-tight">
            Luxury Spaces We've Created
          </h1>

          <p className="text-lg leading-8 text-gray-100">
            Imagin transformations across homes, offices,
            events and floral styling.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
          {[
            "All",
            "Living Room",
            "Bedroom",
            "Dining",
            "Office",
            "Events",
            "Flowers",
          ].map((category) => (
            <button
              key={category}
              className="rounded-full border border-[#D4AF37] px-6 py-3 font-semibold text-[#B68D2A] transition hover:bg-[#D4AF37] hover:text-black"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="pb-24 px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-[32px] bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={700}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="space-y-4 p-6">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {project.description}
                </p>

                <div className="flex gap-3 pt-2">
                  <a href="/projects#transformations">
  <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37] py-3 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
    Before & After
  </button>
</a>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam! I love the ${project.title} style and I'd like to book something similar.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600">
                      <MessageCircle size={18} />
                      Book Style
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
{/* PINTEREST GALLERY */}

<section id="gallery" className="bg-white px-6 py-24">
  <div className="mx-auto max-w-7xl">

    <div className="mb-14 text-center">
      <p className="font-semibold uppercase tracking-[4px] text-[#D4AF37]">
        Design Inspiration
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        Inspo Gallery
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        Browse ideas of elegant spaces we could style across living rooms, bedrooms,
        dining rooms, offices and luxury events.
      </p>
    </div>

    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">

      {[
        { image: "/images/gallery/gallery1.jpg", title: "Luxury Living Room" },
        { image: "/images/gallery/gallery2.jpg", title: "Gold Wall Styling" },
        { image: "/images/gallery/gallery3.jpg", title: "Modern Bedroom" },
        { image: "/images/gallery/gallery4.jpg", title: "Dining Elegance" },
        { image: "/images/gallery/gallery5.jpg", title: "Luxury Floral Corner" },
        { image: "/images/gallery/gallery6.jpg", title: "Minimalist Office" },
        { image: "/images/gallery/gallery7.jpg", title: "Coffee Table Styling" },
        { image: "/images/gallery/gallery8.jpg", title: "Wedding Decor" },
        { image: "/images/gallery/gallery9.jpg", title: "Luxury Curtains" },
        { image: "/images/gallery/gallery10.jpg", title: "Console Table Decor" },
        { image: "/images/gallery/gallery11.jpg", title: "Luxury Lighting" },
        { image: "/images/gallery/gallery12.jpg", title: "Elegant Entryway" },
      ].map((item, index) => (
        <div
          key={index}
          className="group relative mb-5 overflow-hidden rounded-[28px]"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={800}
            className="w-full rounded-[28px] object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 right-0 translate-y-10 p-5 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-black">
              GiftsGlam
            </span>

            <h3 className="mt-3 text-xl font-bold">
              {item.title}
            </h3>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam! I love your ${item.title} design style.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-4 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600">
                I Love This Style
              </button>
            </a>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

{/* BEFORE & AFTER TRANSFORMATIONS */}

<section className="bg-[#FAF8F2] px-6 py-24">
  <div className="mx-auto max-w-7xl">

    <div className="mb-16 text-center">
      <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold">
        GiftsGlam Transformations
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        Before & After Makeovers
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        See the remarkable transformations we could create for homes,
        offices and luxury spaces.
      </p>
    </div>

    <div className="space-y-20">

      <BeforeAfterSlider
        title="Luxury Living Room Makeover"
        beforeImage="/images/before-after/living-before.jpg"
        afterImage="/images/before-after/living-after.jpg"
      />

      <BeforeAfterSlider
        title="Modern Bedroom Transformation"
        beforeImage="/images/before-after/bedroom-before.jpg"
        afterImage="/images/before-after/bedroom-after.jpg"
      />

      <BeforeAfterSlider
        title="Luxury Office Styling"
        beforeImage="/images/before-after/office-before.jpg"
        afterImage="/images/before-after/office-after.jpg"
      />

    </div>
  </div>
</section>
    </main>
  );
}