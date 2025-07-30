import { Select, SelectItem} from "@heroui/react";

const UserSelects = () => {
    const countries = [
        {key: "1", label: "مصر"},
        {key: "2", label: "مصر"},
        {key: "3", label: "مصر"},
        {key: "4", label: "مصر"},
        {key: "5", label: "مصر"},
        {key: "6", label: "مصر"},
    ];
    return (
        <div className='mt-[11px] flex items-center gap-[5px] px-8'>
            <div className="w-[160px]">
                <Select
                    items={countries}
                    label="طريقة التسجيل"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6',
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
                    label="البلد"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>
    </div>
    )
}

export default UserSelects
