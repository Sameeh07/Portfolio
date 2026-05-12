import { ArrowUpRight } from "lucide-react";

const variants = {
  primary:
    "border-teal-300/70 bg-teal-300 text-slate-950 shadow-[0_18px_60px_-28px_rgba(45,212,191,0.9)] hover:bg-teal-200",
  secondary:
    "border-white/12 bg-white/[0.04] text-slate-100 hover:border-teal-200/50 hover:bg-teal-200/10",
  ghost:
    "border-transparent bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white",
};

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
  icon,
  ...props
}) {
  const Icon = icon || ArrowUpRight;

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </a>
  );
}
