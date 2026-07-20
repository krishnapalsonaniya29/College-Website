import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

import api from "@/lib/api";

interface Alumni {
  id: number;
  name: string;
  batch: number;
  course: string;
  profession: string;
  company?: string;
  message: string;
  photoUrl: string;
  photoPublicId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const initialForm = {
  name: "",
  batch: new Date().getFullYear(),
  course: "",
  profession: "",
  company: "",
  message: "",
  isActive: true,
};

function AlumniPage() {
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAlumni, setEditingAlumni] =
  useState<Alumni | null>(null);

  const [form, setForm] = useState(initialForm);

  const [photoFile, setPhotoFile] =
  useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  /* ----------------------------------------- */
  /* Fetch Alumni                              */
  /* ----------------------------------------- */

  const fetchAlumni = async () => {
    try {
      setLoading(true);

      const res = await api.get("/alumni/admin");

      setAlumniList(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch alumni."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  /* ----------------------------------------- */
  /* Reset Form                                */
  /* ----------------------------------------- */

  const resetForm = () => {
    setForm(initialForm);

    setEditingAlumni(null);

    setPhotoFile(null);

    setImagePreview("");

    setError("");
  };

  /* ----------------------------------------- */
  /* Open Create Modal                         */
  /* ----------------------------------------- */

  const openCreateModal = () => {
    resetForm();

    setIsModalOpen(true);
  };

  /* ----------------------------------------- */
  /* Open Edit Modal                           */
  /* ----------------------------------------- */

  const openEditModal = (alumni: Alumni) => {
    setEditingAlumni(alumni);

    setForm({
      name: alumni.name,
      batch: alumni.batch,
      course: alumni.course,
      profession: alumni.profession,
      company: alumni.company || "",
      message: alumni.message,
      isActive: alumni.isActive,
    });

    setImagePreview(alumni.photoUrl);

    setPhotoFile(null);

    setIsModalOpen(true);
  };

  /* ----------------------------------------- */
  /* Close Modal                               */
  /* ----------------------------------------- */

  const closeModal = () => {
    setIsModalOpen(false);

    resetForm();
  };

  /* ----------------------------------------- */
  /* Input Change                              */
  /* ----------------------------------------- */

  const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ----------------------------------------- */
  /* Checkbox                                  */
  /* ----------------------------------------- */

 const handleCheckboxChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
    setForm((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  /* ----------------------------------------- */
  /* Image Upload                              */
  /* ----------------------------------------- */

 const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhotoFile(file);

    setImagePreview(URL.createObjectURL(file));
  };

  /* ----------------------------------------- */
  /* Submit                                    */
  /* ----------------------------------------- */

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      setError("");

      const formData = new FormData();

      formData.append("name", form.name);

      formData.append(
        "batch",
        String(form.batch)
      );

      formData.append(
        "course",
        form.course
      );

      formData.append(
        "profession",
        form.profession
      );

      formData.append(
        "company",
        form.company
      );

      formData.append(
        "message",
        form.message
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (photoFile) {
        formData.append(
          "photo",
          photoFile
        );
      }

      if (editingAlumni) {
        await api.put(
          `/alumni/admin/${editingAlumni.id}`,
          formData
        );
      } else {
        await api.post(
          "/alumni/admin",
          formData
        );
      }

      closeModal();

      fetchAlumni();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to save alumni."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ----------------------------------------- */
  /* Delete                                    */
  /* ----------------------------------------- */

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this alumni?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/alumni/admin/${id}`);

      fetchAlumni();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to delete alumni."
      );
    }
  };
    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Alumni Management
          </h1>

          <p className="mt-1 text-gray-600">
            Create, update and manage alumni records.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Alumni
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Photo
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Name
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Batch
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Course
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Profession
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center"
                >
                  <Loader2 className="mx-auto animate-spin" />
                </td>
              </tr>
            ) : alumniList.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No alumni found.
                </td>
              </tr>
            ) : (
              alumniList.map((alumni) => (
                <tr
                  key={alumni.id}
                  className="border-t transition hover:bg-slate-50"
                >
                  {/* Photo */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <img
                        src={alumni.photoUrl}
                        alt={alumni.name}
                        className="h-16 w-16 rounded-full border object-cover"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-800">
                      {alumni.name}
                    </div>

                    {alumni.company && (
                      <div className="mt-1 text-sm text-slate-500">
                        {alumni.company}
                      </div>
                    )}
                  </td>

                  {/* Batch */}
                  <td className="px-6 py-5 text-center">
                    {alumni.batch}
                  </td>

                  {/* Course */}
                  <td className="px-6 py-5 text-center">
                    {alumni.course}
                  </td>

                  {/* Profession */}
                  <td className="px-6 py-5 text-center">
                    {alumni.profession}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        alumni.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {alumni.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          openEditModal(alumni)
                        }
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(alumni.id)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingAlumni
                  ? "Edit Alumni"
                  : "Add Alumni"}
              </h2>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >
                              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Batch / Course */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Batch
                  </label>

                  <input
                    type="number"
                    name="batch"
                    value={form.batch}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Course
                  </label>

                  <input
                    type="text"
                    name="course"
                    value={form.course}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Profession / Company */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Profession
                  </label>

                  <input
                    type="text"
                    name="profession"
                    value={form.profession}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Alumni Message
                </label>

                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Status */}
              <div className="flex items-center">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5"
                  />

                  <span className="font-medium">
                    Active
                  </span>
                </label>
              </div>

              {/* Photo */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Alumni Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border p-2"
                />

                {imagePreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-40 rounded-full border object-cover shadow"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border px-5 py-2.5 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {editingAlumni
                    ? "Update Alumni"
                    : "Create Alumni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumniPage;