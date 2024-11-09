export class RestClient {
  baseURL;
  defaultHeaders;
  defaultOptions;

  constructor(baseURL, defaultHeaders = {}, defaultOptions = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
    this.defaultOptions = defaultOptions;
  }

  async get(endpoint) {
    return this.#request(endpoint, "GET");
  }

  async post(endpoint, body) {
    return this.#request(endpoint, "POST", body);
  }

  async patch(endpoint, body) {
    return this.#request(endpoint, "PATCH", body);
  }

  async put(endpoint, body) {
    return this.#request(endpoint, "PUT", body);
  }

  async delete(endpoint) {
    return this.#request(endpoint, "DELETE");
  }

  async #request(endpoint, method = "GET", body, headers) {
    const url = `${this.baseURL}${endpoint}`;
    const options = this.#createOptions(method, body, headers);

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Response was not OK. Status: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return data;
    }

    const data = await response.text();
    return data;
  }

  #createOptions(method, body, headers) {
    const options = {
      ...this.defaultOptions,
      method,
      headers: this.defaultHeaders,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (headers) {
      options.headers = { ...options.headers, ...headers };
    }

    return options;
  }
}
