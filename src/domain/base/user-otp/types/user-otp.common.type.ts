export type UserOtpSortKey = 'id' | 'createdAt';

export type UserOtpQueryOptions = {
  filter?: {
    otp?: string;
    userId?: string;
  };
};
