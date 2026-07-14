export interface Program {
  srNo: number;
  course: string;
  subjects: string;
}

export const ugPrograms: Program[] = [
  {
    srNo: 1,
    course: "B.A. (REGULAR)",
    subjects:
      "DANCE, ECONOMICS, ENGLISH, HINDI, HISTORY, HOME SCIENCE, GEOGRAPHY, SOCIOLOGY, POLITICAL SCIENCE, PHILOSOPHY, SANSKRIT, MUSIC INSTRUMENT, MUSIC VOCAL, URDU",
  },
  {
    srNo: 2,
    course: "B.A. (SELF FINANCE)",
    subjects: "DRAWING AND PAINTING",
  },
  {
    srNo: 3,
    course: "B.Sc. (REGULAR)",
    subjects:
      "BOTANY, CHEMISTRY, PHYSICS, MATHEMATICS, ZOOLOGY, HEALTHCARE MANAGEMENT",
  },
  {
    srNo: 4,
    course: "B.Sc. (SELF FINANCE)",
    subjects:
      "AGRICULTURE, BIOCHEMISTRY, COMPUTER SCIENCE, GEOGRAPHY, MICROBIOLOGY, PHARMACEUTICAL CHEMISTRY",
  },
  {
    srNo: 5,
    course: "B.Com. (REGULAR)",
    subjects: "COMMERCE, RETAIL OPERATION",
  },
  {
    srNo: 6,
    course: "B.H.Sc. (REGULAR)",
    subjects: "HOME SCIENCE",
  },
];

export const pgPrograms: Program[] = [
  {
    srNo: 1,
    course: "C005",
    subjects: "MA – ECONOMICS",
  },
  {
    srNo: 2,
    course: "C006",
    subjects: "MA – ENGLISH",
  },
  {
    srNo: 3,
    course: "C318",
    subjects: "MA – GEOGRAPHY",
  },
  {
    srNo: 4,
    course: "C008",
    subjects: "MA – HINDI",
  },
  {
    srNo: 5,
    course: "C009",
    subjects: "MA – HISTORY",
  },
  {
    srNo: 6,
    course: "C015",
    subjects: "MA – MUSIC INSTRUMENTAL",
  },
  {
    srNo: 7,
    course: "C016",
    subjects: "MA – MUSIC VOCAL",
  },
  {
    srNo: 8,
    course: "C017",
    subjects: "MA – PHILOSOPHY",
  },
  {
    srNo: 9,
    course: "C018",
    subjects: "MA – POLITICAL SCIENCE",
  },
  {
    srNo: 10,
    course: "C026",
    subjects: "MA – SOCIOLOGY",
  },
  {
    srNo: 11,
    course: "C027",
    subjects: "MA – URDU",
  },
  {
    srNo: 12,
    course: "C043",
    subjects: "M.SC. – BOTANY",
  },
  {
    srNo: 13,
    course: "C044",
    subjects: "M.SC. – CHEMISTRY",
  },
  {
    srNo: 14,
    course: "C054",
    subjects: "M.SC. – PHYSICS",
  },
  {
    srNo: 15,
    course: "C056",
    subjects: "M.SC. – ZOOLOGY",
  },
  {
    srNo: 16,
    course: "C206",
    subjects: "M.SC. – HOME SCIENCE (FRM)",
  },
  {
    srNo: 17,
    course: "C207",
    subjects: "M.SC. – HOME SCIENCE (HUMAN DEVELOPMENT)",
  },
  {
    srNo: 18,
    course: "C031",
    subjects: "M.COM. – COMMERCE",
  },
  {
    srNo: 19,
    course: "C003",
    subjects: "MA – DANCE",
  },
  {
    srNo: 20,
    course: "C205",
    subjects: "M.SC. – HOME SCIENCE (FOOD AND NUTRITION)",
  },
  {
    srNo: 21,
    course: "C040",
    subjects: "M.SC. – BIOCHEMISTRY",
  },
  {
    srNo: 22,
    course: "C053",
    subjects: "M.SC. – PHARMACEUTICAL CHEMISTRY",
  },
  {
    srNo: 23,
    course: "C581",
    subjects: "M.SC. – GEOGRAPHY",
  },
  {
    srNo: 24,
    course: "C046",
    subjects: "M.SC. – COMPUTER SCIENCE",
  },
  {
    srNo: 25,
    course: "C276",
    subjects: "M.S.W. – SOCIAL WORK",
  },
];


export interface MultidisciplinarySubject {
  srNo: number;
  department: string;
  course: string;
}

export const ugMultidisciplinarySubjects: MultidisciplinarySubject[] = [
  {
    srNo: 1,
    department: "COMPUTER",
    course: "ARTIFICIAL INTELLIGENCE",
  },
  {
    srNo: 2,
    department: "BIOCHEMISTRY",
    course: "BIOCHEMISTRY",
  },
  {
    srNo: 3,
    department: "CHEMISTRY",
    course: "CHEMISTRY",
  },
  {
    srNo: 4,
    department: "COMPUTER",
    course: "COMPUTER APPLICATION",
  },
  {
    srNo: 5,
    department: "COMPUTER",
    course: "CYBER SECURITY",
  },
  {
    srNo: 6,
    department: "DANCE",
    course: "DANCE (KATHAK)",
  },
  {
    srNo: 7,
    department: "DANCE",
    course: "DRAWING AND PAINTING",
  },
  {
    srNo: 8,
    department: "PHARMACEUTICAL CHEMISTRY",
    course: "ENVIRONMENTAL SCIENCE",
  },
  {
    srNo: 9,
    department: "HOME SCIENCE",
    course: "FASHION DESIGNING",
  },
  {
    srNo: 10,
    department: "HOME SCIENCE",
    course: "FOOD TECHNOLOGY",
  },
  {
    srNo: 11,
    department: "HOME SCIENCE",
    course: "HOME SCIENCE",
  },
  {
    srNo: 12,
    department: "COMPUTER",
    course: "INFORMATION TECHNOLOGY",
  },
  {
    srNo: 13,
    department: "PHARMACEUTICAL CHEMISTRY",
    course: "MEDICINAL CHEMISTRY",
  },
  {
    srNo: 14,
    department: "URDU",
    course: "MUSIC (SINGING)",
  },
  {
    srNo: 15,
    department: "NCC",
    course: "NCC",
  },
  {
    srNo: 16,
    department: "NSS",
    course: "NSS",
  },
  {
    srNo: 17,
    department: "PHILOSOPHY",
    course: "PHILOSOPHY",
  },
  {
    srNo: 18,
    department: "POLITICAL SCIENCE",
    course: "PUBLIC ADMINISTRATION",
  },
  {
    srNo: 19,
    department: "SANSKRIT",
    course: "SANSKRIT",
  },
  {
    srNo: 20,
    department: "URDU",
    course: "URDU",
  },
];


export interface VocationalSubject {
  srNo: number;
  department: string;
  course: string;
}

export const ugVocationalSubjects: VocationalSubject[] = [
  {
    srNo: 1,
    department: "COMMERCE",
    course: "E-ACCOUNTING AND TAXATION WITH GST",
  },
  {
    srNo: 2,
    department: "COMPUTER SCIENCE",
    course: "DIGITAL MARKETING",
  },
  {
    srNo: 3,
    department: "COMMERCE",
    course: "SALESMANSHIP",
  },
  {
    srNo: 4,
    department: "COMPUTER SCIENCE",
    course: "ACCOUNTING AND TALLY",
  },
  {
    srNo: 5,
    department: "COMPUTER SCIENCE",
    course: "DESKTOP PUBLISHING (DTP)",
  },
  {
    srNo: 6,
    department: "COMPUTER",
    course: "INFORMATION TECHNOLOGY",
  },
  {
    srNo: 7,
    department: "PHARMA. CHEMISTRY",
    course: "FOOD PRESERVATION AND PROCESSING",
  },
  {
    srNo: 8,
    department: "PHARMA. CHEMISTRY",
    course: "MEDICINAL PLANTS",
  },
  {
    srNo: 9,
    department: "BIOCHEMISTRY",
    course: "MEDICAL DIAGNOSTICS",
  },
  {
    srNo: 10,
    department: "BOTANY",
    course: "HORTICULTURE",
  },
  {
    srNo: 11,
    department: "HOME SCIENCE",
    course: "NUTRITION AND DIETETICS",
  },
  {
    srNo: 12,
    department: "ZOOLOGY",
    course: "VERMICOMPOSTING",
  },
  {
    srNo: 13,
    department: "HOME SCIENCE",
    course: "HANDICRAFTS",
  },
  {
    srNo: 14,
    department: "—",
    course: "PERSONALITY DEVELOPMENT",
  },
];