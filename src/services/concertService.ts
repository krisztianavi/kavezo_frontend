export const getConcerts = async () => {
  const response = await fetch("http://localhost:3000/concerts");
  return response.json();
};

export const createConcert = async (concert: { artist: string; stime: string; duration: number }) => {
  const response = await fetch("http://localhost:3000/concerts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(concert),
  });
  if (!response.ok) throw new Error("Hiba a koncert létrehozásakor");
};

export const cancelConcert = async (id: number) => {
  const response = await fetch(`http://localhost:3000/concerts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCancelled: true }),
  });

  if (!response.ok) {
    throw new Error("Hiba a koncert lemondásakor");
  }
};
