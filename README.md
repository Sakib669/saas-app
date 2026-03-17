# 🤖 AI Companion - Real-time AI Voice Tutor

An interactive AI-powered SaaS application that allows users to have real-time voice conversations with specialized AI tutors (Companions). Built with **Next.js 15**, **Vapi AI**, **Supabase**, and **Clerk**.

---

## 🚀 Features

* **Real-time Voice Interaction:** Seamless, low-latency voice conversations using Vapi AI.
* **Custom AI Companions:** Create and customize tutors with specific subjects, topics, and conversation styles.
* **Persistent Memory:** Each companion remembers its context and teaching guidelines.
* **Session History:** Track and view previous learning sessions and companions.
* **Secure Authentication:** User management and protected routes via Clerk.
* **Modern UI/UX:** Responsive design built with Tailwind CSS and Shadcn UI.
* **Database & Storage:** Reliable data management with Supabase.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS, Shadcn UI
* **Authentication:** Clerk
* **Database:** Supabase (PostgreSQL)
* **AI/Voice Engine:** Vapi AI
* **Language:** TypeScript

---
🏁 Getting Started
Prerequisites
* Node.js 18+ installed

* A Supabase account and project

* A Clerk account

* A Vapi AI account

---

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Vapi AI
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_API_KEY=your_vapi_api_key

---

## 📂 Project Structure

```directory
SAAS-APP/
├── 📁 .clerk/            # Clerk authentication configurations
├── 📁 public/            # Static assets (icons, images, svgs)
├── 📁 src/
│   ├── 📁 app/           # Next.js App Router (Pages, Layouts & API routes)
│   ├── 📁 components/    # Reusable UI components (shadcn/ui & custom)
│   ├── 📁 constants/     # Static data, site config & constants
│   ├── 📁 lib/           # Core utilities (Supabase, Vapi config, helpers)
│   ├── 📁 types/         # TypeScript type definitions and interfaces
└──── 📄 proxy.ts       # Proxy configuration or helper