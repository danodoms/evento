import { create } from "zustand";

type StudentState = {
  isEditing: boolean;
  id: string;
  firstName: string;
  lastName: string;
  dept: string;
  photo: string | undefined;
  croppedPhoto: string | undefined;
  setIsEditing: (isEditing: boolean) => void;
  setId: (id: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDept: (dept: string) => void;
  setPhoto: (photo: string | undefined) => void;
  setCroppedPhoto: (croppedPhoto: string | undefined) => void;
};

export const useStudentStore = create<StudentState>((set) => ({
  isEditing: false,
  id: "",
  firstName: "",
  lastName: "",
  dept: "",
  photo: undefined,
  croppedPhoto: undefined,
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  setId: (id: string) => set({ id }),
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
  setDept: (dept: string) => set({ dept }),
  setPhoto: (photo: string | undefined) => set({ photo }),
  setCroppedPhoto: (croppedPhoto: string | undefined) => set({ croppedPhoto }),
}));
