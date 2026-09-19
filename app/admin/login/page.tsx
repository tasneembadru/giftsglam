
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F2] px-6">
      <div className="w-full max-w-md rounded-[35px] bg-white p-10 shadow-2xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-[#D4AF37]">
          GiftsGlam
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Admin Dashboard Login
        </p>

        <div className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-4 outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-12 outline-none focus:border-[#D4AF37]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-4 text-lg font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login to Dashboard"}
          </button>
        </div>
      </div>
    </main>
  );
}