import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "@heroui/react";
import View from "../icons/general/View";
import FaqDetails from "@/pages/faqs/FaqDetails";
import { Link } from "react-router";

const FAQsTable = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const technicalsupport = [
    {
      id: 1,
      question: "مشكلة في عرض السيارات أو البيانات",
      country: "الامارات",
      count: 22,
      date: "22/03/2024 - 08:30 PM",
    },
    {
      id: 2,
      question: "مشكلة في عرض السيارات أو البيانات",
      country: "الامارات",
      count: 22,
      date: "22/03/2024 - 08:30 PM",
    },
    {
      id: 3,
      question: "مشكلة في عرض السيارات أو البيانات",
      country: "الامارات",
      count: 22,
      date: "22/03/2024 - 08:30 PM",
    },
  ];

  return (
    <div className="">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">السؤال</TableHead>
              <TableHead className="text-right">البلد</TableHead>
              <TableHead className="text-right">عدد مرات الاستفادة</TableHead>
              <TableHead className="text-right">عدد مرات عدم الاستفادة</TableHead>
              <TableHead className="text-right">تاريخ ووقت الانشاء</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {technicalsupport.map((question, index) => (
              <TableRow key={question.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.country}</TableCell>
                <TableCell>{question.count}</TableCell>
                <TableCell>{question.count}</TableCell>
                <TableCell className="w-full">{question.date}</TableCell>
                <TableCell
                  className="flex gap-[7px] items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Switch />
                  <button onClick={() => setOpenFaqId(question.id)}>
                    <View />
                  </button>
                  <Link to={`/faq/edit/${question.id}`}>
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
      </div>

      <AnimatePresence>
        {openFaqId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenFaqId(null)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full md:w-[493px] w-[300px] bg-white shadow-lg z-50 overflow-y-auto"
            >
              <FaqDetails />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQsTable;
