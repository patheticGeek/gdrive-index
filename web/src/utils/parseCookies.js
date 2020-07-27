function parseCookies(cookiesString) {
  if (!cookiesString) return {};

  const cookies = {};

  cookiesString.split("; ").forEach((text) => {
    const eq_at = text.indexOf("=");
    const key = text.slice(0, eq_at);
    const val = text.slice(eq_at + 1, text.length);
    cookies[key] = val;
  });

  return cookies;
}

export default parseCookies;
