# The Innovator's Toolkit

A clean, modern informational website for high-school and early college students interested in entrepreneurship, startups, and AI in business.

## Overview

This is a free, non-profit resource hub that helps students turn ideas into real projects by understanding:
- How startups are formed
- How AI can be responsibly integrated into early-stage businesses
- How patents, intellectual property, and open data fit into innovation
- Where students can find credible tools, examples, and guidance

## Project Structure

```
innovators-toolkit/
├── index.html              # Home page
├── startups-101.html       # Startups 101 content
├── ai-entrepreneurship.html # AI in Entrepreneurship content
├── patents-ip.html         # Patents & IP Basics content
├── open-data.html          # Open Data & Public Resources content
├── tools-resources.html    # Tools & Resources page
├── about.html              # About page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript for navigation
└── README.md               # This file
```

## Features

- **Clean, modern design** with minimal layout and easy navigation
- **Responsive** - works on desktop, tablet, and mobile devices
- **No dependencies** - pure HTML, CSS, and vanilla JavaScript
- **Accessible** - semantic HTML and proper ARIA labels
- **Fast loading** - lightweight with no external dependencies

## Getting Started

1. Open `index.html` in a web browser
2. That's it! No build process, no dependencies, no setup required.

## Local Development

You can serve the site locally using any simple HTTP server:

### Python 3
```bash
python -m http.server 8000
```

### Node.js (with http-server)
```bash
npx http-server
```

### VS Code Live Server
If you're using VS Code, install the "Live Server" extension and right-click on `index.html` to open with Live Server.

Then navigate to `http://localhost:8000` (or the port your server uses).

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --text-color: #1f2937;
    /* ... */
}
```

### Content
All content is in the HTML files. Edit them directly to update text, add sections, or modify the structure.

### Navigation
The navigation menu is included in each HTML file. To add a new page:
1. Create a new HTML file
2. Add a link to it in the `<nav>` section of all pages
3. Update the active class on the current page

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is free and open for educational use. Feel free to modify and adapt it for your own projects.

## Notes

- No external dependencies or frameworks
- No build process required
- All links are external and open in new tabs
- No tracking or analytics included
- Designed to be simple, fast, and accessible

