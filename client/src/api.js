export async function generateJoke(genre) {
  const response = await fetch("/api/joke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ genre }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data.joke;
}
