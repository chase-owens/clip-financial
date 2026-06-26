import { useEffect, useMemo, useState } from "react";
import type { Inquiry, Status } from "../../../shared/types/Inquiry";
import { createApiClient } from "../api/client";
import { useAuth } from "../auth/useAuth";

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
  const base = `/inquiries`;

  if (inquiryId) {
    return `${base}/${inquiryId}`;
  }

  if (query) {
    return `${base}?${query}`;
  }

  return base;
};

const useInquiries = ({ inquiryId, status }: UseInquiriesProps = {}) => {
  const { accessToken } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);
  const apiClient = useMemo(() => createApiClient(accessToken), [accessToken]);
  const params = new URLSearchParams();

  if (status) {
    params.set("status", status);
  }

  const query = params.toString();
  const url = buildInquiriesUrl({ inquiryId, query });

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const { inquiries: apiInquiries, inquiry: apiInquiry } =
          await apiClient.get(url);

        if (apiInquiries) {
          setInquiries(apiInquiries);
        }

        if (apiInquiry) {
          setCurrentInquiry(apiInquiry);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [apiClient, url]);

  const updateInquiry = async (
    inquiryId: string,
    updates: {
      status: Status;
      notes: string;
    },
  ) => {
    return apiClient.patch(`/inquiries/${inquiryId}`, updates);
  };

  return {
    currentInquiry,
    error,
    inquiries,
    isLoading,
    updateInquiry,
  };
};

export default useInquiries;
