import { useEffect, useState } from "react";
import type { Inquiry } from "../../../shared/types/Inquiry";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const response = await fetch(`${API_BASE_URL}/inquiries`);

        if (!response.ok) {
          throw new Error("Failed to fetch inquiries");
        }

        const data = await response.json();

        setInquiries(data.inquiries ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchInquiries();
  }, []);

  return { error, count: inquiries.length, inquiries, isLoading };
};

export default useInquiries;
