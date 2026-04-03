const config = {
  baseUrl: import.meta.env.VITE_BASE_URL as string | undefined,
};

if (!config.baseUrl) {
  // Vite will inline env at build time; this helps catch missing env during dev.
  // eslint-disable-next-line no-console
  console.warn("Missing VITE_BASE_URL. Set it in excon-ius-client/.env");
}

export default config;

