export interface AddBeneficary {
  beneficiaryType?: string;
  accountName?: string;
  bankName?: string;
  bankCode?: string;
  accountNumber?: string;
  phoneNumber?: string;
  networkProvider?: string;
  isBeneficiary?: boolean;
  tvCardName?: string;
  tvCardNumber?: string;
  tvProvider?: string;
}

export type BeneficiaryProps = {
  beneficiaryType?: string;
  accountName?: string;
  bankName?: string;
  bankCode?: string;
  accountNumber?: string;
  phoneNumber?: string;
  networkProvider?: string;
  tvCardName?: string;
  tvCardNumber?: string;
  tvProvider?: string;
};

export type BeneficiaryData = {
  id: string;
  userId: string;
  accountId: string | null;
  beneficiaryType: string;
  accountName: string | null;
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  tvCardNumber: string | null;
  tvCardName: string | null;
  tvProvider: string | null;
  phoneNumber: string | null;
  networkProvider: string | null;
  isBeneficiary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Bank = {
  Code: string;
  Gateway: string | null;
  ID: string;
  Name: string;
  Status: boolean;
  StatusDetails: string | null;
  RequestStatus: boolean;
  ResponseDescription: string | null;
  ResponseStatus: string | null;
};
