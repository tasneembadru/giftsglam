"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Search,
  Star,
  ChevronRight,
  Heart,
  Clock,
} from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

export default function HomePage() {
  const whatsappNumber = "25768600080";

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const categories = [
    "All",
    "Living Room",
    "Bedroom",
    "Dining",
    "Office",
    "Floral",
    "Gifts",
  ];

  const galleryImages = [
    "/images/gallery/gallery1.jpg",
    "/images/gallery/gallery2.jpg",
    "/images/gallery/gallery3.jpg",
    "/images/gallery/gallery4.jpg",
    "/images/gallery/gallery5.jpg",
    "/images/gallery/gallery6.jpg",
    "/images/gallery/gallery7.jpg",
    "/images/gallery/gallery8.jpg",
  ];

  const beforeAfterProjects = [
    {
      title: "Luxury Living Room Transformation",
      category: "Living Room",
      description: "Beautifully transformed space.",
      before: "/images/before-after/living-before.jpg",
      after: "/images/before-after/living-after.jpg",
    },
    {
      title: "Elegant Bedroom Transformation",
      category: "Bedroom",
      description: "A refined and elegant transformation.",
      before: "/images/before-after/bedroom-before.jpg",
      after: "/images/before-after/bedroom-after.jpg",
    },
    {
      title: "Modern Dining Transformation",
      category: "Dining",
      description: "A sophisticated dining experience.",
      before: "/images/before-after/dining-before.jpg",
      after: "/images/before-after/dining-after.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Happy Client",
      location: "Bujumbura",
      message: "Beautiful work and attention to detail.",
      image: "/images/avatar.jpg",
    },
    {
      name: "Happy Client",
      location: "Burundi",
      message: "The transformation was absolutely beautiful.",
      image: "/images/avatar.jpg",
    },
    {
      name: "Happy Client",
      location: "Bujumbura",
      message: "Professional, elegant and beautifully executed.",
      image: "/images/avatar.jpg",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product: any) => {
    const productName = product.name?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";
    const searchValue = search.toLowerCase();

    const matchesSearch =
      productName.includes(searchValue) ||
      productCategory.includes(searchValue);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const bookConsultation = async () => {
    if (!booking.name || !booking.phone || !booking.service) {
      alert("Please complete the required fields.");
      return;
    }

    const { error } = await supabase.from("consultations").insert([
      {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        service: booking.service,
        message: booking.message,
      },
    ]);

    if (error) {
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Your consultation request has been sent.");

    setBooking({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GiftsGlam",
    description:
      "Luxury home decoration, interior styling, gift hampers and elegant décor.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bujumbura",
      addressCountry: "BI",
    },
  };

  return (
    <>
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />

      {/* PREMIUM NAVBAR */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#111111]/70 backdrop-blur-2xl transition-all duration-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logos/logo-gold.png"
              alt="GiftsGlam"
              width={50}
              height={50}
              priority
            />

            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-[#D4AF37]">
                GiftsGlam
              </h1>

              <p className="text-[10px] uppercase tracking-[4px] text-gray-300">
                Luxury Décor
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {[
              ["About", "about"],
              ["Collection", "collection"],
              ["Services", "services"],
              ["Gallery", "gallery"],
              ["Contact", "contact"],
            ].map(([label, section]) => (
              <button
                key={label}
                onClick={() =>
                  document
                    .getElementById(section)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:text-[#D4AF37]"
              >
                {label}
              </button>
            ))}

            <a
              href="/projects"
              className="text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:text-[#D4AF37]"
            >
              Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-all duration-300 hover:scale-110 hover:text-[#25D366]"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href="https://instagram.com/giftsglam_store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-all duration-300 hover:scale-110 hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://pinterest.com/giftsglam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-all duration-300 hover:scale-110 hover:text-red-500"
            >
              <FaPinterestP size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#111111]/95 px-6 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm uppercase tracking-[2px] text-white">

              <button
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                About
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                Collection
              </button>

              <a href="/projects" onClick={() => setMenuOpen(false)}>
                Projects
              </a>

              <button
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                Services
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                Gallery
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                Contact
              </button>

              <div className="flex gap-5 pt-2">
                <FaWhatsapp size={22} className="text-[#25D366]" />
                <FaInstagram size={22} className="text-pink-500" />
                <FaPinterestP size={22} className="text-red-500" />
              </div>

            </div>
          </div>
        )}
      </nav>

        {/* PREMIUM HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#F8F5EE] to-[#F2ECE3] px-6 pt-36 pb-24">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#E9D8A6]/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/80 px-5 py-2 backdrop-blur-sm">
              <Sparkles size={15} className="text-[#D4AF37]" />
              <span className="text-sm font-medium text-[#8A6A14]">
                Luxury Styling • Floral Design • Elegant Gifts
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-[1.05] text-[#1A1A1A] md:text-7xl">
              Elevate Every Space With Timeless Luxury.
            </h1>

            <p className="max-w-xl text-lg leading-8 text-gray-600">
              Beautiful interiors, bespoke floral arrangements, luxury décor,
              elegant gifts and unforgettable event styling.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-gradient-to-r from-[#8A6A14] via-[#D4AF37] to-[#F2D675] px-8 py-4 font-semibold text-black shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.35)]"
              >
                Explore Inspo Collection
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[#25D366] px-8 py-4 font-semibold text-[#25D366] transition-all duration-300 hover:bg-[#25D366] hover:text-white"
              >
                <FaWhatsapp size={18} />
                WhatsApp Us
              </a>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">

              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">200+</h3>
                <p className="mt-2 text-xs uppercase tracking-[2px] text-gray-500">
                  Space Styling
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">100+</h3>
                <p className="mt-2 text-xs uppercase tracking-[2px] text-gray-500">
                  Event Decor
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">100%</h3>
                <p className="mt-2 text-xs uppercase tracking-[2px] text-gray-500">
                  Personalized Styling
                </p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="relative">

            <div className="absolute -inset-6 rounded-[42px] bg-[#D4AF37]/10 blur-3xl" />

            <Image
              src="/images/hero.jpg"
              alt="Luxury Home Decoration"
              width={700}
              height={850}
              priority
              className="relative h-[720px] w-full rounded-[42px] object-cover shadow-[0_35px_80px_rgba(0,0,0,0.18)] transition-all duration-700 hover:scale-[1.02]"
            />

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 rounded-3xl border border-white/40 bg-white/85 p-6 backdrop-blur-xl shadow-xl">

              <p className="text-xs uppercase tracking-[3px] text-[#8A6A14]">
                Signature Collection
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#1A1A1A]">
                Luxury • Modern • Glam
              </h3>

            </div>

          </div>

        </div>

      </section>

        {/* ABOUT */}
      <section
        id="about"
        className="bg-[#FFFDF8] px-6 py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* Image */}
          <div className="relative">

            <div className="absolute -inset-6 rounded-[40px] bg-[#D4AF37]/10 blur-3xl" />

            <Image
              src="/images/about.jpg"
              alt="About GiftsGlam"
              width={650}
              height={800}
              className="relative h-[680px] w-full rounded-[40px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-700 hover:scale-[1.02]"
            />

            <div className="absolute bottom-6 right-6 rounded-3xl bg-[#111111]/90 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[3px] text-[#D4AF37]">
                GiftsGlam
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
                Luxury Living
              </h3>
            </div>

          </div>

          {/* Content */}
          <div className="space-y-8">

            <span className="inline-block rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              About Us
            </span>

            <h2 className="font-serif text-5xl font-bold leading-tight text-[#1A1A1A] md:text-6xl">
              Elegant Décor Designed Around Your Lifestyle.
            </h2>

            <p className="text-lg leading-8 text-gray-600">
              Glam all the way
            </p>

            {/* Features */}
            <div className="grid gap-5">

              {[
                "Luxury Home Styling",
                "Elegant Floral Arrangements",
                "Wedding & Event Decoration",
                "Personalized Gift Collections",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10">
                    <CheckCircle className="text-[#D4AF37]" size={22} />
                  </div>

                  <p className="font-medium text-[#1A1A1A]">{item}</p>
                </div>
              ))}

            </div>

            {/* CTA */}
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-[#D4AF37] px-8 py-4 font-semibold text-[#8A6A14] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-lg"
            >
              Book a Consultation
            </button>

          </div>

        </div>
      </section>

        {/* COLLECTION */}
      <section
        id="collection"
        className="bg-[#F7F3EA] px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-14 text-center">
            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
             Collection
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold text-[#1A1A1A]">
              Curated Luxury Pieces
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Search */}
          <div className="mx-auto mb-10 max-w-xl">
            <div className="flex items-center gap-3 rounded-full bg-white px-6 py-4 shadow-md ring-1 ring-[#D4AF37]/20 transition focus-within:ring-2 focus-within:ring-[#D4AF37]/40">
              <Search className="text-[#8A6A14]" size={20} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-14 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[2px] transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#D4AF37] text-black shadow-lg"
                    : "bg-white text-[#666] ring-1 ring-[#EADFB8] hover:bg-[#D4AF37] hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product: any) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[34px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              >
                <div className="relative overflow-hidden">

                  <Image
                    src={product.image || "/images/placeholder.jpg"}
                    alt={product.name}
                    width={500}
                    height={600}
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {product.featured && (
                    <span className="absolute left-5 top-5 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-black">
                      Featured
                    </span>
                  )}

                  <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Heart size={18} className="text-[#8A6A14]" />
                  </button>

                </div>

                <div className="space-y-4 p-6">

                  <p className="text-xs uppercase tracking-[3px] text-[#8A6A14]">
                    {product.category}
                  </p>

                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-gray-600">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">

                    <p className="text-2xl font-bold text-[#8A6A14]">
                      ${product.price}
                    </p>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="rounded-full border border-[#D4AF37] px-5 py-2 text-sm font-semibold text-[#8A6A14] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
                    >
                      View
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
              <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[36px] bg-white">

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                >
                  <X size={20} />
                </button>

                <div className="grid lg:grid-cols-2">

                  <Image
                    src={selectedProduct.image || "/images/placeholder.jpg"}
                    alt={selectedProduct.name}
                    width={600}
                    height={700}
                    className="h-full w-full object-cover"
                  />

                  <div className="space-y-6 p-8">

                    <span className="rounded-full bg-[#F5E8BE] px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
                      {selectedProduct.category}
                    </span>

                    <h2 className="font-serif text-4xl font-bold text-[#1A1A1A]">
                      {selectedProduct.name}
                    </h2>

                    <p className="text-3xl font-bold text-[#8A6A14]">
                      ${selectedProduct.price}
                    </p>

                    <p className="leading-8 text-gray-600">
                      {selectedProduct.description}
                    </p>

                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                    >
                      <FaWhatsapp size={20} />
                      Order on WhatsApp
                    </button>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </section>

        {/* GALLERY */}
      <section
        id="gallery"
        className="bg-[#FFFDF8] px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-16 text-center">
            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Inspiration Gallery
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold text-[#1A1A1A]">
              Elegant Spaces & Beautiful Details
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Pinterest Grid */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-[30px] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
                ${
                  index % 5 === 0
                    ? "md:row-span-2"
                    : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  width={500}
                  height={700}
                  className={`w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105
                  ${
                    index % 5 === 0
                      ? "h-[520px]"
                      : "h-[250px]"
                  }`}
                />
              </div>
            ))}

          </div>

          {/* View Projects Button */}
          <div className="mt-16 text-center">
            <a
              href="/projects"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#8A6A14] via-[#D4AF37] to-[#F2D675] px-8 py-4 font-semibold text-black shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.35)]"
            >
              View All Projects
              <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </section>

        {/* SERVICES */}
      <section
        id="services"
        className="bg-[#F7F3EA] px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-16 text-center">
            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Our Services
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold text-[#1A1A1A]">
              Luxury Styling For Every Occasion
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Home Décor Styling",
                image: "/images/services/service1.jpg",
              },
              {
                title: "Luxury Floral Arrangements",
                image: "/images/services/service2.jpg",
              },
              {
                title: "Wedding & Event Decoration",
                image: "/images/services/service3.jpg",
              },
              {
                title: "Luxury Gift Hampers",
                image: "/images/services/service4.jpg",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-[34px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              >
                <div className="overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={600}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="space-y-5 p-6">

                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {service.title}
                  </h3>

                  <button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[2px] text-[#8A6A14] transition hover:text-[#D4AF37]"
                  >
                    Learn More
                    <ChevronRight size={16} />
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Bottom Banner */}
          <div className="mt-20 rounded-[40px] bg-gradient-to-r from-[#111111] via-[#2A2113] to-[#111111] px-8 py-10 md:px-14 md:py-14">

            <div className="grid items-center gap-8 lg:grid-cols-2">

              <div>
                <span className="rounded-full bg-[#D4AF37]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                  Premium Experience
                </span>

                <h3 className="mt-6 font-serif text-4xl font-bold leading-tight text-white">
                  Elegant styling tailored for homes, events and special gifts.
                </h3>
              </div>

              <div className="flex justify-start lg:justify-end">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full bg-gradient-to-r from-[#8A6A14] via-[#D4AF37] to-[#F2D675] px-8 py-4 font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.35)]"
                >
                  Book Consultation
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

        {/* BEFORE & AFTER */}
      <section className="bg-[#FFFDF8] px-6 py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Before & After
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold text-[#1A1A1A]">
              Transformations We Love
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {beforeAfterProjects.map((project, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[34px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              >
                <div className="grid grid-cols-2">

                  <div className="relative overflow-hidden">
                    <Image
                      src={project.before}
                      alt="Before"
                      width={300}
                      height={400}
                      className="h-64 w-full object-cover transition duration-700 hover:scale-110"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[2px] text-white">
                      Before
                    </span>
                  </div>

                  <div className="relative overflow-hidden">
                    <Image
                      src={project.after}
                      alt="After"
                      width={300}
                      height={400}
                      className="h-64 w-full object-cover transition duration-700 hover:scale-110"
                    />

                    <span className="absolute right-3 top-3 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] uppercase tracking-[2px] text-black">
                      After
                    </span>
                  </div>

                </div>

                <div className="space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[3px] text-[#8A6A14]">
                    {project.category}
                  </p>

                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {project.title}
                  </h3>

                  <p className="text-gray-600">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F7F3EA] px-6 py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Happy Clients
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold text-[#1A1A1A]">
              What Our Clients Say
            </h2>

            <div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((client, index) => (
              <div
                key={index}
                className="rounded-[32px] bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              >

                <div className="mb-5 flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                <p className="mb-8 italic leading-8 text-gray-600">
                  "{client.message}"
                </p>

                <div className="flex items-center gap-4">

                  <Image
                    src={client.image}
                    alt={client.name}
                    width={60}
                    height={60}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#D4AF37]/30"
                  />

                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                      {client.name}
                    </h4>

                    <p className="text-sm uppercase tracking-[2px] text-[#8A6A14]">
                      {client.location}
                    </p>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

        {/* CONTACT */}
      <section
        id="contact"
        className="bg-[#FFFDF8] px-6 py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            <span className="rounded-full bg-[#F5E8BE] px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Book A Consultation
            </span>

            <h2 className="mt-6 font-serif text-5xl font-bold leading-tight text-[#1A1A1A]">
              Let's Create Something Beautiful Together.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Replace this text with your own.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-5">

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-[28px] bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <FaWhatsapp size={24}/>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    WhatsApp
                  </p>

                  <h4 className="font-semibold text-[#1A1A1A]">
                    {whatsappNumber}
                  </h4>
                </div>
              </a>

              <a
                href="https://instagram.com/giftsglam_store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-[28px] bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 text-white">
                  <FaInstagram size={22}/>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    Instagram
                  </p>

                  <h4 className="font-semibold text-[#1A1A1A]">
                    @giftsglam_store
                  </h4>
                </div>
              </a>

              <a
                href="https://pinterest.com/giftsglam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-[28px] bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E60023]/10 text-[#E60023]">
                  <FaPinterestP size={22}/>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    Pinterest
                  </p>

                  <h4 className="font-semibold text-[#1A1A1A]">
                    GiftsGlam
                  </h4>
                </div>
              </a>

            </div>

            {/* Business Hours */}
            <div className="mt-12 rounded-[30px] bg-[#111111] p-7 text-white">

              <div className="mb-4 flex items-center gap-3">
                <Clock className="text-[#D4AF37]" size={22}/>
                <h4 className="font-serif text-2xl font-semibold">
                  Business Hours
                </h4>
              </div>

              <div className="space-y-3 text-gray-300">

                <div className="flex justify-between">
                  <span>Monday — Friday</span>
                  <span>8:00 AM — 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM — 5:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE — FORM */}
          <div className="rounded-[36px] bg-white p-8 shadow-[0_30px_70px_rgba(0,0,0,0.08)]">

            <span className="rounded-full bg-[#F5E8BE] px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#8A6A14]">
              Consultation Form
            </span>

            <h3 className="mt-5 font-serif text-3xl font-bold text-[#1A1A1A]">
              Tell Us About Your Project
            </h3>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                value={booking.name}
                onChange={(e) =>
                  setBooking({ ...booking, name: e.target.value })
                }
                className="w-full rounded-2xl border border-[#ECE7D8] px-5 py-4 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={booking.email}
                onChange={(e) =>
                  setBooking({ ...booking, email: e.target.value })
                }
                className="w-full rounded-2xl border border-[#ECE7D8] px-5 py-4 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
                className="w-full rounded-2xl border border-[#ECE7D8] px-5 py-4 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />

              <select
                value={booking.service}
                onChange={(e) =>
                  setBooking({ ...booking, service: e.target.value })
                }
                className="w-full rounded-2xl border border-[#ECE7D8] px-5 py-4 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              >
                <option value="">Select a Service</option>
                <option>Home Décor Styling</option>
                <option>Luxury Floral Arrangements</option>
                <option>Event Decoration(unavailable)</option>
                <option>Gift Hampers</option>
                <option>Office Decoration</option>
                <option>Other</option>
              </select>

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                value={booking.message}
                onChange={(e) =>
                  setBooking({ ...booking, message: e.target.value })
                }
                className="w-full rounded-2xl border border-[#ECE7D8] px-5 py-4 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />

              <button
                onClick={bookConsultation}
                className="w-full rounded-full bg-gradient-to-r from-[#8A6A14] via-[#D4AF37] to-[#F2D675] py-4 font-semibold text-black shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.35)]"
              >
                Send Consultation Request
              </button>

            </div>

          </div>

        </div>
      </section>

        {/* FOOTER */}
      <footer className="bg-[#111111] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>
              <Image
                src="/logos/logo-gold.png"
                alt="GiftsGlam"
                width={70}
                height={70}
              />

              <h3 className="mt-5 font-serif text-3xl font-bold text-[#D4AF37]">
                GiftsGlam
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Luxury home décor, floral styling, elegant gifts and event decoration crafted with timeless elegance.
              </p>

              <div className="mt-6 flex gap-4">

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] transition hover:scale-110"
                >
                  <FaWhatsapp size={20} className="text-white" />
                </a>

                <a
                  href="https://instagram.com/giftsglam_store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 transition hover:scale-110"
                >
                  <FaInstagram size={20} className="text-white" />
                </a>

                <a
                  href="https://pinterest.com/giftsglam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E60023] transition hover:scale-110"
                >
                  <FaPinterestP size={20} className="text-white" />
                </a>

              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                Quick Links
              </h4>

              <div className="flex flex-col gap-3 text-gray-400">

                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left transition hover:text-[#D4AF37]"
                >
                  About
                </button>

                <button
                  onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left transition hover:text-[#D4AF37]"
                >
                  Collection
                </button>

                <a href="/projects" className="transition hover:text-[#D4AF37]">
                  Projects
                </a>

                <button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left transition hover:text-[#D4AF37]"
                >
                  Services
                </button>

                <button
                  onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left transition hover:text-[#D4AF37]"
                >
                  Gallery
                </button>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left transition hover:text-[#D4AF37]"
                >
                  Contact
                </button>

              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                Services
              </h4>

              <div className="space-y-3 text-gray-400">
                <p>Home Décor Styling</p>
                <p>Luxury Floral Arrangements</p>
                <p>Event Decoration</p>
                <p>Office Decoration</p>
                <p>Gift Hampers</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                Contact
              </h4>

              <div className="space-y-4 text-gray-400">

                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-[#25D366]" />
                  <span>{whatsappNumber}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaInstagram className="text-pink-500" />
                  <span>@giftsglam_store</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaPinterestP className="text-red-500" />
                  <span>GiftsGlam</span>
                </div>

                <p>Bujumbura, Burundi</p>

              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-16 border-t border-white/10 pt-8">

            <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row">

              <p>
                © {new Date().getFullYear()} GiftsGlam. All rights reserved.
              </p>

              <div className="flex gap-6">
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="transition hover:text-[#D4AF37]"
                >
                  Home
                </button>

                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="transition hover:text-[#D4AF37]"
                >
                  Back
                </button>
              </div>

            </div>

          </div>

        </div>
      </footer>

    </>
  );
}