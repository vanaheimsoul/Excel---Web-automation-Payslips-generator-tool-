import * as XLSX from 'xlsx';
import { PayslipRow } from './types';

const REQUIRED_COLUMNS = [
  'Employee Name',
  'Designation',
  'Phone',
  'Daily Pay',
  'Overtime Pay',
  'Bonus',
  'Transport Allowance',
  'Attitude Pay Daily',
  'No. of Overtime',
  'Working Days',
  'Month',
  'Insubordination',
  'Unapproved Absence',
  'Lateness'
] as const;

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, '').trim());
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

export async function parsePayrollFile(file: File): Promise<PayslipRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheet = workbook.SheetNames[0];

  if (!firstSheet) {
    throw new Error('No worksheet found in uploaded file.');
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    workbook.Sheets[firstSheet],
    { defval: '' }
  );

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => rows.length > 0 && !(column in rows[0])
  );

  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  return rows.map((row) => ({
    employeeName: String(row['Employee Name'] ?? ''),
    designation: String(row['Designation'] ?? ''),
    phone: String(row['Phone'] ?? ''),
    dailyPay: toNumber(row['Daily Pay']),
    overtimePay: toNumber(row['Overtime Pay']),
    bonus: toNumber(row['Bonus']),
    transportAllowance: toNumber(row['Transport Allowance']),
    attitudePayDaily: toNumber(row['Attitude Pay Daily']),
    noOfOvertime: toNumber(row['No. of Overtime']),
    workingDays: toNumber(row['Working Days']),
    month: String(row['Month'] ?? ''),
    insubordination: toNumber(row['Insubordination']),
    unapprovedAbsence: toNumber(row['Unapproved Absence']),
    lateness: toNumber(row['Lateness'])
  }));
}
