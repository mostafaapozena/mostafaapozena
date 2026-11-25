// =====================================================================
//  كل محتوى الموقع هنا. عدّلي البيانات دي بس والموقع كله هيتحدث.
//  All site content lives here. Replace the placeholders with your data.
// =====================================================================

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  tags: string[];
  /** Put images in /public/projects and use "/projects/my-image.jpg" */
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const profile = {
  firstName: "YOUR",
  lastName: "NAME",
  role: "Front-End Developer",
  location: "Based in Egypt",
  availability: "Available for work & freelance",
  signature: "Your Name",
  intro:
    "I build fast, accessible and animated web experiences with Next.js, TypeScript and GSAP. Replace this paragraph with a short bio about you.",
  email: "hello@example.com",
  phone: "+20 100 000 0000",
  year: "2026",
  cvUrl: "#", // e.g. "/cv.pdf" after adding the file to /public
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
    { label: "Instagram", href: "https://instagram.com/" },
  ],
};

export const services = [
  {
    title: "Web Development",
    description:
      "Interfaces built with intention: responsive, accessible and easy to use on every screen.",
    points: ["Next.js & React apps", "Responsive layouts", "Performance first"],
  },
  {
    title: "Motion & Interaction",
    description:
      "Scroll-driven storytelling and micro-interactions that make a product feel alive.",
    points: ["GSAP timelines", "Smooth scroll with Lenis", "Creative transitions"],
  },
  {
    title: "Advanced Solutions",
    description:
      "Dashboards, e-commerce and integrations that solve real business problems.",
    points: ["Progressive Web Apps", "Complex integrations", "Admin dashboards"],
  },
  {
    title: "Code Optimization",
    description:
      "Clean, typed, maintainable code that scales with your team and your product.",
    points: ["TypeScript everywhere", "Core Web Vitals", "Refactoring legacy code"],
  },
];

export const experience = [
  {
    role: "Freelance Front-End Developer",
    company: "Self-employed",
    period: "2025 — Present",
    description:
      "Placeholder: describe the kind of clients and projects you work on as a freelancer.",
  },
  {
    role: "Front-End Developer",
    company: "Company Name",
    period: "2024 — 2025",
    description:
      "Placeholder: what you built, the stack you used and the impact you made.",
  },
  {
    role: "Front-End Intern",
    company: "Company Name",
    period: "2023 — 2024",
    description: "Placeholder: what you learned and shipped during the internship.",
  },
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One — E-Commerce Platform",
    category: "E-Commerce",
    year: "2025",
    description: "Short description of the project and the problem it solves.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    slug: "project-two",
    title: "Project Two — Learning Dashboard",
    category: "Dashboard",
    year: "2025",
    description: "Admin & instructor dashboard with analytics and role management.",
    tags: ["React", "Redux", "Charts"],
    featured: true,
    liveUrl: "#",
  },
  {
    slug: "project-three",
    title: "Project Three — 3D Landing Page",
    category: "Landing Page",
    year: "2024",
    description: "An interactive landing page with scroll-driven 3D motion.",
    tags: ["GSAP", "Three.js", "Lenis"],
    featured: true,
    liveUrl: "#",
  },
  {
    slug: "project-four",
    title: "Project Four — Restaurant Website",
    category: "Website",
    year: "2024",
    description: "Menu, reservations and a smooth, appetising browsing experience.",
    tags: ["Next.js", "Framer Motion"],
    liveUrl: "#",
  },
  {
    slug: "project-five",
    title: "Project Five — Medical Platform",
    category: "Web App",
    year: "2024",
    description: "Booking platform with an admin dashboard and doctor profiles.",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
  },
  {
    slug: "project-six",
    title: "Project Six — Personal Blog",
    category: "Website",
    year: "2023",
    description: "A fast MDX blog with dark mode and great typography.",
    tags: ["Next.js", "MDX"],
    liveUrl: "#",
  },
];

export const stack = [
  {
    group: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "GSAP", "Lenis", "Framer Motion"],
  },
  { group: "Backend", items: ["Node.js", "Express", "MongoDB", "Firebase"] },
  { group: "Tools", items: ["Git", "GitHub", "Figma", "Vercel", "VS Code"] },
];

export const testimonials = [
  { name: "Client Name", role: "Founder, Company", quote: "Placeholder testimonial. Replace with real feedback from a client or teammate." },
  { name: "Client Name", role: "Product Manager", quote: "Delivered on time with great attention to detail and smooth animations." },
  { name: "Client Name", role: "CEO, Startup", quote: "Our new site loads fast and looks amazing on every device." },
  { name: "Client Name", role: "Designer", quote: "Translated my Figma designs pixel-perfectly, motion included." },
  { name: "Client Name", role: "Marketing Lead", quote: "Conversions went up after the redesign. Highly recommended." },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
