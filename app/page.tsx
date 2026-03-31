import { UploadPanel } from '@/components/UploadPanel';

export default function HomePage() {
  return (
    <main>
      <h1 style={{ marginTop: 0 }}>Payslip Generator (Internal)</h1>
      <p style={{ color: 'var(--muted)' }}>
        Minimal scaffold: upload payroll sheet, preview payslips, and export PNG ZIP.
      </p>
      <UploadPanel />
    </main>
  );
}
