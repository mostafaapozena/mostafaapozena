import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import ProjectImage from "@/components/ProjectImage";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? p.title : "Project" };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="px-6 pb-20 pt-36 md:px-12">
      <Link href="/#projects" className="text-sm text-muted link-underline">← Back to projects</Link>
      <Reveal className="mt-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{p.category} · {p.year}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-8xl">{p.title}</h1>
      </Reveal>
      <Reveal delay={0.2} className="mt-14 aspect-[16/9] overflow-hidden rounded-3xl">
        <ProjectImage project={p} index={index} />
      </Reveal>
      <Reveal childrenStagger className="mt-14 grid gap-10 md:grid-cols-[2fr_1fr]">
        <p className="text-lg leading-relaxed text-fg/80">{p.longDescription ?? p.description}</p>
        <div className="space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Technologies</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</span>)}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold">Live demo ↗</a>}
            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-6 py-3 text-sm">GitHub ↗</a>}
          </div>
        </div>
      </Reveal>
      <Link href={`/projects/${next.slug}`} className="group mt-32 block border-t border-line pt-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Next project</p>
        <p className="mt-4 font-display text-4xl font-bold uppercase transition group-hover:text-accent md:text-7xl">{next.title} →</p>
      </Link>
    </main>
  );
}
