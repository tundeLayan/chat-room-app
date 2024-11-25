# Real-Time Chat Room Application Documentation

## Project Overview

A real-time chat application built with Next.js, featuring user authentication, real-time messaging, and persistent chat rooms.

## Tech Stack

-   Next.js (Frontend & Backend)
-   Prisma (Database ORM)
-   TypeScript
-   TailwindCSS
-   NextAuth.js (Authentication)

## Project Structure

### Root Directory

```
├── .env # Environment variables
├── .eslintrc.json # ESLint configuration
├── next.config.mjs # Next.js configuration
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── yarn.lock # Yarn dependencies lock file
```

### Application Structure

````
/app
├── \_lib # Core library functions
│ └── trpc # tRPC configuration
│ ├── client.ts
│ ├── Provider.tsx
│ └── store-types.ts
├── api # API routes
│ └── auth
│ └── [...nextauth] # NextAuth.js configuration
├── (auth) # Authentication related pages
│ └── Login
│ ├── components
│ │ └── LoginForm.tsx
│ └── page.tsx
└── chat # Chat functionality
└── page.tsx # Main chat interface
```

### Server-side Components

```
/server
├── routers # API route handlers
│ ├── auth.ts # Authentication routes
│ ├── chatRoom.ts # Chat room management
│ ├── message.ts # Message handling
│ └── user.ts # User management
├── context.ts # Server context
└── index.ts # Main server configuration
```

## Key Features

### Authentication

-   User authentication handled through NextAuth.js
-   Secure login/logout functionality
-   Protected routes for authenticated users only

### Real-time Chat

-   Real-time message updates
-   Chat room creation and management
-   Persistent message history
-   User presence indicators

### Data Management

-   Prisma ORM for database operations
-   Type-safe database queries
-   Efficient data caching and updates

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   Create a `.env` file with the following:
   ```
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Initialize database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run development server:
   ```bash
   yarn dev
   ```

## Development Guidelines

### File Naming Conventions

-   React components: PascalCase (e.g., `LoginForm.tsx`)
-   Utility files: camelCase (e.g., `auth.ts`)
-   Pages: `page.tsx`
-   Layout files: `layout.tsx`

### Code Organization

-   Keep components modular and reusable
-   Place shared utilities in `_lib` directory
-   Group related features in feature directories
-   Use TypeScript for type safety

### Authentication

-   All authentication logic is centralized in the `(auth)` directory
-   Protected routes should use middleware for auth checks
-   User sessions are managed through NextAuth.js

### API Routes

-   API routes are organized under the `api` directory
-   Use tRPC for type-safe API calls
-   Implement proper error handling and validation

## Deployment

The application can be deployed to any platform that supports Next.js applications. Recommended platforms:

-   Vercel
-   Netlify
-   Railway

Remember to:

-   Set up environment variables in your deployment platform
-   Configure database connection strings
-   Set up proper CORS settings if needed
-   Enable WebSocket connections for real-time features

## Security Considerations

-   All sensitive data should be stored in environment variables
-   Implement rate limiting for API routes
-   Sanitize user input
-   Use HTTPS in production
-   Keep dependencies updated
````
