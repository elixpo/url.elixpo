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

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [name, setName] = useState('');
  const [scopes, setScopes] = useState('read,write');
  const [newKey, setNewKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-6">API Keys</h1>

      {/* Create */}
      <div className="glass-card p-6 max-w-lg mb-6">
        <h2 className="text-sm font-semibold mb-4">Create API Key</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-3">
            <label className="block text-xs text-text-secondary mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="My integration" required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-1">Scopes</label>
            <select value={scopes} onChange={(e) => setScopes(e.target.value)} className="input-field">
              <option value="read,write">Read & Write</option>
              <option value="read">Read only</option>
            </select>
          </div>
          {error && (
            <div className="mb-3 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn-lime">Create Key</button>
        </form>

        {newKey && (
          <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="text-xs text-honey-main mb-2">Copy this key now — it won&apos;t be shown again!</div>
            <div className="flex items-center gap-3">
              <code className="text-sm text-text-primary break-all">{newKey}</code>
              <button onClick={() => navigator.clipboard.writeText(newKey)} className="btn-glass text-xs shrink-0">Copy</button>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold mb-4">Your Keys</h2>
        {loading ? (
          <div className="text-text-disabled text-sm">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3">Prefix</th>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3">Name</th>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3">Scopes</th>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3">Last Used</th>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3">Status</th>
                <th className="text-left text-[0.7rem] text-text-disabled uppercase tracking-wider pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {keys.length > 0 ? keys.map((k) => (
                <tr key={k.id} className="border-t border-border-light">
                  <td className="py-3 text-sm font-mono">{k.key_prefix}...</td>
                  <td className="py-3 text-sm">{k.name}</td>
                  <td className="py-3 text-xs text-text-muted">{k.scopes}</td>
                  <td className="py-3 text-xs text-text-muted">{k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : 'Never'}</td>
                  <td className="py-3">
                    <span className={`badge ${k.is_active ? 'bg-[rgba(34,197,94,0.1)] text-[#4ade80] border border-[rgba(34,197,94,0.3)]' : 'bg-[rgba(239,68,68,0.1)] text-[#f87171] border border-[rgba(239,68,68,0.3)]'}`}>
                      {k.is_active ? 'Active' : 'Revoked'}
                    </span>
                  </td>
                  <td className="py-3">
                    {k.is_active ? <button onClick={() => handleRevoke(k.id)} className="btn-danger text-xs">Revoke</button> : null}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="py-8 text-center text-text-disabled text-sm italic">No API keys yet</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Usage example */}
      <div className="glass-card p-6 mt-6">
        <h2 className="text-sm font-semibold mb-3">API Usage</h2>
        <div className="text-sm text-text-secondary mb-3">Use your API key to manage URLs programmatically:</div>
        <pre className="p-4 rounded-xl text-xs overflow-x-auto" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <code className="text-text-secondary">{`curl -X POST https://url.elixpo.com/api/urls \\
  -H "Authorization: Bearer elu_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`}</code>
        </pre>
      </div>
    </div>
  );
}
