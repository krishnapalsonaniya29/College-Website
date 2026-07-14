export interface UgFee {
  srNo: number;
  course: string;
  subjects: string;
  nonPractical: string;
  onePractical: string;
  twoPractical: string;
  threePractical: string;
}

export interface PgFee {
  srNo: number;
  course: string;
  seats: number;
  fees: string;
}

export const ugFees: UgFee[] = [
  {
    srNo: 1,
    course: "B.A. (REGULAR)",
    subjects:
      "DANCE, ECONOMICS, ENGLISH, HINDI, HISTORY, HOME SCIENCE, GEOGRAPHY, SOCIOLOGY, POLITICAL SCIENCE, PHILOSOPHY, SANSKRIT, MUSIC INSTRUMENT, MUSIC VOCAL, URDU",
    nonPractical: "3645/-",
    onePractical: "3745/-",
    twoPractical: "3845/-",
    threePractical: "3945/-",
  },
  {
    srNo: 2,
    course: "B.A. (SELF FINANCE)",
    subjects: "DRAWING AND PAINTING",
    nonPractical: "6645/-",
    onePractical: "6745/-",
    twoPractical: "6845/-",
    threePractical: "6945/-",
  },
  {
    srNo: 3,
    course: "B.Sc. (REGULAR)",
    subjects:
      "BOTANY, CHEMISTRY, PHYSICS, MATHEMATICS, ZOOLOGY, HEALTHCARE MANAGEMENT",
    nonPractical: "3645/-",
    onePractical: "3745/-",
    twoPractical: "3845/-",
    threePractical: "3945/-",
  },
  {
    srNo: 4,
    course: "B.Sc. (SELF FINANCE)",
    subjects:
      "AGRICULTURE, BIOCHEMISTRY, COMPUTER SCIENCE, GEOGRAPHY, MICROBIOLOGY, PHARMACEUTICAL CHEMISTRY",
    nonPractical: "3645/-",
    onePractical: "7145/-",
    twoPractical: "8845/-",
    threePractical: "10645/-",
  },
  {
    srNo: 5,
    course: "B.COM. (REGULAR)",
    subjects: "COMMERCE, RETAIL OPERATION",
    nonPractical: "3645/-",
    onePractical: "—",
    twoPractical: "—",
    threePractical: "—",
  },
  {
    srNo: 6,
    course: "B.H.Sc. (REGULAR)",
    subjects: "HOME SCIENCE",
    nonPractical: "3645/-",
    onePractical: "3745/-",
    twoPractical: "3845/-",
    threePractical: "3945/-",
  },
];

export const pgFees: PgFee[] = [
  {
    srNo: 1,
    course: "MA – DANCE",
    seats: 10,
    fees: "13600/-",
  },
  {
    srNo: 2,
    course: "MA – ECONOMICS",
    seats: 20,
    fees: "4345/-",
  },
  {
    srNo: 3,
    course: "MA – ENGLISH",
    seats: 10,
    fees: "4345/-",
  },
  {
    srNo: 4,
    course: "MA – HINDI",
    seats: 10,
    fees: "4345/-",
  },
  {
    srNo: 5,
    course: "MA – HISTORY",
    seats: 35,
    fees: "4345/-",
  },
  {
    srNo: 6,
    course: "MA – GEOGRAPHY",
    seats: 20,
    fees: "4445/-",
  },
  {
    srNo: 7,
    course: "MA – MUSIC INSTRUMENTAL",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 8,
    course: "MA – MUSIC VOCAL",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 9,
    course: "MA – PHILOSOPHY",
    seats: 10,
    fees: "4345/-",
  },
  {
    srNo: 10,
    course: "MA – POLITICAL SCIENCE",
    seats: 30,
    fees: "4345/-",
  },
  {
    srNo: 11,
    course: "MA – SOCIOLOGY",
    seats: 20,
    fees: "4345/-",
  },
  {
    srNo: 12,
    course: "MA – URDU",
    seats: 10,
    fees: "4345/-",
  },
  {
    srNo: 13,
    course: "M.COM. – COMMERCE",
    seats: 70,
    fees: "8145/-",
  },
  {
    srNo: 14,
    course: "M.SC. – BIOCHEMISTRY",
    seats: 10,
    fees: "14045/-",
  },
  {
    srNo: 15,
    course: "M.SC. – BOTANY",
    seats: 60,
    fees: "4445/-",
  },
  {
    srNo: 16,
    course: "M.SC. – CHEMISTRY",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 17,
    course: "M.SC. – COMPUTER SCIENCE",
    seats: 10,
    fees: "20045/-",
  },
  {
    srNo: 18,
    course: "M.SC. – GEOGRAPHY",
    seats: 10,
    fees: "14600/-",
  },
  {
    srNo: 19,
    course: "M.SC. – PHARMACEUTICAL CHEMISTRY",
    seats: 10,
    fees: "14100/-",
  },
  {
    srNo: 20,
    course: "M.SC. – PHYSICS",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 21,
    course: "M.SC. – ZOOLOGY",
    seats: 20,
    fees: "4445/-",
  },
  {
    srNo: 22,
    course: "M.SC. – HOME SCIENCE (FOOD AND NUTRITION)",
    seats: 10,
    fees: "11045/-",
  },
  {
    srNo: 23,
    course: "M.SC. – HOME SCIENCE (FRM)",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 24,
    course: "M.SC. – HOME SCIENCE (HUMAN DEVELOPMENT)",
    seats: 10,
    fees: "4445/-",
  },
  {
    srNo: 25,
    course: "M.S.W. – SOCIAL WORK",
    seats: 10,
    fees: "10600/-",
  },
];