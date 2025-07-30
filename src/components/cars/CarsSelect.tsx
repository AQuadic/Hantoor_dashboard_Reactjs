import { Checkbox, Select, SelectItem} from "@heroui/react";

const CarsSelect = () => {

    const countries = [
    {key: "1", label: "مصر"},
    {key: "2", label: "مصر"},
    {key: "3", label: "مصر"},
    {key: "4", label: "مصر"},
    {key: "5", label: "مصر"},
    {key: "6", label: "مصر"},
    ];
    return (
        <div className='mt-[11px] flex flex-wrap items-center gap-[5px] px-8'>
            <div className="w-[160px]">
                <Select
                    items={countries}
                    label="الماركة"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="w-[160px]">
                <Select
                    items={countries}
                    label="النوع"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="w-[160px]">
                <Select
                    items={countries}
                    label="الموديل"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="md:w-[340px] w-full h-[46px] border border-[#DBDEE1] rounded-[34px] flex items-center justify-around">
                <div className="flex items-center">
                    <Checkbox defaultSelected size="md"></Checkbox>
                    <p className="text-[#1E1B1B] md:text-base text-sm font-normal">تحتوي على خصم</p>
                </div>
                <div className="flex items-center">
                    <Checkbox defaultSelected size="md"></Checkbox>
                    <p className="text-[#1E1B1B] md:text-base text-sm font-normal">تحتوي على عروض</p>
                </div>
            </div>
    </div>
    )
}

export default CarsSelect
