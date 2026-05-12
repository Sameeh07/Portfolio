import {
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { links, profile } from "../data/portfolio";

const iconMap = {
  email: Mail,
  resume: FileText,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  x: ExternalLink,
};

export function Contact() {
  return (
    <Section
      id="connect"
      eyebrow="Connect"
      title="Let us connect around serious AI and software work."
      intro="The assistant can answer quick questions about my background. For direct conversations, email or social links are the cleanest path."
      className="pb-24"
    >
      <Reveal>
        <div className="contact-panel">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">
              {profile.name}
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI Engineer with full-stack delivery range.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              I am interested in engineering work where AI systems, product thinking,
              backend architecture, and deployment quality all matter.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${profile.email}`} icon={Mail}>
              Email Sameeh
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => {
              const Icon = iconMap[link.type] || ExternalLink;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.type === "email" ? undefined : "_blank"}
                  rel={link.type === "email" ? undefined : "noreferrer"}
                  className="social-link"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
