import "./App.css";
import { AssistantWidget } from "./components/AssistantWidget";
import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Capabilities } from "./sections/Capabilities";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";

export default function App() {
  return (
    <div className="app-shell min-h-screen text-slate-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Contact />
      </main>
      <AssistantWidget />
    </div>
  );
}
