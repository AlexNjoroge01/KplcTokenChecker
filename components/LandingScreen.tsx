import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface Props {
  onOpenModal: () => void;
}

export function LandingScreen({ onOpenModal }: Props) {
  return (
    <div className="min-h-screen bg-primary to-muted flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-10 text-center space-y-8">
        <div className="flex justify-center">
          <Zap className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">KPLC Token Checker</h1>
        <p className="text-lg text-muted-foreground">
          Easily view your historical electricity token purchases and understand your spending with a simple meter lookup.
        </p>
        <p className="text-xl font-medium">Lookup your meter transactions</p>
        <Button size="lg" onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700">
          Start Lookup
        </Button>
        <p className="text-sm text-muted-foreground pt-8">
          Unofficial tool • Powered by public KPLC data proxy
        </p>
      </Card>
    </div>
  );
}