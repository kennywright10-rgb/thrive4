# NEWSLETTER FORM - INTEGRATION GUIDE

## ✅ WHAT I ADDED

A newsletter signup form at the top of your footer (just like your current Wix site):
- Email input field
- "Sign-Up" button
- Clean, professional styling
- Mobile responsive (stacks vertically on phones)

---

## 📧 HOW TO CONNECT THE FORM

You have several options to make the form functional:

### **OPTION 1: Mailchimp (RECOMMENDED)** ⭐

**Why:** Free, easy, professional email marketing platform

**Steps:**

1. **Create Mailchimp Account** (free up to 500 subscribers)
   - Go to mailchimp.com
   - Sign up for free account

2. **Create an Audience**
   - Dashboard → Audience → Create Audience
   - Fill in your business details

3. **Get Embedded Form Code**
   - Audience → Signup forms → Embedded forms
   - Select "Condensed" or "Horizontal" layout
   - Copy the form code

4. **Replace Form in footer.php**

Find this in `footer.php`:
```html
<form class="newsletter-form" action="#" method="POST">
    <input type="email" name="email" placeholder="E-Mail Address" required>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

Replace with Mailchimp code (will look like this):
```html
<form action="https://thrive4peakperformance.us1.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX" 
      method="post" class="newsletter-form">
    <input type="email" name="EMAIL" placeholder="E-Mail Address" required>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

**Mailchimp Features:**
- ✅ Automated welcome emails
- ✅ Email campaign builder
- ✅ Analytics & reporting
- ✅ Mobile app to manage subscribers

---

### **OPTION 2: ConvertKit**

**Why:** Popular with wellness/health businesses

**Steps:**
1. Sign up at convertkit.com
2. Create a form
3. Copy embed code
4. Paste into footer.php

---

### **OPTION 3: Email to Google Sheets (Free)**

**Why:** No third-party service needed

**Steps:**

1. **Create Google Sheet**
   - Create new Google Sheet
   - Name columns: Date, Email

2. **Use Google Apps Script**

Replace form in `footer.php` with:
```html
<form class="newsletter-form" 
      action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" 
      method="POST">
    <input type="email" name="email" placeholder="E-Mail Address" required>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

3. **Create Google Apps Script**
   - In Google Sheets: Extensions → Apps Script
   - Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var email = e.parameter.email;
  var date = new Date();
  
  sheet.appendRow([date, email]);
  
  return ContentService.createTextOutput("Success");
}
```

4. **Deploy**
   - Click Deploy → New deployment
   - Execute as: Me
   - Who has access: Anyone
   - Copy the web app URL

---

### **OPTION 4: Simple PHP + Email**

**Why:** No external services, just sends you an email

Replace form in `footer.php`:
```html
<form class="newsletter-form" action="/subscribe.php" method="POST">
    <input type="email" name="email" placeholder="E-Mail Address" required>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

Create new file `subscribe.php` in root:
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = "info@thrive4peakperformance.com";
        $subject = "New Newsletter Signup";
        $message = "New subscriber: " . $email;
        $headers = "From: noreply@thrive4peakperformance.com";
        
        if (mail($to, $subject, $message, $headers)) {
            header("Location: /thank-you.php");
        } else {
            echo "Error. Please try again.";
        }
    }
}
?>
```

**Note:** This just emails you each signup. You'll need to manually add them to your email list.

---

### **OPTION 5: Formspree (Easiest)**

**Why:** 2-minute setup, no coding

**Steps:**

1. Go to formspree.io
2. Create free account (50 submissions/month)
3. Create new form
4. Copy your form endpoint

5. **Update footer.php:**
```html
<form class="newsletter-form" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST">
    <input type="email" name="email" placeholder="E-Mail Address" required>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

---

## 🎨 CURRENT STYLING

The form is already styled to match your site:

**Desktop:**
- Side-by-side layout (email field + button)
- Blue footer background (#004aad)
- Cyan button (matches your brand)
- Semi-transparent input field

**Mobile:**
- Stacked vertically
- Full-width email field
- Full-width button

---

## ⚙️ CUSTOMIZATION OPTIONS

### Change Button Text
```html
<button type="submit" class="btn btn-primary">Subscribe Now</button>
```

### Change Placeholder Text
```html
<input type="email" name="email" placeholder="Enter your email" required>
```

### Change Headline/Description
In `footer.php`:
```html
<h3>Join Our Wellness Community</h3>
<p>Get exclusive health tips and special offers delivered weekly</p>
```

### Add Privacy Text
Add below the form:
```html
<p style="font-size: 0.875rem; color: rgba(255,255,255,0.7); margin-top: 1rem;">
    We respect your privacy. Unsubscribe at any time.
</p>
```

---

## ✅ TESTING CHECKLIST

After connecting your form:

- [ ] Submit a test email
- [ ] Check you receive the email/notification
- [ ] Test on mobile phone
- [ ] Verify error messages work (try invalid email)
- [ ] Check success message displays
- [ ] Test unsubscribe link (if using Mailchimp/ConvertKit)

---

## 🚨 GDPR COMPLIANCE (If you have EU visitors)

Add a checkbox for consent:

```html
<form class="newsletter-form" action="#" method="POST">
    <input type="email" name="email" placeholder="E-Mail Address" required>
    <label style="display: flex; gap: 0.5rem; font-size: 0.875rem; margin-top: 0.5rem;">
        <input type="checkbox" required>
        <span>I agree to receive emails from Thrive 4 Peak Performance</span>
    </label>
    <button type="submit" class="btn btn-primary">Sign-Up</button>
</form>
```

---

## 📊 RECOMMENDED SETUP

For a medical wellness business like Thrive, I recommend:

**Mailchimp** (Option 1) because:
- ✅ Professional email campaigns
- ✅ Automated welcome series
- ✅ Segment by interests (IV therapy, cryotherapy, etc.)
- ✅ A/B testing
- ✅ Integration with booking software
- ✅ Mobile app for on-the-go management

---

## 💡 EMAIL CAMPAIGN IDEAS

Once you have subscribers:

1. **Welcome Series** (3 emails)
   - Email 1: Welcome + free consultation offer
   - Email 2: Explain your services
   - Email 3: Patient success stories

2. **Monthly Newsletter**
   - Wellness tips
   - Service spotlights
   - Special offers
   - New services/team members

3. **Seasonal Campaigns**
   - New Year (recovery/fitness goals)
   - Summer (vacation recovery)
   - Fall (immune boosting)

---

## 🔧 NEED HELP?

**Mailchimp Support:**
- mailchimp.com/help

**Formspree Support:**
- help.formspree.io

**ConvertKit Support:**
- help.convertkit.com

---

**Your newsletter form is ready to go!** Just pick your integration method and connect it. 📧✨
