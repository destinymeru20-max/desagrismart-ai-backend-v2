
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({
    name: "DesagriSmart AI",
    status: "live",
    message: "Agricultural AI backend is running."
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question, department } = req.body || {};

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Please enter an agricultural question."
      });
    }

    if (question.length > 4000) {
      return res.status(400).json({
        error: "Your question is too long."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "AI service is not configured."
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions: `
You are DesagriSmart AI, an agricultural assistant
helping farmers in Nigeria and worldwide.

You specialize in crop production, livestock,
fishery, soil science, plant diseases, agricultural
research, farm business, weather and education.

Give practical, accurate answers in simple language.
Use Nigerian farming examples when relevant.
Never invent weather forecasts or market prices.
Explain uncertainty when information is incomplete.
Recommend qualified agricultural professionals
for serious crop or animal health problems.
`,
      input: `
Department: ${department || "General Agriculture"}

Farmer's question:
${question.trim()}
`
    });

    const answer = response.output_text;

    if (!answer) {
      throw new Error("The AI returned an empty answer.");
    }

    res.json({
      success: true,
      department: department || "General Agriculture",
      answer
    });

  } catch (error) {
    console.error("AI request failed:", {
      message: error.message,
      status: error.status,
      code: error.code
    });

    res.status(500).json({
      error: "AI request failed. Please check the backend logs."
    });
  }
});

app.listen(PORT, () => {
  console.log("DesagriSmart AI server running on port " + PORT);
});
    
