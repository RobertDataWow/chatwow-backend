export type LineChatLogPg = {
  id: string;
  createdAt: Date;
  lineSessionId: string;
  chatSender: 'USER' | 'BOT';
  message: string;
};

export type LineChatLogPlain = LineChatLogPg;

export type LineChatLogNewData = Omit<LineChatLogPg, 'id' | 'createdAt'>;

export type LineChatLogUpdateData = Partial<
  Omit<LineChatLogPg, 'id' | 'createdAt'>
>;
