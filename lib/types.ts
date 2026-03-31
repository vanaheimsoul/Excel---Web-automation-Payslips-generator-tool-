export type PayslipRow = {
  employeeName: string;
  designation: string;
  phone: string;
  dailyPay: number;
  overtimePay: number;
  bonus: number;
  transportAllowance: number;
  attitudePayDaily: number;
  noOfOvertime: number;
  workingDays: number;
  month: string;
  insubordination: number;
  unapprovedAbsence: number;
  lateness: number;
};

export type PayslipComputed = PayslipRow & {
  grossPayment: number;
  overtimeTotal: number;
  attitudePayTotal: number;
  totalPayments: number;
  totalDeductions: number;
  netPay: number;
};
