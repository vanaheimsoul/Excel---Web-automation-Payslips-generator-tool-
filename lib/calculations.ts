import { PayslipComputed, PayslipRow } from './types';

export function computePayslip(row: PayslipRow): PayslipComputed {
  const grossPayment = row.dailyPay * row.workingDays;
  const overtimeTotal = row.overtimePay * row.noOfOvertime;
  const attitudePayTotal = row.attitudePayDaily * row.workingDays;
  const totalPayments =
    grossPayment +
    overtimeTotal +
    row.bonus +
    attitudePayTotal +
    row.transportAllowance;
  const totalDeductions =
    row.insubordination + row.unapprovedAbsence + row.lateness;
  const netPay = totalPayments - totalDeductions;

  return {
    ...row,
    grossPayment,
    overtimeTotal,
    attitudePayTotal,
    totalPayments,
    totalDeductions,
    netPay
  };
}
