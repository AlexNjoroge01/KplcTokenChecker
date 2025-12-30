"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionItem } from "./TransactionItem";
import { TransactionDetails } from "./TransactionDetails";
import type { Transaction } from "@/types/api";

interface Props {
  transactions: Transaction[] | null;
  loading: boolean;
  error: string | null;
  onFinish: () => void;
}

export function DashboardScreen({ transactions, loading, error, onFinish }: Props) {
  const [selected, setSelected] = useState<Transaction | null>(null);

  // Derived selection: auto-select first transaction when data loads and nothing is selected
  const effectiveSelected = selected ?? (transactions && transactions.length > 0 ? transactions[0] : null);

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
            {/* Left: Transaction List */}
            <div className="space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
              <h2 className="text-xl text-amber-500 font-semibold mb-4">Recent Transactions</h2>
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