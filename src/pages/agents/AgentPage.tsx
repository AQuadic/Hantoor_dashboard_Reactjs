import AgentPageHeader from "@/components/agents/AgentPageHeader";
import AgentPageTable from "@/components/agents/AgentPageTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAgents,
  deleteAgent,
  toggleAgentStatus,
  AgentsApiResponse,
  Agent,
} from "@/api/agents/fetchAgents";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const AgentPage = () => {
  const { t } = useTranslation("agents");
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data: agentsData, isLoading } = useQuery({
    queryKey: ["agents", currentPage, debouncedSearchTerm],
    queryFn: () => fetchAgents(currentPage, debouncedSearchTerm),
  });

  const deleteAgentMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      toast.success(t("agentDeletedSuccess"));
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: unknown) => {
      let errorMessage = t("agentDeleteError");
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      toggleAgentStatus(id, isActive),
    // Optimistic update: flip state immediately, rollback on error
    onMutate: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ["agents"] });
      const queryKey = ["agents", currentPage, debouncedSearchTerm];
      const previous = queryClient.getQueryData<AgentsApiResponse | undefined>(
        queryKey
      );
      if (previous && Array.isArray(previous.data)) {
        queryClient.setQueryData<AgentsApiResponse>(queryKey, {
          ...previous,
          data: previous.data.map((a: Agent) =>
            a.id === id ? { ...a, is_active: isActive } : a
          ),
        });
      }
      return { previous, queryKey } as {
        previous?: AgentsApiResponse;
        queryKey: unknown;
      };
    },
    onError: (
      error: unknown,
      variables,
      context?: { previous?: AgentsApiResponse; queryKey: unknown }
    ) => {
      if (context?.previous && context.queryKey) {
        queryClient.setQueryData(
          context.queryKey as readonly unknown[],
          context.previous
        );
      }
      let errorMessage = t("agentStatusUpdateError");
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteAgentMutation.mutate(id);
  };

  const handleToggleActive = (id: number, isActive: boolean) => {
    toggleStatusMutation.mutate({ id, isActive });
  };

  return (
    <div>
      <AgentPageHeader setSearchTerm={setSearchTerm} />
      <div className="px-2 md:px-8">
        <AgentPageTable
          agents={agentsData?.data || []}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          isLoading={isLoading} 
        />
        {agentsData?.data && agentsData.data.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={agentsData?.last_page || 1}
            totalItems={agentsData?.total || 0}
            itemsPerPage={agentsData?.per_page || 10}
            from={agentsData?.from || 0}
            to={agentsData?.to || 0}
          />
        )}
      </div>
    </div>
  );
};

export default AgentPage;
