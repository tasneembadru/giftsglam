
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MessageCircle,
  User,
  MapPin,
  Phone,
} from "lucide-react";

type Booking = {
  id: string;
  full_name: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
};

export default function OrdersPage() {
  const router = useRouter();
const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookings(data as Booking[]);
    }

    setLoading(false);
  }
  async function updateStatus(id: string, status: string) {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchBookings();
}
async function deleteBooking(id: string) {
  const confirmed = window.confirm(
    "Delete this consultation booking?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchBookings();
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

      fetchBookings();
    }

    checkUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#FAF8F2] p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              GiftsGlam Admin
            </p>

            <h1 className="text-4xl font-bold">
              Consultation Bookings
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="rounded-full border border-[#D4AF37] px-5 py-3 font-semibold text-[#D4AF37]"
          >
            Back to Products
          </button>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow">
            <p>Total Bookings</p>

            <h2 className="mt-2 text-4xl font-bold text-[#D4AF37]">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <p>New Requests</p>

            <h2 className="mt-2 text-4xl font-bold text-[#D4AF37]">
              {bookings.filter((b) => b.status === "New").length}
            </h2>
          </div>
        </div>
        <div className="mb-8 rounded-3xl bg-white p-5 shadow">
  <input
    type="text"
    placeholder="Search customer by name or phone..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#D4AF37]"
  />
</div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-[#D4AF37] text-black">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Budget</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
               bookings
  .filter((booking) =>
    booking.full_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    booking.phone.includes(search)
  )
  .map((booking) => (
                  <tr key={booking.id} className="border-b">

                    <td className="p-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold">
                          <User size={16} />
                          {booking.full_name}
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Phone size={14} />
                          {booking.phone}
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin size={14} />
                          {booking.city}
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <CalendarDays size={14} />
                          {booking.preferred_date || "No date selected"}
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <div>
                        <p className="font-semibold">{booking.service}</p>

                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                          {booking.message}
                        </p>
                      </div>
                    </td>

                    <td className="p-5 font-semibold text-[#D4AF37]">
                      {booking.budget || "—"}
                    </td>

                    <td className="p-5">
  <select
    value={booking.status}
    onChange={(e) =>
      updateStatus(booking.id, e.target.value)
    }
    className="rounded-full border border-[#D4AF37] bg-yellow-50 px-3 py-2 text-sm font-semibold text-[#B68D2A] outline-none"
  >
    <option>New</option>
    <option>Contacted</option>
    <option>Completed</option>
  </select>
</td>

                    <td className="p-5">
  <div className="flex flex-col gap-2">
    <a
      href={`https://wa.me/${booking.phone}?text=Hello ${booking.full_name}, thank you for contacting GiftsGlam regarding your ${booking.service}.`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white hover:bg-green-600">
        <MessageCircle size={16} />
        WhatsApp
      </button>
    </a>

    <button
      onClick={() => deleteBooking(booking.id)}
      className="w-full rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}