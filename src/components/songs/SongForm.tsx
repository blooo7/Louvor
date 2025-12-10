"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type SongFormValues = {
  title: string;
  artist: string;
  key?: string;
  tags?: string;
  lyricsText?: string;
  lyricsUrl?: string;
  lastPlayedDate?: string;
  playCount: number;
  notes?: string;
};

export function SongForm({
  initialValues,
  songId,
}: {
  initialValues: SongFormValues;
  songId?: number;
}) {
  const router = useRouter();
  const [values, setValues] = useState<SongFormValues>(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(songId ? `/api/songs/${songId}` : "/api/songs", {
        method: songId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save song");
      }

      const data = await res.json();
      router.push(`/songs/${data.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error-text">{error}</p>}

      <div className="form-row">
        <label>
          Title
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Artist / Band
          <input
            name="artist"
            value={values.artist}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-row grid-2">
        <label>
          Key / Tone
          <input name="key" value={values.key || ""} onChange={handleChange} />
        </label>
        <label>
          Tags / Category (comma separated)
          <input
            name="tags"
            value={values.tags || ""}
            onChange={handleChange}
            placeholder="worship, fast, slow"
          />
        </label>
      </div>

      <div className="form-row grid-2">
        <label>
          Last played date
          <input
            type="date"
            name="lastPlayedDate"
            value={values.lastPlayedDate || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Play count
          <input
            type="number"
            name="playCount"
            value={values.playCount}
            onChange={handleChange}
            min={0}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Lyrics text
          <textarea
            name="lyricsText"
            value={values.lyricsText || ""}
            onChange={handleChange}
            rows={6}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Lyrics URL (if not storing full lyrics)
          <input
            name="lyricsUrl"
            value={values.lyricsUrl || ""}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Notes
          <textarea
            name="notes"
            value={values.notes || ""}
            onChange={handleChange}
            rows={3}
          />
        </label>
      </div>

      <div className="button-row">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving..." : "Save song"}
        </button>
      </div>
    </form>
  );
}
