import fetch, { Response } from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
export type APIClientOptions = {
  proxy?: string | null;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal | null;
  base?: string | null;
};
export default class APIClient {
  private agent: HttpsProxyAgent<string> | null = null;
  private headers: Record<string, string>;
  private signal: AbortSignal | null = null;
  base: string | null;
  constructor(opts: APIClientOptions) {
    if (opts.proxy) {
      this.agent = new HttpsProxyAgent(opts.proxy);
    }
    this.headers = opts.headers || {};
    this.signal = opts.signal || null;
    this.base = opts.base || null;
  }
  private __formatUrl(url: string) {
    if (url.startsWith("http")) return url;
    if (this.base) return `${this.base}${url.startsWith("/") ? "" : "/"}${url}`;
    return url;
  }
  post(url: string, body: any, headers: any = {}, fetchOptions: any = {}) {
    console.debug("post", url, body, headers, fetchOptions);
    return fetch(this.__formatUrl(url), {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": typeof body == "object" ? "application/json" : "text/plain",
        ...headers,
      },
      body: typeof body == "object" ? JSON.stringify(body) : body,
      agent: this.agent,
      signal: this.signal,
      ...fetchOptions,
    });
  }

  get(url: string, params: any = {}, headers: any = {}, fetchOptions: any = {}) {
    console.debug("get", url, params, headers, fetchOptions);
    const urlObj = new URL(this.__formatUrl(url));
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) urlObj.searchParams.append(key, params[key]);
    });
    return fetch(urlObj, {
      method: "GET",
      headers: {
        ...this.headers,
        ...headers,
      },
      agent: this.agent,
      signal: this.signal,
      ...fetchOptions,
    });
  }
}
