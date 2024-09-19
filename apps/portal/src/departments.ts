import { Department } from "@repo/models/Department";

export const departments: Department[] = [
  {
    id: 1,
    created_at: null,
    short_name: "BSIT",
    name: "Bachelor of Science in Information Technology",
  },
  {
    id: 2,
    created_at: null,
    short_name: "BSBA",
    name: "Bachelor of Science in Business Administration",
  },
  {
    id: 3,
    created_at: null,
    short_name: "BSA",
    name: "Bachelor of Science in Agriculture",
  },
  {
    id: 4,
    created_at: null,
    short_name: "BTLED",
    name: "Bachelor of Science in Technological Education",
  },
];

export const getDeptNameById = (id: number): string | undefined => {
  const dept = departments.find((department) => department.id === id);
  return dept ? dept.name : undefined;
};

// Function to get department short name by ID
export const getDeptShortNameById = (id: number): string | undefined => {
  const dept = departments.find((department) => department.id === id);
  return dept ? dept.short_name : undefined;
};
