import { useState } from "react";
import { toast } from "sonner";
import type { Transaction } from "@/types/api";

const PROXY_URL = "https://api.allorigins.win/raw?url=";
const API_BASE = "https://denniskabui.com/projects/my-kplc-token/api/tokens";

// Simple retry function for fetch with backoff
async function fetchWithRetry(url: string, retries: number = 3, delay: number = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status >= 500 && res.status < 600 && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay * attempt)); // Exponential backoff
          continue;
        }
        throw new Error(`HTTP ${res.status}: Failed to fetch`);
      }
      return res;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
    }
  }
  throw new Error("Max retries reached");
}

export function useTokenHistory() {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async (meter: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    toast.loading("Fetching token history...");

    try {
      const url = `${PROXY_URL}${encodeURIComponent(`${API_BASE}/${meter.trim()}`)}`;
      const res = await fetchWithRetry(url);

      const json: unknown = await res.json();

      // Type guard + extraction for current nested structure
      if (
        typeof json === "object" &&
        json !== null &&
        "success" in json &&
        json.success === true &&
        "data" in json &&
        typeof json.data === "object" &&
        json.data !== null &&
        "data" in json.data &&
        Array.isArray(json.data.data) &&
        json.data.data.length > 0 &&
        "colPrepayment" in json.data.data[0] &&
        Array.isArray(json.data.data[0].colPrepayment)
      ) {
        const transactions = json.data.data[0].colPrepayment as Transaction[];
        setData(transactions);
        toast.success(`Loaded ${transactions.length} transactions!`);
      } else {
        throw new Error("No transactions found or invalid response");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network or unknown error";
      setError(msg);
      toast.error("The API server seems to be experiencing issues (HTTP 500/520). This is not your fault — the external service is unstable. Please try again later.", { duration: 8000 });
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const clear = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, fetchHistory, clear };
}