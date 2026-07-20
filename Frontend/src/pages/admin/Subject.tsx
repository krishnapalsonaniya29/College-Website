import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Program {
  id: number;
  name: string;
  category: string;
}

interface Subject {
  id: number;
  subjectCode: string;
  subjectName: string;
  isActive: boolean;
  program: Program;
}

const initialForm = {
  programId: "",
  subjectCode: "",
  subjectName: "",
  isActive: true,
};

export default function SubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState(initialForm);

  //---------------------------------------
  // Fetch Subjects
  //---------------------------------------

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        "/subjects/admin"
      );

      setSubjects(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to load subjects."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------
  // Fetch Programs
  //---------------------------------------

  const fetchPrograms = async () => {
    try {
      const res = await api.get(
        "/programs/admin"
      );

      setPrograms(
        res.data.data.filter(
          (p: any) => p.isActive
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  //---------------------------------------
  // Initial Load
  //---------------------------------------

  useEffect(() => {
    fetchSubjects();
    fetchPrograms();
  }, []);

  //---------------------------------------
  // Reset Form
  //---------------------------------------

  const resetForm = () => {
    setForm(initialForm);
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
    subject: Subject
  ) => {
    setEditingId(subject.id);

    setForm({
      programId: String(subject.program.id),
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      isActive: subject.isActive,
    });

    setShowModal(true);
  };

  //---------------------------------------
  // Handle Inputs
  //---------------------------------------

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (
          e.target as HTMLInputElement
        ).checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setSaving(true);

    const payload = {
      programId: Number(form.programId),
      subjectCode: form.subjectCode.trim(),
      subjectName: form.subjectName.trim(),
      isActive: form.isActive,
    };

    if (editingId) {
      await api.put(
        `/subjects/admin/${editingId}`,
        payload
      );
    } else {
      await api.post(
        "/subjects/admin",
        payload
      );
    }

    await fetchSubjects();

    resetForm();
  } catch (err: any) {
    alert(
      err.response?.data?.message ||
        "Something went wrong."
    );
  } finally {
    setSaving(false);
  }
};

const handleDelete = async (
  id: number
) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this subject?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(
      `/subjects/admin/${id}`
    );

    fetchSubjects();
  } catch (err: any) {
    alert(
      err.response?.data?.message ||
        "Failed to delete subject."
    );
  }
};

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subject Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all academic subjects.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Subject
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading subjects...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Code
                </th>

                <th className="px-4 py-3 text-left">
                  Subject
                </th>

                <th className="px-4 py-3 text-left">
                  Program
                </th>

                <th className="px-4 py-3 text-center">
                  Category
                </th>

                <th className="px-4 py-3 text-center">
                  Status
                </th>

                <th className="px-4 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500"
                  >
                    No subjects found.
                  </td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {subject.subjectCode}
                    </td>

                    <td className="px-4 py-3">
                      {subject.subjectName}
                    </td>

                    <td className="px-4 py-3">
                      {subject.program.name}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {subject.program.category}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {subject.isActive ? (
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
                        onClick={() =>
                          openEditModal(subject)
                        }
                        className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
  onClick={() =>
    handleDelete(subject.id)
  }
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
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">
              {editingId
                ? "Edit Subject"
                : "Add Subject"}
            </h2>

            <form
  onSubmit={handleSubmit}
  className="space-y-5"
>
              <div>
                <label className="mb-2 block font-medium">
                  Program
                </label>

                <select
                  name="programId"
                  value={form.programId}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">
                    Select Program
                  </option>

                  {programs.map((program) => (
                    <option
                      key={program.id}
                      value={program.id}
                    >
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Subject Code
                </label>

                <input
                  type="text"
                  name="subjectCode"
                  value={form.subjectCode}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Subject Name
                </label>

                <input
                  type="text"
                  name="subjectName"
                  value={form.subjectName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleInputChange}
                />

                <label>
                  Active Subject
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
  type="button"
  disabled={saving}
  onClick={resetForm}
  className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
>
  Cancel
</button>

                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    {saving
                        ? editingId
                        ? "Updating..."
                        : "Creating..."
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
  );
}