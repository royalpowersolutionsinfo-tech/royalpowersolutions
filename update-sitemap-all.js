const fs = require('fs');

const urls = [
  { loc: '/', priority: '1.0' },
  { loc: '/about.html', priority: '0.8' },
  { loc: '/services.html', priority: '0.9' },
  { loc: '/gallery.html', priority: '0.7' },
  { loc: '/contact.html', priority: '0.8' },

  { loc: '/services/ups-sales-service.html', priority: '0.95' },
  { loc: '/services/ups-repair-amc.html', priority: '0.95' },
  { loc: '/services/ups-installation.html', priority: '0.90' },
  { loc: '/services/battery-sales-service.html', priority: '0.90' },
  { loc: '/services/server-stabilizer.html', priority: '0.85' },
  { loc: '/services/isolation-transformer.html', priority: '0.85' },
  { loc: '/services/solar-installation.html', priority: '0.85' },
  { loc: '/services/electrical-work.html', priority: '0.85' },
  { loc: '/services/ups-shifting.html', priority: '0.80' },

  { loc: '/locations/jafferkhanpet.html', priority: '0.90' },
  { loc: '/locations/ashok-pillar.html', priority: '0.85' },
  { loc: '/locations/west-mambalam.html', priority: '0.85' },
  { loc: '/locations/guindy.html', priority: '0.85' },
  { loc: '/locations/saidapet.html', priority: '0.85' },
  { loc: '/locations/chennai.html', priority: '0.95' },

  { loc: '/chennai/ups-sales-service.html', priority: '0.98' },
  { loc: '/guindy/ups-sales-service.html', priority: '0.90' },
  { loc: '/jafferkhanpet/ups-sales-service.html', priority: '0.90' },
  { loc: '/ambattur/industrial-ups-service.html', priority: '0.90' },
  { loc: '/ashok-pillar/ups-sales-service.html', priority: '0.90' },
  { loc: '/west-mambalam/ups-sales-service.html', priority: '0.90' },
  { loc: '/saidapet/ups-sales-service.html', priority: '0.90' }
];

const today = new Date().toISOString().split('T')[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>https://royalpowersolutions.in${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', xml, 'utf8');
console.log(`✅ sitemap.xml updated with ${urls.length} indexable URLs.`);
