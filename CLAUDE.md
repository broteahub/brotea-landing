# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.1.7 landing page for Brotea using the App Router, React 19, and TypeScript. The project features internationalization (English/Spanish), newsletter subscriptions, and a stories section.

## Development Commands

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Architecture Overview

### Core Stack
- **Next.js 15.1.7** with App Router (not Pages Router)
- **React 19.0.0** with TypeScript 5.8.2
- **Tailwind CSS** for styling with custom fonts (Biform Pixel, PP Neue Machina)
- **Framer Motion** for animations
- **Zustand** for state management

### Email System
The newsletter subscription system uses Nodemailer with Mailtrap SMTP:
- API endpoint: `/api/newsletter` (POST)
- Sends welcome email to subscriber and notification to admin
- Environment variables required:
  ```
  MAILTRAP_HOST="bulk.smtp.mailtrap.io"
  MAILTRAP_PORT=587
  MAILTRAP_USER="api"
  MAILTRAP_PASS=[API_KEY]
  ```
- Note: MJML templates exist at `/src/app/email/emails/` but are not currently used

### Internationalization
Custom i18n implementation (not next-intl):
- Translations in `/src/i18n/locales/` (en.json, es.json)
- Custom `useTranslation` hook in `/src/app/hooks/`
- Language switcher component with state persistence
- Default language: Spanish

### API Routes
- `/api/newsletter` - Newsletter subscription handling
- `/api/content` - Localized content retrieval

### Key Directories
- `/src/app/` - Next.js App Router pages and components
- `/src/app/components/` - Reusable React components
- `/src/app/api/` - API route handlers
- `/src/assets/` - Static JSON and text data files
- `/stories-manager/` - External stories management
- `/public/assets/` - Images (WebP) and fonts

## Development Notes

### When modifying email functionality:
- The active email template is inline HTML in `/src/app/api/newsletter/route.ts`
- MJML templates exist but are not integrated - consider using them for maintainability
- Test email delivery with Mailtrap credentials

### When working with translations:
- Update both `/src/i18n/locales/en.json` and `/src/i18n/locales/es.json`
- Use the `useTranslation` hook for component translations
- The `TranslatedText` component handles inline translations

### When adding new pages:
- Follow App Router conventions (page.tsx in directories)
- Include language switcher in navigation
- Ensure all content is internationalized

### Styling conventions:
- Use Tailwind CSS classes
- Custom fonts are configured in `tailwind.config.ts`
- Maintain the existing color scheme (purple, lime, pink theme)

### Image optimization:
- Use WebP format for images
- Images are stored in `/public/assets/images/`
- Next.js Image component is configured for optimization