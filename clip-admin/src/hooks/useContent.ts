import { useCallback, useEffect, useMemo, useState } from "react";
import { createApiClient } from "../api/client";
import { useAuth } from "../auth/useAuth";
import type { RootContent } from "../../../shared/types/RootContent";

type SaveState = "clean" | "dirty" | "saved";

const useContent = () => {
  const { idToken } = useAuth();
  const [content, setContent] = useState<RootContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const apiClient = useMemo(() => createApiClient(idToken), [idToken]);

  useEffect(() => {
    if (!idToken) {
      return;
    }

    const getContent = async () => {
      try {
        const response = await apiClient.get("/content");

        if (!response) throw new Error("Failed to fetch content");

        setContent(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getContent();
  }, [apiClient, idToken]);

  const handleChange = useCallback((value: RootContent) => {
    setSaveState("dirty");
    setContent(value);
  }, []);

  const handleSave = async () => {
    if (!content) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await apiClient.put("/content", {
        expectedVersion: content.version,
        content,
      });

      if (response.content) {
        setContent(response.content.content);
      }

      setSaveState("saved");

      setTimeout(() => setSaveState("clean"), 1500);
    } catch (error) {
      console.error(error);
      alert("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    content,
    error,
    isLoading,
    isSaving,
    onChange: handleChange,
    onSave: handleSave,
    saveState,
  };
};

export default useContent;
