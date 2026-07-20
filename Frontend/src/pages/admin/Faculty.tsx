import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Department {
  id: number;
  name: string;
}

interface Faculty {
  id: number;

  departmentId: number;

  department: {
    id: number;
    name: string;
    slug: string;
  };

  name: string;
  designation: string;
  qualification: string;
  experience: number;
  email: string;

  photoUrl: string;

  isHOD: boolean;
  isActive: boolean;
}

const initialForm = {
  departmentId: "",

  name: "",

  designation: "",

  qualification: "",

  experience: 0,

  email: "",

  isHOD: false,

  isActive: true,
};

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [selectedPhoto, setSelectedPhoto] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] =
    useState(initialForm);

  //---------------------------------------
  // Fetch Faculty
  //---------------------------------------

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        "/faculty/admin"
      );

      setFaculty(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Failed to load faculty."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------
  // Fetch Departments
  //---------------------------------------

  const fetchDepartments = async () => {
    try {
      const res = await api.get(
        "/departments"
      );

      setDepartments(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  //---------------------------------------
  // Initial Load
  //---------------------------------------

  useEffect(() => {
    fetchFaculty();
    fetchDepartments();
  }, []);

  //---------------------------------------
  // Cleanup Preview
  //---------------------------------------

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //---------------------------------------
  // Reset Form
  //---------------------------------------

  const resetForm = () => {
    setForm(initialForm);

    setSelectedPhoto(null);

    setPreview("");

    setEditingId(null);

    setShowModal(false);
  };

  //---------------------------------------
  // Open Create
  //---------------------------------------

  const openCreateModal = () => {
    resetForm();

    setShowModal(true);
  };

  //---------------------------------------
  // Open Edit
  //---------------------------------------

  const openEditModal = (
    teacher: Faculty
  ) => {
    setEditingId(teacher.id);

    setForm({
      departmentId:
        teacher.departmentId.toString(),

      name: teacher.name,

      designation:
        teacher.designation,

      qualification:
        teacher.qualification,

      experience:
        teacher.experience,

      email: teacher.email,

      isHOD: teacher.isHOD,

      isActive:
        teacher.isActive,
    });

    setPreview(teacher.photoUrl);

    setSelectedPhoto(null);

    setShowModal(true);
  };

    //---------------------------------------
  // Handle Input Change
  //---------------------------------------

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement)
        .checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "experience"
          ? Number(value)
          : value,
    }));
  };

  //---------------------------------------
  // Handle Photo Change
  //---------------------------------------

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedPhoto(file);

    setPreview(URL.createObjectURL(file));
  };

  //---------------------------------------
  // Create / Update Faculty
  //---------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "departmentId",
        form.departmentId
      );

      formData.append("name", form.name);

      formData.append(
        "designation",
        form.designation
      );

      formData.append(
        "qualification",
        form.qualification
      );

      formData.append(
        "experience",
        String(form.experience)
      );

      formData.append("email", form.email);

      formData.append(
        "isHOD",
        String(form.isHOD)
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (selectedPhoto) {
        formData.append(
          "photo",
          selectedPhoto
        );
      }

      if (editingId) {
        await api.put(
          `/faculty/admin/${editingId}`,
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
          "/faculty/admin",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      await fetchFaculty();

      resetForm();
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  //---------------------------------------
  // Delete Faculty
  //---------------------------------------

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Delete this faculty member?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/faculty/admin/${id}`
      );

      await fetchFaculty();
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Failed to delete faculty."
      );
    }
  };
  return (
  <div className="p-6">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Management
        </h1>
        <p className="mt-1 text-gray-500">
          Manage faculty members for all departments.
        </p>
      </div>

      <button
        onClick={openCreateModal}
        disabled={saving}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        + Add Faculty
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
        Loading faculty...
      </div>
    ) : (
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Photo</th>
              <th className="px-4 py-3 text-left">Faculty</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-center">HOD</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {faculty.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No faculty found.
                </td>
              </tr>
            ) : (
              faculty.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="h-16 w-16 rounded-full border object-cover"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {teacher.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {teacher.designation}
                    </div>

                    <div className="text-xs text-gray-400">
                      {teacher.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {teacher.department.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {teacher.isHOD ? (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        HOD
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {teacher.isActive ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="space-x-2 px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        openEditModal(teacher)
                      }
                      disabled={saving}
                      className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(teacher.id)
                      }
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

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold">
            {editingId
              ? "Edit Faculty"
              : "Add Faculty"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Department */}
            <div>
              <label className="mb-2 block font-medium">
                Department
              </label>

              <select
                name="departmentId"
                value={form.departmentId}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((dept) => (
                  <option
                    key={dept.id}
                    value={dept.id}
                  >
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="mb-2 block font-medium">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="mb-2 block font-medium">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block font-medium">
                Experience (Years)
              </label>

              <input
                type="number"
                min={0}
                name="experience"
                value={form.experience}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="mb-2 block font-medium">
                Faculty Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
                {...(!editingId
                  ? { required: true }
                  : {})}
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-40 w-40 rounded-lg border object-cover"
                />
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isHOD"
                  checked={form.isHOD}
                  onChange={handleInputChange}
                />
                HOD
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleInputChange}
                />
                Active
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);}