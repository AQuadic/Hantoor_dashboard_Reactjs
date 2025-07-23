import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import TableEditButton from "@/components/general/dashboard/table/TableEditButton";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
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
  return (
    <div dir="rtl" className="max-w-7xl mx-auto p-4">
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
      <TablePagination />
      <ImageInput image={image} setImage={setImage} />
    </div>
  );
};

export default Testing;
