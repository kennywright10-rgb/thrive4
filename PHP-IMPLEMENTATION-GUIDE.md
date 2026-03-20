# PHP INCLUDES - STEP-BY-STEP IMPLEMENTATION GUIDE

## ✅ WHAT I'VE CREATED FOR YOU

1. **header.php** - Universal header (edit once, updates everywhere)
2. **footer.php** - Universal footer (edit once, updates everywhere)
3. **index.php** - Homepage converted to PHP with includes

---

## 📋 STEP-BY-STEP IMPLEMENTATION

### **STEP 1: Upload New Files to Your Server**

Upload these 3 new files to your website root:
- ✅ `header.php`
- ✅ `footer.php`
- ✅ `index.php`

**Where to upload:**
```
/public_html/
├── header.php          ← NEW
├── footer.php          ← NEW
├── index.php           ← NEW (replaces index.html)
├── css/
├── js/
├── images/
└── ...
```

---

### **STEP 2: Test That PHP Works**

1. Go to: `https://yourdomain.com/index.php`
2. You should see your homepage (exactly the same as before)
3. If you see code instead of a website, PHP is not enabled (contact your host)

---

### **STEP 3: Rename Your HTML Files to PHP**

Rename these files on your server:

**Before → After**
```
index.html              → index.php (already done)
book-appointment.html   → book-appointment.php
about.html              → about.php
faq.html                → faq.php
contact.html            → contact.php
```

**How to rename:**
- Via FTP: Right-click file → Rename
- Via cPanel: File Manager → Select file → Rename
- Via command line: `mv index.html index.php`

---

### **STEP 4: Update Each PHP Page to Use Includes**

For EACH renamed PHP file, you need to:

1. **Find and DELETE the entire header section**
   
   Delete from `<header class="header">` to `</header>` (including both tags)

2. **Replace it with:**
   ```php
   <?php include 'header.php'; ?>
   ```

3. **Find and DELETE the entire footer section**
   
   Delete from `<footer class="footer">` to `</footer>` AND delete `<script src="/js/main.js"></script>`

4. **Replace it with:**
   ```php
   <?php include 'footer.php'; ?>
   ```

---

### **EXAMPLE: Converting book-appointment.html**

**BEFORE (book-appointment.html):**
```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
    
    <header class="header">
        <!-- Lots of header code here -->
    </header>
    
    <!-- Page content -->
    
    <footer class="footer">
        <!-- Lots of footer code here -->
    </footer>
    
    <script src="/js/main.js"></script>
</body>
</html>
```

**AFTER (book-appointment.php):**
```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
    
    <?php include 'header.php'; ?>
    
    <!-- Page content -->
    
    <?php include 'footer.php'; ?>
    
</body>
</html>
```

---

### **STEP 5: Set index.php as Default Homepage**

**Option A: Delete old index.html**
- Simply delete or rename `index.html` to `index-old.html`
- The server will automatically use `index.php`

**Option B: Update .htaccess**
Create or edit `.htaccess` file in your root directory:
```apache
DirectoryIndex index.php index.html
```

This tells the server to look for `index.php` first.

---

### **STEP 6: Update Links Throughout Your Site**

**Find and Replace Across All Files:**

Old → New
```
.html → .php
```

**Examples:**
```html
<!-- OLD -->
<a href="/about/">About</a>
<a href="/services/iv-therapy-alpharetta-ga/">IV Therapy</a>

<!-- NEW -->
<a href="/about.php">About</a>
<a href="/services/iv-therapy-alpharetta-ga.php">IV Therapy</a>
```

**This is already done in header.php and footer.php**, but check your page content!

---

### **STEP 7: Test Everything**

✅ Visit every page and check:
- Header appears correctly
- Footer appears correctly
- All links work
- Mobile menu works
- Forms still work

---

## 🎯 NOW YOU CAN EDIT IN ONE PLACE!

### **To Update Your Address:**

1. Open `footer.php`
2. Find this section:
   ```html
   <p><strong>Your Street Address</strong><br>
   Alpharetta, GA 30009</p>
   ```
3. Change to your actual address
4. Save and upload `footer.php`
5. **ALL pages update automatically!** ✨

### **To Update Navigation:**

1. Open `header.php`
2. Edit the menu items
3. Save and upload
4. **ALL pages update automatically!** ✨

---

## 🚨 TROUBLESHOOTING

### **Problem: I see PHP code on the page**
**Solution:** Your server doesn't have PHP enabled. Contact your hosting provider.

### **Problem: Blank page or error**
**Solution:** Check the file paths in your include statements:
```php
<?php include 'header.php'; ?>  // If in root directory
<?php include '../header.php'; ?> // If in a subdirectory
```

### **Problem: Header/footer don't show up**
**Solution:** 
1. Make sure `header.php` and `footer.php` are uploaded
2. Check file permissions (should be 644)
3. Check the include path is correct

### **Problem: Links in header/footer broken**
**Solution:** Update all links from `.html` to `.php` in `header.php` and `footer.php`

---

## 📂 FINAL FILE STRUCTURE

```
/public_html/
├── header.php                 ← EDIT HEADER HERE
├── footer.php                 ← EDIT FOOTER HERE
├── index.php                  ← Homepage
├── book-appointment.php
├── about.php
├── faq.php
├── contact.php
├── css/
│   └── styles-updated.css
├── js/
│   └── main.js
├── images/
│   ├── logo.png
│   └── ...
└── services/
    ├── iv-therapy-alpharetta-ga.php
    ├── hocatt-ozone-sauna-alpharetta.php
    └── ...
```

---

## ⚡ QUICK START CHECKLIST

- [ ] Upload `header.php`, `footer.php`, `index.php` to root
- [ ] Test: Visit `yourdomain.com/index.php`
- [ ] Rename all `.html` files to `.php`
- [ ] Edit each PHP file to add `<?php include 'header.php'; ?>` and `<?php include 'footer.php'; ?>`
- [ ] Delete old header/footer code from each page
- [ ] Update all links from `.html` to `.php`
- [ ] Test all pages
- [ ] Update your actual address in `footer.php`
- [ ] Celebrate! 🎉

---

## 💡 TIPS

1. **Keep backups** - Download your old HTML files before converting
2. **Test on staging first** - If your host offers a staging environment, test there
3. **Use Find & Replace** - Most code editors can find/replace across multiple files
4. **Check mobile** - Test the mobile menu after converting

---

## 🎓 WHAT YOU LEARNED

You now have a **template system** where:
- ✅ Header edits in one place → updates 20+ pages
- ✅ Footer edits in one place → updates 20+ pages
- ✅ Add a new menu item once → appears everywhere
- ✅ Change phone number once → updates everywhere

This is exactly how WordPress, Wix, and other CMSs work behind the scenes!

---

## 📞 NEED HELP?

If you get stuck:
1. Check your hosting provider's PHP documentation
2. Contact your host's support (they can enable PHP if needed)
3. Use your FTP client's search function to find/replace `.html` with `.php`

---

**You're now set up like a professional website!** 🚀
