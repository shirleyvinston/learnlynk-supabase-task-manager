# LearnLynk Supabase Task Manager  
A task management demo built for the LearnLynk assessment, using **Supabase Edge Functions**, **Realtime**, and **Next.js App Router**.

This project demonstrates:

✔ Creating tasks via Supabase Edge Functions  
✔ Emitting realtime events when tasks are created  
✔ Listening to realtime updates in the UI  
✔ Displaying, updating (mark completed), and syncing tasks across tabs  
✔ Secure API routing using Next.js server routes  
✔ End-to-end integration between Supabase + Next.js

---

## 🚀 Tech Stack

| Component | Technology |
|----------|------------|
| Frontend | Next.js 16 (App Router), Tailwind CSS |
| Backend  | Supabase Edge Functions |
| Database | Supabase Postgres |
| Realtime | Supabase Realtime Channels |
| Client SDK | `@supabase/supabase-js` |

---

## 📂 Project Structure

supabase-client-demo/
├── app/
│ ├── create-task/ # UI for creating new tasks
│ ├── realtime-listener/ # UI showing realtime events
│ ├── tasks/ # Page listing all tasks with actions
│ └── api/
│ └── create-task/ # Next.js server route → calls Edge Function
├── lib/
│ └── supabaseClient.ts # Browser Supabase client
├── public/
├── .env.local # API keys (not checked into git)
└── README.md

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

```sh
git clone https://github.com/shirleyvinston/learnlynk-supabase-task-manager.git
cd learnlynk-supabase-task-manager
