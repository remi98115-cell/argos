// Vercel Serverless Function — CORS proxy dédié à Argos
// Usage: /api/proxy?url=ENCODED_URL
export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({ error: "missing url parameter" });
    return;
  }
  // Liste blanche des domaines autorisés (sécurité)
  const allowed = [
    "api.gdeltproject.org",
    "query1.finance.yahoo.com",
    "query2.finance.yahoo.com",
    "services.nvd.nist.gov",
    "api.adsb.lol",
    "gamma-api.polymarket.com",
    "aviationweather.gov",
    "api.frankfurter.app",
    "api.exchangerate-api.com",
    "api.gold-api.com",
    "api.coingecko.com",
    "eonet.gsfc.nasa.gov",
    "earthquake.usgs.gov",
    "api.open-meteo.com",
    "api.reliefweb.int",
    "www.cisa.gov",
  ];
  let target;
  try {
    target = new URL(url);
  } catch {
    res.status(400).json({ error: "invalid url" });
    return;
  }
  if (!allowed.includes(target.hostname)) {
    res.status(403).json({ error: "domain not allowed", host: target.hostname });
    return;
  }
  try {
    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "Argos-Dashboard/1.0" },
    });
    const body = await upstream.text();
    // CORS : autoriser tout origin (c'est notre propre proxy, safe)
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("cache-control", "public, s-maxage=30, stale-while-revalidate=60");
    res.setHeader("content-type", upstream.headers.get("content-type") || "text/plain");
    res.status(upstream.status).send(body);
  } catch (e) {
    res.status(502).json({ error: "upstream fetch failed", detail: String(e) });
  }
}
