"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres", // Replace with your actual database name if different
    password: "postgres", // Replace with your actual database password
    port: 54322, // Replace with your actual database port
});
var generateDepartments = function (count) {
    var departments = [];
    for (var i = 0; i < count; i++) {
        departments.push({
            short_name: faker_1.faker.hacker.abbreviation(),
            name: faker_1.faker.commerce.department(),
        });
    }
    return departments;
};
// Function to remove single quotes from a string
var removeSingleQuotes = function (str) {
    return str.replace(/'/g, "");
};
var generateStudents = function (count, deptIds) {
    var students = [];
    // const idYears = [2018, 2019, 2020, 2021, 2022, 2023];
    var idYears = [2007];
    var idSuffixStart = 1000;
    for (var i = 0; i < count; i++) {
        var student = {
            school_id: idYears[faker_1.faker.number.int({ min: 0, max: idYears.length - 1 })] +
                "-" +
                (idSuffixStart + i),
            name: "".concat(removeSingleQuotes(faker_1.faker.person.firstName()), " ").concat(removeSingleQuotes(faker_1.faker.person.lastName())),
        };
        if (deptIds.length > 0) {
            student.dept_id = faker_1.faker.helpers.arrayElement(deptIds);
        }
        students.push(student);
    }
    return students;
};
var generateEvents = function (count) {
    var events = [];
    var eventDurations = ["AM_ONLY", "PM_ONLY", "AM_AND_PM"];
    for (var i = 0; i < count; i++) {
        events.push({
            name: faker_1.faker.lorem.words(3),
            date: faker_1.faker.date.soon().toISOString().split("T")[0],
            description: faker_1.faker.lorem.sentence(),
            location: "".concat(faker_1.faker.location.streetAddress()),
            duration: faker_1.faker.helpers.arrayElement(eventDurations),
        });
    }
    return events;
};
var generateAttendance = function (count, studentIds) {
    var attendanceRecords = [];
    for (var i = 0; i < count; i++) {
        var timeIn = faker_1.faker.date.recent();
        var timeOut = faker_1.faker.date.soon({ refDate: timeIn });
        attendanceRecords.push({
            student_id: faker_1.faker.helpers.arrayElement(studentIds),
            time_in: timeIn.toISOString().split("T")[1],
            time_out: timeOut.toISOString().split("T")[1],
            date: timeIn.toISOString().split("T")[0],
        });
    }
    return attendanceRecords;
};
var insertData = function (tableName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var client, _i, data_1, record, keys, values, query, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, 8, 9]);
                _i = 0, data_1 = data;
                _a.label = 3;
            case 3:
                if (!(_i < data_1.length)) return [3 /*break*/, 6];
                record = data_1[_i];
                keys = Object.keys(record).join(", ");
                values = Object.values(record)
                    .map(function (value) { return "'".concat(value, "'"); })
                    .join(", ");
                query = "INSERT INTO ".concat(tableName, " (").concat(keys, ") VALUES (").concat(values, ")");
                console.log("Executing query: ".concat(query)); // Log the query
                return [4 /*yield*/, client.query(query)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                err_1 = _a.sent();
                console.error("Error inserting data into ".concat(tableName, ":"), err_1); // Log any error
                return [3 /*break*/, 9];
            case 8:
                client.release();
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var departmentData, deptIds, studentData, studentIds, attendanceData, eventData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Generating departments...");
                departmentData = generateDepartments(5);
                return [4 /*yield*/, insertData("public.departments", departmentData)];
            case 1:
                _a.sent();
                console.log("Departments inserted.");
                return [4 /*yield*/, pool.query("SELECT id FROM public.departments")];
            case 2:
                deptIds = (_a.sent()).rows.map(function (row) { return row.id; });
                console.log("Generating students...");
                studentData = generateStudents(2000, deptIds);
                return [4 /*yield*/, insertData("public.students", studentData)];
            case 3:
                _a.sent();
                console.log("Students inserted.");
                return [4 /*yield*/, pool.query("SELECT id FROM public.students")];
            case 4:
                studentIds = (_a.sent()).rows.map(function (row) { return row.id; });
                console.log("Generating attendance records...");
                attendanceData = generateAttendance(5000, studentIds);
                return [4 /*yield*/, insertData("public.attendance", attendanceData)];
            case 5:
                _a.sent();
                console.log("Attendance records inserted.");
                console.log("Generating events...");
                eventData = generateEvents(100);
                return [4 /*yield*/, insertData("public.events", eventData)];
            case 6:
                _a.sent();
                console.log("Events inserted.");
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (err) { return console.error("Main error:", err); })
    .finally(function () { return pool.end(); });
