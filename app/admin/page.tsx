
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Package,
  Star,
  PlusCircle,
  DollarSign,
  Tag,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string | null;
  featured: boolean;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
  name: "",
  category: "Living Room",
  price: "",
  description: "",
  image: "",
  featured: false,
});
const [imageFile, setImageFile] = useState<File | null>(null);
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }

    setLoading(false);
  }
async function addProduct() {
  if (!newProduct.name || !newProduct.price) {
    alert("Please fill in the product name and price.");
    return;
  }

  let imageUrl = newProduct.image;

  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    imageUrl = supabase.storage
      .from("products")
      .getPublicUrl(fileName).data.publicUrl;
  }

  if (editingId) {
    const { error } = await supabase
      .from("products")
      .update({
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        description: newProduct.description,
        image: imageUrl,
        featured: newProduct.featured,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product updated successfully!");
  } else {
    const { error } = await supabase.from("products").insert({
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      description: newProduct.description,
      image: imageUrl,
      featured: newProduct.featured,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product added successfully!");
  }

  setEditingId(null);

  setNewProduct({
    name: "",
    category: "Living Room",
    price: "",
    description: "",
    image: "",
    featured: false,
  });

  setImageFile(null);

  fetchProducts();
}
function startEditing(product: Product) {
  setEditingId(product.id);

  setNewProduct({
    name: product.name,
    category: product.category,
    price: String(product.price),
    description: product.description,
    image: product.image || "",
    featured: product.featured,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function deleteProduct(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchProducts();
}

  useEffect(() => {
  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    fetchProducts();
  }

  checkUser();
}, [router]);
  return (
    <main className="min-h-screen bg-[#FAF8F2] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-wrap gap-4">
  <button
    onClick={() => router.push("/admin/orders")}
    className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] px-6 py-3 font-semibold text-black"
  >
    View Consultation Orders
  </button>
<button
  onClick={() => router.push("/admin/projects")}
  className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] px-6 py-3 font-semibold text-black"
>
  Manage Portfolio Projects
</button>
  <button
    onClick={() => router.push("/")}
    className="rounded-full border border-[#D4AF37] px-6 py-3 font-semibold text-[#D4AF37]"
  >
    View Website
  </button>
</div>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[3px] text-[#D4AF37] font-semibold">
              GiftsGlam Admin
            </p>

            <h1 className="text-4xl font-bold">
              Product Dashboard
            </h1>
          </div>
<button
  onClick={async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }}
  className="rounded-full bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600 transition"
>
  Logout
</button>
        
<div className="rounded-[32px] bg-white p-8 shadow-xl mb-12">
  <div className="mb-6 flex items-center gap-3">
    <PlusCircle className="text-[#D4AF37]" />
    <h2 className="text-2xl font-bold">
  {editingId ? "Edit Product" : "Add New Product"}
</h2>
  </div>

  <div className="grid gap-5 md:grid-cols-2">
    <input
      type="text"
      placeholder="Product Name"
      value={newProduct.name}
      onChange={(e) =>
        setNewProduct({ ...newProduct, name: e.target.value })
      }
      className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
    />

    <select
      value={newProduct.category}
      onChange={(e) =>
        setNewProduct({ ...newProduct, category: e.target.value })
      }
      className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
    >
      <option>Living Room</option>
      <option>Bedroom</option>
      <option>Dining</option>
      <option>Flowers</option>
      <option>Gift Hampers</option>
      <option>Office</option>
    </select>

    <input
      type="number"
      placeholder="Price"
      value={newProduct.price}
      onChange={(e) =>
        setNewProduct({ ...newProduct, price: e.target.value })
      }
      className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
    />

    <div className="md:col-span-2">
  <label className="mb-2 block font-medium text-gray-700">
    Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    }}
    className="w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#D4AF37] file:px-4 file:py-2 file:font-semibold file:text-black"
  />

  {imageFile && (
    <p className="mt-2 text-sm text-green-600">
      Selected: {imageFile.name}
    </p>
  )}
</div>

    <textarea
      placeholder="Product Description"
      value={newProduct.description}
      onChange={(e) =>
        setNewProduct({ ...newProduct, description: e.target.value })
      }
      rows={4}
      className="rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37] md:col-span-2"
    />

    <label className="flex items-center gap-3 md:col-span-2">
      <input
        type="checkbox"
        checked={newProduct.featured}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            featured: e.target.checked,
          })
        }
        className="h-5 w-5 accent-[#D4AF37]"
      />

      <span>Mark as Featured Product</span>
    </label>

    <button
  onClick={addProduct}
  className="md:col-span-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
>
  {editingId ? "Update Product" : "Save Product"}
</button>
  </div>
</div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="mb-3 flex items-center gap-3">
              <Package className="text-[#D4AF37]" />
              <p>Total Products</p>
            </div>

            <h2 className="text-4xl font-bold">
              {products.length}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="mb-3 flex items-center gap-3">
              <Star className="text-[#D4AF37]" />
              <p>Featured Products</p>
            </div>

            <h2 className="text-4xl font-bold">
              {products.filter((p) => p.featured).length}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="mb-3 flex items-center gap-3">
              <DollarSign className="text-[#D4AF37]" />
              <p>Categories</p>
            </div>

            <h2 className="text-4xl font-bold">
              {new Set(products.map((p) => p.category)).size}
            </h2>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-gray-500">
            Loading products...
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-lg"
              >
                <Image
                  src={product.image || "/images/products/placeholder.jpg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover"
                />

                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                      {product.category}
                    </span>

                    {product.featured && (
                      <Star
                        size={18}
                        className="fill-[#D4AF37] text-[#D4AF37]"
                      />
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
    onClick={() => startEditing(product)}
    className="flex-1 rounded-xl border border-[#D4AF37] py-2 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(product.id)}
    className="flex-1 rounded-xl bg-red-500 py-2 text-white transition hover:bg-red-600"
  >
    Delete
  </button>
</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow">
            <Tag className="mx-auto mb-4 text-[#D4AF37]" size={50} />

            <h2 className="mb-2 text-2xl font-bold">
              No Products Yet
            </h2>

            <p className="text-gray-600">
              Start adding products to GiftsGlam.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

