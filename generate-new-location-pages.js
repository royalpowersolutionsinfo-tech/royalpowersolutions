/**
 * Generates location pages for the 4 new services across 7 major Chennai locations:
 * - loading-unloading-shifting
 * - battery-commissioning
 * - ups-commissioning-work
 * - cable-laying-work
 */
const fs = require('fs');
const path = require('path');

const locations = [
  { slug: 'ashok-pillar', name: 'Ashok Pillar', area: 'Ashok Nagar, Ekkattuthangal, KK Nagar, Virugambakkam', lat: 13.0333, lng: 80.2083, pincode: '600083' },
  { slug: 'jafferkhanpet', name: 'Jafferkhanpet', area: 'Ashok Nagar, Kodambakkam, Saidapet, Guindy', lat: 13.0516, lng: 80.2209, pincode: '600083' },
  { slug: 'west-mambalam', name: 'West Mambalam', area: 'T. Nagar, Kodambakkam, Ashok Nagar, Vadapalani', lat: 13.0404, lng: 80.2193, pincode: '600033' },
  { slug: 'guindy', name: 'Guindy', area: 'St. Thomas Mount, Alandur, Ekkattuthangal, Saidapet', lat: 13.0067, lng: 80.2206, pincode: '600032' },
  { slug: 'saidapet', name: 'Saidapet', area: 'Guindy, Adyar, Kotturpuram, Nandanam', lat: 13.0215, lng: 80.2231, pincode: '600015' },
  { slug: 'ambattur', name: 'Ambattur', area: 'Ambattur Industrial Estate, Mogappair, Padi, Avadi', lat: 13.1143, lng: 80.1548, pincode: '600058' },
  { slug: 'chennai', name: 'Chennai', area: 'All areas across Greater Chennai', lat: 13.0827, lng: 80.2707, pincode: '600001' }
];

const newServices = [
  {
    slug: 'loading-unloading-shifting',
    title: 'Loading Unloading Shifting Activity',
    keyword: 'Loading Unloading Shifting Activity',
    icon: 'fa-people-carry-box',
    metaTitle: 'Loading Unloading Shifting Activity in {loc} Chennai | Royal Power Solutions',
    metaDesc: 'Safe loading, unloading and shifting activity for Electrical Panels, Isolation Transformers, UPS & Batteries in {loc}, Chennai. Manual stacker & trolley rental available. Call 9787451828.',
    intro: 'Royal Power Solutions provides dedicated loading, unloading, and shifting teams in {loc}, Chennai. We safely handle heavy electrical panels, isolation transformers, UPS systems, and battery banks with industrial manual stackers, hydraulic pallet trucks, and certified rigging teams.',
    checklist: [
      'Manual Stacker Rental (up to 2000 kg capacity)',
      'Hand Pallet Truck & Manual Trolley Rental in {loc}',
      'Trained Heavy Equipment Loading & Unloading Manpower',
      'Electrical Panel & Isolation Transformer Shifting',
      'UPS & Industrial Battery Bank Relocation',
      'Staircase, ramp, and elevator maneuvering with protective gear'
    ],
    faqs: [
      { q: 'Do you provide manual stacker rental in {loc}?', a: 'Yes. We offer daily, weekly, and monthly manual stacker rental across {loc} and nearby areas for safe lifting of heavy UPS and transformers.' },
      { q: 'Can you shift electrical panels and isolation transformers in {loc}?', a: 'Yes. Our specialized rigging and shifting team handles turnkey relocations of switchgear, LT panels, and heavy isolation transformers without damaging sensitive components.' },
      { q: 'How fast can a shifting team reach {loc}?', a: 'We can deploy our shifting team and equipment in {loc} within 2 to 4 hours for urgent requirements, or on scheduled project timings.' }
    ]
  },
  {
    slug: 'battery-commissioning',
    title: 'Battery Commissioning Work',
    keyword: 'Battery Commissioning Work Engineer',
    icon: 'fa-plug-circle-check',
    metaTitle: 'Battery Commissioning Work in {loc} Chennai | Battery Free Launcher Engineer',
    metaDesc: 'Certified Battery Commissioning Engineers & Battery Free Launcher Engineers in {loc}, Chennai. VRLA, SMF, Lithium Ion bank commissioning, DC cable laying, load test. Call 9787451828.',
    intro: 'Looking for a certified Battery Free Launcher Engineer in {loc}, Chennai? Royal Power Solutions provides expert battery commissioning engineers for commercial, industrial, and data center setups. We handle string assembly, DC cable laying, boost charging, and full-load capacity discharge tests.',
    checklist: [
      'Certified Battery Free Launcher Engineers in {loc}',
      'VRLA, SMF, Tubular, AGM & Lithium Ion (LiFePO4) banks',
      'Precise inter-cell torque tightening & antioxidant treatment',
      'DC cable sizing, routing, and hydraulic lug crimping',
      'Pilot cell identification and baseline conductance measurements',
      'Complete warranty commissioning report with engineer signoff'
    ],
    faqs: [
      { q: 'Why do I need a certified battery commissioning engineer in {loc}?', a: 'Proper commissioning ensures warranty validity from manufacturers like Exide, Amaron, and Luminous, while verifying that every cell in the string performs at peak efficiency.' },
      { q: 'Do you do DC cable laying as part of battery commissioning in {loc}?', a: 'Yes. Our battery commissioning includes end-to-end DC cable routing, tray arrangement, hydraulic compression lugging, and polarity checks.' },
      { q: 'Can you commission lithium-ion (LiFePO4) battery banks in {loc}?', a: 'Yes. Our engineers are trained in modern lithium battery management systems (BMS), communications setup, and charge curve configurations.' }
    ]
  },
  {
    slug: 'ups-commissioning-work',
    title: 'UPS Position & Commissioning Work',
    keyword: 'UPS Commissioning Work Engineer',
    icon: 'fa-clipboard-check',
    metaTitle: 'UPS Position & Commissioning Work in {loc} Chennai | UPS Free Launcher Engineer',
    metaDesc: 'UPS Commissioning Engineers & UPS Free Launcher Engineers in {loc}, Chennai for 1kVA–1000kVA setups. Precision positioning, earthing, bypass testing, handover report. Call 9787451828.',
    intro: 'Royal Power Solutions delivers professional UPS Position and Commissioning Work in {loc}, Chennai. From 1kVA compact systems to 1000kVA multi-module redundant industrial setups, our freelance and resident commissioning engineers ensure flaw-free deployment and warranty compliance.',
    checklist: [
      'Certified UPS Free Launcher Engineers in {loc}',
      '1kVA to 1000kVA Online Double Conversion & Modular UPS',
      'Chassis leveling, anti-vibration isolation & earth loop checks',
      'Static bypass switch validation & phase synch calibration',
      'Full mains failure simulation & battery runtime logging',
      'Detailed site acceptance & manufacturer commissioning handover reports'
    ],
    faqs: [
      { q: 'What is included in UPS position and commissioning in {loc}?', a: 'We handle equipment positioning, neutral/earth bonding, DC and AC terminations, display parameter tuning, bypass switching tests, and client operational briefings.' },
      { q: 'Do you provide freelance UPS engineers for third-party setups in {loc}?', a: 'Yes. We provide on-demand UPS Free Launcher Engineers to assist vendors, contractors, and IT managers across {loc} for startup and commissioning.' },
      { q: 'What UPS brands do you commission in {loc}?', a: 'We commission Vertiv (Liebert), Schneider/APC, Eaton, Numeric, Consul Neowatt, Delta, Socomec, and all leading Indian and international brands.' }
    ]
  },
  {
    slug: 'cable-laying-work',
    title: 'DC & AC Cable Laying Work',
    keyword: 'Cable Laying Work',
    icon: 'fa-cable-car',
    metaTitle: 'DC & AC Cable Laying Work in {loc} Chennai | Royal Power Solutions',
    metaDesc: 'Professional DC Cable Laying and AC power cabling in {loc}, Chennai for UPS & battery systems. Tray fabrication, conduit, hydraulic crimping, IR testing. Call 9787451828.',
    intro: 'Need professional DC cable laying or AC power cable installation in {loc}, Chennai? Royal Power Solutions calculates precise cable cross-sections, installs GI/perforated cable trays, pulls cables cleanly, and performs hydraulic lug crimping with insulation resistance (Megger) validation.',
    checklist: [
      'DC battery-to-UPS bus cabling up to 300 sq mm',
      'Inter-cell DC connector cabling & color-coded polarity tags',
      'AC input/output mains cabling & distribution boards',
      'GI conduit, PVC conduit & perforated cable tray laying',
      'Heavy-duty hydraulic lug crimping with heat-shrink sleeves',
      'Continuity, polarity, and insulation resistance (IR) test certificates'
    ],
    faqs: [
      { q: 'Why is correct DC cable sizing essential for battery rooms in {loc}?', a: 'Undersized cables cause high resistance, dangerous voltage drops, and severe heat buildup during battery discharge. We engineer cable gauges to guarantee zero overheating.' },
      { q: 'Do you supply cable trays and mounting brackets in {loc}?', a: 'Yes. We supply and install heavy-duty GI perforated trays, ladder trays, unistrut channels, and ceiling drop rods across {loc}.' },
      { q: 'Can you handle cable termination on existing live switchgear in {loc}?', a: 'Yes. Our licensed electricians execute planned shutdowns and safe terminations with calibrated torque wrenches and proper PPE.' }
    ]
  }
];

function generateHTML(srv, loc) {
  const isCity = loc.slug === 'chennai';
  const locName = isCity ? 'Chennai' : `${loc.name}, Chennai`;
  const locShort = loc.name;

  const title = srv.metaTitle.replace('{loc}', locShort);
  const desc = srv.metaDesc.replace('{loc}', locShort);
  const h1 = `${srv.title} in ${locName}`;
  const intro = srv.intro.replace(/{loc}/g, locShort);

  const checklistItems = srv.checklist.map(c => `<li><i class="fa-solid fa-check"></i> ${c.replace(/{loc}/g, locShort)}</li>`).join('\n            ');
  
  const faqItems = srv.faqs.map(f => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">${f.q.replace(/{loc}/g, locShort)} <span class="faq-question__icon"><i class="fa-solid fa-plus"></i></span></button>
          <div class="faq-answer"><p>${f.a.replace(/{loc}/g, locShort)}</p></div>
        </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://royalpowersolutions.in/${loc.slug}/${srv.slug}.html">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://royalpowersolutions.in/${loc.slug}/${srv.slug}.html">
  <meta property="og:image" content="https://royalpowersolutions.in/assets/rps-logo.jpeg">
  <meta property="og:site_name" content="Royal Power Solutions">
  <meta property="og:locale" content="en_IN">
  <link rel="icon" type="image/jpeg" href="../assets/rps-logo.jpeg">
  <link rel="apple-touch-icon" href="../assets/rps-logo.jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${srv.title} in ${locName}",
      "description": "${desc}",
      "provider": {
        "@type": "ElectricalContractor",
        "@id": "https://royalpowersolutions.in/#business",
        "name": "Royal Power Solutions",
        "telephone": "+919787451828"
      },
      "areaServed": {"@type": "AdministrativeArea", "name": "${locShort}, Chennai"}
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://royalpowersolutions.in/"},
        {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://royalpowersolutions.in/services.html"},
        {"@type": "ListItem", "position": 3, "name": "${srv.title}", "item": "https://royalpowersolutions.in/services/${srv.slug}.html"},
        {"@type": "ListItem", "position": 4, "name": "${locShort}", "item": "https://royalpowersolutions.in/${loc.slug}/${srv.slug}.html"}
      ]
    }
  ]
  </script>
</head>
<body>

  <div class="charge-bar" id="chargeBar" aria-hidden="true">
    <svg viewBox="0 0 40 400" preserveAspectRatio="none">
      <path class="charge-track" d="M20 0 L14 140 L26 150 L10 260 L20 400"/>
      <path class="charge-bolt" id="chargeBolt" d="M20 0 L14 140 L26 150 L10 260 L20 400"/>
    </svg>
  </div>

  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="../index.html" class="nav__brand" aria-label="Royal Power Solutions home">
        <img src="../assets/rps-logo.jpeg" alt="Royal Power Solutions logo" class="nav__logo" width="42" height="42">
        <span class="nav__brand-text">Royal Power <em>Solutions</em></span>
      </a>
      <nav class="nav__links" id="navLinks" aria-label="Primary navigation">
        <a href="../index.html" class="nav-link">Home</a>
        <a href="../about.html" class="nav-link">About Us</a>
        <a href="../services.html" class="nav-link">Services</a>
        <a href="../gallery.html" class="nav-link">Gallery</a>
        <a href="../contact.html" class="nav-link">Contact</a>
        <a href="../locations/chennai.html" class="nav-link">Our Areas</a>
      </nav>
      <div class="nav__actions">
        <a href="tel:+919787451828" class="btn btn--ghost-nav"><i class="fa-solid fa-phone"></i> 97874 51828</a>
        <a href="../contact.html" class="btn btn--gold">Get Quote</a>
      </div>
      <button class="nav__burger" id="navBurger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navLinks">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <section class="page-header">
    <div class="container">
      <nav aria-label="Breadcrumb" style="margin-bottom:16px;">
        <ol style="display:flex;gap:8px;list-style:none;color:rgba(255,255,255,0.6);font-size:0.82rem;flex-wrap:wrap;">
          <li><a href="../index.html" style="color:rgba(255,255,255,0.7);">Home</a></li>
          <li style="opacity:0.5;">/</li>
          <li><a href="../services.html" style="color:rgba(255,255,255,0.7);">Services</a></li>
          <li style="opacity:0.5;">/</li>
          <li><a href="../services/${srv.slug}.html" style="color:rgba(255,255,255,0.7);">${srv.title}</a></li>
          <li style="opacity:0.5;">/</li>
          <li style="color:var(--rps-gold);">${locShort}</li>
        </ol>
      </nav>
      <h1 data-reveal>${h1}</h1>
      <p data-reveal>${desc}</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+${encodeURIComponent(srv.title)}+in+${encodeURIComponent(locShort)}" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;background:#fff;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark"><i class="fa-solid ${srv.icon}"></i> Local Specialists in ${locShort}</p>
          <h2>Professional ${srv.title} in ${locName}</h2>
          <p>${intro}</p>
          <ul class="why__list" style="margin-top:24px;">
            ${checklistItems}
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Fast Service in ${locShort}</p>
          <h3 style="margin-bottom:12px;">Get a Direct Quote</h3>
          <p style="color:var(--text-muted);margin-bottom:20px;font-size:0.92rem;">We serve ${loc.area} with rapid on-site technician response.</p>
          <a href="tel:+919787451828" class="btn btn--gold" style="width:100%;justify-content:center;margin-bottom:12px;"><i class="fa-solid fa-phone"></i> Call 97874 51828</a>
          <a href="https://wa.me/919787451828?text=Hi%2C+I+need+quote+for+${encodeURIComponent(srv.title)}+in+${encodeURIComponent(locShort)}" target="_blank" rel="noopener" class="btn btn--outline" style="width:100%;justify-content:center;margin-bottom:12px;"><i class="fa-brands fa-whatsapp"></i> WhatsApp Us</a>
          <a href="../contact.html" class="btn" style="width:100%;justify-content:center;background:var(--rps-navy);color:#fff;"><i class="fa-solid fa-file-lines"></i> Send Enquiry</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Photo gallery preview -->
  <section style="padding:60px 0;background:var(--bg-soft);">
    <div class="container">
      <div style="text-align:center;margin-bottom:36px;" data-reveal>
        <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-images"></i> Work Evidence</p>
        <h2>Recent Execution &amp; Site Photos</h2>
      </div>
      <div class="gallery__grid" data-reveal>
        <div class="g-item" style="--i:0"><img src="../assets/WhatsApp Image 2026-10-27 at 6.45.03 PM.jpeg" alt="${srv.title} in ${locShort}" loading="lazy"><span class="g-item__label">Shifting Activity</span></div>
        <div class="g-item" style="--i:1"><img src="../assets/WhatsApp Image 2026-10-27 at 6.45.04 PM.jpeg" alt="UPS Commissioning in ${locShort}" loading="lazy"><span class="g-item__label">UPS Setup</span></div>
        <div class="g-item" style="--i:2"><img src="../assets/WhatsApp Image 2026-10-27 at 6.52.05 PM.jpeg" alt="Battery Commissioning in ${locShort}" loading="lazy"><span class="g-item__label">Battery Work</span></div>
        <div class="g-item" style="--i:3"><img src="../assets/WhatsApp Image 2026-10-27 at 6.52.12 PM.jpeg" alt="Cable Laying Work in ${locShort}" loading="lazy"><span class="g-item__label">Cable Laying</span></div>
      </div>
    </div>
  </section>

  <section class="faq" aria-label="FAQ">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;" data-reveal>
        <p class="eyebrow eyebrow--dark">Got Questions?</p>
        <h2>Frequently Asked Questions in ${locShort}</h2>
      </div>
      <div class="faq__grid" data-reveal>
        ${faqItems}
      </div>
    </div>
  </section>

  <!-- Other Areas Grid -->
  <section style="padding:60px 0;background:#fff;">
    <div class="container">
      <div style="text-align:center;margin-bottom:30px;" data-reveal>
        <p class="eyebrow eyebrow--dark">Area Coverage</p>
        <h2>${srv.title} Across Chennai</h2>
      </div>
      <div class="keyword-cloud" data-reveal>
        ${locations.map(l => `<a href="../${l.slug}/${srv.slug}.html" class="keyword-pill"><i class="fa-solid fa-location-dot"></i> ${l.name}</a>`).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section style="background:var(--rps-blue);padding:70px 0;color:#fff;text-align:center;" data-reveal>
    <div class="container">
      <h2 style="color:#fff;margin-bottom:14px;">Need ${srv.title} in ${locShort}?</h2>
      <p style="max-width:560px;margin:0 auto 24px;opacity:0.9;">Reach out to Royal Power Solutions today for fast local service and guaranteed expert workmanship.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a href="../contact.html" class="btn btn--gold btn--lg"><i class="fa-solid fa-bolt"></i> Get Free Quote</a>
        <a href="tel:+919787451828" class="btn btn--outline btn--lg" style="border-color:rgba(255,255,255,0.4);color:#fff;"><i class="fa-solid fa-phone"></i> Call 9787451828</a>
      </div>
    </div>
  </section>

  <footer class="footer" aria-label="Site footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <img src="../assets/rps-logo.jpeg" alt="Royal Power Solutions logo" class="footer__logo" width="56" height="56">
        <p>Powering homes, offices and industries across Chennai with dependable UPS systems and electrical services since 2016.</p>
        <div class="footer__socials">
          <a href="https://wa.me/919787451828" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          <a href="mailto:royalpowersolutionsinfo@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          <a href="tel:+919787451828" aria-label="Phone"><i class="fa-solid fa-phone"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Our Services</h4>
        <a href="../services/ups-sales-service.html">UPS Sales &amp; Service</a>
        <a href="../services/loading-unloading-shifting.html">Loading Unloading Shifting</a>
        <a href="../services/battery-commissioning.html">Battery Commissioning</a>
        <a href="../services/ups-commissioning-work.html">UPS Commissioning Work</a>
        <a href="../services/cable-laying-work.html">Cable Laying Work</a>
      </div>
      <div class="footer__col">
        <h4>Service Locations</h4>
        ${locations.map(l => `<a href="../${l.slug}/${srv.slug}.html">${l.name}</a>`).slice(0, 5).join('\n        ')}
      </div>
      <div class="footer__col">
        <h4>Contact Us</h4>
        <span><i class="fa-solid fa-location-dot"></i> No: 55/15, 69th Street, RV Nagar, Jafferkhanpet, Chennai - 600 083</span>
        <span><i class="fa-solid fa-phone"></i> <a href="tel:+919787451828">97874 51828</a></span>
        <span><i class="fa-solid fa-envelope"></i> <a href="mailto:royalpowersolutionsinfo@gmail.com">royalpowersolutionsinfo@gmail.com</a></span>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; Royal Power Solutions. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/919787451828" target="_blank" rel="noopener noreferrer" class="fab-wa" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
  <button class="scroll-top" id="scrollTopBtn" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
  <aside class="mobile-action-bar">
    <a href="tel:+919787451828" class="mobile-btn mobile-btn--call"><i class="fa-solid fa-phone"></i> Call 97874 51828</a>
    <a href="https://wa.me/919787451828?text=Hi%20Royal%20Power%20Solutions%2C%20I%20need%20service%20in%20${encodeURIComponent(locShort)}" target="_blank" rel="noopener noreferrer" class="mobile-btn mobile-btn--wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
  </aside>
  <script src="../js/script.js"></script>
</body>
</html>`;
}

let generated = 0;
const newUrls = [];

for (const loc of locations) {
  const dir = path.join(__dirname, loc.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const srv of newServices) {
    const filePath = path.join(dir, `${srv.slug}.html`);
    const html = generateHTML(srv, loc);
    fs.writeFileSync(filePath, html, 'utf8');
    generated++;
    newUrls.push(`https://royalpowersolutionsin/${loc.slug}/${srv.slug}.html`);
  }
}

console.log(`✅ Successfully generated ${generated} location-specific landing pages!`);

// Append to sitemap.xml if not already present
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  let addedToSitemap = 0;
  for (const loc of locations) {
    for (const srv of newServices) {
      const pageLoc = `https://royalpowersolutions.in/${loc.slug}/${srv.slug}.html`;
      if (!sitemap.includes(pageLoc)) {
        const entry = `  <url>\n    <loc>${pageLoc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n    <lastmod>2026-10-30</lastmod>\n  </url>\n`;
        sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
        addedToSitemap++;
      }
    }
  }
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`✅ Added ${addedToSitemap} new URLs to sitemap.xml!`);
}
