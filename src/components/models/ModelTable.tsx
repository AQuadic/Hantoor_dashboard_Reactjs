import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/api/models/models/getModels";
import toast from "react-hot-toast";
import { deleteModel } from "@/api/models/models/deleteModel";
import { fetchAgents } from "@/api/agents/fetchAgents";

export function ModelTable() {
  const { t, i18n } = useTranslation("models");

  const { data: models = [], refetch } = useQuery({
    queryKey: ["models-list"],
    queryFn: getModels,
  });

  const { data: agentsData } = useQuery({
    queryKey: ["agents-list"],
    queryFn: () => fetchAgents(1, ""), 
  });

      const handleDelete = async (id: number) => {
      await deleteModel(id);
      toast.success(t("modelDeletedSuccessfully"));
      refetch();
    };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right ">#</TableHead>
          <TableHead className="text-right">{t('model')}</TableHead>
          <TableHead className="text-right">{t('agent')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model, index) => (
          <TableRow key={model.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {i18n.language === "ar" ? model.name.ar : model.name.en || model.name.ar}
            </TableCell>
            <TableCell className="w-full">
              {(() => {
                const agent = agentsData?.data.find((a: any) => a.id === model.agent_id);
                if (!agent) return "—";

                if (typeof agent.name === "string") return agent.name;
                return i18n.language.startsWith("ar")
                  ? agent.name.ar
                  : agent.name.en || agent.name.ar;
              })()}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={model.is_active} />
              <Link to={`/models/edit/${model.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(model.id)}
                  />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
