#!/usr/bin/env python3
"""
PROGRAMMATIC SEO PAGE GENERATOR
Generates location-based landing pages for Thrive 4 Peak Performance
"""

# Target cities with distances from Alpharetta
CITIES = {
    'alpharetta': {
        'name': 'Alpharetta',
        'state': 'GA',
        'zip': '30009',
        'distance': '0 miles',
        'landmarks': 'near The Avalon and Windward Parkway',
        'population': '65,000',
        'description': 'the heart of North Fulton County'
    },
    'milton': {
        'name': 'Milton',
        'state': 'GA',
        'zip': '30004',
        'distance': '6 miles',
        'landmarks': 'near Crabapple and Birmingham Crossroads',
        'population': '40,000',
        'description': 'a peaceful community in North Fulton'
    },
    'roswell': {
        'name': 'Roswell',
        'state': 'GA',
        'zip': '30075',
        'distance': '8 miles',
        'landmarks': 'near Historic Roswell and East Roswell',
        'population': '95,000',
        'description': 'a historic city in North Atlanta'
    },
    'johns-creek': {
        'name': 'Johns Creek',
        'state': 'GA',
        'zip': '30097',
        'distance': '10 miles',
        'landmarks': 'near Medlock Bridge and State Bridge',
        'population': '85,000',
        'description': 'a thriving North Fulton community'
    },
    'cumming': {
        'name': 'Cumming',
        'state': 'GA',
        'zip': '30040',
        'distance': '12 miles',
        'landmarks': 'near Cumming City Center and Lake Lanier',
        'population': '7,000',
        'description': 'the Forsyth County seat'
    },
    'duluth': {
        'name': 'Duluth',
        'state': 'GA',
        'zip': '30096',
        'distance': '15 miles',
        'landmarks': 'near Parsons Alley and Downtown Duluth',
        'population': '30,000',
        'description': 'a diverse Gwinnett County city'
    },
    'sandy-springs': {
        'name': 'Sandy Springs',
        'state': 'GA',
        'zip': '30328',
        'distance': '12 miles',
        'landmarks': 'near Perimeter Center and City Springs',
        'population': '110,000',
        'description': 'North Atlanta\'s largest city'
    },
    'marietta': {
        'name': 'Marietta',
        'state': 'GA',
        'zip': '30060',
        'distance': '18 miles',
        'landmarks': 'near Marietta Square and East Cobb',
        'population': '60,000',
        'description': 'historic Cobb County seat'
    }
}

# Services with their specific benefits
SERVICES = {
    'iv-therapy': {
        'name': 'IV Therapy',
        'slug': 'iv-therapy',
        'title': 'IV Therapy & NAD+',
        'h1_variant': 'IV Drip Nutrition',
        'description': 'Physician-supervised IV therapy with NAD+, Myers\' Cocktail, and custom vitamin infusions',
        'benefits': [
            'Instant hydration and nutrient delivery',
            'Enhanced athletic performance and recovery',
            'Immune system support and illness prevention',
            'Energy boost and mental clarity',
            'Hangover relief and detoxification',
            'Anti-aging NAD+ therapy'
        ],
        'ideal_for': 'athletes, busy professionals, anyone seeking optimal wellness',
        'session_time': '30-60 minutes',
        'frequency': '1-2 times per week for maintenance',
        'main_page': '/services/iv-therapy-alpharetta-ga.html'
    },
    'hocatt': {
        'name': 'HOCATT Ozone Sauna',
        'slug': 'hocatt',
        'title': 'HOCATT Ozone Sauna',
        'h1_variant': 'HOCATT Full Body Detox',
        'description': 'Hyperthermic Ozone and Carbonic Acid Transdermal Therapy for complete detoxification',
        'benefits': [
            'Full-body detoxification',
            'Immune system enhancement',
            'Improved circulation',
            'Reduced inflammation',
            'Skin health improvement',
            'Stress reduction'
        ],
        'ideal_for': 'those seeking detox, immune support, or inflammation relief',
        'session_time': '25-30 minutes',
        'frequency': '2-3 times per week initially',
        'main_page': '/services/hocatt-ozone-sauna-alpharetta.html'
    },
    'cryotherapy': {
        'name': 'Cryotherapy',
        'slug': 'cryotherapy',
        'title': 'Cryotherapy',
        'h1_variant': 'Whole Body Cryotherapy',
        'description': 'Whole body cryotherapy for recovery, performance, and wellness',
        'benefits': [
            'Accelerated muscle recovery',
            'Reduced inflammation and pain',
            'Enhanced athletic performance',
            'Improved metabolism',
            'Better sleep quality',
            'Mood enhancement'
        ],
        'ideal_for': 'athletes, fitness enthusiasts, those with chronic pain',
        'session_time': '2-3 minutes',
        'frequency': '3-5 times per week for best results',
        'main_page': '/services/cryotherapy-alpharetta-ga.html'
    },
    'hyperbaric': {
        'name': 'Hyperbaric Oxygen Therapy',
        'slug': 'hyperbaric',
        'title': 'Hyperbaric Oxygen Therapy',
        'h1_variant': 'Hyperbaric Chamber',
        'description': 'Mild hyperbaric oxygen therapy for enhanced healing and recovery',
        'benefits': [
            'Enhanced oxygen delivery to tissues',
            'Faster injury recovery',
            'Improved cognitive function',
            'Reduced inflammation',
            'Better wound healing',
            'Anti-aging benefits'
        ],
        'ideal_for': 'recovery from injury, surgery, or seeking cognitive enhancement',
        'session_time': '60 minutes',
        'frequency': '2-3 times per week',
        'main_page': '/services/hyperbaric-oxygen-therapy-alpharetta.html'
    },
    'red-light': {
        'name': 'Red Light Therapy',
        'slug': 'red-light',
        'title': 'Red Light Therapy',
        'h1_variant': 'Red Light Therapy',
        'description': 'Photobiomodulation therapy for skin, recovery, and cellular health',
        'benefits': [
            'Improved skin health and appearance',
            'Collagen production',
            'Reduced joint pain',
            'Enhanced muscle recovery',
            'Better sleep quality',
            'Increased cellular energy'
        ],
        'ideal_for': 'skin health, anti-aging, recovery, and overall wellness',
        'session_time': '15-20 minutes',
        'frequency': '3-5 times per week',
        'main_page': '/services/red-light-therapy-alpharetta.html'
    },
    'compression': {
        'name': 'Compression Therapy',
        'slug': 'compression',
        'title': 'Compression Therapy',
        'h1_variant': 'Compression Boots',
        'description': 'NormaTec compression therapy for recovery and circulation',
        'benefits': [
            'Enhanced circulation',
            'Reduced muscle soreness',
            'Faster recovery',
            'Decreased swelling',
            'Improved flexibility',
            'Better lymphatic drainage'
        ],
        'ideal_for': 'athletes, runners, anyone with circulation issues',
        'session_time': '20-30 minutes',
        'frequency': 'Daily or post-workout',
        'main_page': '/services/compression-therapy-alpharetta.html'
    },
    'weight-loss': {
        'name': 'Weight Loss (GLP-1)',
        'slug': 'weight-loss',
        'title': 'Weight Loss GLP-1',
        'h1_variant': 'Weight Loss GLP-1',
        'description': 'Physician-supervised GLP-1 weight loss program',
        'benefits': [
            'Medically supervised weight loss',
            'Reduced appetite',
            'Better blood sugar control',
            'Sustainable results',
            'Personalized protocols',
            'Ongoing medical support'
        ],
        'ideal_for': 'those seeking safe, effective, medically-supervised weight loss',
        'session_time': 'Weekly check-ins',
        'frequency': 'Weekly injections',
        'main_page': '/services/weight-loss-glp1-alpharetta.html'
    },
    'peptides': {
        'name': 'Peptide Therapy',
        'slug': 'peptides',
        'title': 'Peptide Therapy',
        'h1_variant': 'Peptide Therapy',
        'description': 'Custom peptide protocols for recovery, performance, and longevity',
        'benefits': [
            'Enhanced muscle recovery',
            'Improved athletic performance',
            'Better sleep quality',
            'Increased muscle mass',
            'Accelerated healing',
            'Longevity support'
        ],
        'ideal_for': 'athletes, biohackers, those seeking performance optimization',
        'session_time': 'Self-administered',
        'frequency': 'Daily or as prescribed',
        'main_page': '/services/peptide-therapy-alpharetta.html'
    }
}

# HTML Template for location pages
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{keywords}">
    <meta name="geo.region" content="US-GA">
    <meta name="geo.placename" content="{city_name}, Georgia">
    <meta name="geo.position" content="34.0754;-84.2941">
    
    <title>{page_title}</title>
    
    <link rel="stylesheet" href="../../css/styles-updated.css">
    <link rel="stylesheet" href="../../css/service-page-enhanced.css">
    <link rel="icon" type="image/png" href="../../images/favicon.png">
    
    <!-- Schema Markup -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Thrive 4 Peak Performance",
      "image": "https://www.thrive4peakperformance.com/images/logo.png",
      "url": "https://www.thrive4peakperformance.com{current_url}",
      "telephone": "+14703596195",
      "priceRange": "$$",
      "address": {{
        "@type": "PostalAddress",
        "streetAddress": "YOUR STREET ADDRESS",
        "addressLocality": "Alpharetta",
        "addressRegion": "GA",
        "postalCode": "30009",
        "addressCountry": "US"
      }},
      "geo": {{
        "@type": "GeoCoordinates",
        "latitude": "34.0754",
        "longitude": "-84.2941"
      }},
      "areaServed": {{
        "@type": "City",
        "name": "{city_name}",
        "containedInPlace": {{
          "@type": "State",
          "name": "Georgia"
        }}
      }},
      "serviceType": "{service_name}",
      "aggregateRating": {{
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "0"
      }}
    }}
    </script>
</head>
<body>
    
    <div id="header-placeholder"></div>
    
    <!-- HERO -->
    <section class="hero" style="min-height: 400px;">
        <div class="hero-background">
            <img src="../../images/{service_image}" alt="{service_name} in {city_name}, GA">
        </div>
        <div class="container">
            <div class="hero-content">
                <nav class="breadcrumb">
                    <a href="/">Home</a> › <a href="../../services/{service_slug}-alpharetta-ga.html">{service_name}</a> › <span>{city_name}</span>
                </nav>
                <h1>{h1_title}</h1>
            </div>
        </div>
    </section>
    
    <!-- INTRO -->
    <section class="trust-section">
        <div class="container">
            <div style="max-width: 900px; margin: 0 auto;">
                <h2>Professional {service_name} Serving {city_name}, GA</h2>
                <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    {intro_paragraph}
                </p>
                <p style="font-size: 1.125rem; line-height: 1.8;">
                    Our Alpharetta location is just {distance} from {city_name}, {city_landmarks}. We make it convenient for {city_description} residents to access world-class recovery and performance therapies.
                </p>
            </div>
        </div>
    </section>
    
    <!-- BENEFITS -->
    <section class="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>Benefits of {service_name} for {city_name} Residents</h2>
            </div>
            <div class="trust-grid">
                {benefits_html}
            </div>
        </div>
    </section>
    
    <!-- WHY CHOOSE THRIVE -->
    <section class="trust-section" style="background-color: #F9FAFB;">
        <div class="container">
            <div class="section-header">
                <h2>Why {city_name} Residents Choose Thrive</h2>
            </div>
            <div class="trust-grid">
                <div class="trust-card">
                    <h3>📍 Convenient Location</h3>
                    <p>Just {distance} from {city_name}. Easy access from major roads with ample parking right at The Avalon.</p>
                </div>
                <div class="trust-card">
                    <h3>👨‍⚕️ Board-Certified Physicians</h3>
                    <p>Every treatment supervised by licensed medical professionals. Not a spa—a medical wellness clinic.</p>
                </div>
                <div class="trust-card">
                    <h3>🏆 State-of-the-Art Equipment</h3>
                    <p>Medical-grade equipment from leading manufacturers. The same technology used by professional sports teams.</p>
                </div>
                <div class="trust-card">
                    <h3>⚡ Results-Focused</h3>
                    <p>Personalized protocols based on your goals. We track progress and adjust treatments for optimal outcomes.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- IDEAL FOR -->
    <section class="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>Perfect For {city_name} Residents</h2>
            </div>
            <p style="max-width: 800px; margin: 0 auto 2rem; text-align: center; font-size: 1.125rem;">
                {service_name} is ideal for {ideal_for}. Whether you're training for a marathon, recovering from an injury, or optimizing your health, we create custom protocols for your needs.
            </p>
            <div style="max-width: 600px; margin: 0 auto;">
                <div class="trust-card">
                    <h3>Session Details</h3>
                    <p><strong>Duration:</strong> {session_time}</p>
                    <p><strong>Recommended Frequency:</strong> {frequency}</p>
                    <p><strong>Location:</strong> Alpharetta (near The Avalon)</p>
                    <p><strong>Parking:</strong> Free parking available</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- DRIVING DIRECTIONS -->
    <section class="trust-section" style="background-color: #F9FAFB;">
        <div class="container">
            <div class="section-header">
                <h2>Getting to Thrive from {city_name}</h2>
            </div>
            <div style="max-width: 800px; margin: 0 auto;">
                <p style="font-size: 1.125rem; margin-bottom: 2rem; text-align: center;">
                    Our Alpharetta location is approximately {distance} from {city_name}. We're located just one mile east of The Avalon, making us easy to reach from anywhere in North Fulton County.
                </p>
                <div class="trust-card">
                    <h3>📍 Address</h3>
                    <p><strong>Thrive 4 Peak Performance</strong><br>
                    [Your Street Address]<br>
                    Alpharetta, GA 30009</p>
                    <p style="margin-top: 1rem;">
                        <strong>Phone:</strong> <a href="tel:4703596195" style="color: #00CED1;">(470) 359-6195</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- OTHER SERVICES -->
    <section class="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>Other Services We Offer {city_name} Residents</h2>
            </div>
            <div class="services-compact-grid">
                {other_services_html}
            </div>
        </div>
    </section>
    
    <!-- CTA -->
    <section class="conversion-section">
        <div class="container">
            <div class="conversion-content">
                <h2>Ready to Experience {service_name}?</h2>
                <p>Book your appointment online or call us at (470) 359-6195</p>
                <a href="../../book-appointment.html" class="btn btn-primary btn-lg">Book Your Visit</a>
                <p class="conversion-note">Serving {city_name}, Alpharetta, Milton, Roswell, Johns Creek, and all of North Fulton County</p>
            </div>
        </div>
    </section>
    
    <div id="footer-placeholder"></div>
    
    <!-- Load main.js first -->
    <script src="../../js/main.js"></script>
    
    <!-- Load Header and Footer -->
    <script>
        fetch('../../header.html')
            .then(response => response.text())
            .then(data => {{
                document.getElementById('header-placeholder').innerHTML = data;
                if (typeof initMobileMenu === 'function') {{
                    initMobileMenu();
                }}
            }});
        
        fetch('../../footer.html')
            .then(response => response.text())
            .then(data => {{
                document.getElementById('footer-placeholder').innerHTML = data;
            }});
    </script>
    
</body>
</html>
"""

def generate_page(service_key, city_key):
    """Generate a location page for a specific service and city combination"""
    
    service = SERVICES[service_key]
    city = CITIES[city_key]
    
    # Generate content
    page_title = f"{service['name']} {city['name']}, GA | Thrive 4 Peak Performance"
    h1_title = f"{service['h1_variant']} in {city['name']}, Georgia"
    meta_description = f"{service['description']} serving {city['name']}, GA. Just {city['distance']} from our Alpharetta location. Book online or call (470) 359-6195."
    keywords = f"{service['name']} {city['name']}, {service['slug']} {city['state']}, {service['slug']} near me, {service['slug']} {city['landmarks']}"
    
    intro_paragraph = f"Looking for professional {service['name']} in {city['name']}? Thrive 4 Peak Performance offers {service['description'].lower()}. Located in nearby Alpharetta, we serve the entire {city['name']} community with physician-supervised treatments designed to help you recover faster, perform better, and optimize your health."
    
    # Generate benefits HTML
    benefits_html = ""
    for benefit in service['benefits']:
        benefits_html += f"""
                <div class="trust-card">
                    <h3>✓ {benefit}</h3>
                </div>"""
    
    # Generate other services HTML
    other_services_html = ""
    for other_key, other_service in SERVICES.items():
        if other_key != service_key:
            other_services_html += f"""
                <a href="{other_service['slug']}-{city_key}.html" class="service-card-compact">
                    <h3>{other_service['h1_variant']}</h3>
                </a>"""
    
    # Format the template
    html = HTML_TEMPLATE.format(
        meta_description=meta_description,
        keywords=keywords,
        city_name=city['name'],
        page_title=page_title,
        current_url=f"/locations/{service['slug']}-{city_key}.html",
        service_name=service['name'],
        service_image=f"service-{service_key}.jpg",
        service_slug=service['slug'],
        h1_title=h1_title,
        intro_paragraph=intro_paragraph,
        distance=city['distance'],
        city_landmarks=city['landmarks'],
        city_description=city['description'],
        benefits_html=benefits_html,
        ideal_for=service['ideal_for'],
        session_time=service['session_time'],
        frequency=service['frequency'],
        other_services_html=other_services_html
    )
    
    # Generate filename
    filename = f"{service['slug']}-{city_key}.html"
    
    return filename, html

if __name__ == "__main__":
    print("PROGRAMMATIC SEO PAGE GENERATOR")
    print("=" * 50)
    print(f"Cities: {len(CITIES)}")
    print(f"Services: {len(SERVICES)}")
    print(f"Total Pages to Generate: {len(CITIES) * len(SERVICES)}")
    print("=" * 50)
    
    generated = 0
    for service_key in SERVICES:
        for city_key in CITIES:
            filename, html = generate_page(service_key, city_key)
            print(f"Generated: {filename}")
            generated += 1
    
    print("=" * 50)
    print(f"✓ Generated {generated} location pages!")
