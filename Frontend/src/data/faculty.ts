export interface Faculty {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  email: string;
  image: string;
}

export interface DepartmentFaculty {
  slug: string;
  faculty: Faculty[];
}

export const facultyData: DepartmentFaculty[] = [
  {
    slug: "hindi",
    faculty: [
      {
        id: 1,
        name: "Dr. Pratima Solanki",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Modern Hindi Literature",
        email: "pratima@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        id: 2,
        name: "Dr. Shabnam Khan",
        designation: "Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Hindi Poetry",
        email: "shabnam@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        id: 3,
        name: "Dr. Nirmal Chakravar",
        designation: "Assistant Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Hindi Grammar",
        email: "nirmal@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
      },
    ],
  },

  {
    slug: "english",
    faculty: [
      {
        id: 1,
        name: "Dr. Ayush Dubey",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "English Literature",
        email: "ayush@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
      },
      {
        id: 2,
        name: "Dr. Garima Chhabra",
        designation: "Associate Professor",
        qualification: "M.A., Ph.D.",
        specialization: "British Literature",
        email: "garima@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: 3,
        name: "Prof. Vandana Mishra",
        designation: "Assistant Professor",
        qualification: "M.A., NET",
        specialization: "Linguistics",
        email: "vandana@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/35.jpg",
      },
    ],
  },

  {
    slug: "sanskrit",
    faculty: [
      {
        id: 1,
        name: "Dr. Kundan Singh",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Vedic Literature",
        email: "kundan@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/58.jpg",
      },
      {
        id: 2,
        name: "Dr. Mahesh Sharma",
        designation: "Assistant Professor",
        qualification: "M.A., NET",
        specialization: "Sanskrit Grammar",
        email: "mahesh@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
      },
    ],
  },

  {
    slug: "urdu",
    faculty: [
      {
        id: 1,
        name: "Dr. Faheemida Mansoori",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Urdu Literature",
        email: "faheemida@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/42.jpg",
      },
      {
        id: 2,
        name: "Dr. Nazneen Mansoori",
        designation: "Assistant Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Urdu Poetry",
        email: "nazneen@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/25.jpg",
      },
    ],
  },

  {
    slug: "sociology",
    faculty: [
      {
        id: 1,
        name: "Dr. Rajshree Shah",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Rural Sociology",
        email: "rajshree@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/37.jpg",
      },
      {
        id: 2,
        name: "Dr. Sunil Goyal",
        designation: "Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Urban Sociology",
        email: "sunil@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/62.jpg",
      },
      {
        id: 3,
        name: "Dr. Rakesh Chauhan",
        designation: "Associate Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Social Research",
        email: "rakesh@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/49.jpg",
      },
    ],
  },

  {
    slug: "economics",
    faculty: [
      {
        id: 1,
        name: "Dr. Kamla Gupta",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Micro Economics",
        email: "kamla@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
      },
      {
        id: 2,
        name: "Dr. Aruna Kusumakar",
        designation: "Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Macro Economics",
        email: "aruna@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/60.jpg",
      },
      {
        id: 3,
        name: "Dr. Jyoti Sharma",
        designation: "Associate Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Public Finance",
        email: "jyoti@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
      },
    ],
  },

  {
    slug: "political-science",
    faculty: [
      {
        id: 1,
        name: "Dr. Avinash Sharma",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Indian Politics",
        email: "avinash@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/17.jpg",
      },
      {
        id: 2,
        name: "Dr. Vandana Chauhan",
        designation: "Associate Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Public Administration",
        email: "vandana@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
      },
    ],
  },

  {
    slug: "philosophy",
    faculty: [
      {
        id: 1,
        name: "Prof. Dilesh Kumar",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Indian Philosophy",
        email: "dilesh@college.edu.in",
        image: "https://randomuser.me/api/portraits/men/70.jpg",
      },
    ],
  },

  {
    slug: "history",
    faculty: [
      {
        id: 1,
        name: "Dr. Shraddha Shukla",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Modern Indian History",
        email: "shraddha@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/71.jpg",
      },
      {
        id: 2,
        name: "Dr. Satyabhama Chauhan",
        designation: "Associate Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Ancient History",
        email: "satyabhama@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/48.jpg",
      },
    ],
  },

  {
    slug: "geography",
    faculty: [
      {
        id: 1,
        name: "Dr. Archana Purohit",
        designation: "Professor & Head",
        qualification: "M.A., Ph.D.",
        specialization: "Physical Geography",
        email: "archana@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
      },
      {
        id: 2,
        name: "Dr. Rakhi Shukla",
        designation: "Professor",
        qualification: "M.A., Ph.D.",
        specialization: "Human Geography",
        email: "rakhi@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/16.jpg",
      },
      {
        id: 3,
        name: "Dr. Bhakti Pare",
        designation: "Professor",
        qualification: "M.A., Ph.D.",
        specialization: "GIS & Remote Sensing",
        email: "bhakti@college.edu.in",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
      },
    ],
  },
];