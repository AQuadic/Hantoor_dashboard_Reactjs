import { useQuery } from "@tanstack/react-query";
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
import { useTranslation } from "react-i18next";
import {
  getSupportConversations,
  Conversation,
  SupportConversationsResponse,
} from "@/api/support/getConversations";
import { useState } from "react";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import toast from "react-hot-toast";
import { deleteConversation } from "@/api/support/deleteConversation";
import { updateConversation } from "@/api/support/updateConversation";
import { useNavigate } from "react-router";

interface SupportMessagesTableProps {
  page: number;
  itemsPerPage: number;
}

const SupportMessagesTable = ({
  page,
  itemsPerPage,
}: SupportMessagesTableProps) => {
  const { t } = useTranslation("questions");
  const navigate = useNavigate();
  const [notesMap, setNotesMap] = useState<Record<number, string>>({});
  const [activeMap, setActiveMap] = useState<Record<number, boolean>>({});

  const { data, isLoading, refetch } = useQuery<
    SupportConversationsResponse,
    Error
  >({
    queryKey: ["supportConversations", page, itemsPerPage],
    queryFn: () => getSupportConversations({ page, per_page: itemsPerPage }),
  });

  const handleDelete = async (id: number) => {
    await deleteConversation(id);
    toast.success(t("conversationDeleted"));
    refetch();
  };

  const handleUpdate = async (
    id: number,
    updates: { notes?: string; status?: string; is_active?: boolean }
  ) => {
    try {
      await updateConversation(id, updates);
      toast.success(t("conversationUpdated"));
      refetch();
    } catch (err: unknown) {
      const message = (() => {
        if (err && typeof err === "object") {
          if (
            "response" in err &&
            err.response &&
            typeof err.response === "object" &&
            "data" in err.response
          ) {
            const responseData = err.response.data;
            if (
              responseData &&
              typeof responseData === "object" &&
              "message" in responseData
            ) {
              return (responseData as { message: string }).message;
            }
          }
          if ("message" in err) {
            return (err as { message: string }).message;
          }
        }
        return t("error");
      })();
      toast.error(message);
    }
  };

  if (isLoading) return <Loading />;
  const supportMessages: Conversation[] = data?.data || [];
  if (!supportMessages.length) return <NoData />;

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
            {supportMessages.map((message, index) => (
              <TableRow key={message.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.country_id || "-"}</TableCell>
                <TableCell>{message.title}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell className="w-full">
                  <div dir="ltr">{message.phone}</div>
                </TableCell>
                <TableCell
                  className="flex gap-[7px] items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-[10px]">
                    <button
                      className={`w-[78px] h-[37px] rounded-[8.15px] font-bold text-[13px] ${
                        activeMap[message.id] ?? message.is_active
                          ? "bg-[#2A32F8] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#A1A1A1]"
                      }`}
                      onClick={() => {
                        const newValue = true;
                        setActiveMap((prev) => ({
                          ...prev,
                          [message.id]: newValue,
                        }));
                        handleUpdate(message.id, { is_active: newValue });
                      }}
                    >
                      {t("working")}
                    </button>

                    <button
                      className={`w-[78px] h-[37px] rounded-[8.15px] font-normal text-[13px] ${
                        !(activeMap[message.id] ?? message.is_active)
                          ? "bg-[#2A32F8] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#A1A1A1]"
                      }`}
                      onClick={() => {
                        const newValue = false;
                        setActiveMap((prev) => ({
                          ...prev,
                          [message.id]: newValue,
                        }));
                        handleUpdate(message.id, { is_active: newValue });
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
                        handleUpdate(message.id, { notes: newValue });
                      }}
                      className="w-[150px] h-[37px] bg-[#FFFFFF] border border-[#D8D8D8] rounded-[10px] focus:outline-none px-3 placeholder:text-[13px]"
                      placeholder={t("yourNotes")}
                    />
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/support-messages/view/${message.id}`)
                    }
                  >
                    <View />
                  </button>

                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(message.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupportMessagesTable;
