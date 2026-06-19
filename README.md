# WEDE5020 POE Website Project Template

> **Student:** Replace all placeholders in this document before submission.

## Student Information
- **Student Name:** [Onkgopotse Tsholofelo Barekwang]
- **Student Number:** [ST10515704]
- **Module:** Web Development (Introduction) - WEDE5020
- **Lecturer:** [Thabo Mofokeng]
- **Selected Organisation:** [Sweet Heaven's Bakery]
- **Repository URL:** [Paste GitHub repository link here]
- **Deployed Website URL:** [Paste deployment link here in Part 3]

## Project Overview
Sweet Heaven’s Bakery is a family‑inspired brand known for its pink‑beige‑white theme and signature pastries. The purpose of the website is to showcase baked goods, share the bakery’s story, and provide customers with an easy way to connect, explore menus, and place enquiries online.  

This project demonstrates the application of **semantic HTML**, **responsive CSS**, **JavaScript interactivity**, and **SEO optimisation**. It also reflects professional web development practices such as folder structuring, accessibility considerations, and deployment to a live environment.

## Website Goals and Objectives

- Goal 1: Deliver Quality Baked Goods
To consistently provide high quality cakepastries, and desserts made with the finest ingredients and traditional methods, ensuring every product delights customers and reflects the bakery's passion for excellence.

- Goal 2: Strengthen Customer Relationships
To build lasting connections with the community by offering excellent customer service, creating a welcoming atmosphere and making it easy for customers to engage with the bakery both in store and online.

- Goal 3:Expand Brand Presence
To grow beyond the local market by promoting the bakery's identity online, showcasing its products through the website, and reaching new audiences while staying true to its values of creativity, tradition, and love for baking.

## Key Features and Functionality
## Key Features and Functionality

- **Five or more web pages**  
  The project includes a complete set of five HTML pages: `index.html`, `about.html`, `services.html`, `enquiry.html`, and `contact.html`. Each page is fully structured and linked through a consistent navigation menu.

- **Semantic HTML structure**  
  All pages use semantic elements such as `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`. This improves accessibility, readability, and SEO compliance while meeting rubric standards.

- **Responsive CSS design**  
  A single external stylesheet (`style.css`) applies consistent branding across all pages. Responsive design is achieved using relative units, Flexbox, and media queries, ensuring usability across desktop, tablet, and mobile layouts.

- **Enquiry and contact forms**  
  The `enquiry.html` and `contact.html` pages feature fully functional forms with proper `name` attributes, labels, and validation. JavaScript integration ensures error checking and accessibility, while EmailJS is used for form processing.

- **JavaScript functionality**  
  Scripts (`main.js`, `enquiry.js`, `contact.js`) provide interactivity, including form validation, responsive navigation, and integration with EmailJS for sending enquiries. Code has been modernised with `const`/`let` and accessibility features.

- **SEO elements**  
  Each page includes meta titles, descriptions, and keywords. Images use descriptive `alt` attributes. A `robots.txt` file and `sitemap.xml` are implemented to guide search engine indexing. Optional metadata such as `changefreq` and `priority` were added to the sitemap to demonstrate advanced SEO understanding.

## Sitemap
```text
Home (index.html)
├── About (about.html)
├── Services / Products (services.html)
├── Enquiry (enquiry.html)
└── Contact (contact.html)
```

## File and Folder Structure
```text
.
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── enquiry.js
│   └── contact.js
├── images/
├── docs/
│   ├── wireframes/
│   └── research/
├── tests/
└── README.md
```


## Part 1 Details

### Proposal Summary
The chosen organisation for this project is **Sweet Heaven’s Bakery**, a family‑inspired bakery brand recognised for its warm pink‑beige‑white theme and signature pastries. The bakery prides itself on delivering high‑quality baked goods, strengthening customer relationships, and expanding its brand presence beyond the local community.  

The website was proposed to serve multiple purposes:  
- To showcase the bakery’s products (cakes, pastries, desserts) in a visually appealing and structured way.  
- To share the bakery’s story and values, reinforcing its identity and tradition.  
- To provide customers with accessible online services, including enquiry and contact forms, thereby improving communication and customer service.  
- To establish a professional online presence that supports marketing, brand awareness, and customer engagement.  

This project demonstrates the application of web development fundamentals — semantic HTML, responsive CSS, JavaScript interactivity, and SEO optimisation — while also reflecting real‑world considerations such as accessibility, legal asset sourcing, and deployment. The proposal was approved because it balances creativity with technical requirements, making it an ideal case study for an introductory web development module.

- Proposal Option 1: [Sweet Heaven’s Bakery. A bakery brand focused on quality, tradition, and customer engagement. The website highlights products, brand identity, and customer service accessibility.]

- Proposal Option 2: [BloomTech Tutoring Services. A local tutoring organisation offering academic support in mathematics, business management, and programming. The proposed website would provide information about services, tutor profiles, booking options, and contact forms. The aim would be to strengthen the organisation’s online presence, streamline communication with students, and promote educational resources.]

- Approved Organisation: [Sweet Heaven's Bakery]

### Research Notes
- **Sources:** Competitor bakery websites (e.g., Magnolia Bakery, local patisseries), design inspiration from food blogs, and technical references from W3Schools/MDN.  
- **Content Plan:** Homepage introduction, About page with brand story, Services/Products page with offerings, Enquiry form, and Contact page.  
- **Legal Asset Sourcing:** Images sourced from royalty‑free platforms (Unsplash, Pexels) or original designs. Fonts from Google Fonts.  
- **Intended Audience:** Local customers, online visitors, and potential new clients seeking baked goods and catering services.  


### Timeline and Milestones


### Timeline and Milestones

| Milestone              | Planned Date | Status   |                                                             |
|-------------------------|--------------|----------|
| Proposal submission     | 2026‑05‑10   | Done     |  
| HTML structure complete | 2026‑05‑20   | Done     | 
| CSS styling complete    | 2026‑05‑28   | Done     | 
| JavaScript complete     | 2026‑06‑05   | Done     | 
| Deployment complete     | 2026‑06‑19  | Done     | 


## Part 2 Details – CSS Design and Responsiveness

The CSS design was carefully planned to reflect the bakery’s brand identity and ensure usability across devices:

- **Colour Palette:**  
  A warm pink‑beige‑white theme was selected to match the bakery’s branding. Pink conveys sweetness and creativity, beige adds warmth and tradition, and white ensures clarity and readability.  

- **Typography:**  
  Headings use a decorative Google Font to create a welcoming, artisanal feel. Body text uses a clean sans‑serif font for readability across devices. Font sizes are defined in relative units (`em`, `%`) to support responsiveness.  

- **Layout Decisions:**  
  Flexbox was used for structuring navigation bars, product sections, and multi‑column layouts. Media queries (`@media`) adjust layouts for tablet and mobile screens, stacking elements vertically and resizing images for smaller viewports.  

- **Consistency:**  
  A single external stylesheet (`style.css`) ensures consistent branding across all pages. Common classes were defined for buttons, headings, and sections to reduce redundancy and improve maintainability.  

- **Accessibility:**  
  Colour contrast was checked against WCAG standards. Alt text was added to all images. Headings follow a logical hierarchy (`h1` → `h2` → `h3`) to support screen readers.  



## Part 3 Details – JavaScript, SEO, and Deployment

The JavaScript and SEO work focused on interactivity, usability, and discoverability:

- **JavaScript Features:**  
  - **Form Validation:** `enquiry.js` and `contact.js` validate required fields, check email formats, and provide error messages to guide users.  
  - **Responsive Navigation:** `main.js` manages interactive navigation, ensuring menus adapt to smaller screens.  
  - **Form Processing:** Integration with EmailJS allows enquiries and contact messages to be sent directly from the website.  
  - **Interactivity:** Buttons include hover effects and dynamic styling to improve user experience.  

- **SEO Work:**  
  - **Meta Tags:** Each page includes a unique `<title>` and `<meta description>` optimised for bakery‑related keywords.  
  - **Keywords:** Keywords such as “cakes,” “pastries,” “bakery,” and “Sweet Heaven’s Bakery” were added to improve search visibility.  
  - **Alt Text:** All images include descriptive alt attributes for accessibility and SEO.  
  - **robots.txt:** Configured to allow search engines to crawl the site while blocking irrelevant paths.  
  - **sitemap.xml:** Structured with `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags to guide search engine indexing.  

- **Deployment:**  
  The website was deployed using **GitHub Pages** (or Netlify, depending on final choice). Deployment ensures public accessibility, version control, and easy updates. The deployed site includes all five pages, responsive design, functional forms, and SEO elements.  

- **Testing:**  
  Forms were tested for validation errors, navigation was checked across devices, and responsiveness was verified using browser developer tools.  


## Changelog
Use reverse chronological order

**2026‑06‑15**  
- Website deployed via GitHub Pages/Netlify.  
- Final testing completed across desktop, tablet, and mobile devices.  

**2026‑06‑19**  
- Implemented JavaScript validation for enquiry and contact forms.  
- Integrated EmailJS for form processing.  
- Added responsive navigation functionality in `main.js`.  
- Conducted accessibility checks (alt text, heading hierarchy, colour contrast).  

**2026‑05‑05**  
- Completed CSS styling with responsive layouts using Flexbox and media queries.  
- Applied consistent branding (pink‑beige‑white colour palette, Google Fonts).  
- Styled buttons, headings, and sections for uniform design.  
- Verified responsiveness using browser developer tools.  

**2026‑03‑28**  
- Created all five HTML pages (`index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`).  
- Applied semantic HTML structure with `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.  
- Linked external stylesheet (`style.css`) and JavaScript files.  
- Added placeholder content and navigation links.  

**2026‑06‑20**  
- Drafted initial wireframes for desktop, tablet, and mobile layouts.  
- Defined project folder structure (`css/`, `js/`, `images/`, `docs/`, `tests/`).  
- Prepared research notes and content plan.  

**2026‑03‑10**  
- Submitted project proposal with two organisation options.  
- Approved organisation: Sweet Heaven’s Bakery.  

## Screenshots
### Desktop
![image alt](https://github.com/Onkgopotse-web/WEDE5020-final-poe/blob/469ca831c4c85f21bb40811086e106d6f51672ba/assets/DesktopHome..png) 


### Tablet
![image alt](https://github.com/Onkgopotse-web/WEDE5020-final-poe/blob/5f81f50342fa1423f50829438ee9023f3a533959/assets/TabletHome..png)

### Mobile
![image alt](https://github.com/Onkgopotse-web/WEDE5020-final-poe/blob/d9245f113e6f38af13eb5ef26d6dbe703d7eb850/assets/MobileHome.png)

## References
> Use the required institutional referencing style consistently.
1. Google (2024) Web Fundamentals
2. https://img.tineye.com/result/96bcb4794c947aec57432c4f29aeac68747ffa85fb74fac9534bcf18ee7e71d8-29?size=160  
https://citymagazine.si/nb/tiramisu-ball-oppskrift-med-nutella/?fbclid=IwAR2fnCg7qjMZtdndZdVVrUhVp1ToLAr2ApSclaOcxY4LT3iP0RRzf9TrIxw

https://images.pexels.com/photos/25812097/pexels-photo-25812097.jpeg 

https://images.pexels.com/photos/33687987/pexels-photo-33687987.jpeg 
https://images.pexels.com/photos/37163089/pexels-photo-37163089.jpeg 
https://images.pexels.com/photos/14350755/pexels-photo-14350755.jpeg 
https://picdetective.com/900b4aae-550c-4aa8-b972-6ff110a67988
https://images.pexels.com/photos/7552437/pexels-photo-7552437.jpeg   

4. Krug, S. (2014) Don’t Make Me Think: A Common Sense Approach to Web Usability. 3rd ed. Berkeley: New Riders. 
5. Nielsen Norman Group (2024) Website Usability Principles. Available at: https://www.nngroup.com
6. W3Schools (2024) HTML Tutorial. Available at: https://www.w3schools.com
 W3Schools CSS Tutorial: https://www.w3schools.com/css/
7. W3Schools Flexbox: https://www.w3schools.com/css/css3_flexbox.asp
8. W3Schools CSS Grid: https://www.w3schools.com/css/css_grid.asp
9. W3Schools Media Queries: https://www.w3schools.com/css/css_rwd_mediaqueries.asp
10. W3Schools Responsive Images: https://www.w3schools.com/css/css_rwd_images.asp
11. W3Schools Pseudo-classes: https://www.w3schools.com/css/css_pseudo_classes.asp
12. W3Schools Forms: https://www.w3schools.com/css/css_form.asp
13. W3Schools How To - Hamburger Menu: https://www.w3schools.com/howto/howto_css_menu_icon.asp
14. W3Schools CSS Variables: https://www.w3schools.com/css/css3_variables.asp
10.W3Schools picture tag: https://www.w3schools.com/tags/tag_picture.asp
15. MDN Web Docs - clamp(): https://developer.mozilla.org/en-US/docs/Web/CSS/clamp


## AI Declaration (If used)
if i changed to const i need to change in other js files? [PROMPT]
Excellent — I can see your **VS Code** setup clearly on the right side of your desktop, with multiple JavaScript files open (`main.js`, `enquiry.js`, and `contact.js`). You asked whether changing `var` to `const` means you need to update it in all your other JS files — that’s a smart question.  

Here’s the clear answer 👇  

---

### 🧠 What happens when you switch from `var` to `const` or `let`
- `var` is the **old way** of declaring variables — it’s function‑scoped and can be re‑declared accidentally.  
- `const` and `let` are **modern ES6 standards** — they’re block‑scoped, safer, and prevent bugs.  
  - Use `const` for variables that **never change** (like DOM elements or regex patterns).  
  - Use `let` for variables that **do change** (like counters or flags).  

---

### ✅ Should you change all files?
Yes — it’s **best practice** to update all your JS files (`main.js`, `enquiry.js`, `contact.js`, etc.) for consistency and modern syntax.  
But you don’t have to do it all at once. You can safely update each file gradually:

| File | Recommended change | Why |
|------|--------------------|-----|
| `main.js` | Replace all `var` with `const` or `let` | Most variables are static DOM elements → use `const` |
| `enquiry.js` | Replace all `var` with `const` or `let` | Validation functions and patterns → use `const` |
| `contact.js` | Replace all `var` with `const` or `let` | Keeps syntax consistent and avoids accidental re‑declaration |

---

### ⚙️ How to do it safely
1. Replace `var` with `const` for variables that never change.  
2. Replace `var` with `let` for variables that are reassigned (like `currentIndex` in your lightbox).  
3. Test each page after saving — if something breaks, check whether that variable was meant to change.  

---

### 🧩 Example
Before:
```javascript
var currentIndex = 0;
```
After:
```javascript
let currentIndex = 0;
```

Before:
```javascript
var nameField = document.getElementById('enquiry-name');
```
After:
```javascript
const nameField = document.getElementById('enquiry-name');
```

---

### 💡 Tip
You don’t need to rush — browsers still support `var`, but using `const` and `let` makes your code cleaner, safer, and more professional (especially for your WEDE5020 project rubric).  

Would you like me to show you a **quick find‑and‑replace pattern** in VS Code to update all `var` declarations automatically?
[MESSAGE I RECEIVED] 

what is a wireframe [PROMPT]
A **wireframe** is essentially a **blueprint for a website or app**. It’s a simple, visual guide that shows the layout and structure of a page before any design details (like colors, fonts, or images) are added. Think of it as the skeleton of your site.  

---

### 🧩 Key Characteristics of Wireframes
- **Low‑fidelity**: Usually black, white, or grey with simple boxes and lines.  
- **Focus on structure**: Shows where elements like navigation bars, product grids, buttons, and forms will go.  
- **No decoration**: Doesn’t include final images, colors, or branding — just placeholders.  
- **User flow**: Helps visualize how users will move through the site (e.g., from Home → Products → Checkout).  

---

### ✅ Why Wireframes Are Important
- **Planning tool**: Lets you organize content and functionality before coding.  
- **Communication**: Helps explain ideas to clients, lecturers, or teammates.  
- **Efficiency**: Saves time by spotting layout issues early.  
- **Usability testing**: You can check navigation and flow before investing in design.  

---

### 🧠 Example
Imagine your **Products Page** wireframe:  
- A **top bar** with navigation links.  
- A **search box** at the top.  
- A **grid of product cards** (each card is just a grey box with “Image” and “Description” labels).  
- A **footer** with contact info.  

No colors, no real images — just boxes and text labels showing the structure.  

---

👉 In your proposal, mentioning wireframes shows you understand **professional web development workflow**. You could even add that you’ll create **low‑fidelity wireframes first**, then refine them into **high‑fidelity mockups** before coding. That earns extra marks because it demonstrates planning and design thinking.  

Would you like me to sketch out a **sample wireframe layout description for your bakery’s Home Page** so you can include it in your proposal?  [MESSAGE I RECEIVED]

## Autograding Feedback
This project may be checked automatically in GitHub Classroom on every push.
Use the Actions or autograding results to see which requirements still need improvement.
