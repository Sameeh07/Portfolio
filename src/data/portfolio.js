import {
  AudioLines,
  Bot,
  BrainCircuit,
  CloudCog,
  Layers3,
} from "lucide-react";
import bioPortrait from "../assets/grad.jpg";
import heroPortrait from "../assets/portfolio_pic.png";

export const profile = {
  name: "Abdul Sameeh K",
  shortName: "Sameeh",
  role: "AI Engineer",
  location: "India",
  heroPhoto: heroPortrait,
  bioPhoto: bioPortrait,
  email: "abdulsameehk786@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1kMNxjg7o7xEDAA31HTxx00i2PqstdsJ4/view?usp=sharing",
  intro:
    "AI Developer and Founding Engineer at NeuraLake AI, building AI agents, CRM workflows, voice systems, RAG pipelines, and full-stack product experiences.",
  bio:
    "I work as an AI Developer and Founding Engineer at NeuraLake AI, where I build across customer-facing agents, CRM platform development, voice systems, RAG pipelines, React Native and web experiences, backend services, notifications, crawler systems, and GCP deployments. I graduated from Visvesvaraya Technological University with a Bachelor of Engineering in Artificial Intelligence and Machine Learning, and my day-to-day work is full-stack AI engineering: understanding the product, designing the backend, shaping the interface, and making the system deployable.",
};

export const links = [
  {
    label: "Resume",
    href: profile.resumeUrl,
    type: "resume",
  },
  {
    label: "GitHub",
    href: "https://github.com/sameeh07",
    type: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sameehk",
    type: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/abdul.sameeh.k",
    type: "instagram",
  },
];

export const bioFacts = [
  {
    label: "Current work",
    value: "AI Developer and Founding Engineer, NeuraLake AI",
  },
  {
    label: "Engineering range",
    value: "AI, backend, frontend, cloud",
  },
  {
    label: "Education",
    value: "B.E. Artificial Intelligence and Machine Learning, VTU",
  },
];

export const focusAreas = [
  {
    title: "Agentic product systems",
    icon: Bot,
    text:
      "Designing AI agents for lead generation, CRM actions, booking flows, email workflows, web search, and user-permission-aware execution.",
  },
  {
    title: "Full-stack AI applications",
    icon: Layers3,
    text:
      "Building React, React Native, FastAPI, notification, crawler, and deployment layers needed to turn AI features into usable software.",
  },
  {
    title: "Voice and realtime experiences",
    icon: AudioLines,
    text:
      "Working with LiveKit, streaming audio, STT/TTS, and interruptible agent loops for low-latency conversational experiences.",
  },
  {
    title: "Retrieval and applied ML",
    icon: BrainCircuit,
    text:
      "Using LangGraph, ReAct patterns, OpenAI embeddings, Firestore vector search, and ML fundamentals to ground AI systems in useful context.",
  },
  {
    title: "Production delivery",
    icon: CloudCog,
    text:
      "Owning practical deployment work across GCP, Dockerized components, CI/CD workflows, app updates, and scaling considerations.",
  },
];

export const assistantPrompts = [
  "What kind of AI systems has Sameeh built?",
  "Can Sameeh build full-stack AI products?",
  "What is Sameeh's strongest technical stack?",
];
