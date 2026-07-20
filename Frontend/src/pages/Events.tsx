import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, FileText } from "lucide-react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import api from "@/lib/api";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  eventDate: string;
}

type Filter = "all" | "upcoming" | "past";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return events.filter((event) => {
      const eventDate = new Date(event.eventDate);

      eventDate.setHours(0, 0, 0, 0);

      switch (filter) {
        case "upcoming":
          return eventDate >= today;

        case "past":
          return eventDate < today;

        default:
          return true;
      }
    });
  }, [events, filter]);

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Events"
        description="Stay updated with upcoming and past events of the institute."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {[
            ["all", "All"],
            ["upcoming", "Upcoming"],
            ["past", "Past"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key as Filter)}
              className={`rounded-lg px-5 py-2 font-medium transition ${
                filter === key
                  ? "bg-blue-700 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No events found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="bg-gray-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center">
                      <FileText
                        size={70}
                        className="text-gray-400"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <CalendarDays size={16} />

                    {new Date(
                      item.eventDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="line-clamp-4 text-gray-600">
                    {item.description}
                  </p>

                  <div className="flex gap-3 pt-2">
                    {item.imageUrl && (
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Download Image
                      </a>
                    )}

                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        <Download size={16} />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Events;