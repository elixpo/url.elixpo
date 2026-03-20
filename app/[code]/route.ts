import { NextRequest, NextResponse } from 'next/server';
import { getDB, getKV } from '@/lib/db';
import { parseUserAgent, hashIp } from '@/lib/utils';
import type { UrlRecord } from '@/lib/types';

export const runtime = 'edge';

const SKIP_PATHS = new Set(['favicon.ico', 'robots.txt', 'sitemap.xml', '_next']);

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  if (SKIP_PATHS.has(code)) {
    return new NextResponse(null, { status: 404 });
  }

  const kv = getKV();
  const db = getDB();

  // FAST PATH: KV cache
  const cached = await kv.get(`url:${code}`);
  if (cached) {
    const { url, id } = JSON.parse(cached);
    // Track click in background
    trackClick(db, id, request).catch(() => {});
    return NextResponse.redirect(url, 302);
  }

  // SLOW PATH: D1
  const urlRecord = await db
    .prepare('SELECT id, original_url, is_active, expires_at FROM urls WHERE short_code = ?')
    .bind(code)
    .first<UrlRecord>();

  if (!urlRecord || !urlRecord.is_active) {
    return new NextResponse(null, { status: 404 });
  }

  // Check expiry
  if (urlRecord.expires_at && new Date(urlRecord.expires_at) < new Date()) {
    return new NextResponse('This link has expired', { status: 410 });
  }

  // Re-populate KV cache
  const ttl = urlRecord.expires_at
    ? Math.max(Math.floor((new Date(urlRecord.expires_at).getTime() - Date.now()) / 1000), 60)
    : 86400;

  kv.put(`url:${code}`, JSON.stringify({ url: urlRecord.original_url, id: urlRecord.id }), { expirationTtl: ttl })
    .catch(() => {});

  // Track click in background
  trackClick(db, urlRecord.id, request).catch(() => {});

  return NextResponse.redirect(urlRecord.original_url, 302);
}

async function trackClick(db: D1Database, urlId: number, request: NextRequest): Promise<void> {
  const ua = parseUserAgent(request.headers.get('user-agent'));
  const cf = (request as any).cf as IncomingRequestCfProperties | undefined;

  await db.batch([
    db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE id = ?').bind(urlId),
    db.prepare(
      `INSERT INTO clicks (url_id, country, city, region, device, browser, os, referer, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      urlId,
      cf?.country || null,
      cf?.city || null,
      (cf as any)?.region || null,
      ua.device,
      ua.browser,
      ua.os,
      request.headers.get('referer') || null,
      hashIp(request.headers.get('cf-connecting-ip')),
    ),
  ]);
}
