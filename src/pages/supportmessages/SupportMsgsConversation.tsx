import { useTranslation } from "react-i18next";
import { useState } from "react";
import Avatar from "/images/avatar.svg";
import Link from "@/components/icons/chats/Link";
import AvatarIcon from "@/components/icons/chats/Avatar";
import SendIcon from "@/components/icons/chats/SendIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversationById } from "@/api/support/getConversationById";
import { sendMessage } from "@/api/support/sendMessage";
import Loading from "@/components/general/Loading";
import toast from "react-hot-toast";

interface SupportMsgsConversationProps {
  conversationId: number;
}

const SupportMsgsConversation = ({ conversationId }: SupportMsgsConversationProps) => {
  const { t } = useTranslation("header");
  const queryClient = useQueryClient();

  const { data: conversation, isLoading, error } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationById(conversationId),
    enabled: !!conversationId,
  });

  const [newMessage, setNewMessage] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  if (isLoading) return <Loading />;

  if (error || !conversation) {
    return <div className="text-center py-10">{t("noData")}</div>;
  }

  const messages = conversation.notes
    ? [
        {
          id: conversation.id,
          name: conversation.name || "User",
          text: conversation.notes,
          time: new Date(conversation.created_at).toLocaleTimeString(),
          isSender: true,
        },
      ]
    : [];

    const handleSendMessage = async () => {
    if (!newMessage && !mediaFile) return;

    try {
        await sendMessage({
        conversation_id: conversationId,
        message: newMessage,
        media: mediaFile || undefined,
        });
        toast.success(t("messageSent"));
        setNewMessage("");
        setMediaFile(null);
        queryClient.invalidateQueries({ queryKey: ["conversation", conversationId] });
    } catch (err: any) {
        toast.error(err?.message || t("error"));
    }
    };


    return (
        <section className="relative py-4 px-4 h-full flex flex-col">
        <h2 className="text-[#071739] text-[23px] font-bold text-center">{t("conversation")}</h2>
        <hr className="my-4"/>
        <div className="flex-1 overflow-y-auto space-y-6 pb-4">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex ${msg.isSender ? "justify-start" : "justify-end"}`}
            >
                {msg.isSender && (
                <div className="w-10 h-10 ml-2 flex-shrink-0">
                    <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                </div>
                )}

                <div>
                {msg.isSender && (
                    <div className="text-sm text-[#231F20] mb-1 text-right">{msg.name}</div>
                )}

                <div
                    className={`rounded-xl px-4 py-2 max-w-xs text-sm ${
                    msg.isSender
                        ? "bg-blue-600 text-white"
                        : "bg-[#F1F1F1] text-[#000000]"
                    }`}
                >
                    {msg.text}
                </div>

                <div className="text-[10px] text-gray-500 mt-1 text-right">{msg.time}</div>
                </div>
            </div>
            ))}
        </div>

        <div className="flex gap-3 items-center mt-auto relative">
            <input
            type="text"
            className="flex-1 h-12 bg-[#F6F6F6] rounded-3xl px-12 border border-[#DCDCDC]"
            placeholder="اكتب رسالتك..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            />

            <input
            type="file"
            className="hidden"
            id="mediaFile"
            onChange={(e) => {
                if (e.target.files?.[0]) setMediaFile(e.target.files[0]);
            }}
            />
            <div className="absolute left-28">
            <label htmlFor="mediaFile">
                <AvatarIcon />
            </label>
            </div>
            <div className="absolute left-20">
                <Link />
            </div>

            <button onClick={handleSendMessage}>
            <SendIcon />
            </button>
        </div>
        </section>
    );
};

export default SupportMsgsConversation;