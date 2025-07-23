import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
const DashboardUsers = () => {
    return (
        <section className='bg-white py-4'>
            <DashboardHeader
                title="المستخدمين"
                items={[
                    { title: 'لوحة التحكم', link: '/' },
                    { title: 'المستخدمين' }
                ]}
            />

            <div className='flex items-center gap-2  px-8'>
                <div className='flex-1'>
                    <SearchBar
                        term={''}
                        setTerm={() => {
                        }}
                    />
                </div>
                <div className='flex-1'>
                    <DashboardDatePicker />
                </div>
                <DashboardButton title={'إضافة مستخدم جديد'} variant="add" />
            </div>
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
        </section>
    );
};

export default DashboardUsers;
