import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef, useMemo } from "react";
import Avatar from "/images/avatar.svg";
import Link from "@/components/icons/chats/Link";
import AvatarIcon from "@/components/icons/chats/Avatar";
import SendIcon from "@/components/icons/chats/SendIcon";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessages } from "@/api/support/getConversationById";
import { sendMessage } from "@/api/support/sendMessage";
import Loading from "@/components/general/Loading";
import toast from "react-hot-toast";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useHasPermission } from "@/permissions";

interface SupportMsgsConversationProps {
  conversationId: number;
}

const SupportMsgsConversation = ({
  conversationId,
}: SupportMsgsConversationProps) => {
  const { t } = useTranslation("header");
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: messagesResponse,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["conversation-messages", conversationId],
    queryFn: ({ pageParam = 1 }) =>
      getConversationMessages({
        conversation_id: conversationId,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.next_page_url) {
        const url = new URL(lastPage.next_page_url);
        const page = url.searchParams.get("page");
        return page ? Number(page) : undefined;
      }
      return undefined;
    },
    enabled: !!conversationId,
  });

  const [newMessage, setNewMessage] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const canCreate = useHasPermission("create_support_message");

  const messages = useMemo(() => {
    if (!messagesResponse) return [];
    return messagesResponse.pages
      .flatMap((page) => page.data)
      .slice()
      .reverse()
      .map((msg) => {
        const attachment =
          typeof msg.image === "string"
            ? msg.image
            : (msg.image as any)?.url ||
              (msg.image as any)?.responsive_urls?.[0] ||
              null;

        return {
          id: msg.id,
          name: msg.userable?.name || "User",
          text: msg.message,
          time: new Date(msg.created_at).toLocaleTimeString(),
          isSender:
            msg.userable_type.includes("Admin") ||
            msg.userable_type === "admin",
          attachment,
          avatar: Avatar,
        };
      });
  }, [messagesResponse]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (error || !messagesResponse) {
    return <div className="text-center py-10">{t("noData")}</div>;
  }

  const handleSendMessage = async () => {
    if (!newMessage && !mediaFile) return;

    try {
      await sendMessage({
        conversation_id: conversationId,
        message: newMessage || " ",
        media: mediaFile || undefined,
      });
      toast.success(t("messageSent"));
      setNewMessage("");
      setMediaFile(null);
      queryClient.invalidateQueries({
        queryKey: ["conversation-messages", conversationId],
      });
    } catch (err: any) {
      const apiError =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.message?.[0] ||
        err?.message ||
        t("error");

      toast.error(apiError);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <section className="relative py-4 px-4 h-full flex flex-col">
      <h2 className="text-[#071739] text-[23px] font-bold text-center">
        {t("conversation")}
      </h2>
      <hr className="my-4" />
      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
          >
            {!msg.isSender && (
              <div className="w-10 h-10 ml-2 flex-shrink-0">
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            )}

            <div>
              <div className="text-sm text-[#231F20] mb-1 text-right">
                {msg.name}
              </div>

              <div
                className={`rounded-xl px-4 py-2 max-w-xs text-sm break-words ${
                  msg.isSender
                    ? "bg-blue-600 text-white"
                    : "bg-[#F1F1F1] text-[#000000]"
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.attachment && (
                  <img
                    src={msg.attachment}
                    alt="attachment"
                    className="mt-2 rounded-lg max-w-[200px] max-h-[200px] object-cover"
                  />
                )}
              </div>

              <div className="text-[10px] text-gray-500 mt-1 text-right">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {mediaFile && (
        <div className="mt-2 flex items-center gap-2">
          <img
            src={URL.createObjectURL(mediaFile)}
            alt="preview"
            className="w-16 h-16 rounded-lg object-cover border"
          />
          <button
            onClick={() => setMediaFile(null)}
            className="text-red-500 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {canCreate && (
        <div className="flex items-center gap-2 mt-auto">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full h-12 bg-[#F6F6F6] rounded-3xl pl-12 pr-12 border border-[#DCDCDC]"
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
            <label
              htmlFor="mediaFile"
              className="absolute left-10 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <Link />
            </label>

            <div
              className="absolute left-3 top-1/2 -translate-y-1/2"
              ref={emojiRef}
            >
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <AvatarIcon />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50 bg-white shadow-lg rounded-xl">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white"
          >
            <SendIcon />
          </button>
        </div>
      )}
    </section>
  );
};

export default SupportMsgsConversation;
