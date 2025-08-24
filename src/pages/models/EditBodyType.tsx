import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getModels, Model } from "@/api/models/models/getModels";
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { Input, Select, SelectItem} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';
import { updateBodyType } from "@/api/models/structureType/editStructure";
import toast from "react-hot-toast";
// import { getStructureById } from "@/api/models/structureType/getStructureById";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";

const EditBodyType = () => {
  const { t, i18n } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [agentId, setAgentId] = useState<string>("");

const { data: models = [], isLoading } = useQuery<Model[]>({
  queryKey: ["models-list"],
  queryFn: async () => {
    const response = await getModels();
    return response.data; 
  },
});


//   const { data: bodyType } = useQuery({
//   queryKey: ["body-type", id],
//   queryFn: () => getStructureById(Number(id)),
//   enabled: !!id,
// });

    // useEffect(() => {
    // if (bodyType) {
    //     setNameAr(bodyType.name.ar);
    //     setNameEn(bodyType.name.en);
    //     setAgentId(String(bodyType.agent_id));
    // }
    // }, [bodyType]);

    const handleSave = async () => {
    if (!id) return;

    try {
        await updateBodyType(Number(id), {
        name: { ar: nameAr, en: nameEn },
        agent_id: Number(agentId),
        });
        toast.success(t('bodyTypeUpdated'));
        navigate("/models?section=Structure+Types&page=1");
    } catch (err: any) {
        console.error(err);
        const message =
        err?.response?.data?.message || "Failed to update body type";
        toast.error(message);
    }
    };

        return (
            <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل نوع الهيكل"
                    titleEn="Edit structure type"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "اقسام السيارات", titleEn: "Car sections", link: "/models" },
                    { titleAr: "تعديل نوع الهيكل", titleEn: "Edit structure type" },
                    ]}
                />
            </div>
            <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] md:mx-8 mx-2">
                <div className="flex flex-col md:flex-row gap-[15px]">
                    <div className="w-full">
                    <Input
                        label={t('arcategoryName')}
                        variant="bordered"
                        placeholder="SUV"
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                    />
                    </div>
                    <div className="w-full">
                    <Input
                        label={t('encategoryName')}
                        variant="bordered"
                        placeholder="اكتب هنا"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                    />
                    </div>
                </div>
                <div className="md:w-1/2 md:rtl:pl-2 md:ltr:pr-2 mt-4">
                    <Select
                    items={models as Model[]}
                    label={t("model")}
                    placeholder={isLoading ? t("loading") : t("selectModel")}
                    selectedKeys={agentId ? [agentId] : []}
                    onSelectionChange={(keys) => setAgentId(Array.from(keys)[0] as string)}
                    classNames={{
                        trigger: 'h-[53px] !h-[53px] min-h-[53px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(model) => (
                        <SelectItem key={String(model.id)}>
                        {model.name[i18n.language as "ar" | "en"]}
                        </SelectItem>
                    )}
                    </Select>
                </div>
                <div className='mt-4'>
                    <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}

export default EditBodyType
