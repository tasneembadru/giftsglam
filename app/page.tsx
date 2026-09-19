"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import {
  Home,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const whatsappNumber = "257XXXXXXXXX"; // Replace with your mom's WhatsApp number.
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",

  name: "GiftsGlam",

  image: "https://giftsglam.vercel.app/og-image.jpg",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Bujumbura",
    addressCountry: "Burundi",
  },

  telephone: "+257XXXXXXXXX",

  email: "hello@giftsglam.com",

  url: "https://giftsglam.vercel.app",

  description:
    "Luxury home decoration, floral styling, gift hampers and event decoration in Burundi.",
};
const [showSuccess, setShowSuccess] = useState(false);
const [category, setCategory] = useState("All");
const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
  name: "",
  phone: "",
  city: "",
  service: "Home Decoration",
  budget: "",
  date: "",
  message: "",
});
  const features = [
    "Luxury Home Styling",
    "Interior Consultation",
    "Event Decoration",
    "Gift Hampers",
    "Floral Arrangements",
    "Fast WhatsApp Ordering",
  ];

  const collections = [
    {
      title: "Living Room Collection",
      image: "/images/collections/living-room.jpg",
      description: "Luxury sofas, mirrors, coffee tables and elegant accessories.",
    },
    {
      title: "Bedroom Collection",
      image: "/images/collections/bedroom.jpg",
      description: "Elegant bedding, lamps, curtains and cozy décor styling.",
    },
    {
      title: "Dining Collection",
      image: "/images/collections/dining.jpg",
      description: "Beautiful dining table styling and centerpiece decorations.",
    },
    {
      title: "Wall Art & Mirrors",
      image: "/images/collections/wall-art.jpg",
      description: "Modern wall art and statement mirrors for every home.",
    },
    {
      title: "Floral Arrangements",
      image: "/images/collections/flowers.jpg",
      description: "Premium artificial flowers and luxury floral styling.",
    },
    {
      title: "Luxury Gift Hampers",
      image: "/images/collections/gifts.jpg",
      description: "Customized gifts beautifully wrapped for every celebration.",
    },
  ];

  const services = [
    {
      title: "Home Decoration",
      description:
        "Complete styling for living rooms, bedrooms, kitchens and apartments.",
    },
    {
      title: "Event Decoration",
      description:
        "Luxury décor for birthdays, weddings, bridal showers and baby showers.",
    },
    {
      title: "Office Decoration",
      description:
        "Modern styling for offices, boutiques and professional spaces.",
    },
    {
      title: "Gift Styling",
      description:
        "Premium gift hampers and elegant wrapping for every celebration.",
    },
  ];

  const testimonials = [
  {
    name: "Sarah N.",
    image: "/images/testimonials/client1.jpg",
    review:
      "GiftsGlam completely transformed my living room. Every guest asks where I got the décor from!",
  },
  {
    name: "Emmanuel & Grace",
    image: "/images/testimonials/client2.jpg",
    review:
      "Our apartment feels like a luxury hotel after GiftsGlam styled it. Highly recommended.",
  },
  {
    name: "Diane K.",
    image: "/images/testimonials/client3.jpg",
    review:
      "Beautiful floral arrangements and elegant decorations. The service was amazing from start to finish.",
  },
];
const [products, setProducts] = useState([
  {
    name: "Luxury Gold Mirror",
    category: "Living Room",
    price: "$120",
    image: "/images/products/mirror.jpg",
  },
  {
    name: "Decorative Throw Pillows",
    category: "Bedroom",
    price: "$35",
    image: "/images/products/pillows.jpg",
  },
  {
    name: "Premium Floral Vase",
    category: "Flowers",
    price: "$48",
    image: "/images/products/vase.jpg",
  },
  {
    name: "Luxury Candle Set",
    category: "Living Room",
    price: "$30",
    image: "/images/products/candles.jpg",
  },
  {
    name: "Coffee Table Centerpiece",
    category: "Living Room",
    price: "$55",
    image: "/images/products/tray.jpg",
  },
  {
    name: "Luxury Gift Hamper",
    category: "Gift Hampers",
    price: "$65",
    image: "/images/products/gift-hamper.jpg",
  },
]);
const categories = [
  "All",
  ...new Set(products.map((product: any) => product.category)),
];

const filteredProducts = products.filter((product: any) => {
  const matchesCategory =
    category === "All" || product.category === category;

  const matchesSearch =
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase());

    
  return matchesCategory && matchesSearch;
});
 // ✅ This function is OUTSIDE useEffect
async function bookConsultation() {
  if (!form.name || !form.phone) {
    alert("Please enter your name and WhatsApp number.");
    return;
  }

  const { error } = await supabase.from("bookings").insert({
    full_name: form.name,
    phone: form.phone,
    city: form.city,
    service: form.service,
    budget: form.budget,
    preferred_date: form.date || null,
    message: form.message,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const whatsappMessage = `✨ GiftsGlam Consultation Booking

Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Service: ${form.service}
Budget: ${form.budget}
Preferred Date: ${form.date}

Message:
${form.message}`;

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    "_blank"
  );

  setForm({
    name: "",
    phone: "",
    city: "",
    service: "Home Decoration",
    budget: "",
    date: "",
    message: "",
  });

 setShowSuccess(true);

setTimeout(() => {
  setShowSuccess(false);
}, 4000);
}

async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error && data) {
    setProducts(data);
  } else {
    console.error(error);
  }
}

useEffect(() => {
  fetchProducts();
}, []);
  return (
    <main className="bg-[#FAF8F2] text-[#1A1A1A]">
      <Script
  id="giftsglam-business-schema"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(businessSchema),
  }}
/>
      {/* Background Glow */}
      <div className="fixed -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="fixed bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* PREMIUM NAVBAR */}
<nav className="fixed top-0 left-0 z-50 w-full bg-black/50 backdrop-blur-xl border-b border-[#D4AF37]/20">
  <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-gradient-to-br from-[#F2D27A] to-[#D4AF37] p-2">
        <Home className="text-black" size={20} />
      </div>

      <h1 className="text-3xl font-bold text-[#D4AF37]">
        GiftsGlam
      </h1>
    </div>

    {/* Desktop Menu */}
    <div className="hidden lg:flex items-center gap-8">
  <a href="#about" className="hover:text-[#D4AF37] transition">
    About
  </a>

  <button
    onClick={() => {
      document.getElementById("collection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }}
    className="hover:text-[#D4AF37] transition"
  >
     Collection
  </button>

  <a href="/projects" className="hover:text-[#D4AF37] transition">
    Projects
  </a>

  <a href="#services" className="hover:text-[#D4AF37] transition">
    Services
  </a>

  <a href="#gallery" className="hover:text-[#D4AF37] transition">
    Gallery
  </a>

  <a href="#contact" className="hover:text-[#D4AF37] transition">
    Contact
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
    <div className="lg:hidden bg-[#121212] border-t border-[#D4AF37]/20">
      <div className="flex flex-col px-6 py-5 text-white">
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
          className="py-3 hover:text-[#D4AF37]"
        >
          About
        </a>
        <button
  onClick={() => {
    document.getElementById("collection")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  }}
  className="py-3 text-left hover:text-[#D4AF37]"
>
  Collection
</button>
<a
  href="/projects"
  onClick={() => setMenuOpen(false)}
  className="py-3 hover:text-[#D4AF37]"
>
  Projects
</a>
<a href="/projects#gallery" className="hover:text-[#D4AF37] transition">
  Gallery
</a>
        <a
          href="#collections"
          onClick={() => setMenuOpen(false)}
          className="py-3 hover:text-[#D4AF37]"
        >
           Collections
        </a>

        <a
          href="#services"
          onClick={() => setMenuOpen(false)}
          className="py-3 hover:text-[#D4AF37]"
        >
          Services
        </a>

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="py-3 hover:text-[#D4AF37]"
        >
          Contact
        </a>

        
      </div>
    </div>
  )}
</nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center px-6 pt-28 pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
              <Sparkles size={16} />
              Luxury Home Decoration
            </div>

            <h2 className="text-5xl font-bold leading-tight md:text-7xl">
              Transform Your Home Into Pure Luxury.
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-700">
              Elegant décor, personalized styling, floral arrangements, premium
              gift hampers and timeless home accessories designed to make every
              space beautiful and unforgettable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] px-8 py-4 font-semibold text-black shadow-lg transition hover:scale-105">
                Explore Collection
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam 🌸 I would like to decorate my home.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-600">
                  <MessageCircle size={18} />
                  WhatsApp Us
                </button>
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">500+</h3>
                <p className="text-sm text-gray-600">Happy Homes</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">200+</h3>
                <p className="text-sm text-gray-600">Projects</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">5★</h3>
                <p className="text-sm text-gray-600">Customer Reviews</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[40px] bg-yellow-300/20 blur-3xl" />

            <Image
              src="/images/hero.jpg"
              alt="Luxury Living Room"
              width={700}
              height={850}
              priority
              className="relative h-[700px] w-full rounded-[40px] object-cover shadow-2xl"
            />

            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/80 p-5 backdrop-blur-md">
              <p className="text-sm text-gray-500">Signature Collection</p>

              <h3 className="text-xl font-bold text-[#B68D2A]">
                Luxury • Modern • Glam
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#F8F4EC] px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Image
            src="/images/about.jpg"
            alt="About GiftsGlam"
            width={600}
            height={700}
            className="h-[650px] w-full rounded-[35px] object-cover shadow-xl"
          />

          <div>
            <p className="mb-4 uppercase tracking-[4px] font-semibold text-[#D4AF37]">
              About GiftsGlam
            </p>

            <h2 className="mb-8 text-5xl font-bold leading-tight">
              Every Home Deserves Beauty, Warmth & Elegance.
            </h2>

            <p className="mb-6 text-lg leading-8 text-gray-700">
              GiftsGlam transforms ordinary spaces into elegant, welcoming homes
              through luxury décor, floral styling, gift hampers and personalized
              interior decoration services.
            </p>

            <p className="mb-8 text-lg leading-8 text-gray-700">
              We believe décor is more than furniture — it's the feeling your
              home gives everyone who walks through the door.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#D4AF37]" size={18} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      
{/* ================= OUR COLLECTION ================= */}

<section id="collection" className="bg-[#FAF8F2] px-6 py-24">
  <div className="mx-auto max-w-7xl">

    {/* Heading */}

    <div className="mb-14 text-center">
      <p className="font-semibold uppercase tracking-[4px] text-[#D4AF37]">
        GiftsGlam Collection
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        Elegant Pieces For Every Space
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
        Carefully selected décor designed to elevate living rooms,
        bedrooms, offices, dining spaces and celebrations.
      </p>
    </div>

    {/* Search */}

    <div className="mb-8">
      <input
        type="text"
        placeholder="Search mirrors, flowers, gift hampers..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="w-full rounded-full border border-[#D4AF37] bg-white px-6 py-4 outline-none focus:ring-2 focus:ring-[#D4AF37]"
      />
    </div>

    {/* Categories */}

    <div className="mb-12 flex flex-wrap justify-center gap-3">
      {categories.map((item)=>(
        <button
          key={item}
          onClick={()=>setCategory(item)}
          className={`rounded-full px-5 py-3 font-semibold transition ${
            category===item
              ? "bg-[#D4AF37] text-black"
              : "border border-[#D4AF37] text-[#B68D2A]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>

    {/* Products */}

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

     {filteredProducts.map((product: any, index: number) => (
  <div
    key={product.id ?? `product-${index}`}
    className="group overflow-hidden rounded-[30px] bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
  >

          <div className="overflow-hidden">
            <Image
              src={product.image || "/images/products/placeholder.jpg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          <div className="space-y-4 p-6">

            <div className="flex items-center justify-between">
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                {product.category}
              </span>

              {product.featured && (
                <span className="rounded-full bg-black px-3 py-1 text-xs text-[#D4AF37]">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold">
              {product.name}
            </h3>

            <p className="line-clamp-2 text-gray-600">
              {product.description}
            </p>

            <p className="text-2xl font-bold text-[#D4AF37]">
              ${product.price}
            </p>

            <div className="flex gap-3 pt-2">

              <button
                onClick={()=>setSelectedProduct(product)}
                className="flex-1 rounded-full border border-[#D4AF37] py-3 font-semibold text-[#B68D2A] transition hover:bg-[#D4AF37] hover:text-black"
              >
                View Details
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam! I'd like to order ${product.name} for $${product.price}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full rounded-full bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600">
                  Order Now
                </button>
              </a>

            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>

      {/* BEFORE & AFTER SECTION */}
<section
  id="transformations"
  className="bg-[#FAF8F2] px-6 py-24"
>
  <div className="max-w-7xl mx-auto">

    <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold text-center mb-3">
      Before & After
    </p>

    <h2 className="text-center text-5xl font-bold mb-16">
      Spaces Transformed By GiftsGlam
    </h2>

    <div className="grid lg:grid-cols-2 gap-10">

      <div className="bg-white rounded-[32px] shadow-lg overflow-hidden">
        <div className="grid grid-cols-2">
          <Image
            src="/images/transformations/before1.jpg"
            alt="Before Decoration"
            width={400}
            height={500}
            className="h-80 w-full object-cover"
          />

          <Image
            src="/images/transformations/after1.jpg"
            alt="After Decoration"
            width={400}
            height={500}
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">Living Room Makeover</h3>
          <p className="text-gray-600 leading-7">
            Elegant furniture styling, luxury mirrors, floral décor and warm
            gold accessories transformed this living room.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-lg overflow-hidden">
        <div className="grid grid-cols-2">
          <Image
            src="/images/transformations/before2.jpg"
            alt="Before Bedroom"
            width={400}
            height={500}
            className="h-80 w-full object-cover"
          />

          <Image
            src="/images/transformations/after2.jpg"
            alt="After Bedroom"
            width={400}
            height={500}
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">Bedroom Transformation</h3>
          <p className="text-gray-600 leading-7">
            Soft textures, elegant curtains, lighting and premium décor created
            a calm luxury bedroom.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>

{/* TESTIMONIALS */}
<section className="py-24 px-6 bg-[#FAF8F2]">
  <div className="max-w-7xl mx-auto">

    <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold text-center mb-3">
      Client Love
    </p>

    <h2 className="text-center text-5xl font-bold mb-16">
      What Our Clients Say
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {testimonials.map((client) => (
        <div
          key={client.name}
          className="bg-white rounded-[30px] shadow-lg p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-4 mb-6">

            <Image
              src={client.image}
              alt={client.name}
              width={70}
              height={70}
              className="rounded-full object-cover"
            />

            <div>
              <h4 className="font-bold text-lg">{client.name}</h4>

              <p className="text-[#D4AF37] text-sm">
                ★★★★★ Verified Client
              </p>
            </div>

          </div>

          <p className="text-gray-600 leading-8 italic">
            "{client.review}"
          </p>

        </div>
      ))}

    </div>

  </div>
</section>

      {/* SERVICES */}
      <section id="services" className="bg-[#121212] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 uppercase tracking-[4px] font-semibold text-[#D4AF37]">
            Our Services
          </p>

          <h2 className="mb-16 text-5xl font-bold">
            Luxury Decoration Services
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[28px] border border-yellow-700/20 bg-[#1C1C1C] p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]">
                  <Sparkles className="text-black" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>

                <p className="leading-7 text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-[#F7F3EA] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-center uppercase tracking-[4px] font-semibold text-[#D4AF37]">
            Inspiration Gallery
          </p>

          <h2 className="mb-16 text-center text-5xl font-bold">
            Beautiful Spaces We Love
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[28px] shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={600}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
{/* PRODUCT SHOP */}
<section className="py-24 px-6 bg-[#FFFDF8]">
  <div className="max-w-7xl mx-auto">

    <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold text-center mb-3">
      Shop GiftsGlam
    </p>

    <h2 className="text-center text-5xl font-bold mb-16">
      Our Best Selling Décor Pieces
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {products.map((product) => (
        <div
          key={product.name}
          className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition"
        >
          <div className="overflow-hidden">
  <Image
    src={product.image || "/images/products/placeholder.jpg"}
    alt={product.name}
    width={500}
    height={500}
    className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
  />
</div>

          <div className="p-6">

            <p className="text-sm uppercase tracking-[2px] text-[#D4AF37] font-semibold">
              {product.category}
            </p>

            <h3 className="text-2xl font-bold mt-2 mb-3">
              {product.name}
            </h3>

           <p className="text-2xl font-bold text-[#D4AF37] mb-6">
  ${product.price}
          </p>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam 🌸 I would like to order the ${product.name} (${product.price}).`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-3 rounded-full font-semibold text-black hover:scale-[1.02] transition">
                Order on WhatsApp
              </button>
            </a>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

{"/* BOOK CONSULTATION */"}
<section className="bg-[#F8F4EC] px-6 py-24">
  <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
    {/* Left Side */}
    <div>
      <p className="mb-3 font-semibold uppercase tracking-[4px] text-[#D4AF37]">
        Luxury Consultation
      </p>

      <h2 className="mb-8 text-5xl font-bold leading-tight">
        Book Your Home Decoration Consultation
      </h2>

      <p className="text-lg leading-8 text-gray-700">
        Tell us about your space and we'll create a personalized decoration plan
        that matches your style and budget.
      </p>

      <div className="mt-10 space-y-6">
        {[
          "Free initial consultation.",
          "Personalized décor recommendations.",
          "WhatsApp follow-up after booking.",
          "Available for homes, offices and events.",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle className="text-[#D4AF37]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Form */}
    <div className="rounded-[35px] bg-white p-8 shadow-xl">
      <div className="grid gap-5">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <input
          type="text"
          placeholder="City / Location"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <select
          value={form.service}
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        >
          <option>Home Decoration</option>
          <option>Living Room Styling</option>
          <option>Bedroom Styling</option>
          <option>Office Decoration</option>
          <option>Event Decoration</option>
          <option>Gift Hampers</option>
        </select>

        <input
          type="text"
          placeholder="Budget (Optional)"
          value={form.budget}
          onChange={(e) =>
            setForm({ ...form, budget: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <textarea
          placeholder="Tell us about your dream space..."
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
        />

        <a
          href={`https://wa.me/${whatsappNumber}?text=✨ GiftsGlam Consultation Booking

Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Service: ${form.service}
Budget: ${form.budget}
Preferred Date: ${form.date}

Message:
${form.message}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
  onClick={bookConsultation}
  className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
>
  Book Consultation on WhatsApp
</button>
        </a>
      </div>
    </div>
  </div>
</section>

      {/* CONTACT */}
      
{"/* ================= CONTACT EXPERIENCE ================= */"}

<section id="contact" className="bg-[#1A1A1A] px-6 py-24 text-white">
  <div className="mx-auto max-w-7xl">

    <div className="mb-16 text-center">
      <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold">
        Contact GiftsGlam
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        Let's Create Your Dream Space
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 leading-8">
        Whether it's your living room, bedroom, office, wedding or a custom gift,
        GiftsGlam is ready to bring elegance into your space.
      </p>
    </div>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="space-y-6">

        <div className="rounded-[28px] bg-[#222222] p-6">
          <p className="text-sm uppercase text-[#D4AF37]">WhatsApp</p>

          <h3 className="mt-2 text-2xl font-bold">
            +257 XXX XXX XXX
          </h3>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-5 rounded-full bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600">
              Chat on WhatsApp
            </button>
          </a>
        </div>

        <div className="rounded-[28px] bg-[#222222] p-6">
          <p className="text-sm uppercase text-[#D4AF37]">Email</p>

          <h3 className="mt-2 text-xl font-semibold">
            hello@giftsglam.com
          </h3>
        </div>

        <div className="rounded-[28px] bg-[#222222] p-6">
          <p className="text-sm uppercase text-[#D4AF37]">Location</p>

          <h3 className="mt-2 text-xl font-semibold">
            Bujumbura, Burundi
          </h3>

          <p className="mt-2 text-gray-400">
            We offer home decoration and event styling across Burundi.
          </p>
        </div>

        <div className="rounded-[28px] bg-[#222222] p-6">
          <p className="text-sm uppercase text-[#D4AF37] mb-5">
            Business Hours
          </p>

          {[
            ["Monday - Friday", "8:00 AM – 6:00 PM"],
            ["Saturday", "9:00 AM – 4:00 PM"],
            ["Sunday", "By Appointment"],
          ].map(([day, hours]) => (
            <div key={day} className="flex justify-between border-b border-gray-700 py-3">
              <span>{day}</span>
              <span className="text-[#D4AF37]">{hours}</span>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="rounded-[35px] bg-white p-8 text-black shadow-2xl">

        <h3 className="mb-6 text-3xl font-bold">
          Book a Free Consultation
        </h3>

        <div className="space-y-5">

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <input
            placeholder="WhatsApp Number"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e)=>setForm({...form,city:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <select
            value={form.service}
            onChange={(e)=>setForm({...form,service:e.target.value})}
            className="w-full rounded-xl border p-4"
          >
            <option>Home Decoration</option>
            <option>Living Room Styling</option>
            <option>Bedroom Styling</option>
            <option>Office Decoration</option>
            <option>Wedding Decoration</option>
            <option>Event Decoration</option>
            <option>Gift Hampers</option>
          </select>

          <input
            placeholder="Budget (Optional)"
            value={form.budget}
            onChange={(e)=>setForm({...form,budget:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e)=>setForm({...form,date:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <textarea
            rows={5}
            placeholder="Tell us about your dream space..."
            value={form.message}
            onChange={(e)=>setForm({...form,message:e.target.value})}
            className="w-full rounded-xl border p-4"
          />

          <button
            onClick={bookConsultation}
            className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-4 text-lg font-bold text-black hover:scale-[1.02] transition"
          >
            Book Consultation
          </button>

        </div>
      </div>

    </div>
  </div>
</section>


{"/* ================= MAP ================= */"}

<section className="bg-[#FAF8F2] px-6 py-20">
  <div className="mx-auto max-w-7xl">

    <div className="mb-10 text-center">
      <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold">
        Visit GiftsGlam
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Serving Clients Across Burundi
      </h2>
    </div>

    <div className="overflow-hidden rounded-[35px] shadow-xl">
      <iframe
        src="https://www.google.com/maps?q=Bujumbura,Burundi&output=embed"
        width="100%"
        height="450"
        loading="lazy"
        className="border-0"
      ></iframe>
    </div>

  </div>
</section>


{"/* ================= FAQ ================= */"}

<section className="bg-white px-6 py-24">
  <div className="mx-auto max-w-5xl">

    <div className="mb-14 text-center">
      <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold">
        Frequently Asked Questions
      </p>

      <h2 className="mt-4 text-5xl font-bold">
        Everything You Need To Know
      </h2>
    </div>

    {[
      {
        q:"Do you decorate homes outside Bujumbura?",
        a:"Yes. GiftsGlam offers decoration services across Burundi depending on the project."
      },
      {
        q:"Do you decorate weddings and events?",
        a:"Yes. We design weddings, birthdays, baby showers, corporate events and intimate celebrations."
      },
      {
        q:"Can I customize a gift hamper?",
        a:"Absolutely. Every hamper can be personalized for birthdays, weddings, Eid, Christmas and special occasions."
      },
      {
        q:"How does the consultation work?",
        a:"Book through the website or WhatsApp. We'll discuss your space, budget and preferred style."
      },
      {
        q:"How long does a decoration project take?",
        a:"Small styling projects can be completed within days, while larger home or event projects depend on scope."
      }
    ].map((faq,index)=>(

      <div
        key={index}
        className="mb-5 overflow-hidden rounded-[24px] border"
      >

        <button
          onClick={()=>setOpenFAQ(openFAQ===index?null:index)}
          className="flex w-full items-center justify-between bg-[#FAF8F2] p-6 text-left text-lg font-semibold"
        >
          {faq.q}

          <span className="text-2xl text-[#D4AF37]">
            {openFAQ===index ? "−" : "+"}
          </span>
        </button>

        {openFAQ===index && (
          <div className="bg-white px-6 pb-6 text-gray-600 leading-8">
            {faq.a}
          </div>
        )}

      </div>

    ))}

  </div>
</section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-[#D4AF37]">GiftsGlam</h2>

            <p className="mt-2 text-gray-400">
              Transforming Houses Into Beautiful Homes.
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-500/40 p-3 transition hover:bg-green-500 hover:text-white"
          >
            <MessageCircle size={22} />
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © 2026 GiftsGlam. All Rights Reserved.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600"
      >
        <MessageCircle size={30} />
      </a>
      
{/* PRODUCT MODAL */}

{selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

    <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[35px] bg-white">

      <div className="grid lg:grid-cols-2">

        <Image
          src={selectedProduct.image || "/images/products/placeholder.jpg"}
          alt={selectedProduct.name}
          width={700}
          height={700}
          className="h-full w-full object-cover"
        />

        <div className="space-y-6 p-8">

          <div className="flex items-center justify-between">
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
              {selectedProduct.category}
            </span>

            <button
              onClick={()=>setSelectedProduct(null)}
              className="text-3xl text-gray-400 hover:text-black"
            >
              ×
            </button>
          </div>

          <h2 className="text-4xl font-bold">
            {selectedProduct.name}
          </h2>

          <p className="text-3xl font-bold text-[#D4AF37]">
            ${selectedProduct.price}
          </p>

          <p className="leading-8 text-gray-600">
            {selectedProduct.description}
          </p>

          <div className="rounded-3xl bg-[#FAF8F2] p-5">
            <h4 className="mb-3 text-lg font-semibold">
              Perfect For
            </h4>

            <ul className="space-y-2 text-gray-600">
              <li>• Luxury homes</li>
              <li>• Apartments</li>
              <li>• Weddings & Events</li>
              <li>• Office decoration</li>
              <li>• Gift ideas</li>
            </ul>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello GiftsGlam! I'm interested in ${selectedProduct.name}.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full rounded-full bg-green-500 py-4 text-lg font-semibold text-white hover:bg-green-600">
              Order via WhatsApp
            </button>
          </a>

        </div>
      </div>

    </div>
  </div>
)}

{"/* SUCCESS POPUP */"}

{showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

    <div className="max-w-md rounded-[35px] bg-white p-10 text-center shadow-2xl">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✓
      </div>

      <h2 className="mt-6 text-3xl font-bold text-[#B68D2A]">
        Booking Received!
      </h2>

      <p className="mt-4 text-gray-600 leading-7">
        Thank you for choosing GiftsGlam.
        Your consultation request has been saved,
        and we'll contact you on WhatsApp shortly.
      </p>

      <button
        onClick={()=>setShowSuccess(false)}
        className="mt-8 rounded-full bg-[#D4AF37] px-8 py-3 font-semibold text-black"
      >
        Close
      </button>

    </div>
  </div>
)}
    </main>
  );
}