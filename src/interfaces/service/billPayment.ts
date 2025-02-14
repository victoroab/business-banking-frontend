export interface BundleData {
  fromAccountNumber: string;
  pin: string;
  serviceCategoryId: string;
  bundleCode: string;
  network: string;
  phoneNumber: string;
}

export interface AirtimeData {
  fromAccountNumber: string;
  pin: string;
  serviceCategoryId: string;
  network: string;
  amount: number;
  phoneNumber: string;
}

export interface AirtimeBundleData {
  fromAccountNumber: string;
  pin: string;
  serviceCategoryId: string;
  network: string;
  phoneNumber: string;
  bundleCode?: string;
  amount?: number;
}

interface Beneficiary {
  id?: string;
  userId?: string;
  accountId?: string | null;
  beneficiaryType?: string;
  accountName?: string | null;
  bankName?: string | null;
  bankCode?: string | null;
  accountNumber?: string | null;
  tvCardNumber?: string | null;
  tvCardName?: string | null;
  tvProvider?: string | null;
  phoneNumber?: string;
  networkProvider?: string;
  meterNumber?: string | null;
  meterName?: string | null;
  meterType?: string | null;
  meterTypeFull?: string | null;
  isBeneficiary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionProps {
  id?: string;
  accountId?: string;
  userId?: string;
  beneficiaryId?: string;
  transactionType?: string;
  action?: string;
  amount?: string;
  newBalance?: string;
  reference?: string;
  narration?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: unknown;
  beneficiary?: Beneficiary;
}
