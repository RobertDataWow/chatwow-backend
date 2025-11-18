export type LineSessionPg = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lineAccountId: string;
  projectId: string;
};

export type LineSessionPlain = LineSessionPg;

export type LineSessionNewData = Omit<
  LineSessionPg,
  'id' | 'createdAt' | 'updatedAt'
>;

export type LineSessionUpdateData = Partial<
  Omit<LineSessionPg, 'id' | 'createdAt'>
>;
