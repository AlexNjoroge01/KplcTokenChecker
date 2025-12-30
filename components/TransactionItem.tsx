import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Transaction } from "@/types/api";

interface Props {
  transaction: Transaction;
  isSelected: boolean;
  onSelect: () => void;
}

export function TransactionItem({ transaction, isSelected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 text-left rounded-lg transition-all
        ${isSelected 
          ? "bg-[#3c7a89]/30 ring-2 ring-[#3c7a89]" 
          : "bg-[#2e4756]/50 hover:bg-[#2e4756]/80"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-white">
            {format(new Date(transaction.trnTimestamp), "dd MMM yyyy")}
          </p>
          <p className="text-lg font-semibold text-white mt-1">
            KES {transaction.trnAmount.toFixed(0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#9fa2b2] text-sm">Units</p>
          <p className="font-medium text-white">
            {transaction.trnUnits.toFixed(1)} kWh
          </p>
        </div>
      </div>
    </button>
  );
}