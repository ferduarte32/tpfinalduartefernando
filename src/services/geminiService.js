export const getGeminiResponse = async (text) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const respuestaAI =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no tengo una respuesta.";

    return respuestaAI;

  } catch (error) {
    console.error("Error al obtener respuesta de Gemini:", error);
    return "Hubo un error al conectarse con la inteligencia artificial.";
  }
};
