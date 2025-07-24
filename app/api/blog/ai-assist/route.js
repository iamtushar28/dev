import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  const { type, title, content } = await req.json();

  try {
    let prompt = "";
    if (type === "enhanceTitle") {
      prompt = `Enhance this blog title to make it more compelling and SEO-friendly. Return only one line improved title:\n\n"${title}"`;
    } else if (type === "generateContent") {
      prompt = `Generate a detailed blog post (400–500 words) based on this title: "${title}" Include an engaging introduction, a clear body, and a strong conclusion. Return the entire post in valid HTML format (including <p>, <h2>, <ul>, etc.) so it can be rendered directly inside a rich-text editor like Tiptap. Do not include markdown or plain text — only HTML.`;
    } else if (type === "suggestKeywords") {
      prompt = `Suggest 5 concise, SEO-optimized keywords for the blog title: '${title}'. Each keyword should be a single joined phrase without spaces (e.g., riseofai, aiengineer). Return them as a plain, comma-separated list with no formatting or explanations.`;
    } else {
      return Response.json({ error: "Invalid action type" }, { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (type === "enhanceTitle") {
      return Response.json({ title: text.trim() });
    } else if (type === "generateContent") {
      return Response.json({ content: text.trim() });
    } else if (type === "suggestKeywords") {
      return Response.json({
        keywords: text
          .trim()
          .split(/\n|,|-/)
          .map((k) => k.trim())
          .filter(Boolean),
      });
    }
  } catch (err) {
    console.error("AI Error:", err);
    return Response.json({ error: "AI generation failed" }, { status: 500 });
  }
}
