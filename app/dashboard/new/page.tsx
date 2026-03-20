'use client';

import { useState } from 'react';

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [result, setResult] = useState<{ short_url: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    const body: any = { url };
    if (title) body.title = title;
    if (customCode) body.custom_code = customCode;
    if (expiresAt) body.expires_at = new Date(expiresAt).toISOString();

    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.short_url) {
        setResult(data);
        setUrl('');
        setTitle('');
        setCustomCode('');
        setExpiresAt('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-6">Shorten a URL</h1>

      <div className="glass-card p-6 max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-1.5">Destination URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              required
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-1.5">Title (optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My awesome link"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-1.5">
              Custom short code (optional)
              <span className="text-text-disabled ml-1">Pro+</span>
            </label>
            <input
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="my-link"
              pattern="[a-zA-Z0-9_-]+"
              minLength={3}
              maxLength={32}
              className="input-field"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs text-text-secondary mb-1.5">
              Expires at (optional)
              <span className="text-text-disabled ml-1">Pro+</span>
            </label>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="input-field"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-lime">
            {loading ? 'Creating...' : 'Shorten URL'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-xl" style={{
            background: 'rgba(163, 230, 53, 0.06)',
            border: '1px solid rgba(163, 230, 53, 0.2)',
          }}>
            <div className="text-xs text-text-muted mb-1">Your short URL:</div>
            <div className="flex items-center gap-3">
              <a href={result.short_url} target="_blank" rel="noopener"
                className="text-lime-main text-lg font-semibold no-underline hover:underline">
                {result.short_url}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.short_url);
                }}
                className="btn-glass text-xs"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
