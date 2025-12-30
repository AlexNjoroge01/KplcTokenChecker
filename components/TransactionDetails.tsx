import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Transaction } from "@/types/api";

interface Props {
  transaction: Transaction;
}

export function TransactionDetails({ transaction }: Props) {
  const copyToken = () => {
    navigator.clipboard.writeText(transaction.tokenNo);
    toast.success("Token copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Token Number - Large & Prominent */}
      <div className="bg-amber-500 rounded-xl p-8 text-center">
        <p className="text-white  text-sm uppercase tracking-wider mb-2">
          Token Number
        </p>
        <p className="text-3xl md:text-4xl font-bold text-white font-mono tracking-wider">
          {transaction.tokenNo.match(/.{4}/g)?.join("-") || transaction.tokenNo}
        </p>
        <Button
          onClick={copyToken}
          className="mt-6 bg-white/20 hover:bg-white/30 text-white border border-white/30"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Token
        </Button>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Date Purchased</p>
          <p className="text-white font-medium">
            {format(new Date(transaction.trnTimestamp), "EEEE, dd MMMM yyyy 'at' HH:mm")}
          </p>
        </div>
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Amount Paid</p>
          <p className="text-white font-medium">KES {transaction.trnAmount.toFixed(2)}</p>
        </div>
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Units Received</p>
          <p className="text-white font-medium">{transaction.trnUnits.toFixed(1)} kWh</p>
        </div>
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Service Point No.</p>
          <p className="text-white font-medium">{transaction.servicePointNo || "N/A"}</p>
        </div>
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Account Number</p>
          <p className="text-white font-medium">{transaction.accountNumber || "N/A"}</p>
        </div>
        {/* <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Customer Name</p>
          <p className="text-white font-medium">{transaction.custName || "N/A"}</p>
        </div> */}
        {/* <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Transaction ID</p>
          <p className="text-white font-medium">{transaction.transactionId || "N/A"}</p>
        </div> */}
        <div className="bg-[#2e4756] rounded-lg p-4">
          <p className="text-[#9fa2b2] text-sm">Receipt Number</p>
          <p className="text-white font-medium">{transaction.recptNo}</p>
        </div>
      </div>
    </div>
  );
}