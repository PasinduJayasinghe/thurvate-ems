interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: "annual" | "sick" | "personal" | "unpaid";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}