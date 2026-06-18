# CLAUDE.md — Project Rules (Read Every Session)

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Deployment: Vercel

## Folder Structure
```
/app                    → Pages and layouts (App Router)
  /app/(auth)           → Auth pages: login, signup
  /app/(dashboard)      → Protected pages
  /app/api              → API route handlers
/components
  /components/ui        → shadcn/ui base components
  /components/shared    → Reusable custom components
  /components/forms     → Form components
/lib
  /lib/supabase.ts      → Supabase client
  /lib/utils.ts         → Shared utilities
/types
  /types/index.ts       → Global TypeScript types
/public                 → Static assets
```

## Coding Rules
1. Always use TypeScript — no `any` types unless absolutely necessary
2. Use `async/await`, never `.then()` chains
3. Always handle loading and error states in UI components
4. Use `shadcn/ui` components first before building custom ones
5. Use Tailwind utility classes — no inline styles, no custom CSS files
6. All API routes must validate inputs with Zod
7. Never hardcode secrets — use `.env.local` variables only
8. Use `next/image` for all images, `next/link` for all internal links

## Naming Conventions
- Components: PascalCase (`UserCard.tsx`)
- Pages: `page.tsx` inside named folders
- Hooks: camelCase with `use` prefix (`useUser.ts`)
- Types: PascalCase with descriptive names (`UserProfile`)
- API routes: kebab-case folders (`/app/api/user-profile/route.ts`)

## DO NOT
- Do not use `useEffect` for data fetching — use Server Components or React Query
- Do not install extra libraries without asking first
- Do not create files outside the folder structure above
- Do not use `<img>` — always use `<Image>` from next/image
- Do not skip TypeScript types on function parameters or return values

## Environment Variables (needed in .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Build One Thing at a Time
- Finish and verify one component/page before moving to the next
- After each component, confirm it works before continuing
