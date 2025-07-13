import mook_data from "../data/contact-mook.js"; // Asegurate que este archivo exista y tenga datos

export const getMessagesByContactId = (contact_id) => {
  for (const contact of mook_data.contacts) {
    if (Number(contact.id) === Number(contact_id)) {
      return contact.messages;
    }
  }
  return [];
};

export const getGeminiResponse = async (text, contact_id = "Messi") => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Simula que sos ${getJugadorPorId(contact_id)} y respondé como él. Usuario: ${text}`
            }
          ]
        }
      ]
    })
  });

  const data = await res.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No entendí bien lo que dijiste.";
};

// Podés personalizar esto con más nombres
const getJugadorPorId = (id) => {
  const jugadores = {
    1: "Lionel Messi",
    2: "Emiliano Dibu Martínez",
    3: "Nicolás Otamendi",
    4: "Nahuel Molina",
    5: "Rodrigo De Paul",
    6: "Enzo Fernández",
    7: "Ángel Di María",
    8: "Alexis Mac Allister",
    9: "Julián Álvarez",
    10: "Nicolás Tagliafico",
    11: "Kylian Mbappé"
  };
  return jugadores[id] || "un jugador de fútbol";
};
