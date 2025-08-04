import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const { type, title } = await req.json();

    if (!type || !title) {
      return new Response(JSON.stringify({ error: "Missing type or title" }), {
        status: 400,
      });
    }

    let prompt = "";

    switch (type) {
      case "enhanceTitle":
        prompt = `Improve this blog title for clarity and SEO. Respond with only the revised title:\n"${title}"`;
        break;

      case "generateContent":
        prompt = `Write a 230-240 word blog post titled "${title}". Use clear <h2>, <p>, and <ul> HTML tags. Do not return markdown or code blocks. Output only valid HTML.`;
        break;

      case "suggestKeywords":
        prompt = `Generate 5 SEO keywords for: "${title}". Single word (e.g. ai, webdev) or a joined phrase without spaces (e.g., fullstackdeveloper, remoteworktips). Return only a comma-separated list.`;
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid action type" }), {
          status: 400,
        });
    }

    // Use streaming for content generation
    if (type === "generateContent") {
      const result = await model.generateContentStream(prompt);
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              controller.enqueue(encoder.encode(text));
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
        },
      });
    }

    // For enhanceTitle and suggestKeywords
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    if (type === "enhanceTitle") {
      return new Response(JSON.stringify({ title: text }), { status: 200 });
    }

    if (type === "suggestKeywords") {
      const keywords = text
        .split(/[\n,|-]/)
        .map((k) => k.trim())
        .filter(Boolean);

      return new Response(JSON.stringify({ keywords }), { status: 200 });
    }

    // Fallback
    return new Response(JSON.stringify({ error: "Unhandled type" }), {
      status: 400,
    });
  } catch (err) {
    console.error("AI Assist Error:", err);
    return new Response(
      JSON.stringify({
        error: err.message?.includes("timeout")
          ? "AI generation timed out. Please try again."
          : "AI generation failed.",
      }),
      { status: 500 }
    );
  }
}
