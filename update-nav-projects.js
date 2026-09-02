const fs = require('fs');

const mainPages = ['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html'];

const oldNav = `<nav class="nav__links" id="navLinks" aria-label="Primary navigation">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about.html" class="nav-link">About Us</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="gallery.html" class="nav-link">Gallery</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>`;

const newNav = `<nav class="nav__links" id="navLinks" aria-label="Primary navigation">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about.html" class="nav-link">About Us</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="projects.html" class="nav-link">Projects</a>
        <a href="gallery.html" class="nav-link">Gallery</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>`;

let count = 0;
for (const page of mainPages) {
  if (!fs.existsSync(page)) continue;
  let html = fs.readFileSync(page, 'utf8');
  if (!html.includes('href="projects.html"')) {
    html = html.replace(/<nav class="nav__links" id="navLinks"[\s\S]*?<\/nav>/, newNav);
    fs.writeFileSync(page, html, 'utf8');
    count++;
    console.log(`✅ Added Projects link to navbar in ${page}`);
  }
}
console.log(`Done. Updated ${count} pages.`);
