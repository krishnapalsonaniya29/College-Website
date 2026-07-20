import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import api from "@/lib/api";

interface Event {
  id: number;
  title: string;
  eventDate: string;
}

function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");

        setEvents(res.data.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch events.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Upcoming Events
        </h2>

        <Link
          to="/events"
          className="rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          All Events
        </Link>
      </div>

      {/* Events */}
      <div className="relative h-[340px] overflow-hidden">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            No events available.
          </div>
        ) : (
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
          >
            {[...events, ...events].map((event, index) => (
              <Link
                key={`${event.id}-${index}`}
                to="/events"
                className="mx-4 my-2 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-800">
                    {event.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={13} />

                    {new Date(
                      event.eventDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="ml-4 rounded-md bg-blue-100 px-3 py-2 text-center">
                  <p className="text-xs font-semibold uppercase text-blue-700">
                    Event
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default UpcomingEvents;