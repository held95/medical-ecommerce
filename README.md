# MEG Exclusive - Premium Medical Ecommerce Platform

> **Invite-only, premium ecommerce platform exclusively for MEG doctors.** This is a private members-only club providing exclusive access to premium experiences, services, and benefits.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

---

## 🎯 Project Overview

MEG Exclusive is a premium platform that provides MEG doctors with:
- ✈️ **Premium Travel & Retreats** - Exclusive wellness experiences
- 💪 **Health & Wellness Programs** - Advanced health optimization
- 🏠 **Lifestyle Services** - Premium comfort solutions
- 🚗 **Mobility & Vehicles** - Exclusive vehicle access
- 💻 **Technology & Tools** - Latest professional equipment
- 🎓 **Education & Career Growth** - Professional development

### Core Values
- **Exclusivity** - Invite-only access for verified MEG doctors
- **Premium Feel** - No "cheap ecommerce" patterns
- **Trust & Discretion** - Secure, professional platform
- **Time-Saving** - Dedicated concierge service

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Premium UI components

### Backend & Database
- **Supabase** - PostgreSQL database, authentication, and storage
- **Row Level Security (RLS)** - Data protection policies

### Deployment
- **Vercel** - Hosting and deployment platform

---

## 📦 What's Been Built

### ✅ Completed Features

#### 1. **Project Setup & Configuration**
- Next.js 14 with TypeScript and Tailwind CSS
- Premium theme with Deep Navy + Warm Gold palette
- shadcn/ui components integrated
- All dependencies installed

#### 2. **Database Schema** (`supabase/migrations/`)
- **001_initial_schema.sql** - 7 core tables:
  - `profiles` - Doctor information
  - `invites` - Invite-only system
  - `categories` - Experience categories (6 types)
  - `experiences` - Premium products/services
  - `bookings` - Reservation system
  - `partners` - Partner management
  - `membership_plans` - Future monetization

#### 3. **Row Level Security** (`supabase/migrations/002_rls_policies.sql`)
- Secure data access policies
- Users can only view/edit own data
- Service role for admin operations
- Auto-decrement invite counts
- Booking count tracking

#### 4. **Seed Data** (`supabase/migrations/003_seed_data.sql`)
- 6 experience categories
- 8 sample premium experiences
- 3 membership plan templates
- Sample partner data

#### 5. **Authentication System**
- **Login Page** - Full authentication flow
- **Signup Page** - Multi-step with invite validation
- **Invite Validation** - Pre-filled invite codes
- **Unauthorized Page** - Premium access denied messaging
- Auth components with validation:
  - CPF format validation
  - Email validation
  - Password strength check
  - Phone number formatting

#### 6. **Supabase Integration**
- Browser client for client-side operations
- Server client for SSR/API routes
- Auth middleware protecting routes
- Complete TypeScript types

#### 7. **Utilities & Helpers**
- **Validation** - CPF, email, phone, password
- **Formatting** - Dates, currency, text
- **Categories** - Category definitions
- **cn utility** - Tailwind class merging

#### 8. **Layout Components**
- **Header** - Navigation + profile dropdown
- **Footer** - Links and contact
- **Platform Layout** - Wraps protected pages

#### 9. **Pages**
- **Landing Page** - Auto-redirects based on auth
- Complete auth flow pages

---

## 🚀 Setup Instructions

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Create Supabase Project**

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose a name and region (São Paulo recommended)
4. Wait ~2 minutes for setup

### 3. **Run Database Migrations**

In Supabase dashboard:
1. Go to **SQL Editor**
2. Open each migration file from `supabase/migrations/`
3. Copy and paste, then run in order:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_seed_data.sql`

### 4. **Configure Environment Variables**

```bash
# Copy the template
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
# Get these from Supabase Dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CONCIERGE_WHATSAPP=5511999999999
NEXT_PUBLIC_CONCIERGE_EMAIL=concierge@meg.com.br
```

### 5. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing the Platform

### Create Test Invite Code

In Supabase dashboard, go to **SQL Editor** and run:

```sql
INSERT INTO invites (code, invited_email, status, expires_at)
VALUES (
  'MEG-TEST-2026',
  'test@example.com',
  'pending',
  TIMEZONE('utc', NOW()) + INTERVAL '90 days'
);
```

### Test Signup Flow

1. Visit `/signup` or `/invite/MEG-TEST-2026`
2. Fill in the form with:
   - Email: any valid email
   - Password: minimum 8 characters
   - CPF: format `123.456.789-01` or `12345678901`
3. Complete signup → Auto-redirect to `/dashboard`

### Test Login Flow

1. Visit `/login`
2. Use credentials from signup
3. Redirect to `/dashboard`

---

## 📁 Project Structure

```
medical-ecommerce/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, signup, invite)
│   ├── (platform)/               # Protected pages (dashboard, experiences, etc.)
│   ├── unauthorized/             # Unauthorized access page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + premium theme
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # shadcn/ui components (9 components)
│   ├── auth/                     # Auth forms (LoginForm, SignupForm)
│   └── layout/                   # Layout components (Header, Footer)
├── lib/
│   ├── supabase/                 # Supabase clients
│   ├── utils/                    # Utilities (validation, format, cn)
│   └── constants/                # Constants (categories)
├── types/
│   ├── database.ts               # Supabase types
│   └── models.ts                 # Application types
├── supabase/
│   └── migrations/               # Database migrations (3 files)
├── middleware.ts                 # Auth middleware
├── .env.local.example            # Environment variables template
└── README.md                     # This file
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (#0A1929) - Trust, professionalism
- **Accent**: Warm Gold (#D4AF37) - Exclusivity, premium
- **Background**: Warm Light Gray (#F5F5F5)
- **Neutrals**: #E0E0E0, #424242
- **Success**: Muted Green (#2E7D32)
- **Destructive**: Soft Red (#C62828)

### Typography
- **Headings**: Inter (700, 600)
- **Body**: Inter (400, 500)
- Generous spacing (24px, 32px, 48px)

### Component Patterns
- Premium cards with hover effects
- No countdown timers or urgency tactics
- "Members-only" messaging
- "Request Access" instead of "Add to Cart"

---

## 🔐 Authentication Flow

1. **Admin generates invite code** (in Supabase or future admin panel)
2. **Doctor receives invite link**: `/invite/[code]`
3. **System validates invite** (checks status = 'pending')
4. **Doctor completes signup** with CPF validation
5. **Profile created** → Invite marked as "used"
6. **Auto-login** → Redirect to `/dashboard`

### Protected Routes
- `/dashboard` - Requires authentication
- `/experiences` - Requires authentication
- `/member/*` - Requires authentication
- `/concierge` - Requires authentication

Middleware redirects to `/unauthorized` if not logged in.

---

## 🛠️ Next Steps (To Be Built)

### Phase 1: Core Features (In Progress)
- [ ] **Dashboard Page** - Featured experiences, weekly highlights
- [ ] **Experiences Module**:
  - [ ] Experience listing page
  - [ ] Category-filtered page
  - [ ] Experience detail page
  - [ ] ExperienceCard component
  - [ ] AvailabilityBadge component
- [ ] **Booking System**:
  - [ ] Booking request form
  - [ ] Booking confirmation UI
  - [ ] Member bookings page
- [ ] **Member Area**:
  - [ ] Profile page with edit form
  - [ ] Bookings history
  - [ ] Invite management
- [ ] **Concierge Page** - WhatsApp integration, contact form

### Phase 2: Admin Panel (Future)
- Admin dashboard for managing experiences
- Invite code generator
- Booking management
- Partner management

### Phase 3: Membership Tiers (Future)
- Basic / Premium / Elite tiers
- Payment integration (Stripe)
- Tier-based benefits

---

## 📝 How to Add New Experiences

### Option 1: Supabase Dashboard (Current)

1. Go to Supabase Dashboard → Table Editor → `experiences`
2. Click "Insert Row"
3. Fill in fields:
   - `title`: "5-Star Hotel Weekend"
   - `slug`: "hotel-weekend"
   - `category_id`: Select from `categories` table
   - `short_description`: Brief description
   - `full_description`: Detailed description
   - `images`: `["https://image-url.com"]`
   - `availability_type`: `limited`, `open`, or `request_only`
   - `price_display`: "Members-only" or custom text
   - `is_featured`: `true` for homepage
   - `is_active`: `true`

### Option 2: Admin Panel (Phase 2)
Will provide UI for CRUD operations on experiences.

---

## 🚢 Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MEG Exclusive platform"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/medical-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure environment variables (copy from `.env.local`)
   - Click "Deploy"

4. **Configure Custom Domain** (Optional):
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain (e.g., `exclusive.meg.com.br`)

---

## 🐛 Troubleshooting

### Issue: "Supabase client error"
- **Solution**: Check that `.env.local` has correct credentials
- Verify Supabase project is active in dashboard

### Issue: "Invalid invite code"
- **Solution**: Generate a test invite code in Supabase (see Testing section)
- Check invite status is 'pending', not 'used' or 'expired'

### Issue: "CPF validation error"
- **Solution**: Use format `XXX.XXX.XXX-XX` or `XXXXXXXXXXX` (11 digits)

### Issue: "Redirect loop"
- **Solution**: Clear browser cookies and try again
- Check middleware.ts is not blocking auth routes

---

## 📧 Support & Contact

For questions or issues:
- **Email**: concierge@meg.com.br
- **WhatsApp**: (11) 99999-9999
- **Hours**: Monday-Friday, 9AM-6PM BRT

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.

© 2026 MEG Exclusive. All rights reserved.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

**Made with ❤️ for MEG Doctors**
