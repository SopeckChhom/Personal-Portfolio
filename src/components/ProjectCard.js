import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  github,
  demo,
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-lg shadow-black/30">
      {image && (
        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            draggable={false}
            className="object-cover"
          />
        </div>
      )}

      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-4 flex-1 leading-7 text-slate-300">{description}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300"
          >
            {technology}
          </span>
        ))}
      </div>

      {(github || demo) && (
        <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-800 pt-5">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
            >
              GitHub Repo →
            </a>
          )}

          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
            >
              Demo →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
