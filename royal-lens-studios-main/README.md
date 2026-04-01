# Royal Lens Studios

இந்த project ஒரு premium photography studio website. இது client-facing marketing website மட்டும் இல்லாமல், login, booking, lead capture, client tracking, package management, basic admin operations ஆகியவற்றையும் cover பண்ணும் frontend demo product ஆக build பண்ணப்பட்டுள்ளது.

இந்த version முழுவதும் frontend-only architecture-ல் உள்ளது. Real backend/database இல்லாமல் browser `localStorage`-ஐ use பண்ணி demo data, auth state, bookings, leads, clients, packages, settings எல்லாம் simulate பண்ணப்பட்டுள்ளது. அதனால் இது presentation, client demo, UI approval, workflow validation, future backend integration planning ஆகியவற்றுக்கு மிகவும் suitable.

## 1. Project Purpose

இந்த website-ஐ build பண்ணிய முக்கிய நோக்கங்கள்:

- photography brand-க்கு premium digital presence உருவாக்க
- visitors-ஐ enquiry / booking ஆக convert பண்ண
- studio services, portfolio, brand story, testimonials-ஐ structured-ஆ show பண்ண
- client login + booking flow demonstrate பண்ண
- admin side-ல bookings, leads, clients, projects, packages, settings manage பண்ணும் workflow காட்ட

## 2. Tech Stack

| Layer | Used In Project | Purpose |
| --- | --- | --- |
| Build Tool | Vite | Fast development server and production build |
| Frontend Library | React 18 | Component-based UI architecture |
| Language | TypeScript | Type safety, maintainability, safer refactoring |
| Routing | React Router DOM | Multi-page SPA routing |
| Styling | Tailwind CSS | Utility-first responsive styling |
| UI Primitives | Radix UI + shadcn-style components | Accessible reusable UI elements |
| Animation | Framer Motion | Smooth entrance animations and transitions |
| Forms | React state + custom validation | Login, signup, booking, contact flows |
| HTTP-ready Layer | Axios | Future backend API integration readiness |
| Testing | Vitest + Testing Library | Smoke tests and component behavior tests |

## 3. Enna Language Use Pannirukkom

- `TypeScript (.ts, .tsx)`  
  Main application logic, components, routes, auth flow, admin modules, data layer

- `HTML`  
  Vite app entry and browser mount point

- `CSS / Tailwind CSS`  
  Theme tokens, gradients, spacing, glass/neon visual language, responsive layout

- `JavaScript config files`  
  Build, lint, Tailwind, PostCSS, test configuration

## 4. Core Concepts Used

இந்த project-ல் பயன்படுத்தப்பட்ட முக்கிய frontend concepts:

- `Component-Based Architecture`  
  ஒவ்வொரு UI section-மும் reusable component-ஆ break பண்ணப்பட்டுள்ளது. Example: navbar, footer, hero, section heading, cards, admin sidebar.

- `Single Page Application (SPA)`  
  Full page reload இல்லாமல் route changes handle ஆகிறது.

- `Lazy Loading / Code Splitting`  
  `App.tsx`-ல் pages lazy import செய்யப்பட்டுள்ளது. இதனால் initial load weight குறையும்.

- `Protected Routes / Role-Based Access`  
  Admin pages `AdminGuard` மூலம் protect பண்ணப்பட்டுள்ளன. User role அடிப்படையில் admin/staff access allow செய்யப்படுகிறது.

- `Context-Based Authentication`  
  `useAdminAuth` provider மூலம் app முழுக்க auth state share செய்யப்படுகிறது.

- `Local Persistence`  
  Browser `localStorage` மூலம் demo users, bookings, leads, clients, packages, settings persist ஆகின்றன.

- `Form Validation`  
  Auth forms-க்கு email format, password length, confirm password match போன்ற validation rules உள்ளது.

- `Responsive Design`  
  Mobile, tablet, desktop view எல்லாவற்றுக்கும் adaptive layout build பண்ணப்பட்டுள்ளது.

- `Motion Design`  
  Section reveal, testimonial transition, button/hover feel போன்றவற்றுக்கு Framer Motion பயன்படுத்தப்பட்டுள்ளது.

- `Performance-Oriented Media Handling`  
  Hero video மற்றும் page hero video-களுக்கு lazy loading, deferred loading, poster fallback, reduced-motion aware behavior implement பண்ணப்பட்டுள்ளது.

- `Future Backend Readiness`  
  தற்போது local store use பண்ணினாலும் `api.ts`, `authApi`, `bookingApi`, `adminApi`, `publicApi` மாதிரி abstraction layers already இருக்கு. Future-ல் real API connect பண்ண easy ஆகும்.

## 5. Visual Design Direction

இந்த website ஒரு generic template மாதிரி இல்லாமல், premium cinematic brand feel கொடுக்க intentionally design பண்ணப்பட்டுள்ளது.

- dark luxury background
- gold + warm accent palette
- serif heading + sans-serif body typography pairing
- glass / neon card treatment
- cinematic video-backed hero sections
- conversion-focused CTA placement

Brand tone:

- premium
- cinematic
- elegant
- modern
- conversion-oriented

## 6. Public Website Pages and Sections

### Home Page (`/`)

Home page conversion-focused landing page ஆக build பண்ணப்பட்டுள்ளது.

இதில் உள்ள முக்கிய sections:

- `Hero Section`
  - cinematic background video
  - premium headline
  - booking CTA
  - contact CTA
  - quick value signals

- `Problem Section`
  - weak creative / inconsistent branding / slow delivery போன்ற client pain points highlight

- `Solution Section`
  - conversion-first creative
  - fast production system
  - premium positioning

- `Pricing / Packages Section`
  - top packages preview
  - dynamic package fetch with fallback plans
  - featured package highlight

- `Closing CTA Section`
  - start project
  - view services

### Portfolio Page (`/portfolio`)

இந்த page studio showcase section ஆக build பண்ணப்பட்டுள்ளது.

- category filter buttons
- masonry-style image presentation
- hover caption reveal
- categories:
  - Weddings
  - Portraits
  - Fashion
  - Events
  - Baby Shoots

### Services Page (`/services`)

Studio service offerings-ஐ clearly present பண்ணும் page.

- service hero section with video
- service cards
- pricing starting points
- trust-building stats row
- custom package WhatsApp CTA

Current service categories:

- Wedding Photography
- Fashion Shoots
- Corporate Portraits
- Event Coverage
- Baby Shoots

### About Page (`/about`)

Brand credibility and emotional trust build பண்ணும் page.

- studio journey hero
- experience stats
- studio gallery
- milestone timeline
- team introduction cards

இந்த page clientக்கு “இந்த brand serious-ஆ build பண்ணப்பட்டுள்ளது” என்ற trust signal கொடுக்கிறது.

### Testimonials Page (`/testimonials`)

Social proof page.

- rating summary
- rotating featured testimonial slider
- manual next / previous controls
- all reviews grid

இந்த section conversion-க்கு important because it reduces hesitation.

### Contact Page (`/contact`)

Lead generation page.

- contact details block
- business hours
- message form
- enquiry capture flow

இந்த form submit ஆனதும் message local store-ல் save ஆகும், அதே சமயம் lead record-ஆவும் convert ஆகும்.

### Auth Page (`/auth`)

Login and signup page.

- login mode
- signup mode
- inline field validation
- password visibility toggle
- auth error handling
- existing session redirect

### Booking Page (`/booking`)

Logged-in users மட்டும் use பண்ணும் booking dashboard.

- authenticated access required
- booking creation form
- preferred date picker
- shoot type selection
- user’s existing bookings list

Booking create ஆனதும்:

- booking record create ஆகும்
- lead automatically update/create ஆகும்
- client record automatically update/create ஆகும்

இதனால் business workflow simulation realistic-ஆ இருக்கு.

## 7. Static Content vs Dynamic Demo Content

### Mostly Static Showcase Content

- Home hero messaging
- Services listing
- Portfolio sample gallery
- About timeline and team showcase
- Testimonials display content

இந்த sections presentation-oriented content ஆக உள்ளது. Visual storytelling, brand positioning, service communication இவைகளுக்காக build பண்ணப்பட்டுள்ளது.

### Dynamic Demo Content

- auth users
- packages preview
- contact messages
- bookings
- leads
- clients
- admin settings
- admin dashboard numbers

இந்த sections browser-side data layer மூலம் simulate பண்ணப்படுகின்றன. அதனால் backend இல்லாமலேயே workflow demo நடத்த முடிகிறது.

## 8. Admin Panel Structure

Admin routes `/admin` கீழ் protected layout-ஆ build பண்ணப்பட்டுள்ளது.

### Admin Dashboard

- total bookings
- today’s bookings
- leads count
- clients count
- recent bookings
- recent leads

### Admin Bookings

- booking list table
- booking search
- status update

Supported statuses:

- pending
- confirmed
- rescheduled
- completed
- cancelled

### Admin Leads

- lead table
- lead search
- add lead dialog
- lead status update

Supported lead stages:

- new
- contacted
- visit_scheduled
- won
- lost

### Admin Clients

- clients grid
- search client
- add client dialog
- booking count visibility

### Admin Projects

- portfolio/project records
- add project dialog
- slug generation support
- category assignment
- delete action

### Admin Packages

- package cards
- add package dialog
- popular package flag
- delete package

### Admin Settings

- studio name
- WhatsApp number
- phone
- email
- address

இந்த admin section future backend CRM / studio ops dashboard-க்கு base architecture மாதிரி இருக்கிறது.

## 9. Data and Storage Architecture

Current project-ல் real backend இல்லை. ஆனால் structure backend-ready ஆக build பண்ணப்பட்டுள்ளது.

### Current Flow

`UI Page -> Service Layer -> localStore -> localStorage`

### Important Service Files

- `src/lib/services/publicApi.ts`
  - public packages
  - contact message create

- `src/lib/services/authApi.ts`
  - register
  - login
  - current user
  - logout

- `src/lib/services/bookingApi.ts`
  - current user bookings
  - create booking

- `src/lib/services/adminApi.ts`
  - dashboard
  - bookings
  - leads
  - clients
  - projects
  - packages
  - settings

- `src/lib/services/localStore.ts`
  - entire mock database and business logic
  - seed users
  - seed bookings
  - seed leads
  - seed clients
  - seed packages
  - seed settings
  - record linking logic

### Seed Demo Accounts

- Admin: `admin@royallens.studio` / `admin123`
- Staff: `staff@royallens.studio` / `staff123`
- Client: `client@example.com` / `client123`

## 10. Project Folder Structure

```text
royal-lens-studios-main/
├─ public/
├─ scripts/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ admin/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ hooks/
│  ├─ lib/
│  │  ├─ services/
│  │  └─ validation/
│  ├─ pages/
│  │  └─ admin/
│  ├─ test/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
├─ tailwind.config.ts
├─ vite.config.ts
└─ vitest.config.ts
```

### Folder Responsibility

- `src/pages`
  Main route-level screens

- `src/components`
  Reusable UI and feature components

- `src/components/ui`
  Shared base UI components built in shadcn/Radix style

- `src/hooks`
  Shared hooks like auth state and responsive helpers

- `src/lib/services`
  Data access and business logic layer

- `src/lib/validation`
  Form validation rules

- `src/assets`
  Hero videos and media assets

## 11. Performance and UX Decisions

இந்த project build பண்ணும்போது UX மட்டும் இல்லாமல் performance-மும் consider பண்ணப்பட்டுள்ளது.

- route-level lazy loading
- deferred media loading
- video poster fallback
- reduced-motion aware behavior
- responsive images with `srcSet`
- mobile-safe auth layout
- accessible form labels
- clear loading and error states

## 12. Testing Coverage

Project-ல் existing automated tests உள்ளது.

- public pages smoke tests
- auth page validation and login flow tests
- lazy video component behavior tests

Used tools:

- `Vitest`
- `@testing-library/react`
- `jsdom`

## 13. Client Explanation Summary

Clientக்கு இந்த project-ஐ simple-ஆ explain பண்ண வேண்டுமென்றால்:

> இது ஒரு premium photography studio website. இதில் public branding website, user login/signup, online booking flow, enquiry capture, மற்றும் studio team use பண்ணும் admin dashboard ஆகியவை ஒரே frontend system-ஆ build பண்ணப்பட்டுள்ளன. இப்போதைக்கு இது frontend demo version; data browser-ல் save ஆகிறது. ஆனால் architecture backend connect பண்ண future-க்கு ready-ஆ வைத்திருக்கிறோம்.

## 14. Future Upgrade Scope

இந்த project-ஐ next phase-ல் கீழே சொன்ன மாதிரி extend பண்ணலாம்:

- real backend API integration
- database connection
- secure JWT/session auth
- image upload and project gallery management
- email / WhatsApp notification integration
- payment gateway for booking advance
- calendar availability management
- CMS-style content editing
- analytics dashboard

## 15. Local Development

Outer workspace-ல் இருந்து run பண்ண வேண்டுமெனில்:

```bash
cd royal-lens-studios-main
npm.cmd install
npm.cmd run dev -- --host 0.0.0.0 --port 5173
```

App default URL:

`http://localhost:5173`

## 16. Build Command

```bash
cd royal-lens-studios-main
npm.cmd run build
```

## 17. Important Note

இந்த version:

- frontend-only
- demo-friendly
- backend-ready
- client presentation ready
- UI/UX approval ready

Real production launch-க்கு backend, security, database, media management, deployment hardening போன்ற next steps சேர்க்க வேண்டும்.
