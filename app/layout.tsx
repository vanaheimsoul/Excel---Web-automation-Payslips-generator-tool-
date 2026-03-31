import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payslip Generator',
  description: 'Internal tool for generating payslips from Excel files.'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
