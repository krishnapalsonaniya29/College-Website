import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";


interface StudentAchievement {
  id: number;
  name: string;
  email?: string;
  course: string; 
  achievement: string;
  description: string;
  achievementDate: string;
  photoUrl: string;
  photoPublicId: string;
  isActive: boolean;
}

import api from "@/lib/api";


export default function StudentAchievementAdmin() {
  const [achievements, setAchievements] = useState<
    StudentAchievement[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [photo, setPhoto] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    achievement: "",
    description: "",
    achievementDate: "",
    isActive: true,
  });

  //----------------------------------------------------
  // Fetch
  //----------------------------------------------------

//   const fetchAchievements = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(api);

//       setAchievements(res.data.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch achievements.");
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchAchievements = async () => {
  try {
    setLoading(true);

    const res = await api.get("/student-achievements/admin");

    console.log("api Response:", res.data);

    setAchievements(res.data.data ?? []);
  } catch (err) {
    console.error(err);
    setAchievements([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAchievements();
  }, []);

  //----------------------------------------------------
  // Input Change
  //----------------------------------------------------

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //----------------------------------------------------
  // Active Switch
  //----------------------------------------------------

  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  //----------------------------------------------------
  // Image
  //----------------------------------------------------

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setPhoto(file);

    setPreview(URL.createObjectURL(file));
  };

  //----------------------------------------------------
  // Reset Form
  //----------------------------------------------------

  const resetForm = () => {
    setEditingId(null);

    setPhoto(null);

    setPreview("");

    setFormData({
      name: "",
      email: "",
      course: "",
      achievement: "",
      description: "",
      achievementDate: "",
      isActive: true,
    });
  };

  //----------------------------------------------------
  // Edit
  //----------------------------------------------------

  const handleEdit = (
    achievement: StudentAchievement
  ) => {
    setEditingId(achievement.id);

    setPreview(achievement.photoUrl);

    setPhoto(null);

    setFormData({
      name: achievement.name,
      email: achievement.email || "",
      course: achievement.course,
      achievement: achievement.achievement,
      description: achievement.description,
      achievementDate:
        achievement.achievementDate.slice(0, 10),
      isActive: achievement.isActive,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //----------------------------------------------------
  // Delete
  //----------------------------------------------------

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Delete this achievement permanently?"
      )
    )
      return;

    try {
      await api.delete(`/student-achievements/admin/${id}`);

      fetchAchievements();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  //----------------------------------------------------
  // Submit
  //----------------------------------------------------

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);

      data.append("email", formData.email);

      data.append("course", formData.course);

      data.append(
        "achievement",
        formData.achievement
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "achievementDate",
        formData.achievementDate
      );

      data.append(
        "isActive",
        String(formData.isActive)
      );

      if (photo) {
        data.append("photo", photo);
      }

      if (editingId) {
        await api.put(
          `/student-achievements/admin/${editingId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert("Achievement updated.");
      } else {
        await api.post("/student-achievements/admin", data, {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        });

        alert("Achievement added.");
      }

      resetForm();

      fetchAchievements();
    } catch (err) {
      console.error(err);

      alert("Operation failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Student Achievements
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
                <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium mb-2">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Achievement Date
            </label>

            <input
              type="date"
              name="achievementDate"
              value={formData.achievementDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Achievement Title
          </label>

          <input
            type="text"
            name="achievement"
            value={formData.achievement}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 resize-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Student Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt=""
              className="mt-4 w-36 h-36 rounded-lg object-cover border"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={handleCheckbox}
          />

          <label>Active</label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {editingId
              ? "Update Achievement"
              : "Add Achievement"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Uploaded Achievements
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : achievements.length === 0 ? (
          <p>No achievements found.</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="border p-3">
                    Photo
                  </th>

                  <th className="border p-3">
                    Name
                  </th>

                  <th className="border p-3">
                    Course
                  </th>

                  <th className="border p-3">
                    Achievement
                  </th>

                  <th className="border p-3">
                    Date
                  </th>

                  <th className="border p-3">
                    Status
                  </th>

                  <th className="border p-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {achievements.map((item) => (
                                      <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border p-3 text-center">
                      <img
                        src={item.photoUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                    </td>

                    <td className="border p-3">
                      <div className="font-medium">
                        {item.name}
                      </div>

                      {item.email && (
                        <div className="text-sm text-gray-500">
                          {item.email}
                        </div>
                      )}
                    </td>

                    <td className="border p-3">
                      {item.course}
                    </td>

                    <td className="border p-3">
                      <div className="font-medium">
                        {item.achievement}
                      </div>

                      <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {item.description}
                      </div>
                    </td>

                    <td className="border p-3">
                      {new Date(
                        item.achievementDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="border p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                    <td className="border p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}