import { useEffect, useState } from "react";
import {
  CalendarDays,
  Edit,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import api from "@/lib/api";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  eventDate: string;
  isActive: boolean;
}

interface EventForm {
  title: string;
  description: string;
  eventDate: string;
  isActive: boolean;
}

const initialForm: EventForm = {
  title: "",
  description: "",
  eventDate: "",
  isActive: true,
};

function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] =
    useState<EventForm>(initialForm);

  const [image, setImage] =
    useState<File | null>(null);

  const [pdf, setPdf] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [pdfName, setPdfName] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Events
  |--------------------------------------------------------------------------
  */

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/events/admin"
      );

      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setEditingId(null);

    setForm(initialForm);

    setImage(null);
    setPdf(null);

    setImagePreview("");
    setPdfName("");
  };

  /*
  |--------------------------------------------------------------------------
  | Modal
  |--------------------------------------------------------------------------
  */

  const openCreateModal = () => {
    resetForm();
    setOpen(true);
  };

  const openEditModal = (
    event: Event
  ) => {
    setEditingId(event.id);

    setForm({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate
        .split("T")[0],
      isActive: event.isActive,
    });

    setImagePreview(
      event.imageUrl || ""
    );

    setPdfName(
      event.pdfUrl
        ? event.pdfUrl
            .split("/")
            .pop() || ""
        : ""
    );

    setImage(null);
    setPdf(null);

    setOpen(true);
  };

  const closeModal = () => {
    resetForm();
    setOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Input Handlers
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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

  /*
  |--------------------------------------------------------------------------
  | Image
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PDF
  |--------------------------------------------------------------------------
  */

  const handlePdfChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setPdf(file);

    setPdfName(file.name);
  };
    /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append(
        "description",
        form.description
      );
      formData.append(
        "eventDate",
        form.eventDate
      );
      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (image) {
        formData.append("image", image);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      if (editingId) {
        await api.put(
          `/events/admin/${editingId}`,
          formData
        );

        alert("Event updated successfully.");
      } else {
        await api.post(
          "/events/admin",
          formData
        );

        alert("Event created successfully.");
      }

      closeModal();
      fetchEvents();
    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete = window.confirm(
      "Delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/events/admin/${id}`
      );

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Events
          </h1>

          <p className="mt-1 text-gray-500">
            Manage institute events.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center">
            Loading...
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left">
                  Title
                </th>

                <th className="px-5 py-3 text-left">
                  Event Date
                </th>

                <th className="px-5 py-3 text-left">
                  Status
                </th>

                <th className="px-5 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {events.map((item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium">
                      {item.title}
                    </div>

                    <div className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {new Date(
                      item.eventDate
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="rounded-lg border p-2 hover:bg-gray-100"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading &&
                events.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-12 text-center text-gray-500"
                    >
                      No events found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        )}
      </div>
            {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Event"
                  : "Add Event"}
              </h2>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-gray-100"
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
                <label className="mb-2 block font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-600"
                />
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
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-600"
                />
              </div>

              {/* Event Date */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <CalendarDays size={18} />
                  Event Date
                </label>

                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-600"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <ImageIcon size={18} />
                  Event Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {imagePreview && (
                  <div className="mt-4 flex items-start gap-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 rounded-lg border object-cover"
                    />

                    <a
                      href={imagePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Download Image
                    </a>
                  </div>
                )}
              </div>

              {/* PDF */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <FileText size={18} />
                  Event PDF
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />

                {pdfName && (
                  <div className="mt-4 flex items-center gap-4">
                    <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
                      {pdfName}
                    </span>

                    {editingId &&
                      events.find(
                        (e) => e.id === editingId
                      )?.pdfUrl && (
                        <a
                          href={
                            events.find(
                              (e) =>
                                e.id === editingId
                            )!.pdfUrl!
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Download PDF
                        </a>
                      )}
                  </div>
                )}
              </div>

              {/* Active */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={handleCheckboxChange}
                />

                <span>Active</span>
              </label>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border px-5 py-2.5 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  {editingId
                    ? "Update Event"
                    : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EventPage;