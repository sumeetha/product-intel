import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";

const baseComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-3 text-2xl font-bold tracking-tight first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 text-xl font-bold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 flex items-center gap-2 text-base font-semibold uppercase tracking-wide text-muted-foreground">
      <span className="h-px w-4 bg-border" aria-hidden />
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-4 mb-1 text-sm font-semibold">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 space-y-1.5 pl-5 [&>li]:relative [&>li]:before:absolute [&>li]:before:left-[-1rem] [&>li]:before:top-[0.65em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-primary/60">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-foreground/90">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-primary/40 bg-muted/40 px-4 py-2 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = (className ?? "").startsWith("language-");
    if (isBlock) return <code className={className}>{children}</code>;
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-6 border-border" />,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-3 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/50 px-3 py-2">{children}</td>
  ),
};

const smComponents: Components = {
  ...baseComponents,
  h1: ({ children }) => (
    <h1 className="mt-4 mb-2 text-lg font-bold first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-4 mb-2 text-base font-bold first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-3 mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-2 leading-6 text-sm">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 space-y-1 pl-4 [&>li]:relative [&>li]:before:absolute [&>li]:before:left-[-0.85rem] [&>li]:before:top-[0.55em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-current [&>li]:before:opacity-60">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 marker:font-semibold text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-6 text-sm">{children}</li>,
};

export function Markdown({
  children,
  size = "md",
  className,
}: {
  children: string;
  size?: Size;
  className?: string;
}) {
  const components = size === "sm" ? smComponents : baseComponents;
  return (
    <div className={cn("max-w-none", className)}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
