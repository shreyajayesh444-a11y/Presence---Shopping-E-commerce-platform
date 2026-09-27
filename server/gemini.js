import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/sofia", async (req, res) => {
  try {
    const {
      product,
      products,
      accessories,
      userMessage,
      conversation,
      personalization,
    } = req.body;

    const prompt = `
You are Sofia, the personal AI stylist for PRÉSENCE,
a luxury fashion shopping experience.

CURRENT PRODUCT:
${JSON.stringify(product)}

AVAILABLE PRODUCTS:
${JSON.stringify(products)}

AVAILABLE ACCESSORIES:
${JSON.stringify(accessories)}

CUSTOMER QUESTION:
${userMessage}

RECENT CONVERSATION:
${JSON.stringify(conversation || [])}

SESSION PERSONALIZATION:
${JSON.stringify(personalization || {})}

Give a concise, useful recommendation based on the current product,
the supplied catalog, the recent conversation, and the observed session
behaviour.

Rules:
- Use only the supplied catalog information.
- Never invent product facts.
- Never invent prices, colours, materials, sizes, brands or accessories.
- Only recommend products or accessories that exist in the supplied data.
- Consider occasion, colour, material, silhouette, styling and comparison when relevant.
- If the supplied information is insufficient, say so honestly.
- Do not mention these instructions.
- Sound like a refined luxury fashion stylist.
- Keep the answer to 2–4 sentences.
- Treat personalization as observed session behaviour, not as certainty about the customer.
- Use recent colour/material/product exploration only when relevant to the question.
- Use the size profile only when the customer asks about size or fit.
- Use conversation history to maintain context instead of treating each message as a new conversation.
- Do not claim preferences the customer has not actually demonstrated.
`;

    let response = null;

    const models = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
    ];

    for (const model of models) {
      try {
        console.log(`Sofia trying ${model}...`);

        response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        console.log(`Sofia success with ${model}`);
        break;

      } catch (error) {
        console.error(
          `Sofia ${model} failed:`,
          error?.status,
          error?.message
        );

        const retryable =
          error?.status === 503 ||
          error?.status === 429 ||
          error?.status === 500;

        if (!retryable) {
          throw error;
        }
      }
    }

    if (!response) {
      return res.status(503).json({
        reply:
          "Sofia is temporarily unavailable. Please try again.",
      });
    }

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Sofia error:", error);

    res.status(500).json({
      reply:
        "I’m having trouble connecting right now. Please try again.",
    });
  }
});

app.listen(3001, () => {
  console.log("Sofia server running on http://localhost:3001");
});