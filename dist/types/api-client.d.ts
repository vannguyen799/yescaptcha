import { Response } from "node-fetch";
export type APIClientOptions = {
    proxy?: string | null;
    headers?: Record<string, string>;
    timeout?: number;
    signal?: AbortSignal | null;
    base?: string | null;
};
export default class APIClient {
    private agent;
    private headers;
    private signal;
    base: string | null;
    constructor(opts: APIClientOptions);
    private __formatUrl;
    post(url: string, body: any, headers?: any, fetchOptions?: any): Promise<Response>;
    get(url: string, params?: any, headers?: any, fetchOptions?: any): Promise<Response>;
}
