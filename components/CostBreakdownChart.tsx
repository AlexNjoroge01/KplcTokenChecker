import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { Transaction } from "@/types/api";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  transactions: Transaction[];
}

export function CostBreakdownChart({ transactions }: Props) {
  const conceptMap = new Map<string, number>();

  transactions.forEach((t) =>
    t.concepts.forEach((c) => {
      conceptMap.set(
        c.codConcept,
        (conceptMap.get(c.codConcept) || 0) + c.amount
      );
    })
  );

  const labels = Array.from(conceptMap.keys());
  const values = Array.from(conceptMap.values());

  if (labels.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No breakdown data</div>;
  }

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "right" },
          },
        }}
      />
    </div>
  );
}