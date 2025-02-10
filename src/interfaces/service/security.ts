export type QRCodeResponse = {
  status: "success" | "error";
  message: string;
  data: QRCodeData;
};

export type QRCodeData = {
  secret: string;
  qrCode: string;
  twoFaEnabled?: boolean;
};

export type NotificationPreferences = {
  creditEmail: boolean;
  creditSms: boolean;
  creditPush: boolean;
  creditWhatsapp: boolean;
  debitEmail: boolean;
  debitSms: boolean;
  debitPush: boolean;
  debitWhatsapp: boolean;
};
