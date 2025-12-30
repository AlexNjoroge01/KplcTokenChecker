export interface Concept {
  codConcept: string;
  amount: number;
}

export interface Transaction {
  servicePointNo: string | null;
  trnTimestamp: number;
  tokenNo: string;
  accountNumber: string | null;
  custName: string | null;
  customerNumber: string | null;
  transactionId: string | null;
  recptNo: string;
  concepts: Concept[];
  msno: string;
  pMethod: string;
  debtRefNo: string | null;
  codUnicom: string | null;
  tariff?: string;
  trnUnits: number;
  trnAmount: number;
  coConcepto: string | null;
}

// Kept for potential future changes, but we use type guards now
export interface TokenHistoryResponse {
  success: boolean;
  data: {
    data: Array<{
      colPrepayment: Transaction[];
      prepayment: boolean;
    }>;
  };
}