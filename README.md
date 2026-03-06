# Professional Portfolio Template

A modern, scalable, and responsive portfolio website built with HTML, CSS, and JavaScript. Easily customize and add projects without writing code.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Styling**: Clean, modern design with smooth animations
- **Easy Configuration**: Edit `projects.json` to add/modify projects and profile info
- **Customizable**: Red/pink color scheme (easily changeable in CSS)
- **Performance Optimized**: Fast loading and smooth scrolling
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Project Structure

```
MainPortfolio/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive layout
├── script.js           # JavaScript for loading projects and interactivity
├── projects.json       # Configuration file (edit this to customize)
└── README.md           # This file
```

## Quick Start

1. **Open `index.html`** in your browser to view the portfolio
2. **Edit `projects.json`** to customize:
   - Your name and title
   - Profile picture
   - Social media links
   - Projects

## Customization Guide

### 1. Update Your Profile

Edit the `profile` section in `projects.json`:

```json
"profile": {
  "name": "Your Name",
  "title": "Your Professional Title",
  "image": "path/to/your/image.jpg",
  "socials": [
    {
      "icon": "🎮",
      "label": "Discord Username",
      "url": "https://discord.com/users/YOUR_ID"
    },
    {
      "icon": "🎯",
      "label": "Roblox Profile",
      "url": "https://roblox.com/users/YOUR_ID"
    }
  ]
}
```

### 2. Change the About Section

Update the `about` text in `projects.json`:

```json
"about": "Your custom about text here..."
```

### 3. Add/Edit Projects

Each project in the `projects` array has this structure:

```json
{
  "title": "Project Name",
  "date": "2024",
  "videoUrl": "path/to/video.mp4",
  "videoPlaceholder": "Mp4 Video",
  "images": [
    "path/to/image1.jpg",
    "path/to/image2.jpg",
    "path/to/image3.jpg",
    "path/to/image4.jpg"
  ]
}
```

**Fields:**
- `title`: Project name
- `date`: Year or date
- `videoUrl`: URL to video file (or empty string for placeholder)
- `videoPlaceholder`: The text shown if no video URL is provided
- `images`: Array of image URLs (4 images recommended for the grid)

### 4. Customize Colors

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #ff4757;        /* Main color (red) */
    --primary-dark: #ff3838;         /* Darker shade */
    --primary-light: #ff6b7a;        /* Lighter shade */
    --bg-light: #fff5f5;             /* Light background */
    --text-dark: #2c3e50;            /* Text color */
    --text-gray: #7f8c8d;            /* Gray text */
}
```

### 5. Update Navigation and Footer

Edit directly in `index.html`:
- Navigation links in the `<nav>`
- Footer text in the `<footer>`

## File Paths

When adding images and videos:
- Place files in the same folder as `index.html` and reference them as: `./filename.jpg`
- Or use full URLs: `https://example.com/image.jpg`

## Navigation Sections

- **Home** - Hero section with profile
- **Projects** - Featured projects showcase
- **About** - About section text
- **Contact** - Footer (edit in HTML)

## Responsive Breakpoints

- **Desktop**: Full grid layout (2 columns for projects)
- **Tablet**: Single column layout
- **Mobile**: Optimized for small screens

## Tips & Best Practices

1. **Images**: Use high-quality images (at least 1200px wide)
2. **Videos**: Use MP4 format for broad compatibility
3. **Project Dates**: Use simple formats like "2024" or "Mar 2024"
4. **Social Links**: Use direct profile URLs
5. **Image Names**: Keep them simple and descriptive
6. **Backup**: Save your `projects.json` regularly

## Deployment

To deploy your portfolio:

1. **GitHub Pages**: Push to GitHub and enable Pages in settings
2. **Netlify**: Drag and drop the folder
3. **Vercel**: Import from GitHub
4. **Any Web Host**: Upload all files via FTP

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- Add dark mode toggle
- Add filtering by project category
- Add contact form
- Add testimonials section

## Need Help?

- Check that `projects.json` is in the same folder as `index.html`
- Ensure JSON syntax is valid (use a JSON validator)
- Clear browser cache if changes don't appear
- Check browser console (F12) for any errors

---

**Made with ❤️ - Enjoy your professional portfolio!**