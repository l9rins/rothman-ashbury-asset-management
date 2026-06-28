# Rothman Ashbury Asset Management — Website Handover

## Site Structure
The website consists of 8 core pages and 14 blog article shells built with pure HTML, CSS, and Vanilla JS:
- `index.html` — Homepage
- `about.html` — About Us
- `what-we-do.html` — What We Do
- `philosophy.html` — Philosophy
- `performance.html` — Performance
- `insights.html` — Insights (Blog index)
- `disclaimer.html` — Legal Disclaimer
- `contact.html` — Contact Information
- `blog/article-01.html` through `article-14.html` — Blog article templates

## How to add a blog article
To add or update a blog article:
1. Open the relevant file (e.g., `blog/article-01.html`) in a code or text editor.
2. Update the `<title>` and `<meta name="description">` tags in the `<head>` section.
3. Update the `og:title` and `og:description` meta tags.
4. Update the date and estimated reading time in the `<div class="article__date">` section.
5. Update the main heading inside `<h1 class="hero__page-title">`.
6. Replace the placeholder `<p>` tags inside `<div class="content__body">` with your actual article content. 

## How to update performance figures
1. Open `performance.html` in a code editor.
2. Locate the `<table class="performance-table">` (around line 78).
3. Replace the `—` placeholders inside the `<td>` tags with the actual percentage figures.
4. Update or remove the holding message ("Performance figures will be published...") directly below the table.

## Hosting & Email
- **Hosting**: We recommend a robust, low-maintenance static host like Netlify or Hostinger. 
- **Deployment**: You can upload the entire project folder directly via cPanel File Manager (Hostinger), FTP, or by dragging and dropping the folder into Netlify's dashboard.
- **Email**: To configure Zoho Mail for `@rothmanashbury.com.au` addresses, sign up for Zoho Workplace, verify your domain by adding the provided TXT record to your DNS settings, and update your domain's MX records to point to Zoho's servers.

## Image Sources
- The custom Brisbane hero images (`brisbane-about.png`, `brisbane-whatwedo.png`, `brisbane-philosophy.png`) were generated using high-end AI and are free of copyright restrictions.
- `brisbane-hero.png`, `brisbane-inner.png`, and `brisbane-night.png` were sourced accordingly and are free to use.
