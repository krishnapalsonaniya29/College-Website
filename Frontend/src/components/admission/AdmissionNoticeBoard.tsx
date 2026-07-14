import { BellRing } from "lucide-react";
import { admissionNotices } from "@/data/admission";

const AdmissionNoticeBoard = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 bg-blue-900 px-6 py-4">
        <BellRing className="text-white" size={24} />

        <h2 className="text-xl font-semibold text-white">
          Latest Admission Notices
        </h2>
      </div>

      {/* Moving Notice Board */}
      <div className="relative h-[340px] overflow-hidden">
        <div className="animate-marquee-vertical absolute w-full">
          {[...admissionNotices, ...admissionNotices].map((notice, index) => (
            <div
              key={index}
              className="border-b border-slate-100 px-6 py-4"
            >
              <p className="text-xs font-medium text-blue-900">
                {notice.date}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700 hover:text-blue-900 cursor-pointer">
                {notice.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionNoticeBoard;