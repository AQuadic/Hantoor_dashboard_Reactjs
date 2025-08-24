// import { CarType, getCarTypeById } from '@/api/models/carTypes/getCarById';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import { Input } from '@heroui/react'
import { Select, SelectItem} from "@heroui/react";
import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useParams } from 'react-router';

const EditCarTypes = () => {
    const { t } = useTranslation("models");
    const [, setSelectedAgent] = React.useState("");
    // const { id } = useParams<{ id: string }>();
    const agents = [
        { label: "SUV", value: "model1" },
        { label: "SUV", value: "model2" },
        { label: "SUV", value: "model3" },
    ];

    // const { data: carType } = useQuery<CarType>({
    //     queryKey: ["carType", id],
    //     queryFn: () => getCarTypeById(Number(id)),
    //     enabled: !!id,
    //     retry: false,
    // });

    
    // const [arCarType, setArCarType] = useState("");
    // const [enCarType, setEnCarType] = useState("");

    // useEffect(() => {
    // if (carType) {
    //     setArCarType(carType.name.ar);
    //     setEnCarType(carType.name.en);
    // }
    // }, [carType]);

    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
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
            <div className="flex flex-col gap-8 p-8">
                <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
                <div className="flex gap-4">
                    <div className="flex-1">
                    <Input
                        label={t('arType')}
                        variant="bordered"
                        placeholder=" SUV"
                        // value={arCarType}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    <Select
                        className="mt-4"
                        size={"lg"}
                        variant="bordered"
                        label={t('structure')}
                        onSelectionChange={(key) => setSelectedAgent(key as string)}
                    >
                        {agents.map((agent) => (
                        <SelectItem key={agent.value} textValue={agent.label}>
                            {agent.label}
                        </SelectItem>
                        ))}
                    </Select>
                    </div>
                    <Input
                    label={t('enType')}
                    variant="bordered"
                    placeholder="اكتب هنا"
                        // value={enCarType}
                    className="flex-1"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>

                <DashboardButton titleAr="حفظ" titleEn="Save" />
                </div>
            </div>
            </div>
    )
}

export default EditCarTypes
