import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

const events = [
  {
    title: "National Seminar on Artificial Intelligence",
    date: "15 Jul 2026",
    venue: "Seminar Hall",
  },
  {
    title: "Hackathon 2026",
    date: "22 Jul 2026",
    venue: "Computer Department",
  },
  {
    title: "Faculty Development Programme",
    date: "28 Jul 2026",
    venue: "Conference Hall",
  },
  {
    title: "Research Paper Presentation",
    date: "05 Aug 2026",
    venue: "Auditorium",
  },
  {
    title: "Startup & Innovation Summit",
    date: "12 Aug 2026",
    venue: "Innovation Center",
  },
  {
    title: "Career Guidance Workshop",
    date: "20 Aug 2026",
    venue: "Seminar Hall",
  },
];

function UpcomingEvents() {
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

        <button className="rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600">
          Concluded Events
        </button>
      </div>

      {/* Events */}
      <div className="relative h-[340px] overflow-hidden">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {[...events, ...events].map((event, index) => (
            <a
              key={index}
              href="#"
              className="mx-4 my-2 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-800">
                  {event.title}
                </h3>

                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {event.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {event.venue}
                  </span>
                </div>
              </div>

              <div className="ml-4 rounded-md bg-blue-100 px-3 py-2 text-center">
                <p className="text-xs font-semibold uppercase text-blue-700">
                  Event
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default UpcomingEvents;