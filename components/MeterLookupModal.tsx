import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (meter: string) => void;
}

export function MeterLookupModal({ open, onOpenChange, onSubmit }: Props) {
  const [meter, setMeter] = useState("");

  const handleSubmit = () => {
    if (!/^\d{11}$/.test(meter)) {
      toast.error("Please enter exactly 11 digits");
      return;
    }
    onSubmit(meter);
    onOpenChange(false);
    setMeter("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2e4756] border-[#9fa2b2]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Enter Your Meter Number</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="meter" className="text-white">
              11-digit Meter Number
            </Label>
            <Input
              id="meter"
              value={meter}
              onChange={(e) => setMeter(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="e.g. 52473463179"
              className="bg-[#16262e] border-[#9fa2b2]/50 text-white placeholder:text-[#9fa2b2]/50 text-lg h-14 focus:border-[#3c7a89]"
              maxLength={11}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#9fa2b2] text-white hover:bg-[#9fa2b2]/10 px-6 py-3"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-[#356d7a] text-white px-8 py-3 font-medium"
          >
            Fetch Tokens
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}