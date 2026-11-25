import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import Stack from "@/components/Stack";
import ProjectsList from "@/components/ProjectsList";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { testimonials } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Hero />
      <Services />
      <Experience />
      <FeaturedProjects />
      <Stack />
      <ProjectsList />
      {testimonials.length > 0 && <Testimonials />}
      <Contact />
    </main>
  );
}
