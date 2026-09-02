/**
 * Updates footer service links on all main pages to point to dedicated /services/ pages
 */
const fs = require('fs');

const mainPages = ['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html'];

const oldFooterServices = `        <h4>Services</h4>
        <a href="services.html">Online UPS Sales</a>
        <a href="services.html">Inverters &amp; Batteries</a>
        <a href="services.html">Stabilizers &amp; Transformers</a>
        <a href="services.html">Solar &amp; Electrical Panels</a>
        <a href="services.html">UPS Commissioning</a>`;

const newFooterServicesRoot = `        <h4>Our Services</h4>
        <a href="services/ups-sales-service.html">UPS Sales &amp; Service</a>
        <a href="services/ups-repair-amc.html">UPS Repair &amp; AMC</a>
        <a href="services/ups-installation.html">UPS Installation</a>
        <a href="services/battery-sales-service.html">Battery Sales &amp; Service</a>
        <a href="services/server-stabilizer.html">Server Stabilizers</a>
        <a href="services/isolation-transformer.html">Isolation Transformers</a>
        <a href="services/solar-installation.html">Solar Installation</a>
        <a href="services/electrical-work.html">Electrical Work</a>`;

const newFooterServicesFromServices = newFooterServicesRoot; // same dir prefix

let updated = 0;
for (const f of mainPages) {
  if (!fs.existsSync(f)) continue;
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('<h4>Services</h4>')) {
    html = html.replace(oldFooterServices, newFooterServicesRoot);
    fs.writeFileSync(f, html, 'utf8');
    console.log('✅ Updated footer in', f);
    updated++;
  }
}

// Also add service area links column to index.html footer if missing
let idx = fs.readFileSync('index.html', 'utf8');
if (!idx.includes('footer__col--locations')) {
  // Add a locations column before the contact column
  const contactCol = `      <div class="footer__col">
        <h4>Contact Us</h4>`;
  const locationsCol = `      <div class="footer__col" class="footer__col--locations">
        <h4>Service Areas</h4>
        <a href="locations/jafferkhanpet.html">Jafferkhanpet</a>
        <a href="locations/ashok-pillar.html">Ashok Pillar</a>
        <a href="locations/west-mambalam.html">West Mambalam</a>
        <a href="locations/guindy.html">Guindy</a>
        <a href="locations/saidapet.html">Saidapet</a>
        <a href="locations/chennai.html">Greater Chennai</a>
      </div>\n\n`;
  idx = idx.replace(contactCol, locationsCol + contactCol);
  fs.writeFileSync('index.html', idx, 'utf8');
  console.log('✅ Added Service Areas column to index.html footer');
}

console.log(`\n✨ Footer updates complete. ${updated} pages updated.`);
