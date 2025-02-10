export type QRCodeResponse = {
  status: "success" | "error";
  message: string;
  data: QRCodeData;
};

export type QRCodeData = {
  secret: string;
  qrCode: string;
};
