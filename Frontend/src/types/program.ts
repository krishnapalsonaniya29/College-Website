export interface Subject {
  id: number;
  subjectCode: string;
  subjectName: string;
  isActive: boolean;
}

export interface Program {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
  subjects: Subject[];
}