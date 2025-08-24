import Avatar from "/images/avatar.svg";
import Delete from "@/components/icons/general/Delete";
import carImage from "/images/carImage.png";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMessages,
  deleteMessage,
  toggleConversationStatus,
  type Message,
} from "@/api/chats/fetchMessages";
import {
  type Conversation,
  type ConversationsApiResponse,
} from "@/api/chats/fetchConversations";
import { toast } from "react-hot-toast";
import Loading from "@/components/general/Loading";
import { useState, useEffect } from "react";

interface ConversationPageProps {
  conversationId: number | null;
}

const ConversationPage: React.FC<ConversationPageProps> = ({
  conversationId,
}) => {
  const { t, i18n } = useTranslation("chats");
  const queryClient = useQueryClient();
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const isArabic = i18n.language === "ar";

  // Helper function to get localized name
  const getLocalizedName = (
    name: { ar: string; en: string } | string | undefined
  ): string => {
    if (!name) return "-";
    if (typeof name === "string") return name;
    return isArabic ? name.ar : name.en;
  };

  // Format time helper
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch messages for the conversation
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId!, 1, 20),
    enabled: !!conversationId,
  });

  // Find current conversation data from the conversations cache
  useEffect(() => {
    if (conversationId) {
      const cachedConversations =
        queryClient.getQueryData<ConversationsApiResponse>(["conversations"]);
      if (cachedConversations?.data) {
        const conversation = cachedConversations.data.find(
          (c: Conversation) => c.id === conversationId
        );
        setCurrentConversation(conversation || null);
      }
    }
  }, [conversationId, queryClient]);

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success(
        t("messageDeletedSuccess") || "Message deleted successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
    onError: () => {
      toast.error(t("messageDeleteFailed") || "Failed to delete message");
    },
  });

  // Toggle conversation status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({
      conversationId,
      isActive,
    }: {
      conversationId: number;
      isActive: boolean;
    }) => toggleConversationStatus(conversationId, isActive),
    onSuccess: () => {
      toast.success(t("statusUpdatedSuccess") || "Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Update local state
      if (currentConversation) {
        setCurrentConversation({
          ...currentConversation,
          is_active: !currentConversation.is_active,
        });
      }
    },
    onError: () => {
      toast.error(t("statusUpdateFailed") || "Failed to update status");
    },
  });

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
    if (conversationId && currentConversation) {
      toggleStatusMutation.mutate({
        conversationId,
        isActive: !currentConversation.is_active,
      });
    }
  };

  if (!conversationId) {
    return (
      <section className="bg-white mx-auto p-4">
        <h2 className="text-[#071739] text-lg font-bold text-center mb-4">
          {t("conversation")}
        </h2>
        <div className="text-center text-gray-500">
          {t("selectConversation") || "Select a conversation to view messages"}
        </div>
      </section>
    );
  }

  if (isLoadingMessages) {
    return <Loading />;
  }

  if (messagesError) {
    return (
      <section className="bg-white mx-auto p-4">
        <h2 className="text-[#071739] text-lg font-bold text-center mb-4">
          {t("conversation")}
        </h2>
        <div className="text-center text-red-500">
          {t("errorLoadingMessages") || "Error loading messages"}
        </div>
      </section>
    );
  }

  const messages = messagesData?.data || [];

  return (
    <section className="bg-white mx-auto p-4">
      <h2 className="text-[#071739] text-lg font-bold text-center mb-4">
        {t("conversation")}
      </h2>
      <hr className="my-4" />

      {/* Vehicle Info */}
      {currentConversation?.vehicle && (
        <>
          <div className="flex flex-wrap items-center justify-between rounded-lg p-2 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={carImage}
                alt="car"
                className="w-[104px] h-[71px] rounded-lg object-cover mr-2"
              />
              <div>
                <p className="text-[17px] font-bold">
                  {getLocalizedName(currentConversation.vehicle.name)}
                </p>
                <p className="text-base text-[#000000]">
                  {getLocalizedName(currentConversation.vehicle.brand?.name)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[14px] md:mt-0 mt-4">
              <Switch
                checked={Boolean(currentConversation.is_active)}
                onChange={handleToggleStatus}
                disabled={toggleStatusMutation.isPending}
              />
              <Delete />
            </div>
          </div>
          <hr className="my-4" />
        </>
      )}

      {/* Messages */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {t("noMessagesFound") || "No messages found"}
          </div>
        ) : (
          messages.map((message: Message) => (
            <div key={message.id} className="flex items-start gap-2">
              {/* Avatar */}
              <img src={Avatar} alt="avatar" className="w-8 h-8 rounded-full" />

              {/* Name + Time + Bubble */}
              <div>
                <p className="text-xs font-medium text-[#071739]">
                  {message.sender_type === "admin"
                    ? t("admin") || "Admin"
                    : t("user") || "User"}
                </p>
                <p className="text-[10px] text-gray-400 mb-1">
                  {formatTime(message.created_at)}
                </p>

                <div className="flex items-center gap-3">
                  <div className="bg-[#1C1C1E] text-white rounded-2xl px-3 py-2 max-w-xs text-sm">
                    {message.message}
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    disabled={deleteMessageMutation.isPending}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ConversationPage;
