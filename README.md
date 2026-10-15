# Tanishq Kale : Personal Portfolio Website

<div align="center">
  
  ![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)
  ![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js)
  ![GSAP](https://img.shields.io/badge/GSAP-3.12.2-88CE02?logo=greensock)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?logo=vercel&logoColor=white)
  ![Resend](https://img.shields.io/badge/Resend-Email_API-white?logo=minutemailer)
  
  <p><strong>Professional AI Engineer Portfolio with 3D WebGL Starfield, GSAP Scroll Animations, and Secure Serverless Architecture!</strong></p>
  
</div>

---

## Overview

A cutting-edge personal portfolio for **Tanishq Kale**, an AI Engineer specializing in production-grade Agentic AI and Retrieval-Augmented Generation (RAG) systems. Featuring an immersive **3D animated starfield background** built with Three.js and professional **scroll-triggered animations** powered by GSAP.

Beyond the frontend, it features a highly secure **Vercel Serverless Backend** integrated with the **Resend API** to process contact form submissions without exposing sensitive credentials to the browser, with an automatic mailto fallback for direct client interaction.

---

## Key Features

- **3D WebGL Starfield** - 3,200 interactive particles with responsive mouse parallax  
- **Premium GSAP Animations** - High-end scroll-triggered staggers and cascading reveals  
- **Dynamic Typing Animation** - Auto-cycling AI & Software engineering titles  
- **Custom Cursor System** - Magnetic hover effects with smooth tracking  
- **3D Card Tilt Effects** - Perspective-based magnetic interactions  
- **Timeline Progress Indicator** - Scroll-synced career & education journey  
- **Interactive Skills Filter** - Dynamic category filtering for AI/ML, Languages, Backend, Databases, and Tools  
- **Embedded Resume Viewer** - Interactive modal with in-browser PDF reader and one-click download  
- **Serverless Email Backend** - Custom Node.js Vercel function using the Resend API with mailto fallback  
- **Advanced SEO** - Fully configured Open Graph & Twitter Cards for social sharing previews  
- **Glassmorphism Design** - Modern backdrop blur aesthetics matching dark cyber purple theme  
- **Fully Responsive** - Flawless layout across mobile, tablet, laptop, and desktop  

---

## Technologies

### Core Stack
- **HTML5 & Modern CSS** - Semantic markup, CSS Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)** - Interactivity and animations
- **Node.js** - Vercel serverless backend function (`api/submit.js`)

### Animation & 3D Libraries
- **Three.js r128** - 3D WebGL rendering engine
- **GSAP 3.12.2 & ScrollTrigger** - Hardware-accelerated motion design

### AI & Engineering Highlights
- **Agentic AI & LLMs** - LangChain, LangGraph, Prompt Engineering, MCP
- **RAG & Vector Stacks** - Document chunking, semantic retrieval, embeddings
- **Backend & Cloud** - Python, FastAPI, Pydantic, Azure Cloud

---

## File Structure

```text
portilio-antigrav/
│
├── index.html                 # Main markup, SEO tags, Canvas target & sections
├── style.css                  # Advanced styling, grids, glassmorphism & responsive rules
├── script.js                  # Intersection observers, typing fx, skill filtering & form logic
├── 3d_background.js           # Three.js starfield + GSAP timelines
├── speed-insights.js          # Speed insights module
├── api/
│   └── submit.js              # Vercel Serverless Function (Resend Backend)
├── package.json               # Dependencies & scripts
├── robots.txt                 # Search crawler directives
├── sitemap.xml                # SEO sitemap
└── portfolio_assets/          # Optimized images, verified certs, and Tanishq_Resume.pdf
```

---

## Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tanishq-code1/portfolio.git
   cd portfolio
   ```

2. **Serve locally:**
   ```bash
   npx http-server -p 3000
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Deploy to Vercel:**
   ```bash
   npx vercel
   ```
   Configure environment variables in the Vercel dashboard:
   - `RESEND_API_KEY`: Your Resend API key (optional for contact form backend)
   - `RECEIVER_EMAIL`: `tanishqkale007@gmail.com`

---

## Author

**Tanishq Kale**  
AI Engineer & Computer Science Undergraduate  
Acropolis Institute of Technology and Research, Indore  

- **Email:** [tanishqkale007@gmail.com](mailto:tanishqkale007@gmail.com)  
- **LinkedIn:** [linkedin.com/in/tanishq-kale-profile](https://www.linkedin.com/in/tanishq-kale-profile/)  
- **GitHub:** [github.com/Tanishq-code1](https://github.com/Tanishq-code1)  

---

<div align="center">
  
  © 2026 Tanishq Kale. All rights reserved.
  
</div>
