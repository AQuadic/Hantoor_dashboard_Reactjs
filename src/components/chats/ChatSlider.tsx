import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Trash2, MoreVertical, Power, PowerOff } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  fetchMessages,
  deleteMessage,
  toggleConversationStatus,
  type MessagesApiResponse,
} from "@/api/chats/fetchMessages";
import { type Conversation } from "@/api/chats/fetchConversations";

interface ChatSliderProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation | null;
}

const ChatSlider: React.FC<ChatSliderProps> = ({
  isOpen,
  onClose,
  conversation,
}) => {
  const { t } = useTranslation("chats");
  const queryClient = useQueryClient();
  const [showDropdown, setShowDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<MessagesApiResponse>({
    queryKey: ["messages", conversation?.id],
    queryFn: ({ pageParam = 1 }) =>
      conversation
        ? fetchMessages(conversation.id, pageParam as number, 20)
        : Promise.reject("No conversation"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
    enabled: !!conversation?.id && isOpen,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success(
        t("messageDeletedSuccess") || "Message deleted successfully"
      );
      queryClient.invalidateQueries({
        queryKey: ["messages", conversation?.id],
      });
    },
    onError: (error: unknown) => {
      let errorMessage = t("messageDeleteError") || "Failed to delete message";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({
      conversationId,
      isActive,
    }: {
      conversationId: number;
      isActive: boolean;
    }) => toggleConversationStatus(conversationId, isActive),
    onSuccess: () => {
      toast.success(
        t("conversationStatusUpdated") || "Conversation status updated"
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["messages", conversation?.id],
      });
    },
    onError: (error: unknown) => {
      let errorMessage = t("statusUpdateError") || "Failed to update status";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  // Scroll to bottom when new messages are loaded
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    if (container.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const previousScrollHeight = container.scrollHeight;
      fetchNextPage().then(() => {
        // Maintain scroll position after loading more messages
        setTimeout(() => {
          if (container) {
            container.scrollTop = container.scrollHeight - previousScrollHeight;
          }
        }, 100);
      });
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Scroll to bottom when component first loads or conversation changes
  useEffect(() => {
    if (messagesData && !isFetchingNextPage) {
      scrollToBottom();
    }
  }, [messagesData, scrollToBottom, isFetchingNextPage]);

  const handleDeleteMessage = (messageId: number) => {
    if (
      window.confirm(
        t("confirmDeleteMessage") ||
          "Are you sure you want to delete this message?"
      )
    ) {
      deleteMessageMutation.mutate(messageId);
    }
  };

  const handleToggleStatus = () => {
    if (conversation) {
      const newStatus = !conversation.is_active;
      toggleStatusMutation.mutate({
        conversationId: conversation.id,
        isActive: newStatus,
      });
    }
    setShowDropdown(false);
  };

  const allMessages =
    messagesData?.pages.flatMap((page: MessagesApiResponse) => page.data) || [];

  const getVehicleName = () => {
    if (!conversation?.vehicle?.name)
      return t("unknownVehicle") || "Unknown Vehicle";
    const isArabic = document.documentElement.lang === "ar";
    return isArabic
      ? conversation.vehicle.name.ar
      : conversation.vehicle.name.en;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div>
              <h3 className="font-semibold text-gray-900">
                {getVehicleName()}
              </h3>
              <p className="text-sm text-gray-500">
                {t("conversationId")}: {conversation?.id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Status and menu dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                  <button
                    onClick={handleToggleStatus}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 rtl:space-x-reverse ${
                      conversation?.is_active
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                    disabled={toggleStatusMutation.isPending}
                  >
                    {conversation?.is_active ? (
                      <>
                        <PowerOff size={16} />
                        <span>
                          {t("deactivateConversation") || "Deactivate"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Power size={16} />
                        <span>{t("activateConversation") || "Activate"}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Loading indicator for infinite scroll */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}

          {isLoading && allMessages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <p>{t("errorLoadingMessages") || "Error loading messages"}</p>
            </div>
          ) : allMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>{t("noMessages") || "No messages in this conversation"}</p>
            </div>
          ) : (
            allMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_type === "admin"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                    message.sender_type === "admin"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender_type === "admin"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>

                  {/* Delete button - only show for admin messages */}
                  {message.sender_type === "admin" && (
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      disabled={deleteMessageMutation.isPending}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Scroll to bottom reference */}
          <div ref={messagesEndRef} />
        </div>

        {/* Status indicator */}
        <div className="px-4 py-2 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {t("conversationStatus")}:
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                conversation?.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {conversation?.is_active
                ? t("active") || "Active"
                : t("inactive") || "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSlider;
