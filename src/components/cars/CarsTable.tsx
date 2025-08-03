import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ChatIcon from "../icons/chats/ChatIcon";
import ConversationPage from "@/pages/chats/ConversationPage";
import { Switch } from "@heroui/react";
import carImage from "/images/cartable.png";
import TableEditButton from "@/components/general/dashboard/table/TableEditButton";
import ViewIcon from "@/components/icons/dashboard/ViewIcon";
import { Link } from "react-router";

const CarsTable = () => {
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  const chats = [
    {
      id: 1,
      image: carImage,
      name: "تويوتا كامري 2025",
      brand: "تويوتا",
      agent: "ابو ظبي للسيارات",
      type: "Extreme",
      model: "2025",
      price: "500.000 درهم",
      discount: "يوجد",
      discountPercentage: "15%",
      offers: "يوجد",
      priceWithTax: "نعم",
      priceWithwarranty: "نعم",
      priceWithinsurance: "نعم",
      RentToOwn: "يوجد",
      count: "11",
      date: "22/03/2024- 08:30 PM",
    },
    {
      id: 2,
      image: carImage,
      name: "Kia Stinger Turbo",
      brand: "كيا",
      agent: "ابو ظبي للسيارات",
      type: "Extreme",
      model: "2025",
      price: "500.000 درهم",
      discount: "يوجد",
      discountPercentage: "15%",
      offers: "يوجد",
      priceWithTax: "نعم",
      priceWithwarranty: "نعم",
      priceWithinsurance: "نعم",
      RentToOwn: "يوجد",
      count: "11",
      date: "22/03/2024- 08:30 PM",
    },
    {
      id: 3,
      image: carImage,
      name: "تويوتا كامري 2025",
      brand: "تويوتا",
      agent: "ابو ظبي للسيارات",
      type: "Extreme",
      model: "2025",
      price: "500.000 درهم",
      discount: "يوجد",
      discountPercentage: "15%",
      offers: "يوجد",
      priceWithTax: "نعم",
      priceWithwarranty: "نعم",
      priceWithinsurance: "نعم",
      RentToOwn: "يوجد",
      count: "11",
      date: "22/03/2024- 08:30 PM",
    },
  ];
  return (
    <div className="relative flex">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">الصورة</TableHead>
              <TableHead className="text-right">اسم السيارة</TableHead>
              <TableHead className="text-right">اسم الماركة</TableHead>
              <TableHead className="text-right">اسم الوكيل</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">الموديل</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الخصم</TableHead>
              <TableHead className="text-right">نسبة الخصم</TableHead>
              <TableHead className="text-right">العروض</TableHead>
              <TableHead className="text-right">السعر شامل الضريبة</TableHead>
              <TableHead className="text-right">السعر شامل الضمان</TableHead>
              <TableHead className="text-right">السعر شامل التأمين</TableHead>
              <TableHead className="text-right">ايجار منتهي بالتملك</TableHead>
              <TableHead className="text-right">
                عدد مرات الاضاف للمفضلة
              </TableHead>
              <TableHead className="text-right">تاريخ ووقت الاضافة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chats.map((chat, index) => (
              <TableRow key={chat.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={chat.image}
                    alt="car"
                    className="w-[93px] h-[60px]"
                  />
                </TableCell>
                <TableCell>{chat.name}</TableCell>
                <TableCell>{chat.brand}</TableCell>
                <TableCell>{chat.agent}</TableCell>
                <TableCell>{chat.type}</TableCell>
                <TableCell>{chat.model}</TableCell>
                <TableCell>{chat.price}</TableCell>
                <TableCell>{chat.discount}</TableCell>
                <TableCell>{chat.discountPercentage}</TableCell>
                <TableCell>{chat.offers}</TableCell>
                <TableCell>{chat.priceWithTax}</TableCell>
                <TableCell>{chat.priceWithwarranty}</TableCell>
                <TableCell>{chat.priceWithinsurance}</TableCell>
                <TableCell>{chat.RentToOwn}</TableCell>
                <TableCell>{chat.count}</TableCell>
                <TableCell>{chat.date}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                  <Switch />
                  <button onClick={() => setOpenChatId(chat.id)}>
                    <ChatIcon />
                  </button>
                  <Link to={`/cars/${chat.id}`} className="">
                    <ViewIcon />
                  </Link>
                  <Link to={`/cars/edit/${chat.id}`} className="mt-2">
                    <TableEditButton />
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
        {openChatId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenChatId(null)}
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
              <ConversationPage />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarsTable;
