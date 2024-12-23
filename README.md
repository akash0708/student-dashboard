Here’s a detailed README for your Student Dashboard project:

---

# Student Dashboard

## 🚀 Overview

The **Student Dashboard** is a feature-rich full-stack application designed for managing student information. It is implemented as a pixel-perfect rendition of a Figma design, utilizing cutting-edge technologies like Next.js, Shadcn, and TailwindCSS. This application supports login, adding, removing, updating, and viewing student data with a focus on mobile responsiveness and a seamless user experience.

---

## 📋 Features

- **Pixel-Perfect Design**  
  Based on a Figma design and implemented using Next.js, TailwindCSS, and Shadcn.

- **Full-Stack Functionality**

  - User authentication (Login).
  - Add, update, delete, and view student records.

- **Mobile Responsive**  
  Fully optimized for various screen sizes and devices.

- **State Management**  
  Utilizes Zustand for state management, ensuring a performant and intuitive experience.

- **Validation**  
  Zod and React Hook Form ensure robust client-side validation.

- **Database and ORM**

  - **Prisma** for efficient database interactions.
  - **PostgreSQL** database hosted on Supabase.

- **Deployment**  
  Hosted on Vercel for production-ready performance.

---

## 🌐 Live Demo

Check out the live project here: [Student Dashboard Live](https://student-dashboard-gamma.vercel.app/)

---

## 🛠️ Tech Stack

| Technology          | Purpose                       |
| ------------------- | ----------------------------- |
| **Next.js**         | Frontend framework            |
| **TailwindCSS**     | Styling                       |
| **Shadcn**          | UI components                 |
| **TypeScript**      | Type-safe development         |
| **Prisma**          | ORM for database interactions |
| **PostgreSQL**      | Relational database           |
| **Supabase**        | Database hosting              |
| **Zustand**         | State management              |
| **Zod**             | Schema validation             |
| **React Hook Form** | Form management               |
| **Vercel**          | Deployment                    |

---

## ⚙️ Installation and Setup

### Prerequisites

- Node.js (v16 or later)
- pnpm (Package manager)
- PostgreSQL database

### Steps to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/akash0708/student-dashboard.git
   cd student-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup environment variables**  
   Create a `.env` file in the root directory with the following:

   ```env
   DATABASE_URL="your-supabase-url"
   DIRECT_URL="your-supabase-direct-url"
   ```

4. **Run Prisma migrations**

   ```bash
   pnpm prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Access the application**  
   Open your browser and navigate to `http://localhost:3000`.

---

## 🧪 Testing

This project includes robust validation using Zod. Future iterations may include test suites using Vitest or Jest for unit and integration testing.

---
