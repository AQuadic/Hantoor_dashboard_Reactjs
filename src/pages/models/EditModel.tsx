import { useState, useEffect } from "react";
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import { Input } from '@heroui/react'
import { Select, SelectItem} from "@heroui/react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { getModels } from "@/api/models/models/getModels";
import { fetchAgents } from "@/api/agents/fetchAgents";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editVehicleModel } from "@/api/models/models/editModel";

const EditModel = () => {
    const { t, i18n } = useTranslation("models");
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [nameAr, setNameAr] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [agentId, setAgentId] = useState<number | null>(null);

    const { data: agentsData } = useQuery({
        queryKey: ["agents-list"],
        queryFn: () => fetchAgents(1, ""), 
    });

    useEffect(() => {
        if (!id) return;
        const fetchModel = async () => {
        const response = await getModels();
        const model = response.data.find((m) => m.id === Number(id));
        if (model) {
            setNameAr(model.name.ar);
            setNameEn(model.name.en || "");
            setAgentId(model.agent_id);
        }
        };
        fetchModel();
    }, [id]);

    const handleSubmit = async () => {
        if (!id) return;

        try {
        await editVehicleModel(Number(id), {
            name: { ar: nameAr, en: nameEn },
            agent_id: agentId || undefined,
        });
        toast.success(t("modelUpdatedSuccessfully"));
        navigate("/models");
        } catch (err) {
        console.error(err);
        toast.error(t("failedToUpdateModel"));
        }
    };

    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الموديل"
                    titleEn="Edit the model"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: " اقسام السيارات", titleEn: "Car sections", link: "/models" },
                    { titleAr: "تعديل الموديل", titleEn: "Edit the model" },
                    ]}
                />
            </div>
            <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] md:mx-8 mx-2">
                <div className="flex flex-col md:flex-row gap-[15px]">
                    <div className="w-full">
                    <Input
                        label={t('arModelName')}
                        variant="bordered"
                        placeholder="2026"
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                    <Input
                        label={t('enModelName')}
                        variant="bordered"
                        placeholder={t('writeHere')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                    />
                    </div>
                </div>
                <div className="md:w-1/2 md:rtl:pl-2 md:ltr:pr-2 mt-4">
                    <Select
                        items={agentsData?.data || []}
                        label={t("agent")}
                        placeholder="اختر الشركة"
                        value={agentId?.toString() || ""}
                        classNames={{
                            trigger: 'h-[53px] !h-[53px] min-h-[53px] bg-white border py-0',
                            label: 'text-sm text-gray-700',
                            listbox: 'bg-white shadow-md',
                        }}
                        >
                        {(agent) => {
                        const label =
                            typeof agent.name === "string"
                            ? agent.name
                            : i18n.language.startsWith("ar")
                            ? agent.name.ar
                            : agent.name.en || agent.name.ar;
                        return <SelectItem key={agent.id}>{label}</SelectItem>;
                        }}
                    </Select>
                </div>
                <div className='mt-4'>
                    <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default EditModel
