import { logger } from "../utils/logger";

const API_URL = "http://127.0.0.1:8000/api";
let authToken = null;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    logger.error(`API Error: ${response.status} ${response.statusText}`, error);
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

export const api = {
  setAuthToken: (token) => {
    authToken = token;
    logger.debug("Auth token set");
  },

  clearAuthToken: () => {
    authToken = null;
    logger.debug("Auth token cleared");
  },

  get: async (endpoint) => {
    try {
      logger.debug(`GET request to ${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      logger.error("API GET Error:", error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      logger.debug(`POST request to ${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      logger.error("API POST Error:", error);
      throw error;
    }
  },
};

export const authApi = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          const error = new Error("Validation failed");
          error.response = {
            status: 422,
            data: data,
          };
          throw error;
        }
        throw new Error(data.message || "Registration failed");
      }

      if (data.success) {
        return {
          user: data.data.user,
          token: data.data.authorization.token,
        };
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422 || response.status === 401) {
          const error = new Error("Authentication failed");
          error.response = {
            status: response.status,
            data: data,
          };
          throw error;
        }
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        return {
          user: data.data.user,
          token: data.data.authorization.token,
        };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Try to make the logout request
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: getHeaders(),
      });

      // Clear token regardless of response
      api.clearAuthToken();

      // If the request was successful, return true
      if (response.ok) {
        return true;
      }

      // If we got a 401, it means the token was already invalid/expired
      // We still want to clear the local state in this case
      if (response.status === 401) {
        logger.debug("Token was invalid/expired during logout");
        return true;
      }

      // For other errors, throw
      throw new Error("Logout failed");
    } catch (error) {
      logger.error("Logout error:", error);
      // Still clear the token even if the request failed
      api.clearAuthToken();
      throw error;
    }
  },
};
