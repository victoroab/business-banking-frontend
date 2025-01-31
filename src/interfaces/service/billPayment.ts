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
