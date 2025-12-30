import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface Props {
  onOpenModal: () => void;
}

export function LandingScreen({ onOpenModal }: Props) {
  return (
    <div className="min-h-screen bg-[#16262e] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-[#2e4756] rounded-2xl shadow-2xl p-12 text-center space-y-10 border border-[#9fa2b2]/20">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-[#3c7a89] rounded-full flex items-center justify-center">
            <Zap className="h-14 w-14 text-amber-500" />
          </div>

          {/* Title */}
          <h1 className="text-4xl  md:text-5xl font-bold text-amber-500">
            KPLC Token Checker
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Easily view your historical electricity token purchases and understand your spending with a simple meter lookup.
          </p>

          {/* Call to Action Button */}
          <Button
            size="lg"
            onClick={onOpenModal}
            className="bg-[#3c7a89] bg-amber-500 hover:bg-[#356d7a] text-white text-lg px-12 py-7 rounded-xl font-semibold shadow-lg"
          >
            Start Lookup
          </Button>

          {/* Footer note */}
          <p className="text-sm text-white pt-8">
            Unofficial tool • Powered by public KPLC data proxy
          </p>
        </div>
      </div>
    </div>
  );
}