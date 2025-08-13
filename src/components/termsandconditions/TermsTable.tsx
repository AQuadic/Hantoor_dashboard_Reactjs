import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";

const TermsTable = () => {
    const { t } = useTranslation("setting")
    const profile = [
    {
        id: 1,
        title: "سياسة الأسعار",
        country: 'السعودية',
        description: 'لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد...'
    },
    {
        id: 2,
        title: "سياسة الأسعار",
        country: 'مصر',
        description: 'لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد...'
    },
    {
        id: 3,
        title: "سياسة الأسعار",
        country: 'السعودية',
        description: 'لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد...'
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('textTitle')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('description')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {profile.map((profie, index) => (
            <TableRow key={profie.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profie.title}</TableCell>
                <TableCell>{profie.country}</TableCell>
                <TableCell>{profie.description}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Link to={`/profile/edit-termsandconditions`}>
                    <Edit />
                </Link>

                <div className="mt-2">
                <TableDeleteButton handleDelete={() => {}} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default TermsTable
