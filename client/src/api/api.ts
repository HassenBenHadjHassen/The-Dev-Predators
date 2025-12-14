interface RequestOptions extends RequestInit {
  body?: string | FormData;
  headers?: Record<string, string>;
}

interface AuthError extends Error {
  isAuthError: true;
}

export default class Api {
  static API_BASE_URL =
    "https://the-dev-predators-server.hassenbenhadjhassen.com";
  static get api_url() {
    return this.API_BASE_URL + "/api";
  }

  static async request(endpoint: string, options: RequestOptions = {}) {
    if (!endpoint.startsWith("http")) {
      endpoint = Api.API_BASE_URL + endpoint;
    }

    console.log("[UserApi] Making request to:", endpoint);
    console.log("[UserApi] Api Url:", this.api_url);
    const tokenStr = localStorage.getItem("token");
    let token: string | null = null;
    if (tokenStr) {
      try {
        const tokenObj = JSON.parse(tokenStr);
        token = tokenObj.token;
      } catch (e) {
        console.error("[UserApi] Failed to parse token:", e);
      }
    }

    const headers: Record<string, string> = {
      ...(options.headers || {}),
    };

    // Only set Content-Type for non-FormData requests
    // FormData needs the browser to set Content-Type automatically with the boundary
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      mode: "cors",
      credentials: "include",
    };

    // Wrap the fetch call for retry logic
    return this.retryRequest(async () => {
      const response = await fetch(endpoint, config);

      // Handle authentication errors (don't retry these)
      if (response.status === 401 || response.status === 403) {
        console.error("[UserApi] Authentication failed - logging out");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";

        const error = new Error(
          "Session expired. Please login again."
        ) as AuthError;
        error.isAuthError = true;
        throw error;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    });
  }

  static async retryRequest<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    initialDelay = 1000
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error: unknown) {
        lastError = error;

        // Don't retry on authentication errors - these are permanent
        if (
          error &&
          typeof error === "object" &&
          "isAuthError" in error &&
          (error as AuthError).isAuthError
        ) {
          throw error;
        }

        // Don't retry on the last attempt
        if (attempt === maxRetries - 1) {
          break;
        }

        // Calculate delay with exponential backoff
        const delayMs = initialDelay * Math.pow(2, attempt);
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.warn(
          `[UserApi] Request failed (attempt ${
            attempt + 1
          }/${maxRetries}), retrying in ${delayMs}ms...`,
          errorMessage
        );
        await this.delay(delayMs);
      }
    }

    throw lastError;
  }

  static async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
