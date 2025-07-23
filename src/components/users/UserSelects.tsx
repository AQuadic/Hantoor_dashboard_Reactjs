import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"

const UserSelects = () => {
    return (
        <div className='mt-[11px] flex items-center gap-[5px] px-8'>
        <Select >
        <SelectTrigger className="w-[160px] !h-[46px] rounded-[12px]" dir='rtl'>
            <SelectValue placeholder="طريقة التسجيل" />
        </SelectTrigger>
        <SelectContent dir='rtl'>
            <SelectItem value="1">الجميع</SelectItem>
            <SelectItem value="2">الجميع</SelectItem>
            <SelectItem value="3">الجميع</SelectItem>
        </SelectContent>
        </Select>

        <Select >
        <SelectTrigger className="w-[160px] !h-[46px] rounded-[12px]" dir='rtl'>
            <SelectValue placeholder="البلد" />
        </SelectTrigger>
        <SelectContent dir='rtl'>
            <SelectItem value="1">الجميع</SelectItem>
            <SelectItem value="2">الجميع</SelectItem>
            <SelectItem value="3">الجميع</SelectItem>
        </SelectContent>
        </Select>
    </div>
    )
}

export default UserSelects
