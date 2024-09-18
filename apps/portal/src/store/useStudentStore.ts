import { create } from "zustand";

type StudentState = {
  id: string;
  firstName: string;
  lastName: string;
  dept: string;
  photo: string | undefined;
  croppedPhoto: string | null;
  setId: (id: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDept: (dept: string) => void;
  setPhoto: (photo: string | undefined) => void;
  setCroppedPhoto: (croppedPhoto: string | null) => void;
};

export const useStudentStore = create<StudentState>((set) => ({
  id: "",
  firstName: "",
  lastName: "",
  dept: "",
  photo: undefined,
  croppedPhoto: null,
  setId: (id: string) => set({ id }),
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
  setDept: (dept: string) => set({ dept }),
  setPhoto: (photo: string | undefined) => set({ photo }),
  setCroppedPhoto: (croppedPhoto: string | null) => set({ croppedPhoto }),
}));
