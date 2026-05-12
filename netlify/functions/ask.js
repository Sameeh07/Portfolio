import Groq from "groq-sdk";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const MAX_MESSAGE_LENGTH = 900;
const TOP_K = 4;
const encoder = new TextEncoder();
const functionDir = dirname(fileURLToPath(import.meta.url));

let cachedChunks;

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "can",
  "do",
  "does",
  "for",
  "from",
  "has",
  "have",
  "he",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "or",
  "sameeh",
  "that",
  "the",
  "to",
  "what",
  "with",
  "you",
]);

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (request.method !== "POST") {
    return textResponse("Only POST requests are supported.", 405);
  }

  if (!process.env.GROQ_API_KEY) {
    return textResponse(
      "The assistant is not configured yet. Add GROQ_API_KEY in Netlify environment variables.",
      503,
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return textResponse("Invalid JSON request.", 400);
  }

  const message = String(payload?.message || "").trim();
  if (!message) {
    return textResponse("Ask a question about Sameeh first.", 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return textResponse("Please keep the question under 900 characters.", 400);
  }

  try {
    const context = await retrieveContext(message);
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completionStream = await groq.chat.completions.create({
      model: MODEL,
      stream: true,
      temperature: 0.35,
      max_completion_tokens: 650,
      top_p: 1,
      stop: null,
      messages: [
        {
          role: "system",
          content:
            "You are Sameeh, the AI assistant on Abdul Sameeh K's portfolio. Answer in a direct, professional first-person voice when representing Sameeh. Use the provided knowledge context for facts about Sameeh. Do not invent company names, private details, years of experience, metrics, certifications, or claims not supported by context. If the answer is not in the context, say the portfolio knowledge base does not include that detail yet and suggest contacting Sameeh. You may answer general technical questions briefly, but steer back to Sameeh's AI engineering and full-stack work. Keep answers concise. Do not use emojis.",
        },
        {
          role: "user",
          content: `Knowledge context:\n${context}\n\nUser question:\n${message}`,
        },
      ],
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completionStream) {
            const content = chunk.choices?.[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              "\n\nI hit a temporary issue while answering. Please try again in a moment.",
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...corsHeaders(),
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return textResponse(publicFailureMessage(error), 500);
  }
}

async function retrieveContext(message) {
  const chunks = await getKnowledgeChunks();
  const queryTokens = tokenize(message);

  const ranked = chunks
    .map((chunk, index) => ({
      chunk,
      index,
      score: scoreChunk(chunk, queryTokens),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selected = ranked.filter((item) => item.score > 0).slice(0, TOP_K);
  const fallback = ranked.slice(0, Math.min(2, ranked.length));
  return (selected.length ? selected : fallback)
    .map((item, index) => `[Context ${index + 1}]\n${item.chunk}`)
    .join("\n\n");
}

async function getKnowledgeChunks() {
  if (cachedChunks) return cachedChunks;

  const knowledge = await readKnowledgeBase();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 900,
    chunkOverlap: 140,
  });

  const documents = await splitter.createDocuments([knowledge]);
  cachedChunks = documents.map((document) => document.pageContent.trim()).filter(Boolean);
  return cachedChunks;
}

async function readKnowledgeBase() {
  const candidatePaths = [
    resolve(functionDir, "../../src/content/knowledgeBase.md"),
    resolve(process.cwd(), "src/content/knowledgeBase.md"),
    resolve(process.cwd(), "content/knowledgeBase.md"),
  ];

  let lastError;
  for (const filePath of candidatePaths) {
    try {
      return await readFile(filePath, "utf8");
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Knowledge base not found. Checked: ${candidatePaths.join(", ")}. Last error: ${publicErrorText(
      lastError,
    )}`,
  );
}

function scoreChunk(chunk, queryTokens) {
  if (!queryTokens.length) return 0;

  const normalized = chunk.toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (!normalized.includes(token)) return score;
    const weight = token.length > 6 ? 2 : 1;
    return score + weight;
  }, 0);
}

function tokenize(value) {
  return Array.from(
    new Set(
      String(value)
        .toLowerCase()
        .match(/[a-z0-9+#.]+/g)
        ?.filter((token) => token.length > 2 && !stopWords.has(token)) || [],
    ),
  );
}

function textResponse(message, status) {
  return new Response(message, {
    status,
    headers: {
      ...corsHeaders(),
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function publicFailureMessage(error) {
  const detail = publicErrorText(error);

  if (/knowledge base/i.test(detail)) {
    return `Assistant knowledge base is unavailable: ${detail}`;
  }

  if (/api.?key|authentication|unauthorized|401/i.test(detail)) {
    return "Groq authentication failed. Check GROQ_API_KEY in Netlify environment variables.";
  }

  if (/model|not_found|404/i.test(detail)) {
    return `Groq model request failed for ${MODEL}. Check the configured model id.`;
  }

  return "Assistant backend reached the server, but the AI request failed. Check the Netlify function logs for details.";
}

function publicErrorText(error) {
  if (!error) return "unknown error";
  if (error instanceof Error) return error.message;
  return String(error);
}
