# Royal Lens Studios

Royal Lens Studios ஒரு premium photography website. Current version public-only marketing site ஆக simplify பண்ணப்பட்டுள்ளது. Login, signup, admin dashboard ஆகிய flows remove பண்ணப்பட்டுள்ளன, அதனால் site lean-ஆவும் fast-loading-ஆவும் இருக்கிறது.

## Stack

- Vite
- React 18
- TypeScript
- React Router DOM
- Tailwind CSS
- Framer Motion
- Radix UI / shadcn-style UI components
- Vitest + Testing Library

## Current Pages

- `/` Home
- `/portfolio`
- `/services`
- `/about`
- `/testimonials`
- `/contact`
- `/booking`

## Current Website Structure

### Home
- cinematic hero
- problem / solution sections
- package preview
- CTA blocks

### Portfolio
- category filters
- responsive masonry gallery

### Services
- service cards
- pricing starting points
- WhatsApp CTA

### About
- brand story
- milestone timeline
- team section

### Testimonials
- featured testimonial slider
- reviews grid

### Contact
- direct enquiry form
- business contact details

### Booking
- public booking request form
- recent requests from the same browser/device

## Data Handling

இந்த version real backend இல்லாமல் browser `localStorage` use பண்ணுகிறது.

Used for:
- package preview fallback data
- contact form submissions
- booking requests
- recent booking history on the same device

## Performance Updates Done

- login and admin routes removed
- auth provider removed from app boot
- navbar simplified to public-only CTA flow
- mobile hero strategy tuned to avoid heavy autoplay on mobile
- render-blocking font loading reduced
- public booking flow made direct without login dependency
- unused admin/auth source files removed

## Development

```bash
cd royal-lens-studios-main
npm.cmd install
npm.cmd run dev
```

## Build

```bash
npm.cmd run build
```

## Test

```bash
npm.cmd test
```

## Important Note

If you want even faster performance in production, the next biggest win is compressing or replacing the large hero video files in `src/assets/`.
