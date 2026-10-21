# Tanishq Kale — Personal Portfolio Website

<div align="center">
  
  ![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)
  ![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js)
  ![GSAP](https://img.shields.io/badge/GSAP-3.12.2-88CE02?logo=greensock)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)
  ![EmailJS](https://img.shields.io/badge/EmailJS-Direct_Delivery-36C9B4?logo=minutemailer)
  
  <p><strong>Professional AI Engineer Portfolio with 3D WebGL Starfield, GSAP Scroll Animations, In-Page PDF Viewer, and Direct EmailJS Delivery!</strong></p>
  
</div>

---

## Overview

A cutting-edge personal portfolio for **Tanishq Kale**, an AI Engineer specializing in production-grade Agentic AI and Retrieval-Augmented Generation (RAG) systems. Featuring an immersive **3D animated starfield background** built with Three.js, momentum-based smooth scrolling powered by **Lenis**, and responsive **scroll-triggered entrance animations** powered by GSAP.

Contact form submissions are delivered directly to Tanishq's inbox via **EmailJS** without redirecting visitors to external email apps, backed by a one-click copy email chip with toast notification.

---

## Key Features

- **3D WebGL Starfield** — 3,200 interactive particles with responsive mouse parallax  
- **In-Page High-Res PDF Resume Viewer** — PDF.js-powered modal with pinch-zoom, drag-to-pan, fit-to-width, keyboard shortcuts, and confetti celebration on download  
- **Continuous Animated Cyber Teal Motion Logo (`TK`)** — Spinning neon border and pulsating monogram  
- **Premium GSAP Animations** — ScrollTrigger reveals optimized to stay persistent across category filters and scroll-ups  
- **Lenis Smooth Inertia Scrolling** — Native-feel momentum scrolling  
- **Interactive Skills Filter** — Filter by All, AI/ML, Languages, Backend, Cloud/DevOps, Databases, and Tools with automatic ScrollTrigger refresh  
- **Direct EmailJS Delivery** — Instant in-browser message sending with real-time delivery status  
- **One-Click Direct Email Copy** — Floating glassmorphism toast notification  
- **Dynamic Tab Visibility Title** — Displays a greeting message when switching browser tabs  
- **Advanced SEO** — Configured Open Graph and Twitter metadata with high-definition SVG monogram favicon  
- **Fully Responsive** — Engineered across mobile, tablet, and desktop screens  

---

## Technologies

### Core Stack
- **HTML5 & Modern CSS** — Cyber Teal & Obsidian theme (`#36C9B4`, `#101416`, `#1C2427`), CSS Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)** — Client-side logic, PDF.js rendering, confetti, micro-interactions
- **EmailJS SDK** — Direct client-to-inbox form delivery

### Libraries & Engines
- **Three.js r128** — 3D WebGL particle rendering engine
- **GSAP 3.12.2 & ScrollTrigger** — Hardware-accelerated motion design
- **PDF.js (v3.11.174)** — High-fidelity canvas document rendering
- **Lenis (v1.3.26)** — Smooth inertial scrolling
- **Canvas Confetti** — Micro-interaction celebration

---

## File Structure

```text
portilio-antigrav/
│
├── index.html                 # Main markup, SEO tags, Canvas target & sections
├── style.css                  # Cyber Teal theme, in-page resume viewer & responsive rules
├── script.js                  # PDF viewer, EmailJS, Lenis, copy toast & filter logic
├── 3d_background.js           # Three.js starfield + GSAP timelines
├── speed-insights.js          # Speed insights module
├── package.json               # Project manifest
├── robots.txt                 # Search crawler directives
├── sitemap.xml                # SEO sitemap
└── portfolio_assets/          # Optimized images, verified certs, and Tanishq_Resume.pdf
```

---

## Local Development & Setup

1. **Serve locally:**
   ```bash
   npx http-server -p 3000
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Deploy:**
   Pushing to the `main` branch automatically triggers production deployment on Vercel.
