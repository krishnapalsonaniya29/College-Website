export interface Department {
  id: number;
  slug: string;
  shortName: string;
  name: string;
  logo: string;

  description: string;
  vision: string;
  mission: string[];

  hod: string;
}

export const departments: Department[] = [
  {
    id: 1,
    slug: "hindi",
    shortName: "HINDI",
    name: "Hindi Department",
    logo: "/department-logos/hindi.png",
    description:
      "The Department of Hindi promotes excellence in Hindi language, literature, criticism, and modern literary studies while encouraging research and cultural values.",
    vision:
      "To preserve and promote the richness of Hindi language and literature.",
    mission: [
      "Provide quality education in Hindi literature.",
      "Promote research and literary activities.",
      "Develop communication and critical thinking skills.",
    ],
    hod: "Dr. Pratima Solanki",
  },

  {
    id: 2,
    slug: "english",
    shortName: "ENGLISH",
    name: "English Department",
    logo: "/department-logos/english.png",
    description:
      "The department develops communication skills, literary understanding, and critical thinking through English language and literature.",
    vision:
      "To produce globally competent learners with excellent communication skills.",
    mission: [
      "Improve English communication.",
      "Encourage literary appreciation.",
      "Promote research in language studies.",
    ],
    hod: "Dr. Ayushotam Dubey",
  },

  {
    id: 3,
    slug: "sanskrit",
    shortName: "SANSKRIT",
    name: "Sanskrit Department",
    logo: "/department-logos/sanskrit.png",
    description:
      "The department preserves India's classical heritage through Sanskrit language, literature, philosophy, and ancient texts.",
    vision:
      "To preserve and promote Sanskrit knowledge.",
    mission: [
      "Promote Sanskrit language.",
      "Encourage research in classical literature.",
      "Preserve Indian heritage.",
    ],
    hod: "Dr. Kundan Singh Musalda",
  },

  {
    id: 4,
    slug: "urdu",
    shortName: "URDU",
    name: "Urdu Department",
    logo: "/department-logos/urdu.png",
    description:
      "The department provides education in Urdu language, literature, poetry, and cultural heritage.",
    vision:
      "To preserve and promote Urdu literature and culture.",
    mission: [
      "Promote Urdu language.",
      "Encourage literary research.",
      "Develop cultural awareness.",
    ],
    hod: "Dr. Faheemida Mansoori",
  },

  {
    id: 5,
    slug: "sociology",
    shortName: "SOCIOLOGY",
    name: "Sociology Department",
    logo: "/department-logos/sociology.png",
    description:
      "The department studies social institutions, communities, social change, and human behaviour.",
    vision:
      "To develop socially responsible citizens through sociological education.",
    mission: [
      "Provide quality social science education.",
      "Promote field research.",
      "Develop analytical thinking.",
    ],
    hod: "Dr. Rajshree Shah",
  },

  {
    id: 6,
    slug: "economics",
    shortName: "ECONOMICS",
    name: "Economics Department",
    logo: "/department-logos/economics.png",
    description:
      "The department provides knowledge of microeconomics, macroeconomics, public finance, and economic development.",
    vision:
      "To produce competent economists and researchers.",
    mission: [
      "Promote economic research.",
      "Develop analytical abilities.",
      "Encourage policy awareness.",
    ],
    hod: "Dr. Kamla Gupta",
  },

  {
    id: 7,
    slug: "political-science",
    shortName: "POLITICAL SCIENCE",
    name: "Political Science Department",
    logo: "/department-logos/political-science.png",
    description:
      "The department provides education in political theory, governance, public administration, and international relations.",
    vision:
      "To develop responsible citizens with democratic values.",
    mission: [
      "Promote constitutional awareness.",
      "Encourage policy research.",
      "Develop leadership qualities.",
    ],
    hod: "Dr. Avinash Sharma",
  },

  {
    id: 8,
    slug: "philosophy",
    shortName: "PHILOSOPHY",
    name: "Philosophy Department",
    logo: "/department-logos/philosophy.png",
    description:
      "The department develops ethical reasoning, logical thinking, and philosophical understanding.",
    vision:
      "To cultivate wisdom through philosophical education.",
    mission: [
      "Encourage ethical thinking.",
      "Develop reasoning ability.",
      "Promote philosophical research.",
    ],
    hod: "Prof. Dilesh Kumar",
  },

  {
    id: 9,
    slug: "history",
    shortName: "HISTORY",
    name: "History Department",
    logo: "/department-logos/history.png",
    description:
      "The department provides education in ancient, medieval, and modern history with emphasis on historical research.",
    vision:
      "To preserve historical knowledge and heritage.",
    mission: [
      "Promote historical research.",
      "Develop critical analysis.",
      "Encourage cultural awareness.",
    ],
    hod: "Dr. Shraddha Shukla",
  },

  {
    id: 10,
    slug: "geography",
    shortName: "GEOGRAPHY",
    name: "Geography Department",
    logo: "/department-logos/geography.png",
    description:
      "The department studies physical geography, human geography, GIS, and environmental studies.",
    vision:
      "To promote geographical knowledge for sustainable development.",
    mission: [
      "Provide quality geographical education.",
      "Promote environmental awareness.",
      "Encourage field-based learning.",
    ],
    hod: "Dr. Archana Purohit",
  },

  {
    id: 11,
    slug: "music",
    shortName: "MUSIC",
    name: "Music Department",
    logo: "/department-logos/music.png",
    description:
      "The department promotes Indian classical music, vocal training, and cultural activities.",
    vision:
      "To preserve and promote Indian musical heritage.",
    mission: [
      "Promote classical music.",
      "Encourage artistic excellence.",
      "Develop cultural appreciation.",
    ],
    hod: "Prof. Pratibha Maravi",
  },

  {
    id: 12,
    slug: "dance",
    shortName: "DANCE",
    name: "Dance Department",
    logo: "/department-logos/dance.png",
    description:
      "The department nurtures creativity and excellence in Indian classical and folk dance forms.",
    vision:
      "To preserve Indian dance traditions.",
    mission: [
      "Promote dance education.",
      "Encourage creativity.",
      "Preserve cultural heritage.",
    ],
    hod: "Prof. Amit Sahare",
  },

  {
    id: 13,
    slug: "commerce",
    shortName: "COMMERCE",
    name: "Commerce Department",
    logo: "/department-logos/commerce.png",
    description:
      "The department provides education in accounting, taxation, finance, banking, and business management.",
    vision:
      "To produce competent commerce professionals.",
    mission: [
      "Provide industry-oriented education.",
      "Promote entrepreneurship.",
      "Develop business ethics.",
    ],
    hod: "Dr. Sanjay Patidar",
  },

  {
    id: 14,
    slug: "life-science",
    shortName: "LIFE SCIENCE",
    name: "Life Science Department",
    logo: "/department-logos/life-science.png",
    description:
      "The department offers interdisciplinary education in biological sciences and life processes.",
    vision:
      "To promote excellence in biological sciences.",
    mission: [
      "Promote scientific research.",
      "Develop laboratory skills.",
      "Encourage innovation.",
    ],
    hod: "Dr. Mamta Hirve",
  },

  {
    id: 15,
    slug: "mathematics",
    shortName: "MATHEMATICS",
    name: "Mathematics Department",
    logo: "/department-logos/mathematics.png",
    description:
      "The department develops analytical thinking through pure and applied mathematics.",
    vision:
      "To achieve excellence in mathematical education.",
    mission: [
      "Strengthen mathematical foundations.",
      "Promote research.",
      "Develop analytical skills.",
    ],
    hod: "Prof. Anita Singh",
  },

  {
    id: 16,
    slug: "physics",
    shortName: "PHYSICS",
    name: "Physics Department",
    logo: "/department-logos/physics.png",
    description:
      "The department provides quality education in theoretical and experimental physics.",
    vision:
      "To become a center of excellence in physics education.",
    mission: [
      "Promote scientific research.",
      "Develop experimental skills.",
      "Encourage innovation.",
    ],
    hod: "Dr. Preeti Gajdhar",
  },

  {
    id: 17,
    slug: "chemistry",
    shortName: "CHEMISTRY",
    name: "Chemistry Department",
    logo: "/department-logos/chemistry.png",
    description:
      "The department focuses on organic, inorganic, physical, and analytical chemistry with modern laboratory practices.",
    vision:
      "To develop skilled chemistry professionals.",
    mission: [
      "Promote research.",
      "Provide practical learning.",
      "Encourage innovation.",
    ],
    hod: "Dr. Rekha Killedar",
  },

  {
    id: 18,
    slug: "botany",
    shortName: "BOTANY",
    name: "Botany Department",
    logo: "/department-logos/botany.png",
    description:
      "The department provides education in plant sciences, biodiversity, ecology, and environmental conservation.",
    vision:
      "To promote excellence in plant science education.",
    mission: [
      "Encourage biodiversity research.",
      "Promote environmental awareness.",
      "Develop laboratory skills.",
    ],
    hod: "Dr. Alka Bajpai",
  },

  {
    id: 19,
    slug: "zoology",
    shortName: "ZOOLOGY",
    name: "Zoology Department",
    logo: "/department-logos/zoology.png",
    description:
      "The department offers education in animal sciences, genetics, ecology, and wildlife conservation.",
    vision:
      "To produce skilled zoologists and researchers.",
    mission: [
      "Promote biological research.",
      "Develop scientific skills.",
      "Encourage conservation awareness.",
    ],
    hod: "Dr. Padmaja Nayadu",
  },

  {
    id: 20,
    slug: "home-science",
    shortName: "HOME SCIENCE",
    name: "Home Science Department",
    logo: "/department-logos/home-science.png",
    description:
      "The department focuses on nutrition, family resource management, textiles, child development, and community health.",
    vision:
      "To empower society through Home Science education.",
    mission: [
      "Promote community development.",
      "Encourage research.",
      "Develop professional skills.",
    ],
    hod: "Dr. Manju Sharma",
  },

  {
    id: 21,
    slug: "sports",
    shortName: "SPORTS",
    name: "Sports Department",
    logo: "/department-logos/sports.png",
    description:
      "The Sports Department promotes physical fitness, sportsmanship, leadership, and participation in various games and athletics.",
    vision:
      "To promote excellence in sports and physical education.",
    mission: [
      "Encourage sports participation.",
      "Develop leadership qualities.",
      "Promote healthy lifestyles.",
    ],
    hod: "Shri Umang Agrawal",
  },
];