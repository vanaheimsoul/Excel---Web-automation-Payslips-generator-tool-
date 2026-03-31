'use client';

import { useMemo, useRef, useState } from 'react';
import { computePayslip } from '@/lib/calculations';
import { exportPayslipsToZip } from '@/lib/export';
import { parsePayrollFile } from '@/lib/parser';
import { PayslipComputed } from '@/lib/types';
import { PayslipPreview } from './PayslipPreview';

const ACCEPTED_EXTENSIONS = '.xlsx,.xls,.csv';

export function UploadPanel() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slips, setSlips] = useState<PayslipComputed[]>([]);
  const previewRefs = useRef<Array<HTMLDivElement | null>>([]);

  const hasSlips = useMemo(() => slips.length > 0, [slips.length]);

  const onUpload = async (file: File | undefined) => {
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const parsedRows = await parsePayrollFile(file);
      const computed = parsedRows.map(computePayslip);
      setSlips(computed);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : 'Unable to parse file';
      setError(message);
      setSlips([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid cols-2">
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Upload Payroll File</h3>
        <p style={{ color: 'var(--muted)' }}>
          Accepted formats: {ACCEPTED_EXTENSIONS}
        </p>
        <input
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={(event) => onUpload(event.target.files?.[0])}
        />

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={() =>
              exportPayslipsToZip(
                previewRefs.current.filter(
                  (node): node is HTMLDivElement => node !== null
                )
              )
            }
            disabled={!hasSlips || loading}
          >
            Export ZIP (PNG)
          </button>
        </div>

        {loading ? <p>Processing file...</p> : null}
        {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      </section>

      <section>
        {hasSlips ? (
          slips.map((slip, index) => (
            <PayslipPreview
              key={`${slip.employeeName}-${index}`}
              slip={slip}
              ref={(el) => {
                previewRefs.current[index] = el;
              }}
            />
          ))
        ) : (
          <div className="card">
            <p style={{ margin: 0 }}>
              Upload a payroll file to preview generated payslips.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
