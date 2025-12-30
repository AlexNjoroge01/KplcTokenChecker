"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionItem } from "./TransactionItem";
import { TransactionDetails } from "./TransactionDetails";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ← Proper named import
import type { Transaction } from "@/types/api";
import { format } from "date-fns";

interface Props {
  transactions: Transaction[] | null;
  loading: boolean;
  error: string | null;
  onFinish: () => void;
}

export function DashboardScreen({ transactions, loading, error, onFinish }: Props) {
  const [selected, setSelected] = useState<Transaction | null>(null);

  const effectiveSelected =
    selected ?? (transactions && transactions.length > 0 ? transactions[0] : null);

  const downloadPDF = () => {
    if (!transactions || transactions.length === 0) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("KPLC Token History", 14, 22);

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on ${format(new Date(), "dd MMMM yyyy")}`, 14, 30);

    // Table data
    const tableData = transactions.map((t) => [
      format(new Date(t.trnTimestamp), "dd MMM yyyy"),
      `KES ${Number(t.trnAmount).toFixed(2)}`,
      `${Number(t.trnUnits).toFixed(1)} kWh`,
      t.tokenNo,
      t.recptNo,
      t.tariff || "N/A",
    ]);

    // Use the imported autoTable function directly (fully typed, no casting needed)
    autoTable(doc, {
      head: [["Date", "Amount (KES)", "Units (kWh)", "Token", "Receipt No.", "Tariff"]],
      body: tableData,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5, textColor: [30, 38, 46] },
      headStyles: { fillColor: [60, 122, 137], textColor: [255, 255, 255] }, // #3c7a89
      alternateRowStyles: { fillColor: [46, 71, 86], textColor: [255, 255, 255] }, // darker variant of #2e4756 with white text
    });

    doc.save("kplc-token-history.pdf");
  };

  return (
    <div className="min-h-screen bg-[#16262e] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-amber-500 font-bold">KPLC Token History</h1>
          <Button
            onClick={onFinish}
            variant="outline"
            className="border-[#9fa2b2] bg-amber-500 text-white hover:bg-[#9fa2b2]/10"
          >
            Finish
          </Button>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28 bg-[#2e4756]/50 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-96 bg-[#2e4756]/50 rounded-xl" />
          </div>
        )}

        {error && (
          <Card className="bg-red-900/30 border-red-800">
            <CardHeader>
              <CardTitle className="text-red-400">Error</CardTitle>
            </CardHeader>
            <CardContent className="text-white">{error}</CardContent>
          </Card>
        )}

        {transactions && transactions.length > 0 && !loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Transaction List + Download Button */}
            <div className="flex flex-col">
              <div className="flex-1 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
                <h2 className="text-xl text-amber-500 font-semibold mb-4">
                  Recent Transactions
                </h2>
                {transactions.map((t) => (
                  <TransactionItem
                    key={t.recptNo + t.trnTimestamp}
                    transaction={t}
                    isSelected={
                      effectiveSelected?.recptNo === t.recptNo &&
                      effectiveSelected?.trnTimestamp === t.trnTimestamp
                    }
                    onSelect={() => setSelected(t)}
                  />
                ))}
              </div>

              {/* Download PDF Button */}
              <div className="mt-6">
                <Button
                  onClick={downloadPDF}
                  className="w-full bg-amber-500 hover:bg-[#356d7a] text-white"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Report
                </Button>
              </div>
            </div>

            {/* Right: Selected Transaction Details */}
            <div className="bg-[#2e4756]/30 rounded-xl p-6 md:p-8">
              {effectiveSelected ? (
                <TransactionDetails transaction={effectiveSelected} />
              ) : (
                <div className="text-center text-[#9fa2b2] py-20">
                  Select a transaction to view details
                </div>
              )}
            </div>
          </div>
        )}

        {transactions && transactions.length === 0 && !loading && (
          <div className="text-center py-20 text-[#9fa2b2]">
            No transactions found for this meter.
          </div>
        )}
      </div>
    </div>
  );
}