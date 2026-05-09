# Testimonials System

## Overview

Static testimonials system with Netlify Forms for client submissions and manual approval workflow.

## How It Works

### Submission Flow

1. Person visits `/submit-testimonial`
2. Fills out form with:
   - Name, role, company
   - Email (for verification)
   - LinkedIn profile (optional - for credibility)
   - Projects (list all projects worked on together)
   - Rating (1-5 stars)
   - Testimonial text
3. Netlify captures submission → email notification sent to you
4. You manually approve and add to site

### Manual Approval Process

When you receive email notification:

1. Verify authenticity (check email, verification answer)
2. Add entry to `data/testimonials.json`:

```json
{
  "id": 4,
  "name": "Client Name",
  "role": "Their Role",
  "company": "Company Name",
  "rating": 5,
  "testimonial": "Their testimonial text...",
  "project": "Project Name",
  "completionDate": "Month Year",
  "linkedIn": "https://linkedin.com/in/theirprofile"
}
```

Note: `linkedIn` field is optional - set to `null` if client didn't provide it

3. Commit and push:
```bash
git add data/testimonials.json
git commit -m "Add testimonial from [Client Name]"
git push
```

4. Site rebuilds automatically with new testimonial

## Netlify Setup

### First-Time Setup

1. Deploy site to Netlify
2. Netlify auto-detects forms (`data-netlify="true"`)
3. Go to Netlify Dashboard → Site → Forms
4. Enable form notifications → enter your email

### Form Management

- View all submissions: Netlify Dashboard → Forms
- Free tier: 100 submissions/month
- Spam filtering: Automatic (Akismet)

## Display

- `/testimonials` - displays all testimonials from `data/testimonials.json`
- Card grid layout with star ratings
- Expandable project details (copied from projects page pattern)
- Schema.org Review markup for SEO

## Features

- **Manual approval** - no auto-publish
- **Spam protection** - Netlify honeypot + verification question
- **SEO optimized** - schema.org Review markup
- **Expandable details** - show/hide project info
- **Responsive** - works on all devices

## Alternative: Formspree

If not using Netlify, switch to Formspree:

1. Sign up at formspree.io
2. Update form in `app/submit-testimonial/page.tsx`:
```tsx
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
```
3. Remove `data-netlify="true"` attribute
4. Same approval workflow applies
