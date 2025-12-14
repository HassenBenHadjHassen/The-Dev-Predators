import { reframeThought } from "../services/aiService";

async function verify() {
  const thought = "Im sad because i hate my country";
  console.log("Original Thought:", thought);
  try {
    const result = await reframeThought(thought);
    console.log("Reframed Thought:", result.reframedThought);
    console.log("Reasoning:", result.reasoning);

    if (result.reframedThought && result.reasoning) {
      console.log("Verification SUCCESS: Both fields are present.");
    } else {
      console.log("Verification FAILED: Missing fields.");
    }
  } catch (error) {
    console.error("Verification Error:", error);
  }
}

verify();
