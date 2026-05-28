import { useState } from "react";
import { generateJoke } from "./api.js";
import { GENRES } from "./genres.js";
import { LANG_NAMES, SPEECH_LANG, speakText, translateJoke } from "./translate.js";

export default function App() {
  const [genre, setGenre] = useState(GENRES[0]);
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("es");
  const [translation, setTranslation] = useState("");
  const [translating, setTranslating] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setJoke("");
    setTranslation("");

    try {
      const result = await generateJoke(genre);
      setJoke(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTranslate() {
    if (!joke) return;

    setTranslating(true);
    try {
      const result = await translateJoke(joke, lang);
      setTranslation(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setTranslating(false);
    }
  }

  function handleReadAloud() {
    const text = translation || joke;
    const speechLang = translation ? SPEECH_LANG[lang] : "en-US";

    try {
      speakText(
        text,
        speechLang,
        () => setSpeaking(true),
        () => setSpeaking(false)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">♠</div>
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

        {joke && !loading && (
          <>
            <section className="joke-tools">
              <div className="joke-actions">
                <button
                  type="button"
                  className={`action-btn ${speaking ? "speaking" : ""}`}
                  onClick={handleReadAloud}
                >
                  {speaking ? "🔊 Reading..." : "🔊 Read aloud"}
                </button>
              </div>
              <div className="translate-row">
                <select
                  className="lang-select"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  aria-label="Choose a language"
                >
                  {Object.entries(LANG_NAMES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="translate-btn"
                  onClick={handleTranslate}
                  disabled={translating}
                >
                  {translating ? "Translating..." : "🌍 Translate joke"}
                </button>
              </div>
            </section>

            {translation && (
              <section className="translation-card">
                <p className="translation-label">{LANG_NAMES[lang]} translation</p>
                <p className="translation-text">{translation}</p>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="footer">Made with ♠ by Joker</footer>
    </div>
  );
}
