'use client';

import { useState, useEffect } from 'react';

interface ApiKey {
  id: number;
  key_prefix: string;
  name: string;
  scopes: string;
  last_used_at: string | null;
  is_active: number;
  created_at: string;
}

const scopeOptions = [
  { value: 'read,write', label: 'Read & Write', desc: 'Full access to create, read, update, and delete URLs' },
  { value: 'read', label: 'Read only', desc: 'Can only list and view URLs and analytics' },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [name, setName] = useState('');
  const [scopes, setScopes] = useState('read,write');
  const [newKey, setNewKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchKeys = async () => {
    const res = await fetch('/api/keys');
    const data = await res.json();
    setKeys(data.keys || []);
    setLoading(false);
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNewKey('');

    const res = await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, scopes }),
    });
    const data = await res.json();
    if (data.key) {
      setNewKey(data.key);
      setName('');
      fetchKeys();
    } else {
      setError(data.error || 'Failed to create key');
    }
  };

  const handleRevoke = async (id: number) => {
    if (!confirm('Revoke this API key? This cannot be undone.')) return;
    const res = await fetch(`/api/keys/${id}`, { method: 'DELETE' });
    if (res.ok) fetchKeys();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-6">API Keys</h1>

      {/* Create */}
      <div className="glass-card p-6 max-w-xl mb-6">
        <h2 className="text-sm font-semibold mb-4">Create API Key</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Production Server, CI Pipeline"
              required
              className="input-field"
            />
          </div>

          {/* Custom scope selector */}
          <div className="mb-5">
            <label className="block text-xs text-text-secondary mb-2">Permissions</label>
            <div className="grid grid-cols-2 gap-3">
              {scopeOptions.map((opt) => {
                const selected = scopes === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setScopes(opt.value)}
                    className="text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer"
                    style={{
                      background: selected ? 'rgba(163, 230, 53, 0.06)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${selected ? 'rgba(163, 230, 53, 0.35)' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: selected ? '0 0 12px rgba(163, 230, 53, 0.06)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {/* Radio indicator */}
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all"
                        style={{
                          border: `2px solid ${selected ? '#a3e635' : 'rgba(255,255,255,0.2)'}`,
                        }}
                      >
                        {selected && (
                          <span className="w-2 h-2 rounded-full bg-lime-main" />
                        )}
                      </span>
                      <span
                        className="text-sm font-medium transition-colors"
                        style={{ color: selected ? '#a3e635' : '#f5f5f4' }}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-text-disabled ml-6 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-lime">Create Key</button>
        </form>

        {newKey && (
          <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="text-xs text-honey-main mb-2.5 font-medium">Copy this key now — it won&apos;t be shown again!</div>
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <code className="text-sm text-text-primary break-all flex-1 font-mono">{newKey}</code>
              <button
                onClick={() => handleCopy(newKey)}
                className="btn-glass text-xs shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold mb-4">Your Keys</h2>
        {loading ? (
          <div className="text-text-disabled text-sm">Loading...</div>
        ) : keys.length > 0 ? (
          <div className="space-y-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="flex items-center gap-4 p-4 rounded-xl transition-all"
                style={{
                  background: k.is_active ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${k.is_active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
                  opacity: k.is_active ? 1 : 0.5,
                }}
              >
                {/* Key icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: k.is_active ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${k.is_active ? 'rgba(163,230,53,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke={k.is_active ? '#a3e635' : '#71717a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <circle cx="7.5" cy="12.5" r="3.5" />
                    <path d="M10.2 9.8L16 4M14 4l2 2M12.5 6.5l2 2" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{k.name}</span>
                    <span
                      className="text-[0.6rem] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        background: k.scopes.includes('write') ? 'rgba(163,230,53,0.1)' : 'rgba(134,239,172,0.1)',
                        color: k.scopes.includes('write') ? '#a3e635' : '#86efac',
                        border: `1px solid ${k.scopes.includes('write') ? 'rgba(163,230,53,0.2)' : 'rgba(134,239,172,0.2)'}`,
                      }}
                    >
                      {k.scopes.includes('write') ? 'R/W' : 'Read'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-text-disabled font-mono">{k.key_prefix}...</span>
                    <span className="text-xs text-text-disabled">
                      {k.last_used_at ? `Last used ${new Date(k.last_used_at).toLocaleDateString()}` : 'Never used'}
                    </span>
                    <span className="text-xs text-text-disabled">
                      Created {new Date(k.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status + Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`badge ${k.is_active ? 'bg-[rgba(34,197,94,0.1)] text-[#4ade80] border border-[rgba(34,197,94,0.3)]' : 'bg-[rgba(239,68,68,0.1)] text-[#f87171] border border-[rgba(239,68,68,0.3)]'}`}>
                    {k.is_active ? 'Active' : 'Revoked'}
                  </span>
                  {k.is_active ? (
                    <button onClick={() => handleRevoke(k.id)} className="btn-danger text-xs">Revoke</button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-text-disabled text-sm italic">No API keys yet</div>
        )}
      </div>

      {/* Usage example */}
      <div className="glass-card p-6 mt-6">
        <h2 className="text-sm font-semibold mb-3">API Usage</h2>
        <div className="text-sm text-text-secondary mb-3">Use your API key to manage URLs programmatically:</div>
        <pre className="p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <code className="text-text-secondary">{`curl -X POST https://url.elixpo.com/api/urls \\
  -H "Authorization: Bearer elu_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`}</code>
        </pre>
      </div>
    </div>
  );
}
