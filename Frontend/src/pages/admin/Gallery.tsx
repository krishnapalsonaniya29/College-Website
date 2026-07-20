import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Edit,
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/api";

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  imagePublicId: string;
  category: string;
  departmentId: number | null;

  department?: {
    id: number;
    name: string;
  } | null;

  isActive: boolean;
  createdAt: string;
}

interface Department {
  id: number;
  name: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "CAMPUS",
    departmentId: "",
    isActive: true,
  });

  useEffect(() => {
    fetchGallery();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (form.category !== "DEPARTMENT") {
      setForm((prev) => ({
        ...prev,
        departmentId: "",
      }));
    }
  }, [form.category]);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery/admin");

      setGallery(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");

      setDepartments(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingId(null);

    setImageFile(null);

    setPreview("");

    setForm({
      title: "",
      category: "CAMPUS",
      departmentId: "",
      isActive: true,
    });

    setShowModal(true);
  };

  const openEditModal = (item: GalleryImage) => {
    setEditingId(item.id);

    setImageFile(null);

    setPreview(item.imageUrl);

    setForm({
      title: item.title,
      category: item.category,
      departmentId:
  item.departmentId !== null
    ? String(item.departmentId)
    : "",
      isActive: item.isActive,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditingId(null);

    setImageFile(null);

    setPreview("");

    setForm({
      title: "",
      category: "CAMPUS",
      departmentId: "",
      isActive: true,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
       if (!editingId && !imageFile) {
      toast.error("Please select an image.");
      return;
    }

      setSubmitting(true);

      const data = new FormData();

      data.append("title", form.title);
      data.append("category", form.category);
      data.append("isActive", String(form.isActive));

      if (form.departmentId) {
        data.append("departmentId", form.departmentId);
      }

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (editingId) {
        await api.put(`/gallery/admin/${editingId}`, data);

        toast.success("Gallery image updated successfully.");
      } else {
        await api.post("/gallery/admin", data);

        toast.success("Gallery image uploaded successfully.");
      }

      closeModal();

      fetchGallery();
    } catch (err) {
      console.error(err);

      toast.error("Unable to save gallery image.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/gallery/admin/${deleteId}`);

      toast.success("Gallery image deleted.");

      setDeleteId(null);
      setDeleteTitle("");

      fetchGallery();
    } catch (err) {
      console.error(err);

      toast.error("Unable to delete gallery image.");
    }
  };
    return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Gallery Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage gallery images displayed on the website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Upload Image
        </button>
      </div>

      {/* Filters */}

      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-4 outline-none focus:border-blue-500"
        >
          <option value="ALL">All Categories</option>
          <option value="CAMPUS">Campus</option>
          <option value="EVENT">Event</option>
          <option value="SPORTS">Sports</option>
          <option value="CULTURAL">Cultural</option>
          <option value="LABORATORY">Laboratory</option>
          <option value="DEPARTMENT">Department</option>
          <option value="NSS">NSS</option>
          <option value="NCC">NCC</option>
        </select>
      </div>

      {/* Gallery */}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-xl bg-white shadow"
            >
              <div className="aspect-[4/3] bg-gray-200" />

              <div className="space-y-3 p-4">
                <div className="h-5 rounded bg-gray-200" />

                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="rounded-xl border border-dashed py-20 text-center">
          <ImageIcon
            size={60}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-xl font-semibold">
            No Images Found
          </h2>

          <p className="mt-2 text-gray-500">
            Upload your first gallery image.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="space-y-3 p-4">
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.category}
                  </span>
                  {item.department && (
  <p className="text-xs text-gray-500">
    {item.department.name}
  </p>
)}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-end gap-2 border-t pt-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="rounded-lg border p-2 transition hover:bg-blue-50"
                  >
                    <Edit
                      size={18}
                      className="text-blue-600"
                    />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(item.id);
                      setDeleteTitle(item.title);
                    }}
                    className="rounded-lg border p-2 transition hover:bg-red-50"
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
            {/* Upload / Edit Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Gallery Image"
                  : "Upload Gallery Image"}
              </h2>

              <button
                onClick={closeModal}
                className="rounded-md p-1 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {/* Title */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Enter image title"
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                >
                  <option value="CAMPUS">Campus</option>
                  <option value="EVENT">Event</option>
                  <option value="SPORTS">Sports</option>
                  <option value="CULTURAL">Cultural</option>
                  <option value="LABORATORY">Laboratory</option>
                  <option value="DEPARTMENT">Department</option>
                  <option value="NSS">NSS</option>
                  <option value="NCC">NCC</option>
                </select>
              </div>

              {/* Department */}

              {form.category === "DEPARTMENT" && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Department
                  </label>

                  <select
                    name="departmentId"
                    value={form.departmentId}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  >
                    <option value="">
                      Select Department
                    </option>

                    {departments.map((department) => (
                      <option
                        key={department.id}
                        value={department.id}
                      >
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Image */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border p-2"
                />
              </div>

              {/* Preview */}

              {preview && (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-56 w-full rounded-lg border object-cover"
                  />
                </div>
              )}

              {/* Status */}

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />

                <span>Active</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t p-5">
              <button
                onClick={closeModal}
                className="rounded-lg border px-5 py-2 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload size={18} />

                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
            <div className="p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="text-red-600" />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                Delete Gallery Image
              </h2>

              <p className="mt-3 text-gray-600">
                Are you sure you want to delete
              </p>

              <p className="mt-1 font-semibold">
                "{deleteTitle}"
              </p>

              <p className="mt-4 text-sm text-red-500">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t p-5">
              <button
                onClick={() => {
                  setDeleteId(null);
                  setDeleteTitle("");
                }}
                className="rounded-lg border px-5 py-2 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}