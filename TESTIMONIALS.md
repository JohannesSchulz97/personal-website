# Testimonials System

## Overview

Static testimonials system with Formspree for submissions and manual approval workflow.

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
3. Formspree captures submission → email notification sent to you
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

## Formspree Setup

### Configuration

Form endpoint: `https://formspree.io/f/mgodnlwq`

### Form Management

- View submissions: https://formspree.io/forms
- Email notifications: Automatic to schulz.johannes97@gmail.com
- Free tier: 50 submissions/month
- Spam filtering: Built-in honeypot (`_gotcha` field)

### Changing Email

To update notification email:
1. Go to Formspree dashboard
2. Select "Testimonials" form
3. Settings → Email notifications

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

## Upgrading Formspree Plan

Free tier limits (50/month) hit? Upgrade at formspree.io:
- Basic: $10/mo (1000 submissions)
- Pro: $40/mo (10,000 submissions)
