import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleTypes, VehicleType } from '@/api/models/carTypes/getCarTypes';
import { updateVehicleClass, getVehicleClassById, UpdateVehicleClassPayload } from '@/api/categories/editCategory';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import { Input, Select, SelectItem } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const EditCategory = () => {
  const { t, i18n } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [arName, setArName] = useState('');
  const [enName, setEnName] = useState('');
  const [selectedCarType, setSelectedCarType] = useState<number | undefined>(undefined);
  const [, setLoading] = useState(false);

  const { data: carTypes } = useQuery<VehicleType[], Error>({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
  });

  useEffect(() => {
    if (!id) return;
    const fetchClass = async () => {
      try {
        const data = await getVehicleClassById(Number(id));
        const classData = data as {
          name: { ar: string; en: string };
          vehicle_type_id: number | string;
        };
        setArName(classData.name.ar);
        setEnName(classData.name.en);
        setSelectedCarType(Number(classData.vehicle_type_id));
      } catch (error: any) {
        toast.error(error.message || "Failed to load category");
      }
    };
    fetchClass();
  }, [id]);

  const handleSave = async () => {
    if (!id) return toast.error("ID not found");
    if (!selectedCarType) return toast.error(t("Please select a vehicle type"));

    const payload: UpdateVehicleClassPayload = {
      name: { ar: arName, en: enName },
      vehicle_type_id: selectedCarType.toString(),
    };

    try {
      setLoading(true);
      await updateVehicleClass(Number(id), payload);
      toast.success(t("categoryUpdated"));
      navigate("/models?section=Categories");
    } catch (error: any) {
      toast.error(error.message || t("Failed to update category"));
    } finally {
      setLoading(false);
    }
  };

    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الفئة"
                    titleEn="Edit category"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: " اقسام السيارات", titleEn: "Car sections", link: "/models" },
                    { titleAr: "تعديل الفئة", titleEn: "Edit category" },
                    ]}
                />
            </div>
            <div className="flex flex-col gap-8 md:p-8 p-2">
                <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="w-full">
                    <Input
                        label={t('arcategoryName')} 
                        value={arName}
                        onChange={(e) => setArName(e.target.value)}
                        variant="bordered"
                        size="lg"
                        classNames={{ label: "mb-2 text-base" }}
                    />
                    <Select
                    className="mt-4"
                        label={t("type")}
                        size="lg"
                        variant="bordered"
                        value={selectedCarType?.toString()}
                        onSelectionChange={(key) => {
                        const parsed = Number(typeof key === "string" ? key : Array.from(key as any)[0]);
                        setSelectedCarType(!isNaN(parsed) ? parsed : undefined);
                        }}
                        disabled={!carTypes}
                    >
                        {(carTypes || []).map((type) => (
                        <SelectItem
                            key={type.id}
                            textValue={i18n.language === "ar" ? type.name.ar : type.name.en}
                        >
                            {i18n.language === "ar" ? type.name.ar : type.name.en}
                        </SelectItem>
                        ))}
                    </Select>
                    </div>
                    <Input
                    label={t('encategoryName')} 
                    value={enName}
                    onChange={(e) => setEnName(e.target.value)}
                    variant="bordered"
                    size="lg"
                    classNames={{ label: "mb-2 text-base" }}
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

export default EditCategory
