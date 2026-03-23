export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const hostParts = url.hostname.split(".");
    const subdomain = hostParts.length > 2 ? hostParts[0] : "root";

    // Simulated latency (default 200ms, override with ?delay=XXX)
    const delay = parseInt(url.searchParams.get("delay")) || 200;

    await sleep(delay);

    return new Response(
      JSON.stringify({
        ok: true,
        subdomain,
        delay,
        timestamp: Date.now(),
      }),
      {
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      }
    );
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}