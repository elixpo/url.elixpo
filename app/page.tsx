'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const features = [
  {
    icon: '⚡',
    title: 'Blazing Fast',
    description: 'Edge-cached redirects on Cloudflare\'s global network. Sub-10ms response times worldwide.',
    color: '#a3e635',
  },
  {
    icon: '📊',
    title: 'Rich Analytics',
    description: 'Track clicks, countries, devices, browsers, and referrers with real-time dashboards.',
    color: '#86efac',
  },
  {
    icon: '🔑',
    title: 'API-First',
    description: 'Full REST API with API key auth. Automate URL management from any platform.',
    color: '#fbbf24',
  },
  {
    icon: '🛡️',
    title: 'Enterprise Ready',
    description: 'SSO via Elixpo Accounts, role-based access, audit logs, and tier-based limits.',
    color: '#c4b5fd',
  },
];

const tiers = [
  { name: 'Free', urls: '25', keys: '1', analytics: '7d', price: '$0' },
  { name: 'Pro', urls: '500', keys: '5', analytics: '30d', price: '$9' },
  { name: 'Business', urls: '5,000', keys: '20', analytics: '90d', price: '$29' },
  { name: 'Enterprise', urls: '∞', keys: '100', analytics: '365d', price: 'Custom' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-page overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #a3e635, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #86efac, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto"
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/logo.png" alt="ElixpoURL" width={32} height={32} className="rounded-lg" />
          <span className="text-xl font-display font-bold text-text-primary">
            <span className="text-lime-main">Elixpo</span>URL
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline">
            Sign In
          </Link>
          <Link href="/login" className="btn-lime no-underline text-sm">
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32 text-center">
        {/* Banner space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          {/* Banner image placeholder - replace when ready */}
        </motion.div>

        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(163, 230, 53, 0.08)', border: '1px solid rgba(163, 230, 53, 0.2)', color: '#a3e635' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-main animate-pulse" />
          Built on Cloudflare&apos;s Edge Network
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-6xl md:text-7xl font-display font-bold leading-[1.1] mb-6 max-w-4xl mx-auto"
        >
          Shorten URLs at the{' '}
          <span className="text-gradient">speed of light</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The URL shortener built for the Elixpo ecosystem. Lightning-fast redirects,
          powerful analytics, and a developer-first API — all running on the edge.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/login" className="btn-lime no-underline px-8 py-3 text-base rounded-2xl glow-lime-sm">
            Start Shortening
          </Link>
          <Link href="#features" className="btn-glass no-underline px-8 py-3 text-base rounded-2xl">
            Learn More
          </Link>
        </motion.div>

        {/* Demo URL bar */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 max-w-2xl mx-auto glass-card p-1.5 flex items-center gap-2"
        >
          <div className="flex-1 px-4 py-3 text-sm text-text-muted truncate text-left">
            https://example.com/very/long/url/that/needs/shortening/right/now
          </div>
          <div className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(163, 230, 53, 0.15)', color: '#a3e635' }}>
            url.elixpo.com/abc123
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            Everything you need to{' '}
            <span className="text-gradient">manage links</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From simple shortening to enterprise analytics, ElixpoURL has you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-hover p-8"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: f.color }}>
                {f.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            Simple, transparent{' '}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-text-secondary">Start free, scale as you grow.</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass-card p-7 flex flex-col ${t.name === 'Pro' ? 'border-lime-border glow-lime-sm' : ''}`}
            >
              {t.name === 'Pro' && (
                <div className="badge bg-lime-dim text-lime-main border border-lime-border mb-3 self-start">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-display font-bold mb-1">{t.name}</h3>
              <div className="text-3xl font-display font-bold text-lime-main mb-6">{t.price}</div>
              <div className="space-y-3 text-sm text-text-secondary flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lime-main text-xs">✓</span> {t.urls} URLs
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-main text-xs">✓</span> {t.keys} API keys
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-main text-xs">✓</span> {t.analytics} analytics
                </div>
              </div>
              <Link href="/login" className="btn-lime no-underline text-center justify-center mt-6">
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-16 text-center glow-lime"
        >
          <h2 className="text-4xl font-display font-bold mb-4 text-gradient-hero">
            Ready to shorten?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Join the Elixpo ecosystem and start creating short links in seconds.
          </p>
          <Link href="/login" className="btn-lime no-underline px-10 py-3 text-base rounded-2xl glow-lime-sm">
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-light py-8 px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
            <span className="text-sm text-text-muted">
              <span className="text-lime-main">Elixpo</span>URL
            </span>
          </div>
          <p className="text-xs text-text-disabled">
            &copy; {new Date().getFullYear()} Elixpo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
