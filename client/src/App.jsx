import { useState } from "react";
import { generateJoke } from "./api.js";
import { GENRES } from "./genres.js";

export default function App() {
  const [genre, setGenre] = useState(GENRES[0]);
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setJoke("");

    try {
      const result = await generateJoke(genre);
      setJoke(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <img className="brand-logo" src="/logo.png" alt="Joker logo" width={72} height={72} />
        <h1>Joker</h1>
        <p className="tagline">Pick a genre. Get a joke. That's it!</p>
      </header>

      <main className="main">
        <section className="controls">
          <label className="label" htmlFor="genre-select">
            Pick a genre
          </label>
          <div className="genre-grid">
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"
                className={`genre-pill ${genre === g ? "active" : ""}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Finding a joke..." : "Generate joke"}
          </button>
        </section>

        <section className="joke-card">
          {loading && (
            <div className="loading">
              <div className="spinner" />
              <p>Shuffling the deck...</p>
            </div>
          )}

          {!loading && error && <p className="error">{error}</p>}

          {!loading && !error && joke && (
            <blockquote className="joke-text">{joke}</blockquote>
          )}

          {!loading && !error && !joke && (
            <p className="placeholder">
              Choose a genre and hit generate to get your first joke.
            </p>
          )}
        </section>
      </main>

      <footer className="footer">Made by Joker</footer>
    </div>
  );
}
