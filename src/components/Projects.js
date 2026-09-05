import projects from "@/data/projects";
import ProjectCarousel from "./ProjectCarousel";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" label="Projects" />

        <Reveal>
          <ProjectCarousel projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
