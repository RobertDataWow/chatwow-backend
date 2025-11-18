export type LineAccountPg = {
  id: string;
  createdAt: Date;
  role: 'ADMIN' | 'USER';
  userStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING_REGISTRATION';
  lineUid: string | null;
};

export type LineAccountPlain = LineAccountPg;

export type LineAccountNewData = Omit<LineAccountPg, 'id' | 'createdAt'>;

export type LineAccountUpdateData = Partial<
  Omit<LineAccountPg, 'id' | 'createdAt'>
>;
