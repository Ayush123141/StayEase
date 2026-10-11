# 🏨 StayEase — Heritage Hotel & Luxury Booking Management System

![StayEase Hotel Hero](https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop)

**StayEase** is a full-stack hotel booking and management platform designed with a classic heritage aesthetic and authentic glassmorphism. It provides guests with seamless availability discovery and room reservation workflows, while offering hotel staff and managers an operational dashboard with double-booking prevention enforced at the database level.

---

## ✨ Key Features

### 🛎️ Guest Experience (Public Portal)
- 🔎 **Date & Capacity Availability Search**: Real-time room availability powered by a PostgreSQL RPC function that checks existing reservations.
- 🛏️ **Heritage Chambers & Suites Catalog**: Editorial room presentation with signature arched photo frames, pricing breakdown, and room details.
- 📅 **Dynamic Stay Calculator**: Automatic night calculations, stay subtotals, and 12% luxury tax breakdown.
- 🧾 **Pay at Concierge & Instant Confirmation**: Secure reservation voucher generation and print-ready booking reference.
- 📜 **Guest Itinerary Ledger**: View upcoming and previous stays with cancellation management.

### 🛡️ Administration & Hotel Operations (`/admin`)
- 📊 **Real-time Operations Dashboard**: Track today's check-ins/check-outs, occupancy percentage, and 6-month revenue inflow trends using Recharts.
- 🗝️ **Inventory Management**: Full catalog control over chambers, capacities, room categories, pricing, and active status.
- 🔒 **Double-Booking Prevention**: Database-level constraint using PostgreSQL `btree_gist` and `EXCLUDE USING gist` over date ranges to prevent overlapping bookings.
- 🛡️ **Row Level Security (RLS)**: Fine-grained policies ensuring guests only access their own data while staff manage hotel operations.

---

## 🎨 Design Direction & Aesthetic

Built in accordance with the heritage luxury specification:
- **Palette**: Ivory (`#F6EFE2`), Parchment (`#EADFC8`), Deep Espresso (`#1C1410`), Bottle Green (`#0F2A24`), Oxblood (`#5B1A1F`), and Warm Gold (`#B8924A`).
- **Typography**: Cormorant Garamond for display & headings, Jost for body text and navigation labels.
- **Glassmorphism**: High-contrast frosted glass recipes (`.glass`, `.glass-dark`, `.glass-ivory`) layered over warm photography with gold hairline borders and film grain overlay.
- **Design Verification**: Built-in visual token styleguide accessible at `/styleguide`.

---

## 🚀 Tech Stack

| Layer | Choice |
|---|---|
| **Frontend Framework** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 + Custom Glassmorphism System |
| **Routing** | React Router DOM v7 |
| **Icons & Charts** | Lucide React, Recharts |
| **Backend & Database** | **Supabase** (PostgreSQL, Auth, Storage, Row Level Security) |
| **Hosting & Deployment** | **Vercel** (`vercel.json` SPA deep-link routing) |

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18+)
- **npm**
- A **Supabase** project (free tier available at [supabase.com](https://supabase.com))

### 2. Clone the Repository
```bash
git clone https://github.com/Patilsahil1056/StayEase.git
cd StayEase
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root folder:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Setup Supabase Database
In your Supabase project's **SQL Editor**, execute:
1. `supabase/migrations/0001_init.sql` — Creates tables, constraints, RPCs, and RLS policies.
2. `supabase/seed.sql` — Populates sample rooms, room types, and luxury amenities.

### 6. Run the Dev Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
src/
├── api/             # Supabase client initialization
├── components/      # Navbar, Footer, AdminSidebar, etc.
├── context/         # AuthContext (session, user roles, profile)
├── layouts/         # PublicLayout & AdminLayout
├── lib/             # Currency, date, and price calculation helpers
├── pages/
│   ├── public/      # Home, Rooms, RoomDetails, Checkout, BookingConfirmed, Styleguide
│   ├── auth/        # Login
│   ├── account/     # MyBookings
│   └── admin/       # Dashboard, Rooms Catalog
└── types/           # Database TypeScript definitions
supabase/
├── migrations/      # 0001_init.sql database migration
└── seed.sql         # Seed data with curated heritage suites
```

---

## 📄 License
MIT License — Maintained by [Patilsahil1056](https://github.com/Patilsahil1056).
