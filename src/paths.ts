// Vite supplies "/" for domain-root hosting and the repository path for Pages.
const base = import.meta.env.BASE_URL;

export function sitePath(path: string): string {
  return /^\/(?!\/)/.test(path) ? base + path.slice(1) : path;
}

export function pagePath(pathname: string): string {
  if (pathname === base.slice(0, -1)) return "/";
  return pathname.startsWith(base)
    ? "/" + pathname.slice(base.length)
    : pathname;
}

// Templates use site-root URLs. Resolve them before inserting the markup so
// links, video sources, and reduced-motion posters share the same build base.
export function withBasePaths(html: string): string {
  return html.replace(
    /\b(href|src|poster|data-gif|data-poster)="(\/(?!\/)[^"]*)"/g,
    (_, attribute: string, path: string) => `${attribute}="${sitePath(path)}"`,
  );
}
