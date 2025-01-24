declare global {
  interface Window {
    dojah: {
      init: (config: {
        widget_id: string;
        user_data?: Record<string, string>;
        gov_data?: Record<string, string>;
        onSuccess?: (data: any) => void;
        onClose?: () => void;
        onError?: (error: any) => void;
      }) => { open: () => void };
    };
  }
}

export {};
