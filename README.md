# WoodCraft Pallets – Website

## 📁 File Structure

```
woodpallet-website/
├── index.html          ← Homepage
├── products.html       ← All 15 products with filter & modal
├── about.html          ← About Us / company story
├── contact.html        ← Enquiry form (frontend)
├── enquiry.php         ← PHP backend for form submission
├── 404.html            ← Custom 404 error page
├── robots.txt          ← SEO: search engine instructions
├── sitemap.xml         ← SEO: sitemap for Google indexing
├── .htaccess           ← Apache: HTTPS, caching, security
├── css/
│   └── style.css       ← Complete stylesheet
└── js/
    ├── products-data.js ← All 15 product definitions
    ├── main.js          ← Navigation, modal, homepage
    ├── products.js      ← Products page: render + filter
    └── contact.js       ← Form validation + submission
```

---

## ⚙️ Setup Instructions

### 1. Update Business Details
Search and replace these placeholders across all HTML files:
- `enquiry@woodcraftpallets.com` → your real email
- `+91-98765-43210` → your real phone number
- `Industrial Area, Sector 5, Delhi – 110001` → your address
- `https://www.woodcraftpallets.com` → your actual domain

### 2. Configure PHP Email (enquiry.php)
Open `enquiry.php` and update the `$config` array at the top:
```php
$config = [
    'to_email'     => 'YOUR_EMAIL@yourdomain.com',
    'from_email'   => 'noreply@yourdomain.com',
    'allowed_origin' => 'https://www.yourdomain.com',
    ...
];
```

### 3. Upload to Hosting
- Upload ALL files to your web server's public directory (e.g., `public_html/`)
- Ensure PHP 7.4+ is available (for enquiry.php)
- The `.htaccess` file requires Apache with mod_rewrite enabled

### 4. Update sitemap.xml
Replace all `https://www.woodcraftpallets.com` with your real domain.
Submit the sitemap to Google Search Console.

---

## 🔍 SEO Features Built In

| Feature | Details |
|---|---|
| Meta title & description | All 4 pages |
| Open Graph tags | Homepage + Products |
| Schema.org JSON-LD | Organization + ItemList |
| Canonical URLs | All pages |
| Sitemap.xml | 4 pages |
| robots.txt | Correct crawl rules |
| Semantic HTML | h1→h2→h3 hierarchy |
| Alt text | Images/illustrations |
| ARIA labels | Navigation, sections |
| Breadcrumb nav | Inner pages |
| Footer keyword links | Natural anchor text |
| .htaccess HTTPS redirect | Force SSL |
| .htaccess compression | Faster load = better rank |
| .htaccess caching | Improved Core Web Vitals |

---

## 📋 Post-Launch SEO Checklist

- [ ] Submit sitemap.xml to Google Search Console
- [ ] Submit sitemap.xml to Bing Webmaster Tools
- [ ] Set up Google Analytics / GA4
- [ ] Verify canonical domain (www vs non-www) in .htaccess
- [ ] Add real product images (replace emoji illustrations)
- [ ] Create Google Business Profile listing
- [ ] Build local citations (JustDial, IndiaMart, TradeIndia)
- [ ] Add customer testimonials/reviews section
- [ ] Consider blog posts: "How to choose wooden pallets", "ISPM-15 explained", etc.

---

## 🌐 Hosting Recommendations

| Type | Recommended |
|---|---|
| Shared Hosting (PHP) | Hostinger, SiteGround, Bluehost |
| VPS | DigitalOcean, Linode |
| Static (no PHP form) | Netlify, Vercel + Formspree for forms |

For static hosting (Netlify/Vercel), replace the PHP form with **Formspree**:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 📞 Support

Website built for: **WoodCraft Pallets**  
Pages: 4 HTML + 1 PHP + CSS + JS  
Products: 15 wooden pallet products  
Form: Full validation + PHP email + auto-reply  
