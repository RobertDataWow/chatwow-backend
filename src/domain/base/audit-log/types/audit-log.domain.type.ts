export type AuditLogPg = {
  id: string;
  createdAt: Date;
  actorType: 'USER' | 'SYSTEM';
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  actionDetail: string;
  createdById: string;
  ownerTable: string;
  ownerId: string;
  rawData: any;
};

export type AuditLogPlain = AuditLogPg;

export type AuditLogNewData = Omit<AuditLogPg, 'id' | 'createdAt'>;

export type AuditLogUpdateData = Partial<Omit<AuditLogPg, 'id' | 'createdAt'>>;
