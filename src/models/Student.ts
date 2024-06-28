import { Department } from "./Department";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../app/firebase"; // Adjust the import path according to your project structure

/////////////////////////////////////ADD FUNCTIONS

// const colRef = collection(db, "students");

export interface Student {
  idNum: string;
  name: string;
  department: Department | null;
  addedOn: Date;
  addedBy: string;
}

// // Function to check if a Student exists by ID
// export const studentExists = (id: string): boolean => {
//   // return users.some((user: User) => user.id === id);
//   return true;
// };

export const getStudentDetailsByIdNum = async (idNum: string) => {
  try {
    // Create a query to find the student document by idNum
    const studentsCollectionRef = collection(db, "students");
    const queryRef = query(studentsCollectionRef, where("idNum", "==", idNum));

    // Fetch the document
    const querySnapshot = await getDocs(queryRef);

    // Check if a document was found
    if (!querySnapshot.empty) {
      const studentDoc = querySnapshot.docs[0];
      const studentData = studentDoc.data();
      console.log("Student details fetched: ", studentData);
      return studentData;
    } else {
      console.log("No student found with idNum: ", idNum);
      return null;
    }
  } catch (error) {
    console.error("Error fetching student details: ", error);
    return null;
  }
};

export const addStudent = (user: Student): void => {
  // users.push(user);
};
