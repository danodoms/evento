import users from "@/app/database/users.json";

export interface User {
  id: string;
  name: string;
}

// Function to check if a user exists by ID
export const userExists = (id: string): boolean => {
  return users.some((user: User) => user.id === id);
};

// Function to get user details by ID
export const getUserDetailsById = (id: string): User | undefined => {
  return users.find((user: User) => user.id === id);
};
