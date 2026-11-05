import express from "express";
import cors from "cors";
import OpenAI from "openai";
const app = express();
app.use(cors());
app.use(express.json());
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.get("/", (req, res) => res.send("DesagriSmart AI Backend is LIVE"));
app.post("/api/ask", async (req, res) => {
  try {
    const { question, department } = req.body;
    if (!process.env.OPENAI_API_KEY) {
      return res.json({ answer: `For ${department}: ${question} - Add OPENAI_API_KEY in Render.` });
    }
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are DesagriSmart AI, expert in ${department} for Nigerian farmers. Give short practical local advice.` },
        { role: "user", content: question }
      ],
      max_tokens: 500
    });
    res.json({ answer: completion.choices[0].message.content });
  } catch (e) {
    res.json({ answer: "Backend busy, try again in 30 sec." });
  }
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Live on " + PORT));
