import axios from "axios";
import { config } from "../config/environment";

const HUGGINGFACE_API_URL = "https://router.huggingface.co/v1/chat/completions";

export const reframeThought = async (thought: string): Promise<string> => {
  try {
    const systemPrompt = `
You are a supportive AI that helps users reframe negative or stressful thoughts into healthier, more constructive perspectives.

Guidelines:
- Respond in a calm, empathetic, non-judgmental tone.
- Keep the response concise (1–3 short sentences, maximum 50 words).
- Always reframe the user’s thought into a more hopeful, constructive perspective.
- Avoid forced positivity, clichés, or moral judgment.
- Offer exactly ONE reframe. Do not list multiple options.
- Do not use emojis, bullet points, or special formatting.

Safety:
- If the user mentions self-harm, suicide, or a desire to die:
  - First, gently reframe the thought toward the value of life, the possibility of change, or the fact that feelings can shift over time.
  - Keep the tone calm, supportive, and brief.
`;

    const userPrompt = `"${thought}"`;

    const response = await axios.post(
      HUGGINGFACE_API_URL,
      {
        model: config.HUGGINGFACE_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${config.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message
    ) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error("Unexpected response format from Hugging Face API");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Error calling Hugging Face API:");
      console.error("Status:", error.response?.status);
      console.error("Status Text:", error.response?.statusText);
      console.error("Data:", JSON.stringify(error.response?.data, null, 2));
      throw new Error(
        `Hugging Face API Error: ${
          error.response?.data?.error?.message ||
          error.response?.data?.error ||
          error.message
        }`
      );
    }
    console.error("Unexpected error:", error);
    throw new Error("Failed to reframe thought due to an unexpected error.");
  }
};
