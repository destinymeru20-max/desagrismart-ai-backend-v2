
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const PORT = process.env.PORT || 10000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    name: "DesagriSmart AI",
    status: "live",
    message: "Agricultural AI backend is running."
  });
});

app.get("/api", (req, res) => {
  res.json({
    status: "live",
    ai: "OpenAI integration configured"
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
        error: "AI service is not configured yet."
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",

      instructions: `
You are DesagriSmart AI, an agricultural assistant.

Your mission is to help farmers in Nigeria and worldwide.

You specialize in:
1. Crop Intelligence
2. Livestock Intelligence
3. Fishery Intelligence
4. Soil Science
5. Plant Disease Research
6. Agricultural Research
7. Farm Business Management
8. Weather and Climate
9. Agricultural Education

Give clear, practical and accurate agricultural answers.

Use Nigerian farming examples when relevant.
Explain difficult agricultural terms simply.
Never invent weather forecasts, market prices or research findings.
Ask for the farmer's location when location matters.
Explain uncertainty when information is incomplete.
For serious animal diseases or crop emergencies,
recommend consulting a qualified agricultural professional.

Answer in a friendly, organized and helpful way.
`,

      input: `
Agriculture department: ${department || "General Agriculture"}

Farmer's question:
${question.trim()}
`
    });
  } catch (error) {
    console.error("AI request failed:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type
    });

    res.status(500).json({
      error: "AI request failed. Please check the Render application logs."
    });
  }
    

    res.json({
      success: true,
      department: department || "General Agriculture",
      answer: response.output_text
    });

  
