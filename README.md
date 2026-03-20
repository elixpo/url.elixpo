<p align="center">
  <img src="public/logo.png" alt="ElixpoURL" width="80" />
</p>

<h1 align="center">ElixpoURL</h1>

<p align="center">
  <strong>Fast URL shortener running on the edge.</strong>
</p>

<p align="center">
  <a href="https://url.elixpo.com"><img src="https://img.shields.io/badge/live-url.elixpo.com-a3e635?style=flat-square" alt="Live" /></a>
  <img src="https://img.shields.io/badge/platform-Cloudflare%20Pages-f38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/framework-Next.js%2015-000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/runtime-Edge-86efac?style=flat-square" alt="Edge Runtime" />
  <img src="https://img.shields.io/github/license/elixpo/elixpourl?style=flat-square&color=444" alt="License" />
  <img src="https://img.shields.io/github/stars/elixpo/elixpourl?style=flat-square&color=a3e635" alt="Stars" />
</p>

<br />

<p align="center">
  <img src="public/og-image.png" alt="ElixpoURL Banner" width="100%" />
</p>

<br />

## What is ElixpoURL?

ElixpoURL is the URL shortener built for the [Elixpo](https://elixpo.com) ecosystem. It turns long URLs into clean, shareable short links — instantly.

Every redirect runs on Cloudflare's global edge network, meaning your links resolve in milliseconds no matter where your audience is.

## Why ElixpoURL?

- **Instant redirects** — Short links resolve at the edge, not from a central server. No cold starts, no latency spikes.
- **Click analytics** — See who's clicking, from where, on what device, and when. Understand your traffic at a glance.
- **Custom short codes** — Choose your own slugs like `url.elixpo.com/launch` instead of random strings.
- **Expiring links** — Set links to auto-expire after a date. Great for limited-time campaigns.
- **Developer-first API** — Create, read, update, and delete links programmatically with simple API keys.
- **SSO with Elixpo Accounts** — One login across the entire Elixpo ecosystem. No separate credentials to manage.

## Plans

| | Free | Pro | Business | Enterprise |
|---|---|---|---|---|
| **Short URLs** | 25 | 500 | 5,000 | Unlimited |
| **API keys** | 1 | 5 | 20 | 100 |
| **Analytics retention** | 7 days | 30 days | 90 days | 365 days |
| **Custom codes** | — | Yes | Yes | Yes |
| **Expiring links** | — | Yes | Yes | Yes |
| **Price** | Free forever | $9/mo | $29/mo | Custom |

## Get started

Head to **[url.elixpo.com](https://url.elixpo.com)** and sign in with your Elixpo account. You can start shortening URLs immediately on the free plan — no credit card required.

## API

ElixpoURL exposes a REST API for programmatic access. Authenticate with a Bearer token from your API keys page.

```
POST   /api/urls              Create a short URL
GET    /api/urls              List your URLs
GET    /api/urls/:code        Get a single URL
PATCH  /api/urls/:code        Update a URL
DELETE /api/urls/:code        Delete a URL
GET    /api/urls/:code/analytics   Click analytics
```

Full documentation is available at [url.elixpo.com/docs](https://url.elixpo.com/docs).

## Star history

<p align="center">
  <a href="https://star-history.com/#elixpo/elixpourl&Date">
    <img src="https://api.star-history.com/svg?repos=elixpo/elixpourl&type=Date&theme=dark" alt="Star History" width="100%" />
  </a>
</p>

---

<p align="center">
  Built by <a href="https://elixpo.com">Elixpo</a>
</p>
