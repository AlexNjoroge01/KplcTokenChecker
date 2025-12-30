import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionTable } from "./TransactionTable";
import { CostBreakdownChart } from "./CostBreakdownChart";
import type { Transaction } from "@/types/api";

interface Props {
  transactions: Transaction[] | null;
  loading: boolean;
  error: string | null;
  onFinish: () => void;
}

export function DashboardScreen({ transactions, loading, error, onFinish }: Props) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">KPLC Token History</h1>
          <Button onClick={onFinish} variant="outline">
            Finish
          </Button>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><Skeleton className="h-8 w-40" /></CardHeader>
              <CardContent><Skeleton className="h-64 w-full" /></CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-8 w-40" /></CardHeader>
              <CardContent><Skeleton className="h-64 w-full rounded-full" /></CardContent>
            </Card>
          </div>
        )}

        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>{error}</CardContent>
          </Card>
        )}

        {transactions && !loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionTable transactions={transactions} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <CostBreakdownChart transactions={transactions} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}