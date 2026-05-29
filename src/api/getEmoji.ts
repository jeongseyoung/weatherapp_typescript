export function getEmoji(id: number) {
  if (id >= 200 && id < 300) return "⛈️";
  else if (id >= 300 && id < 400) return "☔";
  else if (id >= 500 && id < 600) return "☔";
  else if (id >= 600 && id < 700) return "❄️";
  else if (id >= 700 && id < 800) return "🌫️";
  else if (id === 800) return "☀️";
  else if (id >= 801 && id < 810) return "☁️";
  else return "❓";
}       
// ⬅️➡️
