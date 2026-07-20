import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";

import toast from "react-hot-toast";

interface SportsAchievement {
  id: number;
  title: string;
  description: string;
  achievementDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  achievementDate: string;
  isActive: boolean;
}

const SportsAchievement  = () => {
  const [achievements, setAchievements] = useState<
    SportsAchievement[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [editingId, setEditingId] = useState<
    number | null
  >(null);

  const [deleteId, setDeleteId] = useState<
    number | null
  >(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] =
    useState<FormData>({
      title: "",
      description: "",
      achievementDate: "",
      isActive: true,
    });

  /*
  |--------------------------------------------------------------------------
  | Fetch Achievements
  |--------------------------------------------------------------------------
  */

  // const fetchAchievements = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       "/sports-achievements/admin"
  //     );
  //     console.log(response.data);


  //     setAchievements(response.data.data ?? []);
  //   } catch (error: any) {
  //     toast.error(
  //       error.response?.data?.message ||
  //         "Failed to fetch achievements."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAchievements = async () => {
  try {
    setLoading(true);

    const response = await api.get("/sports-achievements/admin");

    console.log("FULL RESPONSE:", response.data);
    console.log("DATA:", response.data.data);
    console.log("IS ARRAY:", Array.isArray(response.data.data));

    setAchievements(
      Array.isArray(response.data.data)
        ? response.data.data
        : []
    );
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message ??
        "Failed to fetch achievements."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAchievements();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  //const totalAchievements = achievements.length;
  

  // const activeAchievements =
  //   achievements.filter((item) => item.isActive)
  //     .length;

  // const inactiveAchievements =
  //   totalAchievements - activeAchievements;

  // /*
  // |--------------------------------------------------------------------------
  // | Search
  // |--------------------------------------------------------------------------
  // */

  // const filteredAchievements = useMemo(() => {
  //   return achievements.filter((item) => {
  //     const keyword = search.toLowerCase();

  //     return (
  //       item.title
  //         .toLowerCase()
  //         .includes(keyword) ||
  //       item.description
  //         .toLowerCase()
  //         .includes(keyword)
  //     );
  //   });
  // }, [achievements, search]);

  const safeAchievements = Array.isArray(achievements)
  ? achievements
  : [];

const totalAchievements = safeAchievements.length;

const activeAchievements = safeAchievements.filter(
  (item) => item.isActive
).length;

const inactiveAchievements =
  totalAchievements - activeAchievements;

const filteredAchievements = useMemo(() => {
  return safeAchievements.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  });
}, [safeAchievements, search]);

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      achievementDate: "",
      isActive: true,
    });
  };

  const handleOpenCreate = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (
    achievement: SportsAchievement
  ) => {
    setEditingId(achievement.id);

    setFormData({
      title: achievement.title,
      description: achievement.description,
      achievementDate:
        achievement.achievementDate.slice(0, 10),
      isActive: achievement.isActive,
    });

    setOpenModal(true);
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
      if (editingId) {
        await api.put(`/sports-achievements/admin/${editingId}`, formData);

        toast.success(
          "Achievement updated successfully."
        );
      } else {
        await api.post("/sports-achievements/admin", formData);
        toast.success(
          "Achievement created successfully."
        );
      }

      setOpenModal(false);

      resetForm();

      fetchAchievements();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/sports-achievements/admin/${deleteId}`);

      toast.success(
        "Achievement deleted successfully."
      );

      setDeleteModal(false);

      setDeleteId(null);

      fetchAchievements();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete achievement."
      );
    }
  };

    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Sports Achievements
          </h1>

          <p className="mt-1 text-gray-500">
            Manage sports achievements displayed on the website.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Achievement
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Achievements
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalAchievements}
              </h2>
            </div>

            <div className="rounded-full bg-blue-100 p-3">
              <Trophy
                size={28}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeAchievements}
              </h2>
            </div>

            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Inactive
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveAchievements}
              </h2>
            </div>

            <div className="rounded-full bg-red-100 p-3">
              <XCircle
                size={28}
                className="text-red-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search achievements..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm uppercase tracking-wider text-gray-600">
                <th className="px-6 py-4">
                  Title
                </th>

                <th className="px-6 py-4">
                  Achievement Date
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Created
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    Loading achievements...
                  </td>
                </tr>
              ) : filteredAchievements.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500"
                  >
                    No achievements found.
                  </td>
                </tr>
              ) : (
                filteredAchievements.map(
                  (achievement) => (
                    <tr
                      key={achievement.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {achievement.title}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {
                              achievement.description
                            }
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          achievement.achievementDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        {achievement.isActive ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          achievement.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              handleEdit(
                                achievement
                              )
                            }
                            className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(
                                achievement.id
                              );
                              setDeleteModal(
                                true
                              );
                            }}
                            className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>


                {/* Add / Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Achievement"
                  : "Add Achievement"}
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="text-2xl text-gray-400 transition hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter achievement title"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Achievement Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Achievement Date
                </label>

                <input
                  type="date"
                  value={formData.achievementDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achievementDate: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write achievement description..."
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Active */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">
                    Active Status
                  </h3>

                  <p className="text-sm text-gray-500">
                    Display this achievement on the
                    website.
                  </p>
                </div>

                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isActive: e.target.checked,
                      })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-blue-600"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  {editingId
                    ? "Update Achievement"
                    : "Create Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="p-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <Trash2
                  size={28}
                  className="text-red-600"
                />
              </div>

              <h2 className="mt-5 text-center text-xl font-semibold text-gray-800">
                Delete Achievement
              </h2>

              <p className="mt-3 text-center text-gray-500">
                Are you sure you want to delete this
                sports achievement?
                <br />
                This action cannot be undone.
              </p>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setDeleteModal(false);
                    setDeleteId(null);
                  }}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsAchievement;