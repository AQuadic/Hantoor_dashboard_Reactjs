import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ChatIcon from "../icons/chats/ChatIcon";
import ConversationPage from "@/pages/chats/ConversationPage";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateConversationStatus,
  deleteConversation,
  type Conversation,
} from "@/api/chats/fetchConversations";
import { toast } from "react-hot-toast";

interface ChatTableProps {
  conversations: Conversation[];
  onDelete?: (id: number) => void;
}

const ChatTable: React.FC<ChatTableProps> = ({ conversations, onDelete }) => {
  const { t } = useTranslation("chats");
  const queryClient = useQueryClient();
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  // Mutation for updating conversation status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      updateConversationStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success(t("statusUpdatedSuccess") || "Status updated successfully");
    },
    onError: () => {
      toast.error(t("statusUpdateFailed") || "Failed to update status");
    },
  });

  // Mutation for deleting conversation
  const deleteConversationMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success(
        t("conversationDeletedSuccess") || "Conversation deleted successfully"
      );
    },
    onError: () => {
      toast.error(
        t("conversationDeleteFailed") || "Failed to delete conversation"
      );
    },
  });

  // Toggle is_active for a conversation
  const handleToggleActive = (conversationId: number, newValue: boolean) => {
    updateStatusMutation.mutate({ id: conversationId, isActive: newValue });
  };

  // Handle delete conversation
  const handleDelete = (conversationId: number) => {
    if (
      window.confirm(
        t("confirmDeleteConversation") ||
          "Are you sure you want to delete this conversation?"
      )
    ) {
      deleteConversationMutation.mutate(conversationId);
      if (onDelete) onDelete(conversationId);
    }
  };

  return (
    <div className="relative flex">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t("carName")}</TableHead>
              <TableHead className="text-right">{t("brandName")}</TableHead>
              <TableHead className="text-right">{t("usersNumber")}</TableHead>
              <TableHead className="text-right">{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  {t("noConversationsFound") || "No conversations found"}
                </TableCell>
              </TableRow>
            ) : (
              conversations.map((conversation, index) => (
                <TableRow key={conversation.id} noBackgroundColumns={1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{conversation.vehicle?.name || "-"}</TableCell>
                  <TableCell>
                    {conversation.vehicle?.brand?.name || "-"}
                  </TableCell>
                  <TableCell className="w-full">
                    {conversation.users_count ||
                      conversation.followers_count ||
                      "-"}
                  </TableCell>
                  <TableCell className="flex gap-[7px] items-center">
                    <Switch
                      checked={Boolean(conversation.is_active)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleToggleActive(conversation.id, e.target.checked)
                      }
                      disabled={updateStatusMutation.isPending}
                    />
                    <button onClick={() => setOpenChatId(conversation.id)}>
                      <ChatIcon />
                    </button>
                    <div className="mt-2">
                      <TableDeleteButton
                        handleDelete={() => handleDelete(conversation.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AnimatePresence>
        {openChatId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenChatId(null)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full md:w-[493px] w-[300px] bg-white shadow-lg z-50 overflow-y-auto"
            >
              <ConversationPage />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatTable;
