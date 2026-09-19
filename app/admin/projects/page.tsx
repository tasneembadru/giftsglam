
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  before_image: string | null;
  after_image: string | null;
  featured: boolean;
};

export default function ProjectsAdmin() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Living Room");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects((data as Project[]) || []);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function uploadImage(file: File) {
    const filename = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(filename, file);

    if (error) throw error;

    return supabase.storage
      .from("projects")
      .getPublicUrl(filename).data.publicUrl;
  }

  async function addProject() {
    if (!title || !beforeFile || !afterFile) {
      alert("Title, before image and after image are required.");
      return;
    }

    const beforeURL = await uploadImage(beforeFile);
    const afterURL = await uploadImage(afterFile);

    const { error } = await supabase.from("projects").insert({
      title,
      category,
      location,
      description,
      before_image: beforeURL,
      after_image: afterURL,
      featured,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setCategory("Living Room");
    setLocation("");
    setDescription("");
    setFeatured(false);
    setBeforeFile(null);
    setAfterFile(null);

    fetchProjects();
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[4px] text-[#D4AF37] font-semibold">
              GiftsGlam Admin
            </p>

            <h1 className="text-4xl font-bold">
              Projects Portfolio
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="rounded-full border border-[#D4AF37] px-5 py-3 font-semibold text-[#D4AF37]"
          >
            Back Dashboard
          </button>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-xl mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            Add New Project
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Project Title"
              className="rounded-xl border p-4"
            />

            <input
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              placeholder="Project Location"
              className="rounded-xl border p-4"
            />

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="rounded-xl border p-4"
            >
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Dining</option>
              <option>Office</option>
              <option>Events</option>
              <option>Flowers</option>
            </select>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e)=>setFeatured(e.target.checked)}
              />

              Featured Project
            </label>

            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Project Story"
              rows={4}
              className="rounded-xl border p-4 md:col-span-2"
            />

            <div>
              <label className="font-medium">
                Before Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  if(e.target.files?.[0]){
                    setBeforeFile(e.target.files[0]);
                  }
                }}
                className="mt-2 w-full"
              />
            </div>

            <div>
              <label className="font-medium">
                After Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  if(e.target.files?.[0]){
                    setAfterFile(e.target.files[0]);
                  }
                }}
                className="mt-2 w-full"
              />
            </div>

            <button
              onClick={addProject}
              className="md:col-span-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27A] py-4 text-lg font-semibold text-black"
            >
              Save Project
            </button>

          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project)=>(
            <div
              key={project.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-lg"
            >
              <Image
                src={project.after_image || "/images/projects/living-room.jpg"}
                alt={project.title}
                width={600}
                height={500}
                className="h-64 w-full object-cover"
              />

              <div className="space-y-3 p-5">

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                  {project.category}
                </span>

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-500">
                  {project.location}
                </p>

                <p className="line-clamp-3 text-gray-600">
                  {project.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}