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
import { useTranslation } from "react-i18next";

const CarsTable = () => {
  const { t } = useTranslation("cars");
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
              <TableHead className="text-right">{t('image')}</TableHead>
              <TableHead className="text-right">{t('carName')}</TableHead>
              <TableHead className="text-right">{t('brandName')}</TableHead>
              <TableHead className="text-right">{t('agentName')}</TableHead>
              <TableHead className="text-right">{t('type')}</TableHead>
              <TableHead className="text-right">{t('model')}</TableHead>
              <TableHead className="text-right">{t('price')}</TableHead>
              <TableHead className="text-right">{t('discount')}</TableHead>
              <TableHead className="text-right">{t('discountPercentage')}</TableHead>
              <TableHead className="text-right">{t('offers')}</TableHead>
              <TableHead className="text-right">{t('pricetaxIncluded')}</TableHead>
              <TableHead className="text-right">{t('pricewarrantyIncluded')}</TableHead>
              <TableHead className="text-right">{t('priceinsuranceIncluded')}</TableHead>
              <TableHead className="text-right">{t('leaseToOwn')}</TableHead>
              <TableHead className="text-right">
                {t('favTimes')}
              </TableHead>
              <TableHead className="text-right">{t('dateAndTime')}</TableHead>
              <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chats.map((chat, index) => (
              <TableRow key={chat.id} noBackgroundColumns={1}>
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
