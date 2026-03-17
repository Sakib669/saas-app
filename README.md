🤖 AI Companion - Real-time AI Voice Tutor
An interactive AI-powered SaaS application that allows users to have real-time voice conversations with specialized AI tutors (Companions). Built with Next.js 15, Vapi AI, Supabase, and Clerk.

🚀 Features
Real-time Voice Interaction: Seamless, low-latency voice conversations using Vapi AI.

Custom AI Companions: Create and customize tutors with specific subjects, topics, and conversation styles.

Persistent Memory: Each companion remembers its context and teaching guidelines.

Session History: Track and view previous learning sessions and companions.

Secure Authentication: User management and protected routes via Clerk.

Modern UI/UX: Responsive design built with Tailwind CSS and Shadcn UI.

Database & Storage: Reliable data management with Supabase.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Styling: Tailwind CSS, Shadcn UI

Authentication: Clerk

Database: Supabase (PostgreSQL)

AI/Voice Engine: Vapi AI

Language: TypeScript

🏁 Getting Started
Prerequisites
Node.js 18+ installed

A Supabase account and project

A Clerk account

A Vapi AI account

Installation
Clone the repository:

Bash
git clone https://github.com/Sakib669/saas-app
cd ai-companion
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a .env.local file in the root directory and add the following:

Code snippet
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_VAPI_PUBLIC_KEY=
VAPI_API_KEY=
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
/src/app - Next.js App Router (Pages & API routes)

/src/components - Reusable UI components

/src/lib - Utility functions, Supabase client, and Vapi configuration

/src/constants - Static data and configuration constants

/public - Static assets (icons, images)