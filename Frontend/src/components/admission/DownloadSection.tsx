import { Download, FileText } from "lucide-react";

import admissionManual from "@/assets/pdfs/admission-manual.pdf";
import admissionProcess from "@/assets/pdfs/admission-process.pdf";

const documents = [
  {
    title: "Admission Manual",
    description:
      "Download the complete admission manual containing eligibility, reservation policy, fee details, and important guidelines.",
    file: admissionManual,
  },
  {
    title: "Admission Process",
    description:
      "Download the step-by-step admission process including registration, counselling, document verification, fee payment, and admission confirmation.",
    file: admissionProcess,
  },
];

const DownloadCards = () => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Admission Documents
        </h2>

        <p className="mt-2 text-slate-600">
          Download important admission documents for the current academic
          session.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.title}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <FileText className="text-blue-900" size={34} />
            </div>

            <h3 className="text-2xl font-semibold text-slate-900">
              {doc.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              {doc.description}
            </p>

            <a
              href={doc.file}
              download
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
            >
              <Download size={18} />
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DownloadCards;