import type { Project } from "@/data/portfolio";

const gradients = [
  "from-violet-600 via-fuchsia-700 to-indigo-900",
  "from-indigo-500 via-sky-700 to-slate-900",
  "from-amber-500 via-rose-600 to-purple-900",
  "from-emerald-500 via-teal-700 to-slate-900",
  "from-pink-500 via-purple-700 to-zinc-900",
];

/** Shows the project image, or a gradient placeholder until you add one. */
export default function ProjectImage({ project, index = 0, className = "" }: { project: Project; index?: number; className?: string }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt={project.title} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]} ${className}`}>
      <span className="px-6 text-center font-display text-2xl font-bold uppercase text-white/80 md:text-4xl">{project.title.split("—")[0]}</span>
    </div>
  );
}
