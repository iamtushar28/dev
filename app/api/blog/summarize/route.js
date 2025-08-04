
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { description } = await req.json();

    if (!description) {
      return new Response(JSON.stringify({ error: "Missing blog description" }), {
        status: 400,
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `summarize the following blog post content in 3-4 sentences:\n\n${description}`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return new Response(JSON.stringify({ summary: text }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error summarizing:', error);
    return new Response(JSON.stringify({ error: 'Failed to summarize blog.' }), {
      status: 500,
    });
  }
}
