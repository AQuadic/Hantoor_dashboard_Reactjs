import TableEditButton from "@/components/general/dashboard/table/TableEditButton";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Testing = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
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
            <TableCell>
              <TableEditButton handleEdit={() => alert("Edit clicked")} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Testing;
