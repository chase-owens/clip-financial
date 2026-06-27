import { useCallback, useMemo, useState } from "react";
import { createApiClient } from "../api/client";
import { useAuth } from "../auth/useAuth";
import type { RootContent } from "../../../shared/types/RootContent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type SaveState = "clean" | "dirty" | "saved";

const useContent = () => {
  const { idToken } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<RootContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const apiClient = useMemo(() => createApiClient(idToken), [idToken]);

  const contentQuery = useQuery({
    queryKey: ["content"],
    enabled: Boolean(idToken),
    queryFn: async () => {
      const data = await apiClient.get("/content");

      return {
        content: (data ?? null) as RootContent | null,
      };
    },
  });

  const handleChange = useCallback((value: RootContent) => {
    setSaveState("dirty");
    setContent(value);
  }, []);

  const updateContentMutation = useMutation({
    mutationFn: async () => {
      setIsSaving(true);
      return apiClient.put("/content", {
        expectedVersion: content?.version,
        content,
      });
    },
    onSuccess: async () => {
      setIsSaving(false);
      setSaveState("saved");
      setTimeout(() => setSaveState("clean"), 2100);
      await queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });

  return {
    content: content ?? contentQuery.data?.content,
    error:
      contentQuery.error instanceof Error ? contentQuery.error.message : null,
    isFetching: contentQuery.isFetching,
    isLoading: contentQuery.isLoading,
    isSaving,
    onChange: handleChange,
    onSave: updateContentMutation.mutateAsync,
    saveState,
  };
};

export default useContent;
