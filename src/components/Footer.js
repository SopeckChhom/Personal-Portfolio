import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">Version 2.4</p>

        <div className="flex items-center gap-3">
          <a
            href="mailto:s.chhom15@gmail.com"
            aria-label="Email"
            className="rounded-lg p-2 text-slate-400 transition hover:text-indigo-400"
          >
            <MailIcon />
          </a>

          <a
            href="https://linkedin.com/in/brandon-chhom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 text-slate-400 transition hover:text-indigo-400"
          >
            <LinkedInIcon />
          </a>

          <a
            href="https://github.com/BrandonChhom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-slate-400 transition hover:text-indigo-400"
          >
            <GitHubIcon />
          </a>

          <a
            href="#"
            aria-label="Back to top"
            className=" border-slate-700 p-2 text-slate-400 transition hover:border-indigo-400 hover:text-indigo-400"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
