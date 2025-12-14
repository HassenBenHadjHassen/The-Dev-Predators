import axios from "axios";
import { config } from "../config/environment";

const HUGGINGFACE_API_URL = "https://router.huggingface.co/v1/chat/completions";

interface ReframedResponse {
  reframedThought: string;
  reasoning: string;
}

export const reframeThought = async (
  thought: string
): Promise<ReframedResponse> => {
  try {
    const systemPrompt = `
You are a supportive AI that rewrites negative or stressful thoughts into healthier, more constructive internal thoughts.

Rules:
- Rewrite the thought as a natural inner thought someone might tell themselves.
- Always use first-person ("I").
- The reframed thought must sound emotional and personal, not neutral or academic.
- Keep the reframed thought under 25 words.
- Provide a short reason written as inner self-talk, not an explanation.
- The reasoning should sound like a quiet thought in someone’s head.
- Do NOT use abstract, analytical, or editorial language.
- Avoid words like: aspect, identity, perspective, acknowledge, allow, focus, process, change.
- Keep the reasoning under 25 words.
- Output ONLY a strict JSON object with no extra text.
- The JSON object must contain exactly these keys: "reframedThought", "reasoning".

Example Output:
{
  "reframedThought": "I feel frustrated right now, but that doesn’t mean everything is broken.",
  "reasoning": "I’m upset because I care, not because there’s no hope."
}
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
        response_format: { type: "json_object" },
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
      const content = response.data.choices[0].message.content.trim();
      try {
        // Remove any markdown code blocks if the model adds them despite instructions
        const cleanContent = content.replace(/^```json\s*|\s*```$/g, "");
        return JSON.parse(cleanContent) as ReframedResponse;
      } catch (parseError) {
        console.error("Failed to parse JSON response:", content);
        throw new Error("AI response was not valid JSON");
      }
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
