# HERO GRADIENT OPTIONS - FACE VISIBILITY FIX

## Current Problem
The overlay is making faces in the image too dark/hard to see.

---

## ✅ OPTION A: VIGNETTE EFFECT (APPLIED NOW)

**What it does:** Darkens only top & bottom edges, keeps center bright

```css
background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,      /* Dark at top */
    rgba(0, 0, 0, 0.1) 30%,     /* Lighter */
    rgba(0, 0, 0, 0) 50%,       /* CLEAR in middle (faces visible!) */
    rgba(0, 0, 0, 0.1) 70%,     /* Lighter */
    rgba(0, 0, 0, 0.3) 100%     /* Dark at bottom */
);
```

**Result:** 
- ✅ Faces in center stay bright and visible
- ✅ Text at top still readable (dark background)
- ✅ Natural "spotlight" effect on people

---

## OPTION B: LEFT-SIDE GRADIENT ONLY

**What it does:** Darkens only the left side where text is

```css
background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,      /* Dark on left (behind text) */
    rgba(0, 0, 0, 0.2) 40%,     /* Lighter */
    rgba(0, 0, 0, 0) 60%,       /* CLEAR on right (faces visible!) */
    rgba(0, 0, 0, 0) 100%       /* Clear */
);
```

**Result:**
- ✅ Right side of image stays 100% bright
- ✅ Text on left has dark background
- ✅ Best if faces/people are on right side of image

**To use:** Replace the `.hero-background::after` section in CSS with above code

---

## OPTION C: NO OVERLAY AT ALL (Pure Text Shadow)

**What it does:** Remove all overlay, rely only on text shadow

```css
.hero-background::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none; /* NO OVERLAY */
}
```

**And increase text shadow strength:**

```css
.hero-title {
    text-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.9),
        4px 4px 8px rgba(0, 0, 0, 0.8),
        6px 6px 12px rgba(0, 0, 0, 0.7);
}

.hero-subtitle {
    text-shadow: 
        1px 1px 3px rgba(0, 0, 0, 0.9),
        2px 2px 6px rgba(0, 0, 0, 0.8),
        3px 3px 9px rgba(0, 0, 0, 0.7);
}
```

**Result:**
- ✅ 100% bright image, no darkening at all
- ✅ Multi-layer text shadow ensures readability
- ✅ Works best with images that have natural contrast

---

## OPTION D: SMART POSITIONING (Best Solution!)

**What it does:** Move text to a different position on the image

Instead of changing the overlay, change where the text appears:

```css
.hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin-left: 0;      /* Keep left-aligned */
    margin-top: -100px;  /* Move text UP (away from faces) */
}
```

**OR align text to the right:**

```css
.hero-content {
    margin-left: auto;   /* Push to right side */
    margin-right: 0;
}
```

**Result:**
- ✅ Text moves to area of image with better contrast
- ✅ Faces stay in bright area
- ✅ Most flexible solution

---

## MY RECOMMENDATION

**Try Option A (Vignette) first** - I've already applied it. 

If faces are still too dark, try **Option D** - simply move your text higher or to a different side of the image.

### Quick Test for Option D:

Add this to your CSS temporarily:

```css
.hero-content {
    transform: translateY(-80px); /* Move text up 80px */
}
```

OR

```css
.hero-content {
    margin-left: auto; /* Move text to right side */
    text-align: right;
}
```

---

## VISUAL COMPARISON

```
OPTION A (Vignette):
┌─────────────────────────────┐
│ ████ Text here ████        │ ← Dark
│ ░░░░ Bright faces ░░░░     │ ← Bright
│ ░░░░               ░░░░     │ ← Bright  
│ ████               ████     │ ← Dark
└─────────────────────────────┘

OPTION B (Left gradient):
┌─────────────────────────────┐
│ ████ Text here              │
│ ████                        │
│ ░░░░  Bright faces →→→→→→→ │
│ ░░░░                        │
└─────────────────────────────┘

OPTION C (No overlay):
┌─────────────────────────────┐
│ ▓▓▓▓ Strong shadow text     │
│      BRIGHT EVERYWHERE      │
│      Faces fully visible    │
│                             │
└─────────────────────────────┘

OPTION D (Move text):
┌─────────────────────────────┐
│ Text way up here ↑          │
│                             │
│     Bright faces down here  │
│                             │
└─────────────────────────────┘
```

---

## IMPLEMENTATION

**Option A is already applied!**

To try others, find this section in `styles-updated.css`:

```css
.hero-background::after {
    /* Replace this entire block */
}
```

Then paste in the gradient from Options B, C, or D above.
