# ✨ AureaFlow

**AureaFlow** is a personal finance web application focused on clarity, control, and long-term financial awareness.  
It helps users track income, expenses, savings, and financial goals through a clean dashboard and modular sections.

> The goal is not just to store numbers, but to **understand money behavior**.

---

## 🧠 Core Idea

Most finance apps overwhelm users with complexity from day one.  
AureaFlow takes a **progressive approach**:

- Start with **simple overviews**
- Dive deeper only when needed
- Separate concepts clearly (income, expenses, savings, goals)
- Keep the UI calm, readable, and intentional

Each section has a purpose and communicates financial meaning, not just data.

---

## 🧩 Main Features (Current & Planned)

### ✅ Implemented
- Authentication with Supabase
- Protected dashboard routes
- Overview dashboard with summary widgets
- Goals CRUD (create, read, delete)
- Sidebar navigation (collapsible)
- Responsive layout foundation

### 🚧 In Progress / Planned
- Full CRUD for:
  - Income
  - Fixed Expenses
  - Variable Expenses
  - Savings
- Goal prioritization & progress tracking
- Visual charts & trends
- Better UX feedback (loading states, empty states)
- Session handling & auth persistence strategy

---

## 📊 Financial Concepts Explained

| Concept | Meaning |
|------|------|
| **Income** | All money that enters the system (salary, freelance, extra sources) |
| **Expenses** | Money that leaves the system (fixed & variable) |
| **Savings** | Money that remains unassigned or reserved |
| **Goals** | Purpose-driven savings with a target and progress |
| **Overview** | A summarized snapshot of financial health |

> Savings and Goals are related but **not the same**:  
> - Savings = available money  
> - Goals = intentional allocation of savings

---

## 🛠 Tech Stack

### Frontend
- **React + TypeScript**
- **React Router**
- **Tailwind CSS**
- **Framer Motion** (micro-interactions & UI rhythm)
- **Lucide Icons**

### Backend / Services
- **Supabase**
  - Authentication
  - PostgreSQL database
  - Row-level security (RLS)

---

## 🧱 Architecture Overview

The project follows a **feature-oriented and scalable structure**:

