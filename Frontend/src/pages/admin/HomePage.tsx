import { useEffect, useState } from "react";
import api from "@/lib/api";

interface HomeConfig {
  id: number;

  directorName: string;
  directorPhotoUrl: string;
  directorMessage: string;

  totalStudents: number;
  ugStudents: number;
  pgStudents: number;
  girls: number;
  boys: number;

  academicSession: string;

  thought: string;
  thoughtAuthor: string;
}

const initialForm = {
  directorName: "",
  directorMessage: "",

  totalStudents: 0,
  ugStudents: 0,
  pgStudents: 0,
  girls: 0,
  boys: 0,

  academicSession: "",

  thought: "",
  thoughtAuthor: "",
};

export default function HomePage() {
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  //---------------------------------------
  // Fetch Home Configuration
  //---------------------------------------

  const fetchHomeConfig = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/home/admin");

      const data: HomeConfig = res.data.data;

      setForm({
        directorName: data.directorName,
        directorMessage: data.directorMessage,

        totalStudents: data.totalStudents,
        ugStudents: data.ugStudents,
        pgStudents: data.pgStudents,
        girls: data.girls,
        boys: data.boys,

        academicSession: data.academicSession,

        thought: data.thought,
        thoughtAuthor: data.thoughtAuthor,
      });

      setPreview(data.directorPhotoUrl);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to load home configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------
  // Reset Form
  //---------------------------------------

  const resetForm = async () => {
    setSelectedImage(null);
    await fetchHomeConfig();
  };

  //---------------------------------------
  // Initial Load
  //---------------------------------------

  useEffect(() => {
    fetchHomeConfig();
  }, []);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //---------------------------------------
  // Handle Input Change
  //---------------------------------------

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  };

  //---------------------------------------
  // Handle Image
  //---------------------------------------

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };
    //---------------------------------------
  // Save Home Configuration
  //---------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("directorName", form.directorName);
      formData.append("directorMessage", form.directorMessage);

      formData.append(
        "totalStudents",
        String(form.totalStudents)
      );

      formData.append(
        "ugStudents",
        String(form.ugStudents)
      );

      formData.append(
        "pgStudents",
        String(form.pgStudents)
      );

      formData.append("girls", String(form.girls));

      formData.append("boys", String(form.boys));

      formData.append(
        "academicSession",
        form.academicSession
      );

      formData.append("thought", form.thought);

      formData.append(
        "thoughtAuthor",
        form.thoughtAuthor
      );

      if (selectedImage) {
        formData.append(
          "directorPhoto",
          selectedImage
        );
      }

      await api.put("/home/admin", formData, {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      });

      await fetchHomeConfig();

      alert("Home configuration updated successfully.");

      setSelectedImage(null);
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to update home configuration."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Home Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage homepage content.
          </p>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading home configuration...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Director Information */}

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold">
              Director Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">
                  Director Name
                </label>

                <input
                  type="text"
                  name="directorName"
                  value={form.directorName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Director Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Director Message
                </label>

                <textarea
                  rows={6}
                  name="directorMessage"
                  value={form.directorMessage}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {preview && (
                <div className="md:col-span-2">
                  <img
                    src={preview}
                    alt="Director"
                    className="h-64 rounded-lg border object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Student Statistics */}

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold">
              Student Statistics
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-2 block font-medium">
                  Total Students
                </label>

                <input
                  type="number"
                  name="totalStudents"
                  value={form.totalStudents}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  UG Students
                </label>

                <input
                  type="number"
                  name="ugStudents"
                  value={form.ugStudents}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  PG Students
                </label>

                <input
                  type="number"
                  name="pgStudents"
                  value={form.pgStudents}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Girls
                </label>

                <input
                  type="number"
                  name="girls"
                  value={form.girls}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Boys
                </label>

                <input
                  type="number"
                  name="boys"
                  value={form.boys}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
                    {/* Academic Session */}

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold">
              Academic Session
            </h2>

            <div>
              <label className="mb-2 block font-medium">
                Academic Session
              </label>

              <input
                type="text"
                name="academicSession"
                value={form.academicSession}
                onChange={handleInputChange}
                placeholder="2026-2027"
                className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Thought of the Day */}

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-semibold">
              Thought of the Day
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">
                  Thought
                </label>

                <textarea
                  rows={5}
                  name="thought"
                  value={form.thought}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Thought Author
                </label>

                <input
                  type="text"
                  name="thoughtAuthor"
                  value={form.thoughtAuthor}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={resetForm}
              className="rounded-lg border px-6 py-3 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}