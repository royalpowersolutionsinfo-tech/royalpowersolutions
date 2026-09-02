const fs = require('fs');
const path = require('path');
const dirs = ['ashok-pillar','jafferkhanpet','west-mambalam','guindy','saidapet','chennai'];
let count = 0;
for (const dir of dirs) {
  const d = path.join(__dirname, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(x => x.endsWith('.html'))) {
    const fp = path.join(d, f);
    let html = fs.readFileSync(fp, 'utf8');
    if (!html.includes('noindex')) {
      const tag = '<meta name="robots" content="noindex, follow">\n  ';
      html = html.replace('<link rel="canonical"', tag + '<link rel="canonical"');
      fs.writeFileSync(fp, html, 'utf8');
      count++;
    }
  }
}
console.log('Added noindex to', count, 'location/service pages.');
