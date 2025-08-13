import { Link } from "react-router";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch } from "@heroui/react";
import user1 from '/images/users/user1.svg'
import user2 from '/images/users/user2.svg'
import user3 from '/images/users/user3.svg'
import user4 from '/images/users/user4.svg'
import { Select, SelectItem} from "@heroui/react";
import { useTranslation } from "react-i18next";

export function UserTable() {
  const { t } = useTranslation("users");
  const users = [
    { id: 1, image: user1, name: "محمد احمد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"رقم الجوال", country: "الامارات",  email: "asmaa@example.com", advancedCount: "22", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 2, image: user2, name: "مصطفي خالد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"فيس بوك", country: "مصر",  email: "john@example.com", advancedCount: "14", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 3, image: user3, name: "ابراهيم محمود", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"جيميل", country: "الامارات",  email: "jane@example.com", advancedCount: "8", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
    { id: 4, image: user4, name: "محمد احمد", phone: "+966 123456 789", date: "22/03/2024- 08:30 PM", way:"البريد الالكتروني", country: "المغرب",  email: "jane@example.com", advancedCount: "11", paymentMethod: "بطاقة ائتمانية", noTimes: "10", noCars: "5", currency: "درهم اماراتي", status: "22/03/2024- 08:30 PM", SuspensionPeriod: "حدد المدة", isActive: true, statusTwo: 'Icon' },
  ];

  const countries = [
    {key: "1", label: "1"},
    {key: "2", label: "2"},
    {key: "3", label: "3"},
    {key: "4", label: "4"},
    {key: "5", label: "5"},
    {key: "6", label: "6"},
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow >
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('image')}</TableHead>
          <TableHead className="text-right">{t('name')}</TableHead>
          <TableHead className="text-right">{t('phone')}</TableHead>
          <TableHead className="text-right">{t('email')}</TableHead>
          <TableHead className="text-right">{t('dateAndTime')}</TableHead>
          <TableHead className="text-right">{t('registrationMethod')}</TableHead>
          <TableHead className="text-right">{t('country')}</TableHead>
          <TableHead className="text-right">{t('NOSearches')}</TableHead>
          <TableHead className="text-right">{t('paymentMethod')}</TableHead>
          <TableHead className="text-right">{t('numberOfInsurance')}</TableHead>
          <TableHead className="text-right">{t('carNumbers')}</TableHead>
          <TableHead className="text-right">{t('currency')}</TableHead>
          <TableHead className="text-right">{t('active')}</TableHead>
          <TableHead className="text-right">{t('suspensionDuration')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody >
        {users.map((user, index) => (
        <TableRow key={user.id} noBackgroundColumns={2}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img src={user.image} alt="user" className="w-[52.3px] h-[51px] rounded-full" />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell dir="ltr">{user.phone}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.date}</TableCell>
            <TableCell>{user.way}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.advancedCount}</TableCell>
            <TableCell>{user.paymentMethod}</TableCell>
            <TableCell>{user.noTimes}</TableCell>
            <TableCell>{user.noCars}</TableCell>
            <TableCell>{user.currency}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
              {user.SuspensionPeriod === "حدد المدة" ? (
                  <div className="w-[160px]">
                      <Select
                          items={countries}
                          label='حدد المدة'
                          classNames={{
                              trigger: 'h-9 !h-9 min-h-9 bg-white border !py-5 rounded-[5px]',
                              label: 'text-sm text-gray-700',
                              listbox: 'bg-white shadow-md',
                          }}
                          >
                          {(country) => <SelectItem>{country.label}</SelectItem>}
                      </Select>
                  </div>
              ) : (
                user.SuspensionPeriod
              )}
            </TableCell>
            <TableCell className="flex items-center gap-[7px]">
                <Switch />
              <Link to={`/users/edit/${user.id}`}><Edit /></Link>
              <Link to='change-password'><Password /></Link>
              <TableDeleteButton handleDelete={() => {}} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
