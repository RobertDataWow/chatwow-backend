export type UserManageProjectPg = {
  id: string;
  createdAt: Date;
  projectId: string;
  userId: string;
};

export type UserManageProjectPlain = UserManageProjectPg;

export type UserManageProjectNewData = Omit<
  UserManageProjectPg,
  'id' | 'createdAt'
>;

export type UserManageProjectUpdateData = Partial<
  Omit<UserManageProjectPg, 'id' | 'createdAt'>
>;
