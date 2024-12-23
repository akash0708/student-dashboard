import { create } from "zustand";

interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: string[];
  dateJoined: string;
  lastLogin: string;
  status: string;
}

interface StudentStore {
  students: Student[];
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (
    id: string | string[] | undefined,
    updatedData: Partial<Student>
  ) => void;
  removeStudent: (id: string | string[] | undefined) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  updateStudent: (id, updatedData) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updatedData } : student
      ),
    })),
  removeStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),
}));
