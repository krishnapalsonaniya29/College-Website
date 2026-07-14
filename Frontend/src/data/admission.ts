export interface AdmissionNotice {
  id: number;
  title: string;
  date: string;
  pdf: string;
}

export interface AdmissionDocument {
  title: string;
  description: string;
  pdf: string;
}

export const admissionNotices: AdmissionNotice[] = [
  {
    id: 1,
    title: "UG First Year Admission Notification (Session 2026-27)",
    date: "15 June 2026",
    pdf: "/pdfs/admission/ug-admission-notification.pdf",
  },
  {
    id: 2,
    title: "PG First Year Admission Notification (Session 2026-27)",
    date: "18 June 2026",
    pdf: "/pdfs/admission/pg-admission-notification.pdf",
  },
  {
    id: 3,
    title: "Merit List - Round 1",
    date: "25 June 2026",
    pdf: "/pdfs/admission/merit-list-round-1.pdf",
  },
  {
    id: 4,
    title: "Counselling Schedule for UG & PG Admissions",
    date: "30 June 2026",
    pdf: "/pdfs/admission/counselling-schedule.pdf",
  },
  {
    id: 5,
    title: "Document Verification Schedule",
    date: "02 July 2026",
    pdf: "/pdfs/admission/document-verification.pdf",
  },
  {
    id: 6,
    title: "Second Merit List",
    date: "08 July 2026",
    pdf: "/pdfs/admission/second-merit-list.pdf",
  },
  {
    id: 7,
    title: "Spot Admission Notice",
    date: "15 July 2026",
    pdf: "/pdfs/admission/spot-admission.pdf",
  },
  {
    id: 8,
    title: "Admission Fee Payment Schedule",
    date: "18 July 2026",
    pdf: "/pdfs/admission/fee-payment-schedule.pdf",
  },
];

export const admissionManual: AdmissionDocument = {
  title: "Admission Manual 2026-27",
  description:
    "Download the complete admission manual containing eligibility criteria, reservation policy, important dates, fee details, and admission guidelines.",
  pdf: "/pdfs/admission/admission-manual.pdf",
};

export const admissionProcess: AdmissionDocument = {
  title: "Admission Process",
  description:
    "Download the step-by-step admission process including registration, counselling, document verification, fee payment, and final admission confirmation.",
  pdf: "/pdfs/admission/admission-process.pdf",
};