import { Link } from "react-router-dom";
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
import Copy from "../icons/agents/Copy";
import View from "../icons/general/View";
import { Agent } from "@/api/agents/fetchAgents";
import { useTranslation } from "react-i18next";
import NoData from "../general/NoData";

interface AgentPageTableProps {
  agents: Agent[];
  onDelete: (id: number) => void;
  onToggleActive?: (id: number, isActive: boolean) => void;
}

const AgentPageTable: React.FC<AgentPageTableProps> = ({
  agents,
  onDelete,
  onToggleActive,
}) => {
  const { t } = useTranslation("agents");
  if (!agents || agents.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("agentName")}</TableHead>
          <TableHead className="text-right">{t("NOMaintenance")}</TableHead>
          <TableHead className="text-right">{t("NOShowrooms")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent, index) => (
          <TableRow key={agent.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{agent.name.ar}</TableCell>
            <TableCell className="">
              {typeof agent.centers_count === "number"
                ? agent.centers_count
                : agent.centers
                ? agent.centers.filter((c) => c.type === "center").length
                : 0}
            </TableCell>
            <TableCell className="w-full">
              {typeof agent.show_rooms_count === "number"
                ? agent.show_rooms_count
                : agent.centers
                ? agent.centers.filter((c) => c.type === "show_room").length
                : 0}
            </TableCell>
            <TableCell
              className="flex gap-[7px] items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Switch
                isSelected={!!agent.is_active}
                onValueChange={(isSelected) =>
                  onToggleActive?.(agent.id, isSelected)
                }
              />
              <Copy />
              <Link to={`/agent/details/${agent.id}`}>
                <View />
              </Link>
              <Link to={`/agent/edit/${agent.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => onDelete(agent.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AgentPageTable;
