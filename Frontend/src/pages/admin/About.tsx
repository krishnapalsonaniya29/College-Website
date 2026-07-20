import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import api from "@/lib/api";

interface AboutData {
  instituteName: string;

  about: string;
  motto: string;
  vision: string;
  mission: string;
  objectives: string;

  principalName: string;
  principalPhotoUrl: string;
  principalMessage: string;
}

const initialForm: AboutData = {
  instituteName: "",

  about: "",
  motto: "",
  vision: "",
  mission: "",
  objectives: "",

  principalName: "",
  principalPhotoUrl: "",
  principalMessage: "",
};

function AboutPage() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState<AboutData>(initialForm);

  const [photo, setPhoto] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch
  |--------------------------------------------------------------------------
  */

  const fetchAbout = async () => {
    try {
      setLoading(true);

      const res = await api.get("/about");

      setForm({
        instituteName:
          res.data.data.instituteName,

        about: res.data.data.about,
        motto: res.data.data.motto,
        vision: res.data.data.vision,
        mission: res.data.data.mission,
        objectives:
          res.data.data.objectives,

        principalName:
          res.data.data.principalName,

        principalPhotoUrl:
          res.data.data.principalPhotoUrl,

        principalMessage:
          res.data.data.principalMessage,
      });

      setPreview(
        res.data.data.principalPhotoUrl ||
          ""
      );
    } catch (err) {
      console.error(err);

      alert(
        "Failed to load about information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Input
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

  /*
  |--------------------------------------------------------------------------
  | Principal Photo
  |--------------------------------------------------------------------------
  */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setPhoto(file);

    setPreview(
      URL.createObjectURL(file)
    );
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
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "instituteName",
        form.instituteName
      );

      formData.append("about", form.about);
      formData.append("motto", form.motto);
      formData.append("vision", form.vision);
      formData.append("mission", form.mission);
      formData.append(
        "objectives",
        form.objectives
      );

      formData.append(
        "principalName",
        form.principalName
      );

      formData.append(
        "principalMessage",
        form.principalMessage
      );

      if (photo) {
        formData.append(
          "principalPhoto",
          photo
        );
      }

      await api.put(
        "/about/admin",
        formData
      );

      alert(
        "About information updated successfully."
      );

      fetchAbout();
    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to update about information."
      );
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    fetchAbout();
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">
          About Institute
        </h1>

        <p className="mt-1 text-gray-500">
          Manage institute information and
          principal details.
        </p>
      </div>

      {/* Institute Details */}

      <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Institute Details
        </h2>

        <div>
          <label className="mb-2 block font-medium">
            Institute Name
          </label>

          <input
            type="text"
            name="instituteName"
            value={form.instituteName}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            About Institute
          </label>

          <textarea
            rows={8}
            name="about"
            value={form.about}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Motto
          </label>

          <textarea
            rows={2}
            name="motto"
            value={form.motto}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Vision
          </label>

          <textarea
            rows={5}
            name="vision"
            value={form.vision}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mission
          </label>

          <textarea
            rows={5}
            name="mission"
            value={form.mission}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Objectives
          </label>

          <textarea
            rows={5}
            name="objectives"
            value={form.objectives}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>
      </div>

      {/* Principal */}

      <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Principal Details
        </h2>

        <div>
          <label className="mb-2 block font-medium">
            Principal Name
          </label>

          <input
            type="text"
            name="principalName"
            value={form.principalName}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 font-medium">
            <ImageIcon size={18} />
            Principal Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          {preview && (
            <div className="mt-4 flex items-start gap-4">
              <img
                src={preview}
                alt="Principal"
                className="h-48 rounded-lg border object-cover"
              />

              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Download Photo
              </a>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Principal Message
          </label>

          <textarea
            rows={8}
            name="principalMessage"
            value={form.principalMessage}
            onChange={handleInputChange}
            className="w-full rounded-lg border px-4 py-2.5"
          />
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg border px-6 py-2.5 hover:bg-gray-100"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AboutPage;