# VERCEL DEPLOYMENT GUIDE

## 🚨 IMPORTANT: Vercel Doesn't Support PHP

Vercel is a **static site hosting platform** that doesn't run PHP. I've converted your files to use **JavaScript includes** instead, which work on Vercel.

---

## ✅ FILES FOR VERCEL

Upload these files to your Vercel project:

1. **index.html** - Homepage (uses JavaScript to load header/footer)
2. **header.html** - Header component
3. **footer.html** - Footer component (includes newsletter form)
4. **css/styles-updated.css** - Stylesheet
5. **js/main.js** - JavaScript functionality
6. **images/** - All your images

---

## 📂 FILE STRUCTURE FOR VERCEL

```
/
├── index.html
├── header.html
├── footer.html
├── css/
│   └── styles-updated.css
├── js/
│   └── main.js
└── images/
    ├── logo.png
    ├── hero-home.jpg
    └── ...
```

---

## 🚀 HOW TO DEPLOY TO VERCEL

### **Method 1: Upload via Vercel Dashboard**

1. Go to vercel.com/dashboard
2. Click "Add New" → "Project"
3. Drag and drop your files
4. Click "Deploy"

### **Method 2: Use Vercel CLI**

```bash
npm i -g vercel
cd your-project-folder
vercel
```

---

## ⚙️ HOW IT WORKS (JavaScript Includes)

Instead of PHP includes like:
```php
<?php include 'header.php'; ?>
```

We use JavaScript to load components:
```javascript
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    });
```

This loads your header and footer dynamically when the page loads.

---

## 🎯 TO UPDATE HEADER/FOOTER ON VERCEL

1. Edit `header.html` or `footer.html` locally
2. Upload the updated file to Vercel
3. **All pages using the includes will update automatically!**

Same benefit as PHP includes, but works on Vercel! ✨

---

## 📋 CURRENT STATUS

✅ **index.html** - Converted and ready
✅ **header.html** - Ready for Vercel
✅ **footer.html** - Ready with newsletter form

---

## 🔄 FOR YOUR PRODUCTION SITE (NOT VERCEL)

If you're deploying to a **traditional hosting** (Bluehost, SiteGround, etc.) that supports PHP:

**Use the PHP files instead:**
- index.php
- header.php
- footer.php

PHP is faster and better for SEO (no JavaScript delay).

---

## ⚠️ VERCEL LIMITATIONS

**Newsletter Form:**
The form in `footer.html` won't work without connecting it to a service like:
- Mailchimp
- Formspree
- ConvertKit

See NEWSLETTER-FORM-GUIDE.md for setup instructions.

---

## 🎨 CSS PATH NOTE

I changed CSS/image paths in index.html to work better with Vercel:
```html
<!-- Changed from: -->
<link rel="stylesheet" href="/css/styles-updated.css">

<!-- To: -->
<link rel="stylesheet" href="css/styles-updated.css">
```

This ensures assets load correctly on Vercel.

---

## ✅ UPLOAD CHECKLIST FOR VERCEL

- [ ] Upload `index.html`
- [ ] Upload `header.html`
- [ ] Upload `footer.html`
- [ ] Upload `css/styles-updated.css`
- [ ] Upload `js/main.js`
- [ ] Upload all images to `images/` folder
- [ ] Test the live site
- [ ] Connect newsletter form to email service

---

## 🚀 NEXT STEPS

1. Upload all files to Vercel
2. Test at your Vercel URL (https://thrive4.vercel.app)
3. Header and footer should now appear!
4. Connect newsletter form (see NEWSLETTER-FORM-GUIDE.md)

---

**Your site is now Vercel-compatible!** 🎉
