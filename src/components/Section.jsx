import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  headerClassName = "",
}) {
  return (
    <section id={id} className={`section-wrap ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {(eyebrow || title || intro) && (
          <Reveal className={`section-heading ${headerClassName}`}>
            {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section-title">{title}</h2> : null}
            {intro ? <p className="section-intro">{intro}</p> : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
