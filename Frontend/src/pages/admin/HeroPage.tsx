import { useEffect, useState } from "react";
import api from "@/lib/api";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

const initialForm = {
  title: "",
  subtitle: "",
  buttonText: "",
  buttonLink: "",
  displayOrder: 1,
  isActive: true,
};

export default function HeroPage() {
  const [heroes, setHeroes] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState(initialForm);

  //---------------------------------------
  // Fetch Hero Slides
  //---------------------------------------
const fetchHeroes = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await api.get("/hero/admin");

    setHeroes(res.data.data);
  } catch (err: any) {
    setError(
      err.response?.data?.message || "Failed to load hero slides."
    );
  } finally {
    setLoading(false);
  }
};
  //---------------------------------------
  // Reset Form
  //---------------------------------------

  const resetForm = () => {
    setForm(initialForm);
    setSelectedImage(null);
    setPreview("");
    setEditingId(null);
    setShowModal(false);
  };

  //---------------------------------------
  // Open Create Modal
  //---------------------------------------

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  //---------------------------------------
  // Open Edit Modal
  //---------------------------------------

  const openEditModal = (hero: HeroSlide) => {
    setEditingId(hero.id);
    setForm({
      title: hero.title,
      subtitle: hero.subtitle,
      buttonText: hero.buttonText,
      buttonLink: hero.buttonLink,
      displayOrder: hero.displayOrder,
      isActive: hero.isActive,
    });
    setPreview(hero.imageUrl);
    setSelectedImage(null);
    setShowModal(true);
  };

  //---------------------------------------
  // Initial Load
  //---------------------------------------

  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? Number(value) : value,
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

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  //---------------------------------------
  // Create / Update Hero
  //---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("buttonText", form.buttonText);
      formData.append("buttonLink", form.buttonLink);
      formData.append("displayOrder", String(form.displayOrder));
      formData.append("isActive", String(form.isActive));

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (editingId) {
        await api.put(`/hero/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/hero", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchHeroes();

      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  //---------------------------------------
  // Delete Hero
  //---------------------------------------

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this hero slide?");
    if (!confirmed) return;

    try {
      await api.delete(`/hero/${id}`);
      await fetchHeroes();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete hero.");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hero Management</h1>
          <p className="mt-1 text-gray-500">Manage homepage hero slides.</p>
        </div>

        <button
          onClick={openCreateModal}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          + Add Hero
        </button>
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
          Loading hero slides...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-center">Order</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {heroes.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No hero slides found.
                  </td>
                </tr>
              ) : (
                heroes.map((hero) => (
                  <tr
                    key={hero.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={hero.imageUrl}
                        alt={hero.title}
                        className="h-20 w-32 rounded-lg object-cover"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold">{hero.title}</div>
                      <div className="mt-1 text-sm text-gray-500">
                        {hero.subtitle}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">{hero.displayOrder}</td>

                    <td className="px-4 py-3 text-center">
                      {hero.isActive ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="space-x-2 px-4 py-3 text-center">
                      <button
                        onClick={() => openEditModal(hero)}
                        disabled={saving}
                        className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(hero.id)}
                        disabled={saving}
                        className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">
              {editingId ? "Edit Hero Slide" : "Add Hero Slide"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="mb-2 block font-medium">Subtitle</label>
                <textarea
                  rows={3}
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="mb-2 block font-medium">Button Text</label>
                <input
                  type="text"
                  name="buttonText"
                  value={form.buttonText}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Button Link */}
              <div>
                <label className="mb-2 block font-medium">Button Link</label>
                <input
                  type="text"
                  name="buttonLink"
                  value={form.buttonLink}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-2 block font-medium">Display Order</label>
                <input
                  type="number"
                  min={1}
                  name="displayOrder"
                  value={form.displayOrder}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block font-medium">Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                  {...(!editingId ? { required: true } : {})}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Hero Preview"
                    className="mt-4 h-52 w-full rounded-lg border object-cover"
                  />
                )}
              </div>

              {/* Active */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleInputChange}
                />

                <label className="font-medium">Active Hero Slide</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  disabled={saving}
                  onClick={resetForm}
                  className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

