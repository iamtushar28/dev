import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const { type, title, content } = await req.json();
    let prompt = "";

    if (type === "enhanceTitle") {
      prompt = `Enhance this blog title to make it more compelling and SEO-friendly. Return only one line improved title:\n\n"${title}"`;
    } else if (type === "generateContent") {
      prompt = `Write a 300-350 word blog post titled '${title}'. Format output as valid HTML (with <p>, <h2>, <ul>, etc.) for use in a rich-text editor. Do not include Markdown formatting or triple backticks`;
    } else if (type === "suggestKeywords") {
      prompt = `Suggest 5 concise, SEO-optimized keywords for the blog title: '${title}'. (single joined phrase without spaces & comma-separated (e.g., riseofai, aiengineer).`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid action type" }), {
        status: 400,
      });
    }

    // Use streaming for large content
    if (type === "generateContent") {
      const result = await model.generateContentStream(prompt);
      let fullText = "";

      for await (const chunk of result.stream) {
        fullText += chunk.text();
      }

      return new Response(JSON.stringify({ content: fullText.trim() }), {
        status: 200,
      });
    }

    // Use regular method for short prompts
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    if (type === "enhanceTitle") {
      return new Response(JSON.stringify({ title: text }), { status: 200 });
    } else if (type === "suggestKeywords") {
      const keywords = text
        .split(/[\n,|-]/)
        .map((k) => k.trim())
        .filter(Boolean);

      return new Response(JSON.stringify({ keywords }), { status: 200 });
    }

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
