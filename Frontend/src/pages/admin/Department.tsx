import { useEffect, useState} from "react";

import type { ChangeEvent, FormEvent } from "react";
import {
  Edit,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
  Loader2,
} from "lucide-react";

import api from "@/lib/api";

interface Department {
  id: number;
  name: string;
  slug: string;

  logoUrl: string;
  logoPublicId?: string;

  description: string;
  vision: string;
  mission: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

const initialForm = {
  name: "",
  slug: "",
  description: "",
  vision: "",
  mission: "",
  isActive: true,
};

function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [form, setForm] = useState(initialForm);

  const [selectedLogo, setSelectedLogo] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string>("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/departments/admin/all"
      );

      setDepartments(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleLogo = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedLogo(file);

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(initialForm);

    setEditingId(null);

    setSelectedLogo(null);

    setPreview("");
  };
    const handleEdit = (department: Department) => {
    setEditingId(department.id);

    setForm({
      name: department.name,
      slug: department.slug,
      description: department.description,
      vision: department.vision,
      mission: department.mission,
      isActive: department.isActive,
    });

    setPreview(department.logoUrl);

    setSelectedLogo(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append(
        "description",
        form.description
      );
      formData.append("vision", form.vision);
      formData.append("mission", form.mission);
      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (selectedLogo) {
        formData.append("logo", selectedLogo);
      }

      if (editingId) {
        await api.put(
          `/departments/admin/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        await api.post(
          "/departments/admin",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      await fetchDepartments();

      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Delete this department?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/departments/admin/${id}`
      );

      if (editingId === id) {
        resetForm();
      }

      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };
    return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Departments
          </h1>

          <p className="mt-1 text-gray-600">
            Manage all academic departments.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
          {editingId ? (
            <>
              <Edit size={20} />
              Edit Department
            </>
          ) : (
            <>
              <Plus size={20} />
              Add Department
            </>
          )}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name + Slug */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Department Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Vision */}
          <div>
            <label className="mb-2 block font-medium">
              Vision
            </label>

            <textarea
              rows={4}
              name="vision"
              value={form.vision}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Mission */}
          <div>
            <label className="mb-2 block font-medium">
              Mission
            </label>

            <textarea
              rows={4}
              name="mission"
              value={form.mission}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Logo + Status */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Department Logo
              </label>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-8 transition hover:border-blue-600">
                <Upload size={18} />

                <span>
                  {selectedLogo
                    ? selectedLogo.name
                    : "Choose Logo"}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogo}
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-36 w-36 rounded-lg border object-cover"
                />
              )}
            </div>

            <div className="flex items-start">
              <label className="mt-9 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleCheckbox}
                  className="h-5 w-5"
                />

                <span className="font-medium">
                  Active Department
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              {saving ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Save size={18} />
              )}

              {editingId
                ? "Update Department"
                : "Create Department"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-lg border px-6 py-3 font-medium hover:bg-gray-100"
            >
              <X size={18} />
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Departments List */}
      <div className="rounded-xl border bg-white shadow-sm">
                <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-5 py-3">Logo</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    <Loader2 className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No departments found.
                  </td>
                </tr>
              ) : (
                departments.map((department) => (
                  <tr
                    key={department.id}
                    className="border-t"
                  >
                    <td className="px-5 py-4">
                      {department.logoUrl ? (
                        <img
                          src={department.logoUrl}
                          alt={department.name}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-500">
                          No Logo
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">
                        {department.name}
                      </div>

                      <div className="mt-1 line-clamp-2 max-w-sm text-sm text-gray-500">
                        {department.description}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                        {department.slug}
                      </code>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          department.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {department.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleEdit(department)
                          }
                          className="rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              department.id
                            )
                          }
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={18} />
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
    </div>
  );
}

export default DepartmentPage;