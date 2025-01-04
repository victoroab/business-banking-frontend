export interface AddressProps {
  address: string;
  city: string;
  state: string;
  zipcode: string;
  landmark: string;
  lga: string;
}

export type BusinessInfo = {
  logo: string;
  name: string;
  phone: string;
  businessEntity: string;
  companyType: "COMPANY" | "SOLE_PROPRIETORSHIP" | "PARTNERSHIP";
  rcNumber: string;
  industry: string;
  size: "Small" | "Medium" | "Large";
  annualIncome: string | number;
  directors: Director[];
};

export type Director = {
  idCard: string;
  id?: number;
  firstName: string;
  lastName: string;
  idNo: string;
  idType: string;
  email: string;
  phone: string;
};

export type BusinessDocument = {
  cac: string;
  memorandum: string;
  scuml: string;
  utilityBill: string;
};
