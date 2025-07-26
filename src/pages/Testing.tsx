import DashboardPhoneInput from "@/components/general/dashboard/DashboardPhoneInput";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import TableEditButton from "@/components/general/dashboard/table/TableEditButton";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import ImageInput from "@/components/general/ImageInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@heroui/react";
import React from "react";

const Testing = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [image, setImage] = React.useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = React.useState({
    name: "United States",
    iso2: "US",
    phone: "1",
  });
  const [phone, setPhone] = React.useState("");
  return (
    <div dir="rtl" className="p-4 mx-auto max-w-7xl">
      <TabsFilter
        filters={["All", "Paid", "Unpaid"]}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>aaaa</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>
              <TableEditButton handleEdit={() => alert("Edit clicked")} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex items-center gap-2">
              <TableEditButton handleEdit={() => alert("Edit clicked")} />
              <TableDeleteButton handleDelete={() => alert("Delete clicked")} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex items-center gap-2">
              <TableEditButton handleEdit={() => alert("Edit clicked")} />
              <TableDeleteButton handleDelete={() => alert("Delete clicked")} />
              <Switch />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ImageInput image={image} setImage={setImage} />
      <DashboardPhoneInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        phone={phone}
        setPhone={setPhone}
      />
    </div>
  );
};

export default Testing;
