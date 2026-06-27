import { useMemo } from "react";
import type { Inquiry, Status } from "../../../shared/types/Inquiry";
import { createApiClient } from "../api/client";
import { useAuth } from "../auth/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const { idToken } = useAuth();
  const queryClient = useQueryClient();
  const apiClient = useMemo(() => createApiClient(idToken), [idToken]);

  const query = useMemo(() => {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }

    return params.toString();
  }, [status]);

  const url = buildInquiriesUrl({ inquiryId, query });
  console.log("🚀 ~ useInquiries ~ url:", url);

  const inquiriesQuery = useQuery({
    queryKey: ["inquiries", { inquiryId, status }],
    enabled: Boolean(idToken),
    queryFn: async () => {
      const data = await apiClient.get(url);

      return {
        inquiries: (data.inquiries ?? []) as Inquiry[],
        currentInquiry: (data.inquiry ?? null) as Inquiry | null,
      };
    },
  });

  const updateInquiryMutation = useMutation({
    mutationFn: async ({
      inquiryId,
      updates,
    }: {
      inquiryId: string;
      updates: {
        status: Status;
        notes: string;
      };
    }) => {
      return apiClient.patch(`/inquiries/${inquiryId}`, updates);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });

  return {
    currentInquiry: inquiriesQuery.data?.currentInquiry ?? null,
    error:
      inquiriesQuery.error instanceof Error
        ? inquiriesQuery.error.message
        : null,
    inquiries: inquiriesQuery.data?.inquiries ?? [],
    isLoading: inquiriesQuery.isLoading,
    isFetching: inquiriesQuery.isFetching,

    updateInquiry: updateInquiryMutation.mutateAsync,
    isUpdating: updateInquiryMutation.isPending,
  };
};

export default useInquiries;
