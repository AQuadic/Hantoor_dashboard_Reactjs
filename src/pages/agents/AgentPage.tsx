import AgentPageHeader from "@/components/agents/AgentPageHeader";
import AgentPageTable from "@/components/agents/AgentPageTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAgents, deleteAgent } from "@/api/agents/fetchAgents";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Loading from "@/components/general/Loading";

const AgentPage = () => {
  const { t } = useTranslation("agents");
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: agentsData, isLoading } = useQuery({
    queryKey: ["agents", currentPage, searchTerm],
    queryFn: () => fetchAgents(currentPage, searchTerm),
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

  const handleDelete = (id: number) => {
    if (window.confirm(t("confirmDeleteAgent"))) {
      deleteAgentMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <AgentPageHeader setSearchTerm={setSearchTerm} />
      <div className="px-2 md:px-8">
        <AgentPageTable
          agents={agentsData?.data || []}
          onDelete={handleDelete}
        />
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={agentsData?.last_page || 1}
          totalItems={agentsData?.total || 0}
          itemsPerPage={agentsData?.per_page || 10}
          from={agentsData?.from || 0}
          to={agentsData?.to || 0}
        />
      </div>
    </div>
  );
};

export default AgentPage;
