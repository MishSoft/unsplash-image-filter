import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { VscRemove } from "react-icons/vsc";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Context } from "@/context/context";

export default function History() {
  const { saveWords } = useContext(Context);
  return (
    <div className="w-full mt-10 flex items-center justify-center  border-t border-t-gray-100 p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Searched</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {saveWords.map((item, index) => (
            <TableRow key={index}>
              <TableCell>At 20:39 PM</TableCell>
              <TableCell>{item}</TableCell>
              <TableCell>
                <Button className="bg-red-500 rounded text-white hover:bg-red-300 transition-colors duration-200">
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
