import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Select, SelectItem } from '@heroui/react';
import { useVehicleBodies } from '@/api/models/structureType/getStructure';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import toast from 'react-hot-toast';
import { updateCarType, UpdateCarTypePayload } from '@/api/models/carTypes/editCarType';
import { useNavigate } from 'react-router';

interface EditCarTypesProps {
  typeId: number;
  initialData?: {
    name: { ar: string; en: string };
    vehicle_body_type_id: string;
  };
}

const EditCarTypes: React.FC<EditCarTypesProps> = ({ typeId, initialData }) => {
  const { t, i18n } = useTranslation("models");
  
  const [arName, setArName] = useState(initialData?.name.ar || '');
  const [enName, setEnName] = useState(initialData?.name.en || '');
  const [selectedBody, setSelectedBody] = useState(initialData?.vehicle_body_type_id || '');
  const [, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { data: vehicleBodies, isLoading: loadingBodies, error: loadError } = useVehicleBodies();

  const handleSave = async () => {
    const payload: UpdateCarTypePayload = {
      name: { ar: arName, en: enName },
      vehicle_body_type_id: selectedBody,
    };

    try {
      setIsSubmitting(true);
      await updateCarType(typeId, payload);
      toast.success(t('bodyTypeUpdated'));
      navigate("/models?section=Car Types");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        Object.values(errors).forEach((msgArr: any) => {
          msgArr.forEach((msg: string) => toast.error(msg));
        });
      } else {
        toast.error(t('somethingWentWrong'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div>
            <div className="pt-0 pb-2 bg-white">
                <DashboardHeader
                    titleAr="تعديل النوع"
                    titleEn="Edit the type"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: " اقسام السيارات", titleEn: "Car sections", link: "/models" },
                    { titleAr: "تعديل النوع", titleEn: "Edit the type" },
                    ]}
                />
            </div>
            <div className="flex flex-col gap-8 md:p-8 p-2">
                <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="flex-1">
                    <Input
                        label={t('arType')}
                        variant="bordered"
                        placeholder=" SUV"
                        value={arName}
                        onChange={(e) => setArName(e.target.value)}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    <Select
                        className="mt-4"
                        size={"lg"}
                        variant="bordered"
                        label={t('structure')}
                        onSelectionChange={(key) => setSelectedBody(key as string)}
                        value={selectedBody}
                        disabled={loadingBodies || !!loadError}
                    >
                        {(vehicleBodies?.data ?? []).map((body) => (
                        <SelectItem key={body.id} textValue={body.name[i18n.language as 'ar' | 'en']}>
                            {body.name[i18n.language as 'ar' | 'en']}
                        </SelectItem>
                        ))}
                    </Select>
                    </div>
                    <Input
                    label={t('enType')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    value={enName}
                    onChange={(e) => setEnName(e.target.value)}
                    className="flex-1"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>

                <DashboardButton
                    titleAr="حفظ"
                    titleEn="Save"
                    onClick={handleSave}
                />
                </div>
            </div>
            </div>
    )
}

export default EditCarTypes
