export interface TransactionPayload {
  fromAccountNumber: string;
  amount: number;
  bankCode: string;
  accountNumber: string;
  narration: string;
  pin: string;
  accountName: string;
  bankName: string;
}
