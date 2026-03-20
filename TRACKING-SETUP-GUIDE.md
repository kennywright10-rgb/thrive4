# THRIVE 4 PEAK PERFORMANCE - TRACKING & PIXEL SETUP GUIDE

## 📊 COMPLETE INTEGRATION CHECKLIST

This guide will help you set up all tracking pixels, analytics, and integrations for your Meta Ads, Google Business Profile, and SEO.

---

## 1️⃣ META/FACEBOOK PIXEL SETUP

### **What It Does:**
- Tracks visitors from Facebook/Instagram ads
- Measures ad performance and ROI
- Creates custom audiences for retargeting
- Optimizes ad delivery

### **Step 1: Create Your Meta Pixel**

1. Go to **Meta Events Manager**: https://business.facebook.com/events_manager2
2. Click **"Connect Data Sources"** → **"Web"** → **"Meta Pixel"**
3. Name it: `Thrive 4 Peak Performance`
4. Enter website: `thrive4peakperformance.com`
5. Click **"Continue"**
6. Choose **"Install code manually"**
7. **COPY YOUR PIXEL ID** (looks like: `1234567890123456`)

### **Step 2: Add Pixel Code to Website**

Add this code to **EVERY PAGE** in the `<head>` section (I'll provide the complete code below with your pixel ID placeholder):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID_HERE');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

### **Step 3: Set Up Conversion Events**

Add these events to track key actions:

**Book Appointment Button Click:**
```javascript
// Add to book-appointment.html when form is submitted
fbq('track', 'Schedule');
```

**Phone Number Click:**
```javascript
// Add to all phone links
fbq('track', 'Contact');
```

**Form Submission:**
```javascript
// Add when contact form is submitted
fbq('track', 'Lead');
```

### **Step 4: Verify Pixel Installation**

1. Install **Meta Pixel Helper** Chrome extension
2. Visit your website
3. Extension should show green checkmark with your pixel firing

---

## 2️⃣ GOOGLE ANALYTICS 4 (GA4) SETUP

### **What It Does:**
- Tracks all website traffic and user behavior
- Shows where visitors come from
- Measures conversions and goals
- Provides demographic data

### **Step 1: Create GA4 Property**

1. Go to **Google Analytics**: https://analytics.google.com
2. Click **"Admin"** (bottom left)
3. Click **"+ Create Property"**
4. Name: `Thrive 4 Peak Performance`
5. Set timezone: `United States - Eastern Time`
6. Currency: `United States Dollar`
7. Click **"Next"** and fill in business details
8. Click **"Create"** and accept Terms of Service

### **Step 2: Set Up Data Stream**

1. Select **"Web"** platform
2. Website URL: `https://thrive4peakperformance.com`
3. Stream name: `Thrive Website`
4. Click **"Create Stream"**
5. **COPY YOUR MEASUREMENT ID** (looks like: `G-XXXXXXXXXX`)

### **Step 3: Add GA4 Code**

Add to `<head>` of every page:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
<!-- End Google Analytics 4 -->
```

### **Step 4: Set Up Conversion Events**

In GA4, create these events:
- **phone_call** - When someone clicks phone number
- **form_submit** - When contact form submitted
- **book_appointment** - When booking form submitted

---

## 3️⃣ GOOGLE TAG MANAGER (GTM) SETUP - RECOMMENDED!

### **Why Use GTM?**
Instead of adding multiple tracking codes manually, GTM lets you manage ALL tracking codes in one place. **HIGHLY RECOMMENDED!**

### **Step 1: Create GTM Account**

1. Go to **Google Tag Manager**: https://tagmanager.google.com
2. Click **"Create Account"**
3. Account Name: `Thrive 4 Peak Performance`
4. Container Name: `thrive4peakperformance.com`
5. Target platform: **Web**
6. Click **"Create"** and accept Terms

### **Step 2: Install GTM Code**

You'll get TWO code snippets:

**Snippet 1 - Add to `<head>`:**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

**Snippet 2 - Add immediately after `<body>`:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### **Step 3: Add Tags in GTM**

Once GTM is installed, add these tags IN GTM (not in your website code):

1. **Google Analytics 4 Tag**
2. **Meta Pixel Tag**
3. **Google Ads Conversion Tracking**
4. **Phone Call Tracking**
5. **Form Submission Tracking**

---

## 4️⃣ GOOGLE BUSINESS PROFILE INTEGRATION

### **Step 1: Claim Your Business**

1. Go to **Google Business Profile**: https://business.google.com
2. Search for your business (if it exists) or click **"Add your business"**
3. Enter details:
   - Business name: `Thrive 4 Peak Performance`
   - Category: `Wellness center`
   - Address: `[Your Street Address], Alpharetta, GA 30009`
   - Phone: `(470) 359-6195`
4. Verify your business (postcard, phone, or email)

### **Step 2: Complete Your Profile**

Add:
- **Photos** (exterior, interior, services, team)
- **Services** (list all 8 services)
- **Business hours**
- **Website** (link to thrive4peakperformance.com)
- **Booking URL** (link to book-appointment.html)
- **Description** (under 750 characters)

### **Step 3: Add Structured Data to Website**

Your website already has schema markup in `index.html`. Make sure to update:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Thrive 4 Peak Performance",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "YOUR ACTUAL STREET ADDRESS",
    "addressLocality": "Alpharetta",
    "addressRegion": "GA",
    "postalCode": "30009"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "YOUR_LATITUDE",
    "longitude": "YOUR_LONGITUDE"
  },
  "telephone": "+14703596195",
  "url": "https://www.thrive4peakperformance.com"
}
```

---

## 5️⃣ GOOGLE SEARCH CONSOLE SETUP

### **Step 1: Add Property**

1. Go to **Google Search Console**: https://search.google.com/search-console
2. Click **"Add Property"**
3. Enter: `https://thrive4peakperformance.com`
4. Click **"Continue"**

### **Step 2: Verify Ownership**

Choose verification method:
- **HTML file upload** (easiest for Vercel)
- **DNS record** (if you manage DNS)
- **Google Analytics** (if GA4 already installed)

For HTML file:
1. Download verification file (e.g., `google123abc.html`)
2. Upload to root of your website
3. Click **"Verify"**

### **Step 3: Submit Sitemap**

1. Create sitemap.xml (I'll provide below)
2. Upload to root: `https://thrive4peakperformance.com/sitemap.xml`
3. In Search Console, go to **"Sitemaps"**
4. Enter: `sitemap.xml`
5. Click **"Submit"**

### **Step 4: Request Indexing**

For each important page:
1. Click **"URL Inspection"** in Search Console
2. Enter page URL
3. Click **"Request Indexing"**

Do this for:
- Homepage
- All 8 service pages
- About page
- Contact page

---

## 6️⃣ CONVERSION TRACKING SETUP

### **Phone Call Tracking**

Add `onclick` events to all phone links:

```html
<a href="tel:4703596195" 
   onclick="gtag('event', 'phone_call', {'event_category': 'engagement'}); fbq('track', 'Contact');">
   (470) 359-6195
</a>
```

### **Form Submission Tracking**

Add to form submit handlers:

```javascript
function trackFormSubmission() {
  // Google Analytics
  gtag('event', 'form_submit', {
    'event_category': 'engagement',
    'event_label': 'contact_form'
  });
  
  // Meta Pixel
  fbq('track', 'Lead');
}
```

### **Book Appointment Tracking**

```javascript
function trackAppointmentBooking() {
  // Google Analytics
  gtag('event', 'book_appointment', {
    'event_category': 'conversion',
    'event_label': 'appointment_form'
  });
  
  // Meta Pixel
  fbq('track', 'Schedule');
}
```

---

## 7️⃣ SITEMAP.XML FILE

I'll create this for you in a separate file.

---

## 8️⃣ IMPLEMENTATION CHECKLIST

### **Quick Start (Recommended Order):**

1. ✅ Set up Google Tag Manager (do this FIRST)
2. ✅ Add Meta Pixel through GTM
3. ✅ Add Google Analytics 4 through GTM
4. ✅ Set up conversion tracking in GTM
5. ✅ Verify Meta Pixel is firing
6. ✅ Verify GA4 is receiving data
7. ✅ Complete Google Business Profile
8. ✅ Set up Google Search Console
9. ✅ Submit sitemap
10. ✅ Request indexing for key pages

### **Files To Update:**

**header.html** - Add GTM code to `<head>`
**All HTML files** - Add GTM noscript after `<body>` tag

---

## 9️⃣ TESTING YOUR SETUP

### **Test Meta Pixel:**
1. Install Meta Pixel Helper extension
2. Visit your website
3. Click buttons and forms
4. Verify events fire in Pixel Helper

### **Test Google Analytics:**
1. Go to GA4 Real-time reports
2. Visit your website in another tab
3. You should see yourself as active user

### **Test Phone Tracking:**
1. Click phone number
2. Check GA4 Events report (wait 24 hours)
3. Check Meta Events Manager

---

## 🎯 NEXT STEPS AFTER SETUP

1. **Let pixels collect data for 7 days** before running ads
2. **Create Custom Audiences** in Meta for retargeting
3. **Set up Google Ads Remarketing** (optional)
4. **Monitor Search Console** for indexing issues
5. **Track Rankings** for key terms in your area

---

## 📞 NEED HELP?

Common issues:
- **Pixel not firing?** Check browser console for errors
- **GA4 not tracking?** Verify measurement ID is correct
- **Pages not indexing?** Check robots.txt and meta tags

---

**Next: I'll create the actual implementation files for you!**
