import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
export default class APIClient {
    constructor(opts) {
        this.agent = null;
        this.signal = null;
        if (opts.proxy) {
            this.agent = new HttpsProxyAgent(opts.proxy);
        }
        this.headers = opts.headers || {};
        this.signal = opts.signal || null;
        this.base = opts.base || null;
    }
    __formatUrl(url) {
        if (url.startsWith("http"))
            return url;
        if (this.base)
            return `${this.base}${url.startsWith("/") ? "" : "/"}${url}`;
        return url;
    }
    post(url, body, headers = {}, fetchOptions = {}) {
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
    get(url, params = {}, headers = {}, fetchOptions = {}) {
        console.debug("get", url, params, headers, fetchOptions);
        const urlObj = new URL(this.__formatUrl(url));
        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined)
                urlObj.searchParams.append(key, params[key]);
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
