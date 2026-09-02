/**
 * Royal Power Solutions — Dedicated Service Pages Generator
 * Creates strong, unique SEO pages for each core service under /services/
 */
const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);

function navHTML() {
  return `
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
  </header>`;
}

function footerHTML(serviceLinks) {
  return `
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
        <h4>UPS Services</h4>
        <a href="ups-sales-service.html">UPS Sales &amp; Service</a>
        <a href="ups-repair-amc.html">UPS Repair &amp; AMC</a>
        <a href="ups-installation.html">UPS Installation</a>
        <a href="ups-shifting.html">UPS Shifting</a>
        <a href="battery-sales-service.html">Battery Sales &amp; Service</a>
      </div>
      <div class="footer__col">
        <h4>Other Services</h4>
        <a href="server-stabilizer.html">Server Stabilizers</a>
        <a href="isolation-transformer.html">Isolation Transformers</a>
        <a href="solar-installation.html">Solar Installation</a>
        <a href="electrical-work.html">Electrical Work</a>
      </div>
      <div class="footer__col">
        <h4>Contact Us</h4>
        <span><i class="fa-solid fa-location-dot"></i> No: 55/15, 69th Street, RV Nagar, Jafferkhanpet, Chennai - 600 083</span>
        <span><i class="fa-solid fa-phone"></i> <a href="tel:+919787451828">97874 51828</a></span>
        <span><i class="fa-solid fa-envelope"></i> <a href="mailto:royalpowersolutionsinfo@gmail.com">royalpowersolutionsinfo@gmail.com</a></span>
        <span><i class="fa-solid fa-file-invoice"></i> GST: 33CKUPB0081N2ZX</span>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; <span id="year"></span> Royal Power Solutions. All rights reserved.</p>
        <p class="footer__tagline"><i class="fa-solid fa-bolt"></i> Powered by expertise. Driven by trust.</p>
      </div>
    </div>
  </footer>`;
}

function ctaSection(serviceKeyword) {
  return `
  <section style="background:var(--rps-blue);padding:80px 0;color:#fff;text-align:center;position:relative;overflow:hidden;" data-reveal>
    <div class="container" style="position:relative;z-index:2;">
      <h2 style="color:#fff;font-size:clamp(1.8rem,3.5vw,2.6rem);margin-bottom:16px;">Need ${serviceKeyword} in Chennai?</h2>
      <p style="font-size:1.05rem;max-width:580px;margin:0 auto 28px;opacity:0.88;">Contact Royal Power Solutions for a free, no-obligation site visit and quotation anywhere in Chennai.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a href="../contact.html" class="btn btn--gold btn--lg"><i class="fa-solid fa-bolt"></i> Get Free Quote</a>
        <a href="tel:+919787451828" class="btn btn--outline btn--lg" style="border-color:rgba(255,255,255,0.3);color:#fff;"><i class="fa-solid fa-phone"></i> Call 9787451828</a>
        <a href="https://wa.me/919787451828" target="_blank" rel="noopener" class="btn btn--outline btn--lg" style="border-color:rgba(62,155,62,0.6);color:#fff;background:rgba(62,155,62,0.15);"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
    <i class="fa-solid fa-bolt" style="position:absolute;right:-5%;bottom:-20%;font-size:300px;opacity:0.05;transform:rotate(15deg);"></i>
  </section>`;
}

function pageShell(meta, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <link rel="canonical" href="${meta.canonical}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${meta.canonical}">
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
  ${meta.schema}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5CMBCKNPXL"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5CMBCKNPXL');</script>
</head>
<body>
  <div class="charge-bar" id="chargeBar" aria-hidden="true">
    <svg viewBox="0 0 40 400" preserveAspectRatio="none">
      <path class="charge-track" d="M20 0 L14 140 L26 150 L10 260 L20 400"/>
      <path class="charge-bolt" id="chargeBolt" d="M20 0 L14 140 L26 150 L10 260 L20 400"/>
    </svg>
  </div>
  ${navHTML()}
  ${content}
  ${footerHTML()}
  <a href="https://wa.me/919787451828" target="_blank" rel="noopener noreferrer" class="fab-wa" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
  <button class="scroll-top" id="scrollTopBtn" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
  <script src="../js/script.js"></script>
</body>
</html>`;
}

function breadcrumb(third) {
  return `
  <nav aria-label="Breadcrumb" style="margin-bottom:16px;">
    <ol style="display:flex;gap:8px;list-style:none;color:rgba(255,255,255,0.6);font-size:0.82rem;flex-wrap:wrap;">
      <li><a href="../index.html" style="color:rgba(255,255,255,0.7);">Home</a></li>
      <li style="opacity:0.5;">/</li>
      <li><a href="../services.html" style="color:rgba(255,255,255,0.7);">Services</a></li>
      <li style="opacity:0.5;">/</li>
      <li style="color:var(--rps-gold);">${third}</li>
    </ol>
  </nav>`;
}

function faqSection(title, faqs) {
  const items = faqs.map(f => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">${f.q} <span class="faq-question__icon"><i class="fa-solid fa-plus"></i></span></button>
          <div class="faq-answer"><p>${f.a}</p></div>
        </div>`).join('');
  return `
  <section class="faq" aria-label="${title} FAQ">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;" data-reveal>
        <p class="eyebrow eyebrow--dark">Frequently Asked Questions</p>
        <h2>${title}</h2>
      </div>
      <div class="faq__grid" data-reveal>${items}</div>
    </div>
  </section>`;
}

function locationLinksSection(slug, serviceTitle) {
  const locs = [
    {slug:'jafferkhanpet',name:'Jafferkhanpet'},
    {slug:'ashok-pillar',name:'Ashok Pillar'},
    {slug:'west-mambalam',name:'West Mambalam'},
    {slug:'guindy',name:'Guindy'},
    {slug:'saidapet',name:'Saidapet'},
    {slug:'chennai',name:'Greater Chennai'}
  ];
  const cards = locs.map(l => `
        <a href="../${l.slug}/${slug}.html" class="s-card s-card--cta" style="text-decoration:none;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <h3>${l.name}</h3><p style="color:rgba(255,255,255,0.7);">${serviceTitle} in ${l.name}</p>
        </a>`).join('');
  return `
  <section style="padding:80px 0;background:var(--rps-navy);color:#fff;">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;" data-reveal>
        <p class="eyebrow" style="color:var(--rps-gold);">Service Coverage</p>
        <h2 style="color:#fff;">${serviceTitle} Across Chennai</h2>
        <p style="color:rgba(255,255,255,0.7);">Our teams serve all major areas. Click your location for local information:</p>
      </div>
      <div class="services__grid" data-reveal>${cards}</div>
    </div>
  </section>`;
}

// ── PAGE DEFINITIONS ───────────────────────────────────────

const pages = [

  // ── UPS REPAIR & AMC ──────────────────────────────────────
  {
    filename: 'ups-repair-amc.html',
    meta: {
      title: 'UPS Repair & AMC in Chennai | All Brands | Royal Power Solutions',
      desc: 'Fast UPS repair for all brands and capacities in Chennai. Annual Maintenance Contracts with scheduled visits, battery checks and 24/7 emergency support. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/ups-repair-amc.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"UPS Repair and AMC","description":"Royal Power Solutions provides fast UPS repair for all brands and capacities across Chennai, plus Annual Maintenance Contracts with preventive maintenance and 24/7 emergency support.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"},"serviceType":"UPS Repair and Maintenance"},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"UPS Repair & AMC","item":"https://royalpowersolutions.in/services/ups-repair-amc.html"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you repair all brands of UPS in Chennai?","acceptedAnswer":{"@type":"Answer","text":"Yes. We repair all major UPS brands including APC, Emerson, Liebert, Numeric, Luminous, Sukam, Microtek and Delta — regardless of where they were purchased."}},{"@type":"Question","name":"What does a UPS AMC include?","acceptedAnswer":{"@type":"Answer","text":"Our UPS AMC includes quarterly preventive maintenance visits, battery health checks and load testing, cleaning and inspection of internal components, emergency call-outs with priority response, and detailed service reports after every visit."}},{"@type":"Question","name":"How quickly can you respond to a UPS breakdown in Chennai?","acceptedAnswer":{"@type":"Answer","text":"Our average emergency response time is under 60 minutes across Chennai. We maintain technician teams across multiple areas to ensure rapid response to UPS failures."}}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('UPS Repair &amp; AMC')}
      <h1 data-reveal>UPS Repair &amp; AMC in Chennai</h1>
      <p data-reveal>Fast UPS repair for all brands and capacities. Annual Maintenance Contracts with scheduled visits, battery health checks and 24/7 emergency breakdown support across Chennai.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now — Emergency Support</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+UPS+repair+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">24/7 UPS Repair Experts</p>
          <h2>UPS Repair Service in Chennai — All Brands, All Capacities</h2>
          <p>When your UPS fails, every minute counts. Royal Power Solutions provides fast, reliable UPS repair services across Chennai for all brands and capacities from 1KVA to 1000KVA. Our technicians carry common spare parts to minimise downtime. We diagnose faults, replace components and restore your UPS to full working order — with a service warranty on all repairs.</p>
          <p style="margin-top:16px;">Common UPS issues we repair include: battery failures, blown fuses, failed IGBT modules, transformer faults, control board failures, fan replacements and display/communication issues.</p>
          <ul class="why__list" style="margin-top:24px;">
            <li><i class="fa-solid fa-check"></i> All brands repaired — APC, Emerson, Numeric, Luminous, Sukam, Delta</li>
            <li><i class="fa-solid fa-check"></i> Genuine spare parts used</li>
            <li><i class="fa-solid fa-check"></i> Service warranty on all repairs</li>
            <li><i class="fa-solid fa-check"></i> On-site repair wherever possible</li>
            <li><i class="fa-solid fa-check"></i> Emergency response under 60 minutes</li>
            <li><i class="fa-solid fa-check"></i> Post-repair testing and documentation</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">AMC Packages</p>
          <h3 style="font-size:1.2rem;margin-bottom:16px;">Annual Maintenance Contract</h3>
          <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px;">
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:4px solid var(--rps-gold);">
              <p style="font-weight:700;color:var(--rps-navy);margin-bottom:4px;">Basic AMC</p>
              <p style="font-size:0.9rem;color:var(--text-muted);">2 PM visits/year · Battery check · Emergency support</p>
              <p style="font-size:1.1rem;font-weight:700;color:var(--rps-blue);margin-top:6px;">From ₹2,999/year</p>
            </div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:4px solid var(--rps-blue);">
              <p style="font-weight:700;color:var(--rps-navy);margin-bottom:4px;">Comprehensive AMC</p>
              <p style="font-size:0.9rem;color:var(--text-muted);">4 PM visits/year · Priority support · Parts discount · Reports</p>
              <p style="font-size:1.1rem;font-weight:700;color:var(--rps-blue);margin-top:6px;">From ₹5,999/year</p>
            </div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;">Get AMC Quote</a>
        </div>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;background:var(--bg-soft);">
    <div class="container">
      <div style="text-align:center;margin-bottom:50px;" data-reveal>
        <p class="eyebrow eyebrow--dark">What's Included</p>
        <h2>What Does Our UPS AMC Cover?</h2>
      </div>
      <div class="services__grid" data-reveal>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-calendar-check"></i></div><h3>Scheduled PM Visits</h3><p>Quarterly (or bi-annual) preventive maintenance visits to clean, inspect and test your UPS before problems occur.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-battery-full"></i></div><h3>Battery Health Monitoring</h3><p>Battery internal resistance testing, capacity checks and runtime verification at every visit to catch failures early.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-bolt"></i></div><h3>Priority Emergency Response</h3><p>AMC clients get priority dispatch with under 60-minute response time across Chennai for breakdown emergencies.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-tag"></i></div><h3>Discounted Spare Parts</h3><p>Batteries, fuses, fans, capacitors and modules supplied at preferential pricing for AMC customers.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-file-lines"></i></div><h3>Detailed Service Reports</h3><p>Written service report after every PM visit documenting the UPS health status, actions taken and recommendations.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-phone"></i></div><h3>Dedicated Support Line</h3><p>Direct WhatsApp/call access to a dedicated technician for technical queries — no waiting in queues.</p></div>
      </div>
    </div>
  </section>

  ${faqSection('UPS Repair & AMC Questions', [
    {q:'Do you repair all brands of UPS in Chennai?', a:'Yes. We repair all major brands — APC, Emerson, Liebert, Numeric, Luminous, Sukam, Microtek, Delta and more — regardless of where they were purchased.'},
    {q:'What does a UPS AMC include?', a:'Our AMC includes quarterly PM visits, battery health checks, cleaning, inspection, emergency call-outs with priority response, and detailed service reports. Basic plans start from ₹2,999/year.'},
    {q:'How quickly can you respond to a UPS breakdown in Chennai?', a:'Our average emergency response time is under 60 minutes across Chennai. AMC clients get priority dispatch.'},
    {q:'Do you offer on-site UPS repair in Chennai?', a:'Yes. In most cases our technicians carry sufficient spares to repair common faults on-site. We only take units to our workshop when specialist equipment is required.'},
    {q:'Is there a service warranty on UPS repairs?', a:'Yes. All repairs carried out by Royal Power Solutions come with a 90-day service warranty on parts and labour.'}
  ])}

  ${locationLinksSection('ups-repair-amc', 'UPS Repair &amp; AMC')}
  ${ctaSection('UPS Repair & AMC')}`
  },

  // ── UPS INSTALLATION ──────────────────────────────────────
  {
    filename: 'ups-installation.html',
    meta: {
      title: 'UPS Installation & Commissioning in Chennai | Royal Power Solutions',
      desc: 'Professional UPS installation and commissioning in Chennai for 1KVA to 1000KVA. Site survey, wiring, load testing, commissioning certificate. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/ups-installation.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"UPS Installation and Commissioning","description":"Royal Power Solutions provides professional UPS installation and commissioning across Chennai for 1KVA to 1000KVA UPS systems. Includes site survey, wiring, load testing and commissioning certificate.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"UPS Installation","item":"https://royalpowersolutions.in/services/ups-installation.html"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does UPS installation take?","acceptedAnswer":{"@type":"Answer","text":"A 1-10KVA installation typically takes 2-4 hours. Larger 50-100KVA systems take a full day. Industrial 200KVA+ systems may take 2-3 days including commissioning."}},{"@type":"Question","name":"Do you provide a commissioning certificate?","acceptedAnswer":{"@type":"Answer","text":"Yes. After installation we perform full load testing and provide a commissioning report and certificate which is required for the manufacturer warranty to be valid."}},{"@type":"Question","name":"Is a site survey done before installation?","acceptedAnswer":{"@type":"Answer","text":"Yes, always. We conduct a free site survey to assess load requirements, cable routing, earthing quality and space requirements before any installation."}}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('UPS Installation &amp; Commissioning')}
      <h1 data-reveal>UPS Installation &amp; Commissioning in Chennai</h1>
      <p data-reveal>Professional installation for 1KVA to 1000KVA UPS systems. Complete site survey, wiring, load testing and commissioning certificate included.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+UPS+installation+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">Certified UPS Installers</p>
          <h2>End-to-End UPS Installation &amp; Commissioning in Chennai</h2>
          <p>Royal Power Solutions handles the complete UPS installation process — from initial site survey and cable routing to bypass panel wiring, earthing, battery interconnection and commissioning. Our certified technicians install all capacities from 1KVA for home office use to 1000KVA for industrial and data centre applications, following Indian electrical standards throughout.</p>
          <p style="margin-top:16px;">Every installation includes a commissioning report documenting input/output voltage, battery string voltage, load transfer testing and alarm verification — required by most manufacturers for the warranty to remain valid.</p>
          <ul class="why__list" style="margin-top:24px;">
            <li><i class="fa-solid fa-check"></i> Free site survey before every installation</li>
            <li><i class="fa-solid fa-check"></i> Earth pit installation if required</li>
            <li><i class="fa-solid fa-check"></i> MCB and bypass switch wiring</li>
            <li><i class="fa-solid fa-check"></i> Battery interconnection and string configuration</li>
            <li><i class="fa-solid fa-check"></i> Full load testing after installation</li>
            <li><i class="fa-solid fa-check"></i> Commissioning certificate and handover documentation</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Our Installation Process</p>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;gap:14px;align-items:flex-start;">
              <div style="background:var(--rps-gold);color:#000;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div>
              <div><strong>Free Site Survey</strong><p style="font-size:0.9rem;color:var(--text-muted);margin:4px 0 0;">Load assessment, cable routing, earthing check</p></div>
            </div>
            <div style="display:flex;gap:14px;align-items:flex-start;">
              <div style="background:var(--rps-gold);color:#000;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div>
              <div><strong>Quotation & Approval</strong><p style="font-size:0.9rem;color:var(--text-muted);margin:4px 0 0;">Clear itemised quote — no work without your approval</p></div>
            </div>
            <div style="display:flex;gap:14px;align-items:flex-start;">
              <div style="background:var(--rps-gold);color:#000;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</div>
              <div><strong>Installation</strong><p style="font-size:0.9rem;color:var(--text-muted);margin:4px 0 0;">Wiring, battery setup, earthing, cable management</p></div>
            </div>
            <div style="display:flex;gap:14px;align-items:flex-start;">
              <div style="background:var(--rps-gold);color:#000;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">4</div>
              <div><strong>Commissioning & Handover</strong><p style="font-size:0.9rem;color:var(--text-muted);margin:4px 0 0;">Load testing, documentation, training on operation</p></div>
            </div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:24px;">Book Site Survey</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('UPS Installation Questions', [
    {q:'How long does UPS installation take?', a:'A 1–10KVA installation typically takes 2–4 hours. Larger 50–100KVA systems take a full day. Industrial 200KVA+ systems may take 2–3 days including commissioning.'},
    {q:'Do you provide a commissioning certificate?', a:'Yes. After installation we perform full load testing and provide a commissioning report required for the manufacturer warranty to be valid.'},
    {q:'Is a site survey done before installation?', a:'Yes, always. We conduct a free site survey to assess load, cable routing, earthing quality and space requirements before every installation.'},
    {q:'Can you install a UPS in an existing server room?', a:'Yes. We can integrate a UPS into your existing electrical setup with minimal downtime. We plan the changeover carefully, often working during off-peak hours.'},
    {q:'Do you provide UPS installation for industries in Chennai?', a:'Yes. We install industrial 3-phase UPS systems from 10KVA to 1000KVA for factories, hospitals, data centres and process industries across Chennai.'}
  ])}

  ${locationLinksSection('ups-installation', 'UPS Installation')}
  ${ctaSection('UPS Installation')}`
  },

  // ── BATTERY SALES & SERVICE ───────────────────────────────
  {
    filename: 'battery-sales-service.html',
    meta: {
      title: 'UPS Battery Sales & Service in Chennai | Amron, Exide | Royal Power Solutions',
      desc: 'Genuine Amron, Exide, Luminous and Lithium Ion UPS batteries in Chennai. Fast replacement, load testing, old battery pickup. Call 9787451828 for same-day service.',
      canonical: 'https://royalpowersolutions.in/services/battery-sales-service.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"UPS Battery Sales and Service","description":"Royal Power Solutions stocks and supplies original Amron, Exide, Luminous, Lithium Ion UPS batteries in Chennai with fast replacement and load testing service.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"Battery Sales & Service","item":"https://royalpowersolutions.in/services/battery-sales-service.html"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which battery brands do you stock in Chennai?","acceptedAnswer":{"@type":"Answer","text":"We stock Amron, Exide, Luminous, Okaya, Sukam and Lithium Ion (LiFePO4) batteries for all types of UPS and inverter systems. All are original, from authorised distributors."}},{"@type":"Question","name":"How do I know if my UPS battery needs replacement?","acceptedAnswer":{"@type":"Answer","text":"Signs include reduced backup time, persistent battery alarm, battery swelling or leakage, and the charger LED staying on continuously. We offer free battery load tests to confirm."}},{"@type":"Question","name":"Do you collect old batteries when delivering new ones?","acceptedAnswer":{"@type":"Answer","text":"Yes. We collect your old batteries for proper disposal through authorised recycling channels when we deliver new batteries."}}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('Battery Sales &amp; Service')}
      <h1 data-reveal>UPS Battery Sales &amp; Service in Chennai</h1>
      <p data-reveal>Original Amron, Exide, Luminous and Lithium Ion batteries for all UPS and inverter systems. Fast replacement, load testing and old battery disposal across Chennai.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+UPS+battery+replacement+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">Authorised Battery Supplier</p>
          <h2>Genuine UPS &amp; Inverter Batteries — Chennai's Trusted Source</h2>
          <p>Royal Power Solutions stocks a wide range of genuine UPS and inverter batteries for all system sizes. We are authorised suppliers for Amron, Exide, Luminous and Okaya batteries — every unit comes with the manufacturer's warranty card. Our technicians also provide battery health assessments to help you decide when replacement is genuinely needed.</p>
          <h3 style="margin-top:28px;font-size:1.1rem;">Brands We Supply</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 24px;">
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Amron</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Exide</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Luminous</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Okaya</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Sukam</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> LiFePO4 Lithium Ion</span>
          </div>
          <ul class="why__list">
            <li><i class="fa-solid fa-check"></i> Original batteries from authorised distributors</li>
            <li><i class="fa-solid fa-check"></i> VRLA, tubular and lithium ion options</li>
            <li><i class="fa-solid fa-check"></i> Free battery load test and health assessment</li>
            <li><i class="fa-solid fa-check"></i> Same-day delivery in most Chennai areas</li>
            <li><i class="fa-solid fa-check"></i> Old battery collection for safe recycling</li>
            <li><i class="fa-solid fa-check"></i> Warranty-backed replacement</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Signs Your Battery Needs Replacing</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--rps-gold);"></i> <strong>Backup time has reduced significantly</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--rps-gold);"></i> <strong>UPS beeps constantly or shows battery alarm</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--rps-gold);"></i> <strong>Battery is swollen, leaking or hot</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--rps-gold);"></i> <strong>Charger light stays on continuously</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--rps-gold);"></i> <strong>Battery is 4+ years old (VRLA)</strong></p></div>
          </div>
          <a href="https://wa.me/919787451828?text=Hi%2C+I+need+a+free+battery+health+check" target="_blank" rel="noopener" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;"><i class="fa-brands fa-whatsapp"></i> Book Free Battery Test</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('UPS Battery Questions', [
    {q:'Which battery brands do you stock in Chennai?', a:'We stock Amron, Exide, Luminous, Okaya and Sukam VRLA batteries, plus Lithium Ion LiFePO4 battery packs. All are original, sourced from authorised distributors with manufacturer warranty.'},
    {q:'How do I know if my UPS battery needs replacement?', a:'Signs include reduced backup time, persistent battery alarm, battery swelling or leakage, and the charger LED staying on continuously. We offer a free battery load test to confirm before you spend money on replacement.'},
    {q:'Do you collect old batteries when delivering new ones?', a:'Yes. We collect old batteries for proper disposal through authorised recycling channels when we deliver new batteries — at no extra charge.'},
    {q:'How long do UPS batteries last in Chennai?', a:'VRLA sealed lead-acid batteries typically last 3–5 years. In Chennai\'s hot climate, battery life can be shorter without proper air conditioning in the UPS room. Lithium Ion batteries last 8–15 years.'},
    {q:'Can you replace batteries in a 3-phase industrial UPS in Chennai?', a:'Yes. We supply and replace 2V VRLA cells used in industrial UPS battery strings, complete with string balancing and capacity testing after replacement.'}
  ])}

  ${locationLinksSection('battery-sales-service', 'Battery Sales &amp; Service')}
  ${ctaSection('Battery Sales & Service')}`
  },

  // ── SERVER STABILIZER ──────────────────────────────────────
  {
    filename: 'server-stabilizer.html',
    meta: {
      title: 'Server Stabilizer in Chennai | 1KVA–50KVA Servo Stabilizers | Royal Power Solutions',
      desc: 'Servo voltage stabilizers for server rooms in Chennai. 1KVA, 3KVA, 5KVA, 7.5KVA, 10KVA to 50KVA. Sales, installation, repair and AMC. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/server-stabilizer.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"Server Stabilizer Sales, Installation and Service","description":"Royal Power Solutions supplies and services servo voltage stabilizers from 1KVA to 50KVA for server rooms, hospitals and industries across Chennai.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"Server Stabilizer","item":"https://royalpowersolutions.in/services/server-stabilizer.html"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What KVA server stabilizer do I need?","acceptedAnswer":{"@type":"Answer","text":"The KVA rating should be 1.25x your total server load in watts. For 2-3 servers, a 5KVA unit is usually sufficient. Our technician will calculate the exact size during a free site visit."}},{"@type":"Question","name":"Can you repair any brand of server stabilizer in Chennai?","acceptedAnswer":{"@type":"Answer","text":"Yes. We repair all brands including Servomax, V-Guard, Microtek and locally wound units — regardless of where they were purchased."}},{"@type":"Question","name":"Do server stabilizers need regular servicing?","acceptedAnswer":{"@type":"Answer","text":"Yes. We recommend a full service every 6 months covering brush replacement, winding check, voltage calibration and cleaning."}}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('Server Stabilizers')}
      <h1 data-reveal>Server Stabilizer in Chennai — 1KVA to 50KVA</h1>
      <p data-reveal>Servo voltage stabilizers for IT server rooms, hospitals and industries. Sales, installation, repair and AMC across Chennai. All capacities from 1KVA to 50KVA.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+a+server+stabilizer+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">Servo Stabilizer Experts</p>
          <h2>Server Stabilizers — Protecting Your IT Infrastructure in Chennai</h2>
          <p>Voltage fluctuations are a serious threat to servers, networking equipment and sensitive IT infrastructure. A servo voltage stabilizer maintains a constant output voltage (±1% regulation accuracy) regardless of input voltage variations, protecting your equipment from damage. Royal Power Solutions supplies, installs and services servo stabilizers in 1, 3, 5, 7.5, 10, 15, 20, 30 and 50KVA capacities for data centres, offices, hospitals, diagnostic centres and industrial setups across Chennai.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin:24px 0;">
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 1 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 3 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 5 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 7.5 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 10 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 15 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 20 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 30 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 50 KVA</span>
          </div>
          <ul class="why__list">
            <li><i class="fa-solid fa-check"></i> ±1% voltage regulation accuracy</li>
            <li><i class="fa-solid fa-check"></i> Oil-cooled and air-cooled variants</li>
            <li><i class="fa-solid fa-check"></i> Over-voltage and under-voltage cut-off</li>
            <li><i class="fa-solid fa-check"></i> Suitable for single-phase and 3-phase loads</li>
            <li><i class="fa-solid fa-check"></i> Digital display and automatic bypass</li>
            <li><i class="fa-solid fa-check"></i> Custom specifications available</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Applications</p>
          <h3 style="font-size:1.2rem;margin-bottom:16px;">Who Uses Server Stabilizers?</h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-server" style="color:var(--rps-blue);"></i> <strong>IT Server Rooms &amp; Data Centres</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-hospital" style="color:var(--rps-blue);"></i> <strong>Hospitals &amp; Diagnostic Centres</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-flask" style="color:var(--rps-blue);"></i> <strong>Laboratories &amp; Research Facilities</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-industry" style="color:var(--rps-blue);"></i> <strong>CNC Machines &amp; Industrial Equipment</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-building" style="color:var(--rps-blue);"></i> <strong>Commercial Offices</strong></p></div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;">Get Free Quote</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('Server Stabilizer Questions', [
    {q:'What KVA server stabilizer do I need?', a:'The KVA rating should be 1.25× your total server load in watts. For 2–3 servers, a 5KVA unit is usually sufficient. For larger setups with multiple racks, 15–30KVA may be needed. Our technician will calculate the exact size during a free site visit.'},
    {q:'Can you repair any brand of server stabilizer in Chennai?', a:'Yes. We repair all brands including Servomax, V-Guard, Microtek and locally wound units — regardless of where they were purchased or installed.'},
    {q:'Do server stabilizers need regular servicing?', a:'Yes. We recommend a full service every 6 months covering brush and carbon inspection, winding resistance check, voltage calibration and cleaning.'},
    {q:'What is the difference between oil-cooled and air-cooled stabilizers?', a:'Air-cooled stabilizers are suitable for most office and server room environments. Oil-cooled units handle higher ambient temperatures and are used in outdoor enclosures or hot industrial environments. We\'ll recommend the right type for your application.'},
    {q:'Can you supply a 3-phase server stabilizer in Chennai?', a:'Yes. We supply and install single-phase stabilizers from 1–50KVA and 3-phase stabilizers for larger server room and industrial applications. Call us with your load details for a quote.'}
  ])}

  ${locationLinksSection('server-stabilizer', 'Server Stabilizers')}
  ${ctaSection('Server Stabilizers')}`
  },

  // ── ISOLATION TRANSFORMER ─────────────────────────────────
  {
    filename: 'isolation-transformer.html',
    meta: {
      title: 'Isolation Transformer in Chennai | Sales, Installation & Service | Royal Power Solutions',
      desc: 'Faraday-shielded isolation transformers for hospitals, IT rooms and industries in Chennai. Custom winding, installation and AMC. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/isolation-transformer.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"Isolation Transformer Sales, Installation and Service","description":"Royal Power Solutions provides Faraday-shielded isolation transformers for hospitals, IT infrastructure and industries in Chennai. Services include sales, custom winding, installation and ongoing maintenance.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"Isolation Transformers","item":"https://royalpowersolutions.in/services/isolation-transformer.html"}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('Isolation Transformers')}
      <h1 data-reveal>Isolation Transformer Sales, Installation &amp; Service in Chennai</h1>
      <p data-reveal>Faraday-shielded isolation transformers for hospitals, server rooms, laboratories and industrial applications. Custom winding, professional installation and AMC in Chennai.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+an+isolation+transformer+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">Isolation Transformer Specialists</p>
          <h2>Isolation Transformers for Hospitals, IT &amp; Industry in Chennai</h2>
          <p>An isolation transformer electrically separates the primary (supply) and secondary (load) circuits, eliminating earth loops, reducing electrical noise and protecting sensitive equipment from surges and transients. Royal Power Solutions supplies and installs Faraday-shielded isolation transformers for hospitals (medical IT networks), data centres, CNC machines, laboratories and industrial equipment across Chennai.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin:24px 0;">
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 1 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 2 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 5 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 10 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 20 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 50 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 100 KVA</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> Custom</span>
          </div>
          <ul class="why__list">
            <li><i class="fa-solid fa-check"></i> Faraday electrostatic shield for noise rejection</li>
            <li><i class="fa-solid fa-check"></i> Custom voltage ratios available</li>
            <li><i class="fa-solid fa-check"></i> IP44 and IP55 enclosures available</li>
            <li><i class="fa-solid fa-check"></i> Thermal and over-current protection</li>
            <li><i class="fa-solid fa-check"></i> Test certificates and documentation</li>
            <li><i class="fa-solid fa-check"></i> Repair and rewinding service for existing units</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Why Use an Isolation Transformer?</p>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;margin:0;"><strong>Hospitals:</strong> Creates safe IT (Isolated Terra) electrical networks protecting patients from leakage current.</p></div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;margin:0;"><strong>IT Rooms:</strong> Eliminates earth loops and common-mode noise that cause data errors and equipment failures.</p></div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;margin:0;"><strong>Laboratories:</strong> Provides clean, interference-free power for sensitive measurement instruments.</p></div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:3px solid var(--rps-gold);"><p style="font-size:0.95rem;margin:0;"><strong>Industry:</strong> Protects CNC machines, PLCs and automation equipment from supply-side faults.</p></div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;">Get Free Quote</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('Isolation Transformer Questions', [
    {q:'Why do hospitals need isolation transformers?', a:'Hospitals use isolation transformers to create IT (Isolated Terra) medical electrical networks. This prevents earth leakage currents from reaching patients connected to life-support or monitoring equipment — a patient safety requirement.'},
    {q:'What size isolation transformer do I need?', a:'The KVA should be 1.25× your total load in watts. Our engineer will calculate the exact size during a free site visit, considering load type, harmonic content and duty cycle.'},
    {q:'Can you repair an existing isolation transformer in Chennai?', a:'Yes. We rewind burnt coils, replace cores and repair all types of isolation transformers. We will advise whether repair or replacement is more economical for your specific unit.'},
    {q:'Do you supply custom-wound isolation transformers?', a:'Yes. We wind custom isolation transformers to your exact voltage ratio, KVA, frequency, enclosure and shielding requirements. Typical delivery is 7–14 days from order.'},
    {q:'Do isolation transformers need maintenance?', a:'Yes. Annual inspection of insulation resistance, connection tightness, cooling and thermal performance is recommended. We offer AMC for isolation transformers across Chennai.'}
  ])}

  ${locationLinksSection('isolation-transformer-installation', 'Isolation Transformers')}
  ${ctaSection('Isolation Transformers')}`
  },

  // ── SOLAR INSTALLATION ────────────────────────────────────
  {
    filename: 'solar-installation.html',
    meta: {
      title: 'Solar Panel Installation in Chennai | On-Grid, Off-Grid, Hybrid | Royal Power Solutions',
      desc: 'Solar panel installation in Chennai for homes, offices and industries. On-grid, off-grid and hybrid systems. TANGEDCO net metering. Subsidy guidance. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/solar-installation.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"Solar Panel Installation","description":"Royal Power Solutions installs residential and commercial solar PV systems across Chennai. On-grid, off-grid and hybrid solar with TANGEDCO net metering assistance and subsidy guidance.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"Solar Installation","item":"https://royalpowersolutions.in/services/solar-installation.html"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does solar installation cost in Chennai?","acceptedAnswer":{"@type":"Answer","text":"A 3kW on-grid residential solar system in Chennai costs approximately ₹1.5 to ₹2.2 lakhs before subsidy. After the Tamil Nadu government subsidy, the net cost can reduce significantly. We provide detailed quotes after a free site survey."}},{"@type":"Question","name":"Can I get TANGEDCO net metering in Chennai?","acceptedAnswer":{"@type":"Answer","text":"Yes. We assist with the complete TANGEDCO net metering application. Once approved, excess solar energy exported to the grid is credited to your electricity bill."}},{"@type":"Question","name":"How long does solar installation take?","acceptedAnswer":{"@type":"Answer","text":"A residential 1-5kWp system is installed in 1-2 days. Commercial systems typically take 3-7 days depending on system size."}}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('Solar Panel Installation')}
      <h1 data-reveal>Solar Panel Installation in Chennai</h1>
      <p data-reveal>On-grid, off-grid and hybrid solar systems for homes, offices and industries. TANGEDCO net metering assistance, subsidy guidance and complete installation service.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+solar+panel+installation+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">MNRE Approved Installer</p>
          <h2>Solar Panel Installation in Chennai — Complete End-to-End Service</h2>
          <p>Royal Power Solutions designs and installs solar photovoltaic (PV) systems for homes, commercial buildings, factories and institutions across Chennai. With rising electricity tariffs in Tamil Nadu, solar power offers excellent returns — typically recovering installation costs within 4–6 years. We handle everything from the initial site survey and system design to installation, TANGEDCO interconnection application and net metering setup.</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin:24px 0;">
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 1 kWp (Home)</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 3 kWp</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 5 kWp</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 10 kWp</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 20 kWp</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 50 kWp</span>
            <span class="amc-badge"><i class="fa-solid fa-check"></i> 100 kWp+</span>
          </div>
          <ul class="why__list">
            <li><i class="fa-solid fa-check"></i> Tier-1 solar panels with 25-year performance warranty</li>
            <li><i class="fa-solid fa-check"></i> On-grid, off-grid and hybrid systems</li>
            <li><i class="fa-solid fa-check"></i> TANGEDCO net metering application assistance</li>
            <li><i class="fa-solid fa-check"></i> Tamil Nadu government subsidy guidance</li>
            <li><i class="fa-solid fa-check"></i> Remote monitoring via mobile app</li>
            <li><i class="fa-solid fa-check"></i> Annual maintenance contracts available</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Solar System Types</p>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:4px solid var(--rps-gold);">
              <p style="font-weight:700;color:var(--rps-navy);margin-bottom:4px;">On-Grid Solar</p>
              <p style="font-size:0.9rem;color:var(--text-muted);">Connected to TANGEDCO grid. Export excess power. Net metering credits. No battery needed. Best ROI.</p>
            </div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:4px solid var(--rps-blue);">
              <p style="font-weight:700;color:var(--rps-navy);margin-bottom:4px;">Off-Grid Solar</p>
              <p style="font-size:0.9rem;color:var(--text-muted);">Fully independent. Battery storage. Best for areas with unreliable grid supply.</p>
            </div>
            <div style="padding:16px;background:#fff;border-radius:12px;border-left:4px solid #22c55e;">
              <p style="font-weight:700;color:var(--rps-navy);margin-bottom:4px;">Hybrid Solar</p>
              <p style="font-size:0.9rem;color:var(--text-muted);">Grid-connected with battery backup. Best of both worlds — export to grid and power outage protection.</p>
            </div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;"><i class="fa-solid fa-solar-panel"></i> Get Solar Quote</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('Solar Installation Questions', [
    {q:'How much does solar installation cost in Chennai?', a:'A 3kW on-grid residential solar system in Chennai costs approximately ₹1.5 to ₹2.2 lakhs before subsidy. After the Tamil Nadu government subsidy, the net cost reduces significantly for residential installations. We provide detailed quotes after a free site survey.'},
    {q:'Can I get TANGEDCO net metering in Chennai?', a:'Yes. We assist with the complete TANGEDCO net metering application. Once approved, excess solar energy exported to the grid is credited to your electricity bill, effectively reducing it to near zero for well-sized systems.'},
    {q:'How long does solar installation take?', a:'A residential 1–5kWp system is typically installed in 1–2 days. Commercial systems of 20–100kWp take 3–7 days. We will give you an exact timeline after the site survey.'},
    {q:'What solar panel brands do you install?', a:'We install Tier-1 solar panels from leading manufacturers with 25-year performance warranties. Panel selection is based on your budget, roof type and orientation — we will recommend the best option for your situation.'},
    {q:'Do you provide solar system maintenance in Chennai?', a:'Yes. We offer annual solar maintenance contracts covering panel cleaning, inverter health check, cable inspection and performance reporting to ensure your system maintains maximum output.'}
  ])}

  ${locationLinksSection('solar-installation', 'Solar Installation')}
  ${ctaSection('Solar Panel Installation')}`
  },

  // ── ELECTRICAL WORK ───────────────────────────────────────
  {
    filename: 'electrical-work.html',
    meta: {
      title: 'All Kinds of Electrical Work in Chennai | Licensed Contractors | Royal Power Solutions',
      desc: 'Complete electrical services in Chennai — house wiring, office wiring, industrial wiring, MCB boards, AC panels. GST-registered, transparent pricing. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/electrical-work.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"All Kinds of Electrical Work","description":"Royal Power Solutions provides all types of electrical work in Chennai including house wiring, office wiring, industrial wiring, MCB board installation, AC panels and more. GST-registered electrical contractor.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"Electrical Work","item":"https://royalpowersolutions.in/services/electrical-work.html"}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('All Kinds of Electrical Work')}
      <h1 data-reveal>All Kinds of Electrical Work in Chennai</h1>
      <p data-reveal>Complete electrical services for homes, offices and industries — house wiring, MCB boards, AC panels and more. GST-registered contractor. Transparent, itemised pricing.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+electrical+work+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div style="text-align:center;margin-bottom:50px;" data-reveal>
        <p class="eyebrow eyebrow--dark">Licensed Electrical Contractor</p>
        <h2>Electrical Services for Homes, Offices &amp; Industries in Chennai</h2>
        <p style="max-width:640px;margin:0 auto;color:var(--text-muted);">Royal Power Solutions is a GST-registered (33CKUPB0081N2ZX) electrical contractor serving Chennai since 2016. Our licensed electricians work to Indian electrical standards with clean workmanship and transparent, itemised pricing.</p>
      </div>
      <div class="services__grid" data-reveal>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-house"></i></div><h3>Residential Wiring</h3><p>New house wiring, rewiring of old buildings, additional points, MCB board upgrades and ELCB/RCCB installation for home safety.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-building"></i></div><h3>Commercial Wiring</h3><p>Office and shop fit-out wiring, data and network point installation, 3-phase distribution, power factor correction panels.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-industry"></i></div><h3>Industrial Wiring</h3><p>Factory and plant wiring, machine point installation, cable tray and conduit routing, industrial distribution panels (MCC/PCC).</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-square-poll-vertical"></i></div><h3>MCB &amp; Distribution Boards</h3><p>Supply and installation of single-phase and 3-phase MCB boards, sub-distribution boards and main LT panels.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-bolt"></i></div><h3>AC Panel Work</h3><p>AC electrical panel design, supply, installation, testing and servicing including MCC, PCC and capacitor panels.</p></div>
        <div class="s-card"><div class="s-card__icon"><i class="fa-solid fa-magnifying-glass"></i></div><h3>Fault Finding &amp; Repair</h3><p>Emergency electrical fault diagnosis and repair — short circuits, earth faults, overloaded circuits and tripping breakers.</p></div>
      </div>
    </div>
  </section>

  ${faqSection('Electrical Work Questions', [
    {q:'Do you rewire old houses in Chennai?', a:'Yes. We specialise in complete rewiring of old houses and apartments in Chennai using modern copper wiring with proper conduit and MCB protection. Old aluminium wiring is a fire risk.'},
    {q:'Can you install a 3-phase connection for my business?', a:'Yes. We handle 3-phase wiring for offices, workshops and factories in Chennai including the main panel, sub-distribution boards and machine point wiring.'},
    {q:'Are your electricians licensed to work in Chennai?', a:'Yes. Our electricians hold valid electrical competency certificates and our company is GST-registered (33CKUPB0081N2ZX). We issue proper tax invoices for all electrical work.'},
    {q:'Do you provide emergency electrical repair in Chennai?', a:'Yes. We provide 24/7 emergency electrical fault repair across Chennai. Call 9787451828 for emergencies — our team will respond as quickly as possible.'},
    {q:'Do you provide itemised quotations before starting work?', a:'Always. We never start work without providing a clear, itemised quotation and getting your approval. No hidden charges, no surprises.'}
  ])}

  ${locationLinksSection('electrical-work', 'Electrical Work')}
  ${ctaSection('Electrical Work')}`
  },

  // ── UPS SHIFTING ──────────────────────────────────────────
  {
    filename: 'ups-shifting.html',
    meta: {
      title: 'UPS Shifting & Material Handling in Chennai | Royal Power Solutions',
      desc: 'Professional UPS shifting, loading and unloading in Chennai. Safe relocation of UPS, transformers and battery banks. Trained team with proper equipment. Call 9787451828.',
      canonical: 'https://royalpowersolutions.in/services/ups-shifting.html',
      schema: `<script type="application/ld+json">
  [{"@context":"https://schema.org","@type":"Service","name":"UPS Shifting and Material Handling","description":"Royal Power Solutions provides professional UPS shifting, loading and unloading services across Chennai. Safe relocation of UPS systems, transformers and battery banks by trained teams.","provider":{"@type":"ElectricalContractor","@id":"https://royalpowersolutions.in/#business","name":"Royal Power Solutions","telephone":"+919787451828"},"areaServed":{"@type":"City","name":"Chennai"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},{"@type":"ListItem","position":2,"name":"Services","item":"https://royalpowersolutions.in/services.html"},{"@type":"ListItem","position":3,"name":"UPS Shifting","item":"https://royalpowersolutions.in/services/ups-shifting.html"}]}]
  </script>`
    },
    content: () => `
  <section class="page-header">
    <div class="container">
      ${breadcrumb('UPS Shifting &amp; Material Handling')}
      <h1 data-reveal>UPS Shifting &amp; Material Handling in Chennai</h1>
      <p data-reveal>Safe, professional shifting of UPS systems, transformers and battery banks across Chennai. Complete service — disconnect, transport, reinstall and commission.</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold btn--lg"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+UPS+shifting+service+in+Chennai" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark">Heavy Equipment Specialists</p>
          <h2>Professional UPS Shifting Service in Chennai</h2>
          <p>Moving a UPS is not like moving ordinary furniture — it requires trained professionals who understand the risks involved with heavy, high-value electrical equipment. Royal Power Solutions provides a dedicated UPS shifting and material handling team in Chennai. We safely disconnect, transport and reinstall your UPS at the new location, including battery strings, bypass panels and earthing connections.</p>
          <ul class="why__list" style="margin-top:24px;">
            <li><i class="fa-solid fa-check"></i> Safe shutdown and disconnection by qualified electricians</li>
            <li><i class="fa-solid fa-check"></i> Battery pack separation and repacking</li>
            <li><i class="fa-solid fa-check"></i> Hydraulic trolleys and heavy-duty straps</li>
            <li><i class="fa-solid fa-check"></i> Staircase and elevator navigation</li>
            <li><i class="fa-solid fa-check"></i> Reinstallation and testing at new location</li>
            <li><i class="fa-solid fa-check"></i> Trolley rental also available separately</li>
          </ul>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">We Handle</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-bolt" style="color:var(--rps-blue);"></i> <strong>1KVA to 1000KVA UPS units</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-battery-full" style="color:var(--rps-blue);"></i> <strong>Industrial battery banks</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-tower-broadcast" style="color:var(--rps-blue);"></i> <strong>Isolation transformers</strong></p></div>
            <div style="padding:14px;background:#fff;border-radius:10px;border-left:3px solid var(--rps-blue);"><p style="font-size:0.95rem;margin:0;"><i class="fa-solid fa-industry" style="color:var(--rps-blue);"></i> <strong>Distribution panels and switchgear</strong></p></div>
          </div>
          <a href="../contact.html" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;">Get Quote</a>
        </div>
      </div>
    </div>
  </section>

  ${faqSection('UPS Shifting Questions', [
    {q:'Can you shift a heavy 100KVA UPS within Chennai?', a:'Yes. We have the trained manpower and equipment to safely shift large UPS units of any size across Chennai. We use industrial trolleys and rigging equipment.'},
    {q:'Do you disconnect and reconnect during shifting?', a:'Yes. Our team handles the complete process — safe shutdown, cable disconnection, moving, reinstallation and commissioning. You do not need a separate electrician.'},
    {q:'Do you provide trolley rental separately?', a:'Yes. We offer industrial trolley rental from 500kg to 3000kg capacity, available on daily, weekly or monthly hire across Chennai.'},
    {q:'How much notice do you need for a UPS shifting job?', a:'For standard jobs, 1–2 days notice is usually sufficient. For very large or complex moves (200KVA+), a week\'s notice helps us plan manpower and equipment. Emergency moves can be arranged at short notice.'}
  ])}

  ${locationLinksSection('ups-shifting-team', 'UPS Shifting')}
  ${ctaSection('UPS Shifting')}`
  }
];

// ── GENERATE ALL PAGES ────────────────────────────────────
let count = 0;
for (const page of pages) {
  const html = pageShell(page.meta, page.content());
  fs.writeFileSync(path.join(servicesDir, page.filename), html, 'utf8');
  console.log(`✅ /services/${page.filename}`);
  count++;
}

console.log(`\n✨ Generated ${count} service pages.`);
