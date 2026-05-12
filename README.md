# Abdul Sameeh K Portfolio

Immersive AI engineer portfolio built with React, Vite, Tailwind CSS, Framer Motion, and a Netlify Function powered by Groq.

## Structure

- `src/data/portfolio.js` contains profile, links, bio facts, focus areas, and assistant prompts.
- `src/sections/` contains the visible portfolio sections.
- `src/components/` contains reusable UI pieces and the Sameeh assistant widget.
- `src/content/knowledgeBase.md` is the assistant knowledge source. Replace it with refined resume/profile content.
- `netlify/functions/ask.js` streams assistant responses through Groq without exposing the API key in the browser.

## Environment

Create a local `.env` file:

```txt
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.1-8b-instant
```

Set the same `GROQ_API_KEY` in Netlify environment variables before deploying.

## Scripts

```bash
npm run dev
npm run dev:netlify
npm run build
npm run preview
```

This project targets Node 20.19+ for Vite and LangChain compatibility. The expected runtime is also recorded in `.node-version`.

## Assistant Checks

The assistant endpoint is a Netlify Function, so plain Vite dev does not run it. Use `npm run dev:netlify` or a deployed Netlify site when testing the widget. The script uses `npx netlify dev`, so it may download the Netlify CLI the first time.

Netlify Dev serves the public site on `http://localhost:8888` and runs Vite internally on port `5174`. Open the `8888` URL, not the Vite target port.

Test the assistant function:

```bash
curl -X POST http://localhost:8888/.netlify/functions/ask \
  -H "Content-Type: application/json" \
  -d '{"message":"What kind of AI systems has Sameeh built?"}'
```
