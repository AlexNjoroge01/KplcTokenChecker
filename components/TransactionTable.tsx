import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import type { Transaction } from "@/types/api";

interface Props {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No transactions found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount (KES)</TableHead>
            <TableHead>Units (kWh)</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Receipt No.</TableHead>
            <TableHead>Tariff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t, i) => (
            <TableRow key={i}>
              <TableCell>{format(new Date(t.trnTimestamp), "dd MMM yyyy")}</TableCell>
              <TableCell className="font-medium">{t.trnAmount.toFixed(2)}</TableCell>
              <TableCell>{t.trnUnits.toFixed(1)}</TableCell>
              <TableCell className="font-mono text-sm">{t.tokenNo}</TableCell>
              <TableCell>{t.recptNo}</TableCell>
              <TableCell>{t.tariff || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}