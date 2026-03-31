# Payslip Generator Tool

A simple internal web tool for generating employee payslips from an uploaded Excel file.

This project was built to automate and speed up HR payroll processing by replacing manual Excel-based workflows with a faster, preview-driven system.

---

## 🚀 Features

- Upload payroll data via Excel (.xlsx, .xls, .csv)
- Automatically generate payslips for each employee
- Preview payslips before export
- Export all payslips as image files (PNG)
- Bulk download as ZIP

---

## 🧠 How It Works

1. Upload a payroll sheet
2. The system parses employee data
3. Payslips are generated using a fixed template
4. You preview results
5. Download all payslips as images

---

## 📊 Expected Excel Format

The uploaded file should include the following columns:

- Employee Name  
- Designation  
- Phone  
- Daily Pay  
- Overtime Pay  
- Bonus  
- Transport Allowance  
- Attitude Pay Daily  
- No. of Overtime  
- Working Days  
- Month  
- Insubordination  
- Unapproved Absence  
- Lateness  

---

## 🧮 Calculations

- **Gross Payment** = Daily Pay × Working Days  
- **Overtime Total** = Overtime Pay × No. of Overtime  
- **Attitude Pay Total** = Attitude Pay Daily × Working Days  

- **Total Payments** =  
  Gross Payment + Overtime Total + Bonus + Attitude Pay Total + Transport Allowance  

- **Total Deductions** =  
  Insubordination + Unapproved Absence + Lateness  

- **Net Pay** = Total Payments − Total Deductions  

---

## 🛠️ Tech Stack (Planned)

- Next.js (Frontend)
- Vercel (Deployment)
- XLSX (Excel parsing)
- html-to-image (Payslip export)
- JSZip (Bulk download)

---

## ⚠️ Scope

This is a lightweight internal tool.

Not included:
- Authentication
- Database storage
- Payroll tax calculations
- Multi-company support

---

## 📌 Roadmap

- [ ] Upload and parse Excel file
- [ ] Generate payslip template dynamically
- [ ] Preview payslips
- [ ] Export as PNG
- [ ] Bulk ZIP download
- [ ] Email sending (optional)

---

## 💡 Purpose

This project was created to:
- Reduce manual HR workload
- Eliminate repetitive payslip generation in Excel
- Provide a faster, more reliable workflow

---

## 📄 License

MIT (or your preferred license)
