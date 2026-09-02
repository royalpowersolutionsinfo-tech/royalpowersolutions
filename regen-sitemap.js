/**
 * Royal Power Solutions — Sitemap Regenerator
 * Only indexes: homepage, main pages, /services/ pages, /locations/ hub pages
 * Excludes: location×service pages (noindex)
 */
const fs = require('fs');
const BASE = 'https://royalpowersolutions.in';

const today = new Date().toISOString().split('T')[0];

const urls = [
  // Main pages — highest priority
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about.html', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services.html', changefreq: 'weekly', priority: '0.9' },
  { loc: '/gallery.html', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact.html', changefreq: 'monthly', priority: '0.8' },

  // Dedicated service pages — very high priority
  { loc: '/services/ups-sales-service.html', changefreq: 'monthly', priority: '0.95' },
  { loc: '/services/ups-repair-amc.html', changefreq: 'monthly', priority: '0.95' },
  { loc: '/services/ups-installation.html', changefreq: 'monthly', priority: '0.90' },
  { loc: '/services/battery-sales-service.html', changefreq: 'monthly', priority: '0.90' },
  { loc: '/services/server-stabilizer.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/services/isolation-transformer.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/services/solar-installation.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/services/electrical-work.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/services/ups-shifting.html', changefreq: 'monthly', priority: '0.80' },

  // Location hub pages — high priority
  { loc: '/locations/jafferkhanpet.html', changefreq: 'monthly', priority: '0.90' },
  { loc: '/locations/ashok-pillar.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/locations/west-mambalam.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/locations/guindy.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/locations/saidapet.html', changefreq: 'monthly', priority: '0.85' },
  { loc: '/locations/chennai.html', changefreq: 'monthly', priority: '0.85' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', xml, 'utf8');
console.log(`✅ sitemap.xml written with ${urls.length} high-quality indexed URLs.`);
console.log('⚠️  120 location/service pages excluded (they have noindex).');
