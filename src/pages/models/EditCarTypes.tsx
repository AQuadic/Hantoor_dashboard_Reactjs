import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { useVehicleBodies } from '@/api/models/structureType/getStructure';
import { updateCarType, UpdateCarTypePayload } from '@/api/models/carTypes/editCarType';
import { getCarTypeById } from '@/api/models/carTypes/getCarById';

const EditCarTypes: React.FC = () => {
  const { t, i18n } = useTranslation('models');
  const { id } = useParams<{ id: string }>();
  const typeId = Number(id);
  const navigate = useNavigate();

  const [arName, setArName] = useState('');
  const [enName, setEnName] = useState('');
  const [selectedBody, setSelectedBody] = useState('');
  const [, setIsSubmitting] = useState(false);

  const { data: vehicleBodies, isLoading: loadingBodies, error: loadError } = useVehicleBodies();

const { data: carType } = useQuery({
  queryKey: ['carType', typeId],
  queryFn: () => getCarTypeById(typeId),
  enabled: !!typeId,
});

  useEffect(() => {
    if (carType) {
      setArName(carType.name.ar);
      setEnName(carType.name.en);
      setSelectedBody(carType.vehicle_body_type_id);
    }
  }, [carType]);

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
                        placeholder={t("writeHere")}
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
