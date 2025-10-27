import ChatHeader from "@/components/chats/ChatHeader";
import ChatTable from "@/components/chats/ChatTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import Loading from "@/components/general/Loading";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchConversations,
  deleteConversation,
  type ConversationsApiResponse,
} from "@/api/chats/fetchConversations";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDatePicker } from "@/hooks/useDatePicker";

const ChatPage = () => {
  const { t } = useTranslation("chats");
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  // Reset page to 1 when search term changes
  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const {
    data: conversationsData,
    isLoading,
    error,
  } = useQuery<ConversationsApiResponse>({
    queryKey: ["conversations", currentPage, searchTerm, dateParams],
    queryFn: () =>
      fetchConversations(
        currentPage,
        searchTerm,
        dateParams.from_date,
        dateParams.to_date
      ),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
  });

  const deleteConversationMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      toast.success(
        t("conversationDeletedSuccess") || "Conversation deleted successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error: unknown) => {
      let errorMessage =
        t("conversationDeleteError") || "Failed to delete conversation";
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
    // Deletion confirmation is handled by the table's DeleteModal.
    deleteConversationMutation.mutate(id);
  };

  if (isLoading && !conversationsData) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p>
            {t("errorLoadingConversations") || "Error loading conversations"}
          </p>
          <p className="text-sm mt-2">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ChatHeader
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8">
        <ChatTable
          conversations={conversationsData?.data || []}
          onDelete={handleDelete}
        />
        {conversationsData?.data && conversationsData.data.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={conversationsData?.last_page || 1}
            totalItems={conversationsData?.total || 0}
            itemsPerPage={conversationsData?.per_page || 15}
            from={conversationsData?.from || 0}
            to={conversationsData?.to || 0}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
