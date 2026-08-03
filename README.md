# 📊 Customer Data Validation & ETL Pipeline

> **Serverless ETL Platform** designed to automate customer data validation, cleansing, transformation and preparation for SaaS, CRM and ERP migrations. The application processes CSV and Excel files, ensuring data quality, reducing manual effort and improving operational efficiency during customer onboarding.

---

# 🚀 Business Problem

Customer onboarding and data migration processes required the operations team to manually review and sanitize every spreadsheet before importing it into the destination system.

Each file demanded approximately **30 minutes** of repetitive manual work, creating operational bottlenecks and increasing the risk of import failures caused by inconsistent data.

The most common issues included:

* Invalid phone numbers
* Incorrect CPF/CNPJ formatting
* Malformed email addresses
* Hidden Unicode/BOM characters that prevented successful imports
* Inconsistent capitalization of customer names
* Missing mandatory information

Besides consuming valuable operational time, these inconsistencies directly impacted onboarding quality and customer experience.

---

# 💡 Solution

To eliminate manual validation, I designed and implemented a **Serverless ETL Platform** capable of automatically processing customer spreadsheets before they are imported into CRM and SaaS platforms.

The application performs the complete ETL workflow, from file ingestion to validation, data cleansing, classification and export, ensuring that only high-quality records reach the destination system.

---

# ✨ Key Features

## 📂 Client-side File Processing

* Reads CSV, XLS and XLSX files directly in the browser using **SheetJS**
* Reduces server workload
* Eliminates file upload latency

---

## 🔍 Intelligent Column Detection

Instead of relying on fixed column positions, the application dynamically identifies business fields using keyword matching.

Automatically recognizes columns such as:

* Customer Name
* Company Name
* CPF/CNPJ
* Email
* Phone Number

This allows files from different clients and layouts to be processed without configuration changes.

---

## 🧹 Data Cleansing & Validation

The ETL pipeline automatically performs:

* Unicode/BOM character removal
* Whitespace normalization
* Email validation
* Phone number validation
* Customer name normalization
* Field sanitization
* Data consistency verification

---

## 📋 Automated Data Classification

After validation, records are automatically separated into two datasets:

### ✅ Valid Records

Cleaned, standardized and ready for import.

### ⚠️ Records Requiring Review

Rows containing inconsistencies are exported separately with a dynamically generated **"Review Reason"** column explaining exactly what must be corrected.

This significantly reduces manual review effort.

---

## 📈 Audit Logging

Every execution generates an operational log containing:

* Processing date
* Processing type
* Total records processed
* Valid records
* Invalid records
* Processing statistics

This enables operational monitoring and historical tracking of migrations.

---

# 📊 Business Impact

The solution delivered measurable operational improvements:

* ⚡ Reduced processing time by approximately **97%** (from ~30 minutes to under 1 minute per file)
* 📉 Significantly reduced manual validation errors before data import
* 🚀 Increased operational scalability by automating repetitive onboarding activities
* 👥 Enabled Customer Success teams to focus on customer adoption and strategic initiatives instead of repetitive data preparation

---

# 🏗️ Technical Highlights

* Serverless Architecture
* ETL Pipeline
* Data Quality Validation
* Dynamic Schema Detection
* Browser-side Processing
* Regex Validation
* Unicode Sanitization
* Automated Data Segregation
* Audit Logging
* Asynchronous JavaScript
* Zero-install Deployment

---

# 🛠️ Tech Stack

| Layer           | Technologies                                  |
| --------------- | --------------------------------------------- |
| Frontend        | HTML5, CSS3, JavaScript (ES6+)                |
| Backend         | Google Apps Script                            |
| Data Processing | ETL Pipeline, Regex Validation, Base64 Stream |
| Libraries       | SheetJS (xlsx)                                |
| File Formats    | CSV, XLS, XLSX                                |

---

# 🔄 Application Workflow

```text
CSV / XLSX File
        │
        ▼
Client-side Parser (SheetJS)
        │
        ▼
Dynamic Column Detection
        │
        ▼
Data Cleansing
        │
        ▼
Validation Rules
        │
        ▼
Data Classification
        │
        ├────────► Valid Records
        │
        └────────► Records Requiring Review
                        │
                        ▼
               Audit Logging
                        │
                        ▼
          Ready-to-import CSV Output
```

---

# 🎯 Skills Demonstrated

* ETL Development
* Data Validation
* Process Automation
* Customer Operations
* Data Quality
* Serverless Development
* JavaScript
* Google Apps Script
* Business Process Optimization
* SaaS Operations
* Workflow Automation

---

# 👨‍💻 Author

**Weberson Lopes**

Senior Customer Success Analyst | Customer Success Operations | Process Automation | Data Analytics

**Tech Stack:** Python • SQL • Google Apps Script • JavaScript • Power BI • ETL • SaaS
