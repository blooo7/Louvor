"use client";

import { useState } from "react";

export function YouTubeSearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<
    { id: string; title: string; url: string }[]
  >([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/youtube-search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch YouTube results");
      }
      const data = await res.json();
      setResults(data.items || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="form mb-md">
        <div className="form-row grid-2">
          <label>
            Search query
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Song title, artist, etc."
            />
          </label>
          <div className="button-row align-end">
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {error && <p className="error-text">{error}</p>}

      <ul className="simple-list">
        {results.map((video) => (
          <li key={video.id}>
            <a href={video.url} target="_blank" rel="noreferrer">
              {video.title}
            </a>
          </li>
        ))}
        {!loading && !error && results.length === 0 && (
          <p className="muted">No results yet. Try searching for a song.</p>
        )}
      </ul>
    </div>
  );
}
