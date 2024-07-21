import { faker } from "@faker-js/faker";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres", // Replace with your actual database name if different
  password: "postgres", // Replace with your actual database password
  port: 54322, // Replace with your actual database port
});

const generateDepartments = (count: number) => {
  const departments = [];
  for (let i = 0; i < count; i++) {
    departments.push({
      short_name: faker.hacker.abbreviation(),
      name: faker.commerce.department(),
    });
  }
  return departments;
};

interface Student {
  school_id: string;
  name: string;
  dept_id?: number; // dept_id is optional
}

// Function to remove single quotes from a string
const removeSingleQuotes = (str: string): string => {
  return str.replace(/'/g, "");
};

const generateStudents = (count: number, deptIds: number[]): Student[] => {
  const students: Student[] = [];
  // const idYears = [2018, 2019, 2020, 2021, 2022, 2023];
  const idYears = [2007];
  const idSuffixStart = 1000;

  for (let i = 0; i < count; i++) {
    const student: Student = {
      school_id:
        idYears[faker.number.int({ min: 0, max: idYears.length - 1 })] +
        "-" +
        (idSuffixStart + i),
      name: `${removeSingleQuotes(
        faker.person.firstName()
      )} ${removeSingleQuotes(faker.person.lastName())}`,
    };

    if (deptIds.length > 0) {
      student.dept_id = faker.helpers.arrayElement(deptIds);
    }

    students.push(student);
  }

  return students;
};

const generateEvents = (count: number) => {
  const events = [];
  const eventDurations = ["AM_ONLY", "PM_ONLY", "AM_AND_PM"];
  for (let i = 0; i < count; i++) {
    events.push({
      name: faker.lorem.words(3),
      date: faker.date.soon().toISOString().split("T")[0],
      description: faker.lorem.sentence(),
      location: `${faker.location.streetAddress()}`,
      duration: faker.helpers.arrayElement(eventDurations),
    });
  }
  return events;
};

const generateAttendance = (count: number, studentIds: number[]) => {
  const attendanceRecords = [];
  for (let i = 0; i < count; i++) {
    const timeIn = faker.date.recent();
    const timeOut = faker.date.soon({ refDate: timeIn });
    attendanceRecords.push({
      student_id: faker.helpers.arrayElement(studentIds),
      time_in: timeIn.toISOString().split("T")[1],
      time_out: timeOut.toISOString().split("T")[1],
      date: timeIn.toISOString().split("T")[0],
    });
  }
  return attendanceRecords;
};

const insertData = async (tableName: any, data: any) => {
  const client = await pool.connect();
  try {
    for (const record of data) {
      const keys = Object.keys(record).join(", ");
      const values = Object.values(record)
        .map((value) => `'${value}'`)
        .join(", ");
      const query = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
      console.log(`Executing query: ${query}`); // Log the query
      await client.query(query);
    }
  } catch (err) {
    console.error(`Error inserting data into ${tableName}:`, err); // Log any error
  } finally {
    client.release();
  }
};

const main = async () => {
  console.log("Generating departments...");
  const departmentData = generateDepartments(5);
  await insertData("public.departments", departmentData);
  console.log("Departments inserted.");

  const deptIds = (
    await pool.query("SELECT id FROM public.departments")
  ).rows.map((row) => row.id);
  console.log("Generating students...");
  const studentData = generateStudents(2000, deptIds);
  await insertData("public.students", studentData);
  console.log("Students inserted.");

  const studentIds = (
    await pool.query("SELECT id FROM public.students")
  ).rows.map((row) => row.id);
  console.log("Generating attendance records...");
  const attendanceData = generateAttendance(5000, studentIds);
  await insertData("public.attendance", attendanceData);
  console.log("Attendance records inserted.");

  console.log("Generating events...");
  const eventData = generateEvents(100);
  await insertData("public.events", eventData);
  console.log("Events inserted.");
};

main()
  .catch((err) => console.error("Main error:", err))
  .finally(() => pool.end());
