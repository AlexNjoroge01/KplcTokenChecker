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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Your Meter Number</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="meter">11-digit Meter Number</Label>
          <Input
            id="meter"
            value={meter}
            onChange={(e) => setMeter(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="e.g. 54603460111"
            maxLength={11}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Fetch Tokens</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}