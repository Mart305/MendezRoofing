// Simple script to create placeholder images
const fs = require('fs');
const path = require('path');

// Create project images directory if it doesn't exist
const projectsDir = path.join(__dirname, 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

// Create testimonials directory if it doesn't exist
const testimonialsDir = path.join(__dirname, 'testimonials');
if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir);
}

// Create placeholder project images
for (let i = 1; i <= 6; i++) {
  const content = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#1d5b7a"/>
    <rect x="0" y="0" width="800" height="150" fill="#0b3954"/>
    <text x="400" y="300" font-family="Arial" font-size="48" text-anchor="middle" fill="white">Project ${i}</text>
    <text x="400" y="370" font-family="Arial" font-size="24" text-anchor="middle" fill="white">Mendez Roofing</text>
    <polygon points="400,100 500,200 300,200" fill="#ff6b35"/>
  </svg>`;
  
  fs.writeFileSync(path.join(projectsDir, `project-${i}.svg`), content);
  console.log(`Created project-${i}.svg`);
}

// Create placeholder testimonial images
for (let i = 1; i <= 5; i++) {
  const content = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#0b3954"/>
    <text x="100" y="115" font-family="Arial" font-size="48" text-anchor="middle" fill="white">T${i}</text>
  </svg>`;
  
  fs.writeFileSync(path.join(testimonialsDir, `testimonial-${i}.svg`), content);
  console.log(`Created testimonial-${i}.svg`);
}

// Create hero-roof.jpg placeholder
const heroRoofContent = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0b3954;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff6b35;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad)"/>
  <polygon points="960,200 1360,600 560,600" fill="#1d5b7a" opacity="0.7"/>
  <text x="960" y="700" font-family="Arial" font-size="72" text-anchor="middle" fill="white">MENDEZ ROOFING</text>
  <text x="960" y="800" font-family="Arial" font-size="36" text-anchor="middle" fill="white">Quality Roofing Solutions</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'hero-roof.svg'), heroRoofContent);
console.log('Created hero-roof.svg');

// Create about-team.jpg placeholder
const aboutTeamContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#f8f9fa"/>
  <rect x="100" y="150" width="600" height="300" fill="#0b3954"/>
  <circle cx="250" cy="250" r="60" fill="#ff6b35"/>
  <circle cx="400" cy="250" r="60" fill="#ff6b35"/>
  <circle cx="550" cy="250" r="60" fill="#ff6b35"/>
  <text x="400" y="400" font-family="Arial" font-size="36" text-anchor="middle" fill="white">Our Team</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'about-team.svg'), aboutTeamContent);
console.log('Created about-team.svg');

console.log('All placeholder images created successfully!');
