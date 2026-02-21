

# Fix Hero Section Design -- Text and Button Styling

## Issues Identified

1. **Low text contrast on desktop** -- The hero heading and subtitle blend into the dark background overlay, making them hard to read
2. **Flat button styling** -- The "Book a Session" button lacks depth (no shadow, no hover lift), and the "Chat on WhatsApp" outline button is barely visible on dark backgrounds
3. **Trust badges too faint** -- The "5+ Years", "2000+ Shoots" badges are nearly invisible at 50% opacity
4. **Camera icon lacks visual punch** -- Small and plain, doesn't establish the premium feel

## Changes

### File: `src/pages/Index.tsx`

**Hero heading:**
- Add a subtle text shadow to the main heading for better readability against the video
- Add a soft glow effect behind the "Royal" gold text

**Buttons:**
- "Book a Session": Add a gold shadow (`shadow-lg shadow-gold/30`), slight scale-up on hover, and rounded-full shape for a premium look
- "Chat on WhatsApp": Increase border opacity, add a subtle background tint (`bg-white/5`), and a hover glow

**Trust badges:**
- Increase text opacity from `/50` to `/70`
- Make the gold dots slightly larger
- Add a glass-effect pill background behind the badges row

**Camera icon:**
- Increase size from `w-12 h-12` to `w-14 h-14`
- Add a soft gold glow ring behind it (`bg-gold/10 rounded-full p-3`)

**Background overlay:**
- Adjust gradient stops from `from-background/70 via-background/50 to-background` to `from-background/60 via-background/40 to-background` so the video is more visible while maintaining text readability

## Technical Details

All changes are in a single file: `src/pages/Index.tsx`, within the hero section (lines ~63-115). No new dependencies or backend changes needed.

### Specific Style Updates

| Element | Current | Updated |
|---------|---------|---------|
| Hero overlay | `from-background/70 via-background/50` | `from-background/60 via-background/40` |
| Heading | No shadow | `style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}` |
| Camera icon | `w-12 h-12` plain | `w-14 h-14` inside a `bg-gold/10 rounded-full p-3` wrapper |
| Book button | `bg-gold` flat | Add `shadow-lg shadow-gold/30 hover:scale-105 transition-transform` |
| WhatsApp button | `border-gold/50` | `border-gold/40 bg-white/5 hover:shadow-gold/20 hover:shadow-md` |
| Trust badges text | `text-foreground/50` | `text-foreground/70` |
| Trust badge dots | `w-1.5 h-1.5` | `w-2 h-2` |

