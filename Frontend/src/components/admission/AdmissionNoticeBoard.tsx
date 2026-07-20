import { useEffect, useState } from "react";
import { BellRing, CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import api from "@/lib/api";

interface AdmissionNotice {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
}

export default function AdmissionNoticeBoard() {
  const [notices, setNotices] = useState<AdmissionNotice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get(
          "/news?category=ADMISSION"
        );

        setNotices(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <BellRing
            size={24}
            className="text-white"
          />

          <div>
            <h2 className="text-xl font-semibold text-white">
              Admission Notices
            </h2>

            <p className="text-sm text-blue-100">
              Latest admission announcements and updates
            </p>
          </div>
        </div>

        <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
          {notices.length} Notices
        </span>
      </div>

      {/* Notice List */}
      <div className="max-h-[550px] overflow-y-auto">
        {notices.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No admission notices available.
          </div>
        ) : (
          notices.map((notice) => (
            <Link
              key={notice.id}
              to={`/news`}
              className="group block border-b border-slate-100 p-6 transition hover:bg-blue-50"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />

                  {new Date(
                    notice.publishedAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <ChevronRight
                  size={20}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-slate-800 transition group-hover:text-blue-800">
                {notice.title}
              </h3>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                {notice.description}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}