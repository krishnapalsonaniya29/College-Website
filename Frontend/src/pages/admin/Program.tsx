import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Subject {
  id: number;
  name: string;
}

interface Program {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
  subjects: Subject[];
}

const categories = [
  "UG",
  "PG",
  "DIPLOMA",
  "CERTIFICATE",
];

const initialForm = {
  name: "",
  category: "UG",
  isActive: true,
};

export default function ProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState(initialForm);

  //---------------------------------------
  // Fetch Programs
  //---------------------------------------

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/programs/admin");

      setPrograms(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to load programs."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------
  // Initial Load
  //---------------------------------------

  useEffect(() => {
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

  const openEditModal = (program: Program) => {
    setEditingId(program.id);

    setForm({
      name: program.name,
      category: program.category,
      isActive: program.isActive,
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
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //---------------------------------------
// Create / Update
//---------------------------------------

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setSaving(true);

    if (editingId) {
      await api.put(
        `/programs/admin/${editingId}`,
        form
      );
    } else {
      await api.post(
        "/programs/admin",
        form
      );
    }

    await fetchPrograms();

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

//---------------------------------------
// Delete
//---------------------------------------

const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Delete this program?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/programs/admin/${id}`);

    await fetchPrograms();
  } catch (err: any) {
    alert(
      err.response?.data?.message ||
        "Failed to delete program."
    );
  }
};

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Program Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage academic programs.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Program
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
          Loading programs...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Program
                </th>

                <th className="px-4 py-3 text-center">
                  Category
                </th>

                <th className="px-4 py-3 text-center">
                  Subjects
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
              {programs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No programs found.
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr
                    key={program.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {program.name}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {program.category}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {program.subjects.length}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {program.isActive ? (
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
                          openEditModal(program)
                        }
                        className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
  onClick={() =>
    handleDelete(program.id)
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
                ? "Edit Program"
                : "Add Program"}
            </h2>

            <form
  onSubmit={handleSubmit}
  className="space-y-5"
>

              <div>
                <label className="mb-2 block font-medium">
                  Program Name
                </label>

                <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleInputChange}
  required
  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
/>
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active */}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleInputChange}
                />

                <label className="font-medium">
                  Active Program
                </label>
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
  );
}
