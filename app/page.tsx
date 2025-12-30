"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { LandingScreen } from "@/components/LandingScreen";
import { MeterLookupModal } from "@/components/MeterLookupModal";
import { DashboardScreen } from "@/components/DashboardScreen";
import { useTokenHistory } from "@/hooks/useTokenHistory";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, loading, error, fetchHistory, clear } = useTokenHistory();

  const handleMeterSubmit = (meter: string) => {
    fetchHistory(meter);
  };

  const handleFinish = () => {
    clear();
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      {!data ? (
        <>
          <LandingScreen onOpenModal={() => setModalOpen(true)} />
          <MeterLookupModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            onSubmit={handleMeterSubmit}
          />
        </>
      ) : (
        <DashboardScreen
          transactions={data}
          loading={loading}
          error={error}
          onFinish={handleFinish}
        />
      )}
    </>
  );
}