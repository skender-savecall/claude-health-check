#!/usr/bin/env node
// Health check ping to healthchecks.io
const url = process.env.HEALTHCHECK_URL;

if (!url) {
  console.error("HEALTHCHECK_URL not set (check .env)");
  process.exit(1);
}

const TIMEOUT_MS = 10_000;
const RETRIES = 3;

async function ping() {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) return;
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      clearTimeout(timer);
      if (attempt === RETRIES) {
        console.error(`Health check ping failed after ${RETRIES} attempts: ${err.message}`);
        process.exit(1);
      }
    }
  }
}

ping();
