export const getSubdomainRedirectUrl = (path: string = "/"): string => {
  if (typeof window === "undefined") return "";

  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  let subdomain: string | null = null;

  // Localhost case: finance.localhost, marketing.localhost, etc.
  if (hostname.endsWith("localhost")) {
    subdomain = parts.length > 1 ? parts[0] : null;
  }
  // Production case: finance.arcalisnews.com
  else if (hostname.endsWith("arcalisnews.com")) {
    subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : null;
  }

  // Construct base URL
  let baseUrl: string;
  if (subdomain) {
    if (hostname.endsWith("localhost")) {
      baseUrl = `http://${subdomain}.localhost:3000`;
    } else {
      baseUrl = `https://${subdomain}.arcalisnews.com`;
    }
  } else {
    baseUrl = hostname.endsWith("localhost")
      ? "http://localhost:3000"
      : "https://arcalisnews.com";
  }

  // Ensure path starts with "/"
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
};
