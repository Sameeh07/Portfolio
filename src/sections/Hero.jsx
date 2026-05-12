import { ArrowDown } from "lucide-react";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/portfolio";

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-inner mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-24 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pt-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-5">AI engineer and full-stack builder</p>
            <h1 className="hero-title">
              <span>Building AI products</span>
              <span className="hero-title-muted">that feel usable.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#capabilities" icon={ArrowDown}>
                What I build
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <img src={profile.heroPhoto} alt="Abdul Sameeh K" className="hero-portrait-image" />
            </div>
            <div className="hero-portrait-card hero-portrait-card--top">
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>
            <div className="hero-portrait-card hero-portrait-card--bottom">
              <span>Focus</span>
              <strong>Agents, full-stack development, scaling</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
