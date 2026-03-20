# 🚀 DEPLOYMENT READY CHECKLIST

## ✅ WHAT'S IN THIS PACKAGE

### Content Files (Synced with Live Site)
- ✅ index.html - Updated with your latest copy
- ✅ All service pages - Enhanced blue styling  
- ✅ header.html & footer.html - All .html links (no .php)
- ✅ sitemap.xml - Ready for Google
- ✅ robots.txt - SEO optimized

### Tracking & Analytics
- ✅ tracking-codes-template.html - Add your IDs here
- ✅ TRACKING-SETUP-GUIDE.md - Complete instructions

### Documentation
- ✅ All guides and setup instructions
- ✅ Image requirements
- ✅ This checklist

---

## 📋 QUICK DEPLOYMENT STEPS

### STEP 1: Get Your Tracking IDs (15 minutes)

**A. Meta Pixel ID:**
1. Go to: https://business.facebook.com/events_manager2
2. Create new pixel: "Thrive 4 Peak Performance"
3. Copy Pixel ID (numbers like: 1234567890123456)

**B. Google Analytics ID:**
1. Go to: https://analytics.google.com
2. Create property: "Thrive 4 Peak Performance"
3. Copy Measurement ID (looks like: G-XXXXXXXXXX)

**C. Google Tag Manager ID (RECOMMENDED):**
1. Go to: https://tagmanager.google.com
2. Create account & container
3. Copy Container ID (looks like: GTM-XXXXXXX)

---

### STEP 2: Add Your IDs to Tracking Template (5 minutes)

1. Open `tracking-codes-template.html`
2. Replace these placeholders:
   - `YOUR_PIXEL_ID_HERE` → Your Meta Pixel ID
   - `G-XXXXXXXXXX` → Your GA4 ID  
   - `GTM-XXXXXXX` → Your GTM ID
3. Save file

---

### STEP 3: Add Tracking to header.html (10 minutes)

**Copy the GTM code from your tracking template and paste into header.html:**

```html
<head>
    <meta charset="UTF-8">
    ...
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i)...YOUR GTM CODE HERE...</script>
    <!-- End Google Tag Manager -->
    
    <link rel="stylesheet" href="/css/styles-updated.css">
</head>
```

**Add GTM noscript right after `<body>` tag in ALL pages:**

```html
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"...
    <!-- End Google Tag Manager (noscript) -->
    
    <div id="header-placeholder"></div>
```

---

### STEP 4: Upload Files to Vercel (10 minutes)

Upload these files to your Vercel project:

**Root Directory:**
- sitemap.xml
- robots.txt  
- index.html (updated)
- header.html (with tracking)
- footer.html

**Keep existing:**
- All CSS files
- All JS files
- All service pages
- All images

---

### STEP 5: Verify Tracking Works (5 minutes)

**Test Meta Pixel:**
1. Install "Meta Pixel Helper" Chrome extension
2. Visit your live site
3. Should show green checkmark

**Test Google Analytics:**
1. Go to GA4 Realtime report
2. Visit your site in another tab
3. You should appear as active user

---

### STEP 6: Google Business Profile (20 minutes)

1. Go to: https://business.google.com
2. Claim/create listing for "Thrive 4 Peak Performance"
3. Add all details:
   - Address
   - Phone: (470) 359-6195
   - Hours
   - Services (all 8)
   - Photos
   - Website: thrive4peakperformance.com
   - Booking URL: /book-appointment.html

---

### STEP 7: Google Search Console (15 minutes)

1. Go to: https://search.google.com/search-console
2. Add property: thrive4peakperformance.com
3. Verify ownership (use GA4 method - easiest)
4. Submit sitemap: sitemap.xml
5. Request indexing for:
   - Homepage
   - All 8 service pages
   - Contact page

---

## 🎯 POST-DEPLOYMENT (Week 1)

**Day 1-2:**
- ✅ Monitor tracking in Meta Events Manager
- ✅ Check GA4 Realtime reports
- ✅ Verify all pixels firing correctly

**Day 3-7:**
- ✅ Let pixels collect data (DO NOT run ads yet)
- ✅ Complete Google Business Profile fully
- ✅ Check Search Console for indexing

**Week 2:**
- ✅ Create custom audiences in Meta
- ✅ Start Meta Ads campaigns!

---

## 🆘 TROUBLESHOOTING

**Pixel not firing?**
- Check browser console for errors
- Verify Pixel ID is correct
- Clear browser cache

**GA4 not tracking?**
- Verify Measurement ID is correct
- Wait 24-48 hours for data to appear
- Check Realtime reports first

**Pages not indexing?**
- Verify sitemap submitted correctly
- Check robots.txt allows crawling
- Request indexing manually for each page

---

## 📞 READY TO DEPLOY?

✅ All files are in this package
✅ All content synced with live site  
✅ All tracking templates ready
✅ All documentation included

**Just add your tracking IDs and upload!** 🚀
