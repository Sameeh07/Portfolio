import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { focusAreas } from "../data/portfolio";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="What I build"
      title="A practical mix of AI engineering and product software."
      intro="These are the areas I did contribute to without turning the site into a long skills matrix."
    >
      <div className="focus-list">
        {focusAreas.map((area, index) => {
          const Icon = area.icon;
          return (
            <Reveal key={area.title} delay={index * 0.04}>
              <article className="focus-row">
                <div className="focus-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="focus-icon">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
