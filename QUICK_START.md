# Quick Start Guide

## For Frontend Developers

### First Time Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:9002](http://localhost:9002)

3. **Login**
   - Email: Any email (mock auth)
   - Password: Any password (mock auth)
   - Click "Login" to access dashboard

### Development Workflow

#### Running the App
```bash
npm run dev              # Start Next.js dev server (port 9002)
npm run genkit:dev       # Start AI development server
npm run genkit:watch     # Start AI with hot reload
```

#### Code Quality
```bash
npm run lint             # Check for linting errors
npm run typecheck        # Check TypeScript types
```

#### Building
```bash
npm run build            # Create production build
npm start                # Run production server
```

### Project Navigation

#### Key Files to Know
- `src/app/(dashboard)/page.tsx` - Main dashboard
- `src/app/(auth)/login/page.tsx` - Login page
- `src/lib/data.ts` - Mock data (replace with API)
- `src/lib/types.ts` - TypeScript types
- `src/components/ui/` - Reusable UI components
- `src/components/dashboard/` - Dashboard components

#### Adding a New Page
1. Create file in `src/app/(dashboard)/your-page/page.tsx`
2. Add route to navigation in `src/components/dashboard/navigation.tsx`
3. Use existing components from `src/components/ui/`

#### Adding a New Component
1. Create in `src/components/dashboard/your-component.tsx`
2. Use `'use client'` if it needs interactivity
3. Import types from `@/lib/types`
4. Use `cn()` utility for className merging

### Common Tasks

#### Modify Mock Data
Edit `src/lib/data.ts` to change sample data

#### Add New Type
Add to `src/lib/types.ts` with proper TypeScript interface

#### Change Colors/Theme
Edit `src/app/globals.css` CSS variables

#### Add New UI Component
```bash
# Use shadcn/ui CLI (if needed)
npx shadcn-ui@latest add [component-name]
```

### Testing Features

#### Test Order Management
1. Go to Orders page
2. Click "New Order" to create
3. Use filters and search
4. Try "Auto-assign Agent" button
5. Update order status from dropdown

#### Test User Management
1. Go to Users page
2. View different user roles
3. Check KYC status badges
4. Test pagination

#### Test Dashboard
1. View KPI cards
2. Check charts rendering
3. Click "View All" to navigate

### Troubleshooting

#### TypeScript Errors
```bash
npm run typecheck
```

#### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
Change port in `package.json`:
```json
"dev": "next dev --turbopack -p 9003"
```

#### Styling Issues
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

## For Backend Developers

### What You Need to Know

1. **Mock Data Structure**
   - Check `src/lib/data.ts` for data format
   - Match API responses to these structures

2. **Type Definitions**
   - All types in `src/lib/types.ts`
   - Ensure API matches these interfaces

3. **API Integration Points**
   - Replace imports from `@/lib/data` with API calls
   - Add `src/lib/api.ts` for fetch functions

### Example API Integration

#### Before (Mock Data)
```typescript
import { orders } from '@/lib/data';
```

#### After (API Call)
```typescript
import { fetchOrders } from '@/lib/api';

const orders = await fetchOrders();
```

### Authentication Flow

1. User submits login form
2. Call `POST /api/auth/login`
3. Store JWT token
4. Redirect to `/dashboard`
5. Add token to all API requests

### Required API Endpoints

See `FRONTEND_STATUS.md` for complete list of endpoints needed.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- Firebase credentials
- Google AI API key
- Backend API URL

## Need Help?

- **Product Info**: `.kiro/steering/product.md`
- **Tech Stack**: `.kiro/steering/tech.md`
- **Structure**: `.kiro/steering/structure.md`
- **Status**: `FRONTEND_STATUS.md`
- **README**: `README.md`
