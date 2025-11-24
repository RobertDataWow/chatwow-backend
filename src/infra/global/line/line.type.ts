type LineEvent = {
  type: string;
  message: {
    type: string;
    id: string;
    quoteToken: string;
    markAsReadToken: string;
    text: string;
  };
  webhookEventId: string;
  deliveryContext: {
    isRedelivery: boolean;
  };
  timestamp: number;
  source: {
    type: string;
    userId: string;
  };
  replyToken: string;
  mode: string;
};

export type LineWebHookMessage = {
  destination: string;
  events: LineEvent[];
};

export type ValidateSignatureOpts = {
  signature: string | null;
  rawBody: any | null;
};
