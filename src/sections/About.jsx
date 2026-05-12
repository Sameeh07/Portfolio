import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { bioFacts, profile } from "../data/portfolio";

export function About() {
  return (
    <Section
      id="focus"
      eyebrow="Profile"
      title="Building AI products across agents, apps, and backend systems."
      intro="I keep the portfolio concise and let the assistant or resume carry the deeper detail. The short version: I build practical AI systems across product, backend, data, and deployment."
    >
      <div className="about-layout">
        <Reveal>
          <div className="about-photo-card">
            <img src={profile.bioPhoto} alt="Abdul Sameeh K" className="about-photo" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bio-panel">
            <p className="text-lg leading-9 text-slate-300">{profile.bio}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {bioFacts.map((fact) => (
                <Metric key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric-tile">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
