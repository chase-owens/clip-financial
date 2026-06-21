import { useEffect, useState } from "react";
import type { Inquiry, Status } from "../../../shared/types/Inquiry";

type UseInquiriesProps = {
  inquiryId?: string;
  status?: Status;
};

const buildInquiriesUrl = ({
  inquiryId,
  query,
}: {
  inquiryId?: string;
  query?: string;
}) => {
  const base = `${API_BASE_URL}/inquiries`;

  if (inquiryId) {
    return `${base}/${inquiryId}`;
  }

  if (query) {
    return `${base}?${query}`;
  }

  return base;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const useInquiries = (props: UseInquiriesProps = {}) => {
  const { inquiryId, status } = props;

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const params = new URLSearchParams();

        if (status) {
          params.set("status", status);
        }

        const query = params.toString();
        const url = buildInquiriesUrl({ inquiryId, query });

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch inquiries");
        }

        const data = await response.json();

        if (data.inquiry) {
          setCurrentInquiry(data.inquiry);
        }

        if (data.inquiries) {
          setInquiries(data.inquiries);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchInquiries();
  }, [status, inquiryId]);

  return {
    currentInquiry,
    error,
    inquiries,
    isLoading,
  };
};

export default useInquiries;
