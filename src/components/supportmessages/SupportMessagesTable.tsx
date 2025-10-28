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
import View from "../icons/general/View";
import SupportMsgsConversation from "@/pages/supportmessages/SupportMsgsConversation";
import { useTranslation } from "react-i18next";
import { Conversation } from "@/api/support/getConversations";
import { useState, useRef } from "react";
import { debounce } from "@/lib/debounce";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import toast from "react-hot-toast";
import { deleteConversation } from "@/api/support/deleteConversation";
import { updateConversation } from "@/api/support/updateConversation";
import { useHasPermission } from "@/permissions";

interface SupportMessagesTableProps {
  conversations: Conversation[];
  isLoading: boolean;
  refetch: () => void;
}

const SupportMessagesTable = ({
  conversations,
  isLoading,
  refetch,
}: SupportMessagesTableProps) => {
  const { t, i18n } = useTranslation("questions");
  const [openMessageId, setOpenMessageId] = useState<number | null>(null);
  const [notesMap, setNotesMap] = useState<Record<number, string>>({});
  // statusMap holds the local override for a conversation's status.
  // backend expects `status` with values like 'pending' or 'resolved'
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});
  const debouncedUpdaters = useRef<Record<number, (value: string) => void>>({});
  const canDelete = useHasPermission("delete_support_message");

  const handleDelete = async (id: number) => {
    await deleteConversation(id);
    toast.success(t("conversationDeleted"));
    refetch();
  };

  const handleUpdate = async (
    id: number,
    updates: { notes?: string; status?: string }
  ) => {
    try {
      await updateConversation(id, updates);
      toast.dismiss();
      toast.success(t("conversationUpdated"));
      refetch();
    } catch (err: unknown) {
      const extractMessage = (e: unknown) => {
        if (!e || typeof e !== "object") return undefined;
        const maybe = e as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        return maybe.response?.data?.message || maybe.message;
      };
      const message = extractMessage(err) || t("error");
      toast.error(message);
    }
  };

  const getDebouncedUpdater = (id: number) => {
    if (!debouncedUpdaters.current[id]) {
      debouncedUpdaters.current[id] = debounce((value: string) => {
        handleUpdate(id, { notes: value });
      }, 500);
    }
    return debouncedUpdaters.current[id];
  };

  if (isLoading) return <Loading />;
  if (!conversations.length) return <NoData />;

  return (
    <div className="relative flex">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t("supportNumber")}</TableHead>
              <TableHead className="text-right">{t("country")}</TableHead>
              <TableHead className="text-right">{t("question")}</TableHead>
              <TableHead className="text-right">{t("username")}</TableHead>
              <TableHead className="text-right">{t("phoneNumber")}</TableHead>
              <TableHead className="text-right">{t("supportStatus")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((message) => (
              <TableRow key={message.id} noBackgroundColumns={1}>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.id}</TableCell>
                <TableCell>
                  {i18n.language === "ar"
                    ? message.faq?.country?.name?.ar ?? "-"
                    : message.faq?.country?.name?.en ?? "-"}
                </TableCell>
                <TableCell>
                  {i18n.language === "ar"
                    ? message.faq?.question?.ar ?? "-"
                    : message.faq?.question?.en ?? "-"}
                </TableCell>
                <TableCell>{message.user.name}</TableCell>
                <TableCell className="w-full">
                  <div dir="ltr">{message.user.phone}</div>
                </TableCell>
                <TableCell
                  className="flex gap-[7px] items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-[10px]">
                    <button
                      className={`w-[78px] h-[37px] rounded-[8.15px] font-bold text-[13px] ${
                        (statusMap[message.id] ?? message.status) === "pending"
                          ? "bg-[#2A32F8] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#A1A1A1]"
                      }`}
                      onClick={() => {
                        const newValue = "pending";
                        setStatusMap((prev) => ({
                          ...prev,
                          [message.id]: newValue,
                        }));
                        handleUpdate(message.id, { status: newValue });
                      }}
                    >
                      {t("working")}
                    </button>

                    <button
                      className={`w-[78px] h-[37px] rounded-[8.15px] font-normal text-[13px] ${
                        (statusMap[message.id] ?? message.status) === "resolved"
                          ? "bg-[#2A32F8] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#A1A1A1]"
                      }`}
                      onClick={() => {
                        const newValue = "resolved";
                        setStatusMap((prev) => ({
                          ...prev,
                          [message.id]: newValue,
                        }));
                        handleUpdate(message.id, { status: newValue });
                      }}
                    >
                      {t("done")}
                    </button>
                    <input
                      type="text"
                      name="notes"
                      id="notes"
                      value={notesMap[message.id] ?? message.notes}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setNotesMap((prev) => ({
                          ...prev,
                          [message.id]: newValue,
                        }));
                        getDebouncedUpdater(message.id)(newValue);
                      }}
                      className="w-[150px] h-[37px] bg-[#FFFFFF] border border-[#D8D8D8] rounded-[10px] focus:outline-none px-3 placeholder:text-[13px]"
                      placeholder={t("yourNotes")}
                    />
                  </div>

                  <button onClick={() => setOpenMessageId(message.id)}>
                    <View />
                  </button>

                  {canDelete && (
                    <div className="mt-2">
                      <TableDeleteButton
                        handleDelete={() => handleDelete(message.id)}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AnimatePresence>
        {openMessageId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenMessageId(null)}
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
              <SupportMsgsConversation conversationId={openMessageId} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportMessagesTable;
