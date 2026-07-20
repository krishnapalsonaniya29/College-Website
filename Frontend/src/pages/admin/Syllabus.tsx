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

interface Syllabus {
  id: number;
  semester: string;
  pdfUrl: string;
  pdfPublicId: string;
  isActive: boolean;
  subject: Subject;
}

const initialForm = {
  subjectId: "",
  semester: "",
  pdf: null as File | null,
  isActive: true,
};

export default function SyllabusPage() {
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState(initialForm);

  //---------------------------------------
  // Fetch Syllabus
  //---------------------------------------

  const fetchSyllabus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        "/syllabus/admin"
      );

      setSyllabus(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to load syllabus."
      );
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------
  // Fetch Subjects
  //---------------------------------------

  const fetchSubjects = async () => {
    try {
      const res = await api.get(
        "/subjects/admin"
      );

      setSubjects(
        res.data.data.filter(
          (s: Subject) => s.isActive
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
    fetchSyllabus();
    fetchSubjects();
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
    item: Syllabus
  ) => {
    setEditingId(item.id);

    setForm({
      subjectId: String(
        item.subject.id
      ),
      semester: item.semester,
      pdf: null,
      isActive: item.isActive,
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
    const { name, value, type } =
      e.target;

    if (type === "file") {
      const file = (
        e.target as HTMLInputElement
      ).files?.[0];

      setForm((prev) => ({
        ...prev,
        pdf: file ?? null,
      }));

      return;
    }

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

    const formData = new FormData();

    formData.append(
      "subjectId",
      form.subjectId
    );

    formData.append(
      "semester",
      form.semester
    );

    formData.append(
      "isActive",
      String(form.isActive)
    );

    if (form.pdf) {
      formData.append(
        "pdf",
        form.pdf
      );
    }

    if (editingId) {
      await api.put(
        `/syllabus/admin/${editingId}`,
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
        "/syllabus/admin",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
    }

    await fetchSyllabus();

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
  const ok = window.confirm(
    "Delete this syllabus?"
  );

  if (!ok) return;

  try {
    await api.delete(
      `/syllabus/admin/${id}`
    );

    fetchSyllabus();
  } catch (err: any) {
    alert(
      err.response?.data?.message ||
        "Failed to delete syllabus."
    );
  }
};

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Syllabus Management
          </h1>

          <p className="mt-1 text-gray-500">
            Upload and manage subject
            syllabus PDFs.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          + Add Syllabus
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
          Loading syllabus...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Subject
                </th>

                <th className="px-4 py-3 text-center">
                  Semester
                </th>

                <th className="px-4 py-3 text-center">
                  PDF
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
              {syllabus.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No syllabus found.
                  </td>
                </tr>
              ) : (
                syllabus.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {
                          item.subject
                            .subjectName
                        }
                      </div>

                      <div className="text-sm text-gray-500">
                        {
                          item.subject
                            .subjectCode
                        }{" "}
                        •{" "}
                        {
                          item.subject
                            .program.name
                        }
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {item.semester}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <a
  href={item.pdfUrl}
  target="_blank"
  rel="noreferrer"
  className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
>
  View PDF
</a>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {item.isActive ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="space-x-2 px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          openEditModal(
                            item
                          )
                        }
                        className="rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                            type="button"
                            onClick={() =>
                                handleDelete(item.id)
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
              <button
  type="submit"
  disabled={saving}
  className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {saving
    ? editingId
      ? "Updating..."
      : "Uploading..."
    : editingId
      ? "Update"
      : "Upload"}
</button>
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                >
              <div>
                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <select
                  name="subjectId"
                  value={form.subjectId}
                  onChange={
                    handleInputChange
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">
                    Select Subject
                  </option>

                  {subjects.map(
                    (subject) => (
                      <option
                        key={
                          subject.id
                        }
                        value={
                          subject.id
                        }
                      >
                        {
                          subject.subjectCode
                        }{" "}
                        -{" "}
                        {
                          subject.subjectName
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Semester
                </label>

                <select
                  name="semester"
                  value={form.semester}
                  onChange={
                    handleInputChange
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">
                    Select Semester
                  </option>

                  { [
  "SEM1",
  "SEM2",
  "SEM3",
  "SEM4",
  "SEM5",
  "SEM6",
  "SEM7",
  "SEM8",
].map((sem) => (
                    <option
                      key={sem}
                      value={sem}
                    >
                      {sem.replace(
                        "_",
                        " "
                      )}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  PDF File
                </label>

                <input
                  type="file"
                  name="pdf"
                  accept=".pdf"
                  onChange={
                    handleInputChange
                  }
                  className="w-full rounded-lg border p-3"
                />
                {form.pdf && (
  <p className="mt-2 text-sm text-green-600">
    Selected: {form.pdf.name}
  </p>
)}

                {editingId && (
                  <p className="mt-2 text-sm text-gray-500">
                    Leave empty to keep
                    the current PDF.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={
                    form.isActive
                  }
                  onChange={
                    handleInputChange
                  }
                />

                <label>
                  Active
                  Syllabus
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
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  {editingId
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