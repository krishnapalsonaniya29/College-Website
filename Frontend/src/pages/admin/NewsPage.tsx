import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  FileText,
} from "lucide-react";

import api from "@/lib/api";

interface News {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  imagePublicId?: string | null;
  pdfUrl: string | null;
  pdfPublicId?: string | null;
  publishedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}



const initialForm = {
  title: "",
  description: "",
  category: "NEWS",
  publishedAt: "",
  isActive: true,
};

function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const [form, setForm] = useState(initialForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await api.get("/news/admin");

      setNewsList(res.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch news."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setForm(initialForm);

    setEditingNews(null);

    setImageFile(null);
    setPdfFile(null);

    setImagePreview("");
    setCurrentPdfUrl("");

    setError("");
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (news: News) => {
    setEditingNews(news);

    setForm({
  title: news.title,
  description: news.description,
  category: news.category,
  publishedAt: news.publishedAt.split("T")[0],
  isActive: news.isActive,
});

    setImagePreview(news.imageUrl || "");
    setCurrentPdfUrl(news.pdfUrl || "");

    setImageFile(null);
    setPdfFile(null);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleCheckboxChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setForm((prev) => ({
    ...prev,
    isActive: e.target.checked,
  }));
};

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPdfFile(file);
  };
    const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("publishedAt", form.publishedAt);
      formData.append(
        "isActive",
        String(form.isActive)
      );
      formData.append("category", form.category);
      console.log(form.category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      if (editingNews) {
        await api.put(
          `/news/admin/${editingNews.id}`,
          formData
        );
      } else {
        await api.post("/news/admin", formData);
      }

      closeModal();
      fetchNews();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to save news."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/news/admin/${id}`);
      fetchNews();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to delete news."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            News Management
          </h1>

          <p className="mt-1 text-gray-600">
            Create, update and manage news articles.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add News
        </button>
      </div>

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
    <th className="px-6 py-4 text-left font-semibold text-slate-700">
      Title
    </th>

    <th className="px-6 py-4 text-center font-semibold text-slate-700">
      Category
    </th>

    <th className="px-6 py-4 text-center font-semibold text-slate-700">
      Published
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
                  colSpan={5}
                  className="py-10 text-center"
                >
                  <Loader2 className="mx-auto animate-spin" />
                </td>
              </tr>
            ) : newsList.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No news found.
                </td>
              </tr>
            ) : (
              newsList.map((news) => (
  <tr
    key={news.id}
    className="border-t transition hover:bg-slate-50"
  >
    {/* Title */}
    <td className="px-6 py-5 align-top">
      <div className="font-semibold text-slate-800">
        {news.title}
      </div>

      <div className="mt-1 line-clamp-2 text-sm text-slate-500">
        {news.description}
      </div>
    </td>

    {/* Category */}
    <td className="px-6 py-5 text-center align-middle">
      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
        {news.category.replace("_", " ")}
      </span>
    </td>

    {/* Published */}
    <td className="px-6 py-5 text-center align-middle">
      {new Date(news.publishedAt).toLocaleDateString()}
    </td>

    {/* Status */}
    <td className="px-6 py-5 text-center align-middle">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          news.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {news.isActive ? "Active" : "Inactive"}
      </span>
    </td>

    {/* Actions */}
    <td className="px-6 py-5">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => openEditModal(news)}
          className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => handleDelete(news.id)}
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
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingNews ? "Edit News" : "Add News"}
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
                  required
                  className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={6}
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/*select*/}
              <div>
  <label className="mb-2 block text-sm font-medium">
    Category
  </label>

  <select
    name="category"
    value={form.category}
    onChange={handleInputChange}
    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
  >
    <option value="NEWS">News</option>
    <option value="NOTICE">Notice</option>
    <option value="EVENT">Event</option>
    <option value="ACHIEVEMENT">Achievement</option>
    <option value="EXAM">Exam</option>
    <option value="ADMISSION">Admission</option>
    <option value="SCHOLARSHIP">Scholarship</option>
  </select>
</div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Published Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Published Date
                  </label>

                  <input
                    type="date"
                    name="publishedAt"
                    value={form.publishedAt}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div className="flex items-end">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />

                    <span className="font-medium">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Image (Optional)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border p-2"
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 h-48 rounded-lg border object-cover"
                  />
                )}
              </div>

              {/* PDF */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  PDF (Optional)
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  className="w-full rounded-lg border p-2"
                />

                {pdfFile && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-100 p-3 text-sm">
                    <FileText size={18} />

                    <span>{pdfFile.name}</span>
                  </div>
                )}

                {!pdfFile && currentPdfUrl && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <FileText size={18} />

                    <span>PDF already uploaded</span>
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

                  {editingNews
                    ? "Update News"
                    : "Create News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsPage;