import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import TablePagination from '@/components/general/dashboard/table/TablePagination';
import UserSelects from '@/components/users/UserSelects';
import { UserTable } from '@/components/users/UsersTable';
import { Link } from 'react-router';
const DashboardUsers = () => {
    return (
        <section >
            <div className='bg-white py-2'>
                <DashboardHeader
                    title="المستخدمين"
                    items={[
                        { title: 'لوحة التحكم', link: '/' },
                        { title: 'المستخدمين' }
                    ]}
                />

                <div className='flex flex-wrap items-center gap-2 md:px-8 px-2'>
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
                    <Link to='/dashboard/addUsers'>
                        <DashboardButton title={'إضافة مستخدم جديد'} variant="add" />
                    </Link>
                </div>

                <UserSelects />
            </div>
        <UserTable />

        <TablePagination currentPage={0} setCurrentPage={function (): void {
                throw new Error('Function not implemented.');
            } } totalPages={0} totalItems={0} itemsPerPage={0} />
        </section>
    );
};

export default DashboardUsers;
