export interface Attendance {
  eventId: string;
  records: {
    idNum: string;
    name: string;
    timeIn: string;
    timeOut: string;
  };
}

async function addAttendanceRecord(userId: number, timestamp: String) {}
