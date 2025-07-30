import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import { Input } from '@heroui/react'
import { Select, SelectItem} from "@heroui/react";
import React from 'react';

const EditCarTypes = () => {
    const [, setSelectedAgent] = React.useState("");
    const agents = [
        { label: "SUV", value: "model1" },
        { label: "SUV", value: "model2" },
        { label: "SUV", value: "model3" },
    ];
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
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
                        label="اسم النوع ( باللغة العربية )"
                        variant="bordered"
                        placeholder=" SUV"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    <Select
                        className="mt-4"
                        size={"lg"}
                        variant="bordered"
                        label="الهيكل"
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
                    label="اسم النوع ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    className="flex-1"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>

                <DashboardButton title="حفظ" />
                </div>
            </div>
            </div>
    )
}

export default EditCarTypes
