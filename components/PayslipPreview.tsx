import { forwardRef } from 'react';
import { PayslipComputed } from '@/lib/types';

type Props = {
  slip: PayslipComputed;
};

const money = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const PayslipPreview = forwardRef<HTMLDivElement, Props>(function PayslipPreview(
  { slip },
  ref
) {
  return (
    <div
      ref={ref}
      className="card"
      style={{ width: 760, marginBottom: '1rem', background: '#fff' }}
    >
      <h2 style={{ marginTop: 0 }}>Employee Payslip ({slip.month})</h2>
      <p>
        <strong>Name:</strong> {slip.employeeName} | <strong>Designation:</strong>{' '}
        {slip.designation} | <strong>Phone:</strong> {slip.phone}
      </p>
      <hr />
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', fontSize: 14 }}>
        <div>
          <h4>Payments</h4>
          <p>Gross Payment: {money(slip.grossPayment)}</p>
          <p>Overtime Total: {money(slip.overtimeTotal)}</p>
          <p>Bonus: {money(slip.bonus)}</p>
          <p>Attitude Pay Total: {money(slip.attitudePayTotal)}</p>
          <p>Transport Allowance: {money(slip.transportAllowance)}</p>
          <p>
            <strong>Total Payments: {money(slip.totalPayments)}</strong>
          </p>
        </div>
        <div>
          <h4>Deductions</h4>
          <p>Insubordination: {money(slip.insubordination)}</p>
          <p>Unapproved Absence: {money(slip.unapprovedAbsence)}</p>
          <p>Lateness: {money(slip.lateness)}</p>
          <p>
            <strong>Total Deductions: {money(slip.totalDeductions)}</strong>
          </p>
          <p style={{ marginTop: 22 }}>
            <strong style={{ fontSize: 18 }}>Net Pay: {money(slip.netPay)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
});
