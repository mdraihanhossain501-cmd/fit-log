# 🏋️ FitLog — Workout Library & Gym Companion

FitLog is a dark, no-nonsense gym companion application built with Next.js (App Router), Tailwind CSS, and TypeScript. It allows users to browse exercises, manage a daily workout plan with automated metric tracking, save lifts for later, and track exercise completions in real time.

---

## 🚀 Live Demo & Repository

- **Live Site**: https://fit-log-utwe.vercel.app/
- **GitHub Repository**: https://github.com/mdraihanhossain501-cmd/fit-log

---

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router, Client & Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Dark Theme, Electric Lime `#CCFF00` Accents)
- **State Management**: React Context API (`PlanContext`) with `localStorage` persistence
- **Icons**: Lucide React, Assets
- **Notifications**: Sonner (Toast Notifications)

---

## ⚡ Key Features

1. **Interactive Workout Library & Resilient API**:
   - Displays 12 exercise lifts fetched dynamically from the primary Cloudflare Workers API with an automatic fallback mechanism.
   - Cards match Figma specifications with rounded borders (`rounded-2xl`), electric lime category tags (`#CCFF00`), and an inner stats summary panel.

2. **Dynamic Sorting (Challenge C1)**:
   - Client-side sorting dropdown to organize exercises in real time by **Duration**, **Calories burned**, or **Rating**.

3. **Daily Plan Management with 5-Lift Cap**:
   - Add lifts directly to "Today's Plan" with an enforced maximum limit of 5 exercises per day.
   - Saves lifts to a "Saved for later" list.

4. **Live Summary Metrics**:
   - Real-time calculations for total planned exercises, combined duration (minutes), and cumulative calorie burn.

5. **Interactive Logging & Removal (Challenge C3)**:
   - Ability to check off finished exercises with "Mark as Done" (strike-through style) or remove exercises completely.
   - Full state persistence across page reloads using browser `localStorage`.

6. **Custom 404 & Empty States**:
   - Dedicated 404 page for unmatched routes and friendly zero-state messages when no lifts are added to plans or saved lists.

---

## 💻 Local Development Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mdraihanhossain501-cmd/Assignment-6-B14.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Assignment-6-B14/fit-log
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.