export interface Student {
  idNum: string;
  name: string;
  department: string;
  addedOn: Date;
  addedBy: string;
}

// Function to check if a Student exists by ID
export const studentExists = (id: string): boolean => {
  // return users.some((user: User) => user.id === id);
  return true;
};

// Function to get user details by ID
export const getStudentDetailsById = (id: string): Student | undefined => {
  // return users.find((user: User) => user.id === id);
  return undefined;
};

export const addUser = (user: Student) => {
  // users.push(user);
  return null;
};
